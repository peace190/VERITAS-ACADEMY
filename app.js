/**
 * ==========================================================================
 * VERITAS ACADEMY - BACKEND ENGINE SERVER
 * Runs locally via Node.js terminal to pipe MySQL data to your pages
 * ==========================================================================
 */
const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();

// 1. Connect Node.js to your XAMPP MySQL Database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',      // XAMPP default username
    password: '',      // XAMPP default password is blank
    database: 'veritas_academy' 
});

db.connect((err) => {
    if (err) {
        console.error('❌ Database connection failed: ' + err.stack);
        return;
    }
    console.error('⚡ Connected to XAMPP MySQL Database successfully.');
});

// 2. Serve your frontend static files from your project folder
app.use(express.static(path.join(__dirname)));

// 3. Serve the Login gateway page explicitly if needed
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// 4. The API endpoint that your login/portal components call to fetch rows
app.get('/api/student/:id', (req, res) => {
    const studentId = req.params.id;
    const query = 'SELECT * FROM students WHERE student_id = ?';
    
    db.query(query, [studentId], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, error: err.message });
        }
        if (results.length === 0) {
            return res.json({ success: false, message: 'Student token not found' });
        }
        
        // Send row straight back to the browser fetch requests!
        res.json(results[0]);
    });
});

// Start your local server pipeline
const PORT = 3000;
app.listen(PORT, () => {
    console.error(`🚀 Server executing seamlessly on http://localhost:${PORT}`);
});