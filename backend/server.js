const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
});

// Mock Data Source Toggle
const USE_MOCK = process.env.DATA_SOURCE === 'json';
const MOCK_FILE_PATH = path.join(__dirname, 'resume.json');

const getResumeData = async () => {
    if (USE_MOCK) {
        try {
            const data = fs.readFileSync(MOCK_FILE_PATH, 'utf8');
            return JSON.parse(data);
        } catch (err) {
            console.error('Mock data error:', err);
            return null;
        }
    } else {
        const result = await pool.query('SELECT * FROM resume ORDER BY id DESC LIMIT 1');
        return result.rows.length > 0 ? formatResume(result.rows[0]) : null;
    }
};

app.use(helmet());
app.use(cors());
app.use(express.json());

// Helper to format DB row to Resume JSON structure
const formatResume = (row) => {
    return {
        id: row.id,
        name: row.name,
        title: row.title,
        contact: {
            email: row.email,
            phone: row.phone,
            location: row.location
        },
        objective: row.objective,
        about: row.about,
        experience: row.experience || [],
        skills: row.skills || [],
        certifications: row.certifications || [],
        education: row.education || [],
        links: row.links || {}
    };
};

// GET /api/resume - Fetch latest resume
app.get('/api/resume', async (req, res) => {
    try {
        const resume = await getResumeData();
        if (!resume) {
            return res.status(404).json({ message: 'No resume found' });
        }
        res.json(resume);
    } catch (err) {
        console.error('Data error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});





// GET /api/resume/export - Export DB content to frontend/resume.json
app.get('/api/resume/export', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM resume ORDER BY id DESC LIMIT 1');
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'No resume data to export' });
        }

        const resumeData = formatResume(result.rows[0]);
        // Write to /frontend/resume.json (Mounted volume)
        const exportPath = '/frontend/resume.json';

        fs.writeFile(exportPath, JSON.stringify(resumeData, null, 4), (err) => {
            if (err) {
                console.error('File write error:', err);
                return res.status(500).json({ error: 'Failed to write export file' });
            }
            res.json({ message: 'Export successful', path: exportPath, data: resumeData });
        });

    } catch (err) {
        console.error('Export error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
