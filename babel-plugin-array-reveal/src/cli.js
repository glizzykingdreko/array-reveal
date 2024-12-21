#!/usr/bin/env node

const babel = require('@babel/core');
const fs = require('fs');
const path = require('path');
const plugin = require('./index');

// Parse command line arguments
const args = process.argv.slice(2);
const usage = `
Usage: array-reveal [options] <file>

Options:
  -o, --output <file>  Output file (default: stdout)
  -d, --debug         Enable debug logging
  -h, --help         Show this help message

Example:
  array-reveal input.js -o output.js
  array-reveal --debug input.js
`;

let inputFile = null;
let outputFile = null;
let debug = false;

// Parse arguments
for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
        case '-h':
        case '--help':
            console.log(usage);
            process.exit(0);
            break;
        case '-o':
        case '--output':
            outputFile = args[++i];
            break;
        case '-d':
        case '--debug':
            debug = true;
            break;
        default:
            if (!inputFile) {
                inputFile = args[i];
            }
    }
}

if (!inputFile) {
    console.error('Error: Input file is required');
    console.log(usage);
    process.exit(1);
}

// Read input file
try {
    const code = fs.readFileSync(inputFile, 'utf8');
    
    // Transform the code
    const result = babel.transformSync(code, {
        plugins: [
            [plugin, { debug }]
        ]
    });

    // Output the result
    if (outputFile) {
        fs.writeFileSync(outputFile, result.code);
        console.log(`Deobfuscated code written to ${outputFile}`);
    } else {
        console.log(result.code);
    }
} catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
} 