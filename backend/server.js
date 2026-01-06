const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Database connection
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
});

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
        const result = await pool.query('SELECT * FROM resume ORDER BY id DESC LIMIT 1');
        if (result.rows.length === 0) {
            // Fallback to loading from file if DB is empty (First run)
            // Or return 404. Let's return default structure or empty.
            // Requirement says "Fetch the latest record".
            return res.status(404).json({ message: 'No resume found' });
        }
        res.json(formatResume(result.rows[0]));
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST /api/resume - Insert new resume
app.post('/api/resume', async (req, res) => {
    const { name, title, contact = {}, objective, about, experience, skills, certifications, education, links } = req.body;

    try {
        const query = `
            INSERT INTO resume (name, title, email, phone, location, objective, about, experience, skills, certifications, education, links)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
            RETURNING *;
        `;
        const values = [
            name, title, contact.email, contact.phone, contact.location,
            objective, about, JSON.stringify(experience), JSON.stringify(skills),
            JSON.stringify(certifications), JSON.stringify(education), JSON.stringify(links)
        ];

        const result = await pool.query(query, values);
        res.status(201).json(formatResume(result.rows[0]));
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ error: 'Failed to create resume' });
    }
});

// PUT /api/resume/:id - Update existing resume
app.put('/api/resume/:id', async (req, res) => {
    const { id } = req.params;
    const { name, title, contact = {}, objective, about, experience, skills, certifications, education, links } = req.body;

    try {
        const query = `
            UPDATE resume 
            SET name=$1, title=$2, email=$3, phone=$4, location=$5, objective=$6, about=$7, 
                experience=$8, skills=$9, certifications=$10, education=$11, links=$12
            WHERE id=$13
            RETURNING *;
        `;
        const values = [
            name, title, contact.email, contact.phone, contact.location,
            objective, about, JSON.stringify(experience), JSON.stringify(skills),
            JSON.stringify(certifications), JSON.stringify(education), JSON.stringify(links),
            id
        ];

        const result = await pool.query(query, values);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Resume not found' });
        }
        res.json(formatResume(result.rows[0]));
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ error: 'Failed to update resume' });
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
