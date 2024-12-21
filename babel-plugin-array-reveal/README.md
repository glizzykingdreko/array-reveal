# babel-plugin-array-reveal

## Table of Contents
- [babel-plugin-array-reveal](#babel-plugin-array-reveal)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
    - [Example Structures](#example-structures)
      - [Obfuscated Code:](#obfuscated-code)
      - [Deobfuscated Code:](#deobfuscated-code)
    - [Why This Plugin?](#why-this-plugin)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Via Babel Configuration](#via-babel-configuration)
    - [Directly in Your Script](#directly-in-your-script)
  - [Limitations](#limitations)
    - [Use the Web App](#use-the-web-app)
  - [Credits](#credits)

## Overview
The **ArrayReveal Babel Plugin** was developed to simplify and automate the process of deobfuscating low-level JavaScript obfuscations based on shuffled arrays and indexing functions. This type of obfuscation, which we will refer to as **Array-Index Obfuscation**, is commonly encountered in basic anti-bot scripts and simple website JavaScript code. Examples of this obfuscation structure include:

### Example Structures

#### Obfuscated Code:
```javascript
function YA() {
  var A = ["obfuscatedValue1", "obfuscatedValue2", "..."];
  return (YA = function () { return A; })();
}

function dB(index) {
  var arr = YA();
  return arr[index - 270];
}

console.log(dB(270)); // "obfuscatedValue1"
```

#### Deobfuscated Code:
```javascript
console.log("obfuscatedValue1");
```

This plugin was created to eliminate the need for manual deobfuscation or repetitive custom function writing, allowing you to focus on higher-level tasks.

### Why This Plugin?
While deobfuscating a large number of files, this pattern repeatedly appeared in low-level scripts, especially in basic anti-bot mechanisms or obfuscated web assets. By automating the process, this plugin saves significant time.

**Note**: For more advanced obfuscations, such as PerimeterX scripts with multiple interdependent array-based obfuscations (e.g., 10-15 instances), additional custom logic will be required to track associations and calls, as this plugin assumes a single array-obfuscation per script.

## Installation

Install the plugin using npm:
```bash
npm install babel-plugin-array-reveal --save-dev
```

## Usage

### Via Babel Configuration
Add the plugin to your Babel configuration file (`babel.config.js` or `.babelrc`):

```javascript
module.exports = {
  plugins: ["babel-plugin-array-reveal"]
};
```

Run Babel to deobfuscate your script:
```bash
npx babel input.js --out-file output.js
```

### Directly in Your Script
You can also use the plugin programmatically:

```javascript
const babel = require("@babel/core");
const arrayReveal = require("babel-plugin-array-reveal");

const code = `/* your obfuscated JavaScript code here */`;
const output = babel.transform(code, {
  plugins: [arrayReveal]
});

console.log(output.code);
```

## Limitations
The plugin is designed for low-level obfuscations and assumes a single array-based obfuscation per script. Advanced scripts with multiple layers of obfuscation may require manual intervention or additional tooling.

### Use the Web App
If you prefer not to set up an environment, use the web app version of ArrayReveal to quickly deobfuscate your code. Simply paste your obfuscated code into the interface, and the app will process it using the same core logic.

Check it out on [array-reveal.com](https://array-reveal.com)

## Credits
Made with ❤️ by [@glizzykingdreko](https://github.com/glizzykingdreko) sponsord by [TakionAPI](https://takionapi.tech)