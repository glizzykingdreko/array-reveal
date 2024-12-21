# array-reveal

## Table of Contents
- [array-reveal](#array-reveal)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Why ArrayReveal?](#why-arrayreveal)
  - [Sponsored by TakionAPI](#sponsored-by-takionapi)
  - [Get Started](#get-started)
    - [Babel Plugin](#babel-plugin)
    - [Web App](#web-app)
  - [Example Structures](#example-structures)
    - [Obfuscated Code Example](#obfuscated-code-example)
    - [Deobfuscated Code](#deobfuscated-code)
  - [Credits](#credits)

## Overview
ArrayReveal is a powerful tool designed to automate the deobfuscation of low-level JavaScript code that uses `Array-Index Obfuscation`. The project consists of two primary components:

1. **ArrayReveal Babel Plugin**
   - Automates the deobfuscation process during your build pipeline.
   - Ideal for developers working with multiple obfuscated files in a project.

2. **ArrayReveal Web App**
   - Provides a simple, no-setup-required interface for quick deobfuscation.
   - Perfect for ad-hoc use cases and beginner-friendly debugging.

## Why ArrayReveal?
Low-level obfuscations like `Array-Index Obfuscation` are commonly found in basic anti-bot scripts or website JavaScript. While simple, these patterns can waste significant developer time during debugging or reverse engineering. ArrayReveal streamlines the deobfuscation process, enabling developers to focus on more critical tasks.

## Sponsored by TakionAPI
This project is proudly sponsored by [**TakionAPI**](https://takionapi.tech), a company specializing in:
- Anti-bot bypass APIs
- Complex JavaScript file deobfuscation
- Custom module development

Visit [TakionAPI](https://Takionapi.tech) for more information and start with a free trial to explore their offerings.

## Get Started
### Babel Plugin
Check out the [plugin README](./babel-plugin-array-reveal/README.md) to learn how to integrate the plugin into your workflow.

### Web App
Check it out on [array-reveal.com](https://array-reveal.com)

Visit the [web app README](./web-app/README.md) for quick deobfuscation without setup.

## Example Structures
`Array-Index Obfuscation` typically involves patterns like these:

### Obfuscated Code Example
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

### Deobfuscated Code
```javascript
console.log("obfuscatedValue1");
```

Check out the `src/index.js` file of the plugin and the test file for detailed example structures.

## Credits
Made with ❤️ by [@glizzykingdreko](https://github.com/glizzykingdreko) sponsord by [TakionAPI](https://takionapi.tech)
