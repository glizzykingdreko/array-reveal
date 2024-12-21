const express = require('express');
const bodyParser = require('body-parser');
const babel = require('@babel/core');
const arrayReveal = require('babel-plugin-array-reveal');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// CORS middleware for development
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Routes
app.post('/deobfuscate', async (req, res) => {
    try {
        const { code } = req.body;
        
        if (!code || typeof code !== 'string') {
            return res.status(400).json({ 
                success: false, 
                error: 'Invalid input: code must be a string' 
            });
        }

        const result = babel.transformSync(code, {
            plugins: [
                [arrayReveal, { debug: false }]
            ]
        });

        res.json({ 
            success: true, 
            deobfuscatedCode: result.code 
        });
    } catch (error) {
        // Clean the error message
        let cleanError = error.message
            .replace(/.*?unknown file: /g, '')
            .replace(/

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 