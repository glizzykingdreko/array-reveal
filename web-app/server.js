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

// Routes
app.post('/deobfuscate', async (req, res) => {
    try {
        const { code } = req.body;
        
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
        let cleanError = error.message
            .replace(/.*?unknown file: /g, '')  // Remove "unknown file: " prefix
            .replace(/\(.*?\)/g, '')           // Remove anything in parentheses (usually file info)
            .replace(/\s+/g, ' ')              // Replace multiple spaces with single space
            .trim();                           // Remove leading/trailing whitespace

        res.status(400).json({ 
            success: false, 
            error: cleanError
        });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'main.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'main.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 