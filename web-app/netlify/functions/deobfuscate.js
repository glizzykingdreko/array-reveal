const babel = require('@babel/core');
const arrayReveal = require('babel-plugin-array-reveal');

exports.handler = async function(event, context) {
    // Only allow POST
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ success: false, error: 'Method not allowed' })
        };
    }

    try {
        const { code } = JSON.parse(event.body);
        
        if (!code || typeof code !== 'string') {
            return {
                statusCode: 400,
                body: JSON.stringify({ 
                    success: false, 
                    error: 'Invalid input: code must be a string' 
                })
            };
        }

        const result = babel.transformSync(code, {
            plugins: [
                [arrayReveal, { debug: false }]
            ]
        });

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            body: JSON.stringify({
                success: true,
                deobfuscatedCode: result.code
            })
        };
    } catch (error) {
        // Clean the error message
        let cleanError = error.message
            .replace(/.*?unknown file: /g, '')
            .replace(/\(.*?\)/g, '')
            .replace(/\s+/g, ' ')
            .trim();

        return {
            statusCode: 400,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            body: JSON.stringify({
                success: false,
                error: cleanError
            })
        };
    }
}; 