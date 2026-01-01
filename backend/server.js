const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/resume', (req, res) => {
    const resumePath = path.join(__dirname, 'resume.json');

    fs.readFile(resumePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading resume.json:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        try {
            const jsonData = JSON.parse(data);
            res.json(jsonData);
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            res.status(500).json({ error: 'Invalid JSON data' });
        }
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
