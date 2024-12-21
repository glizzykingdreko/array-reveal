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
  - [Example input / output](#example-input--output)
    - [Input](#input)
    - [Output](#output)
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

## Example input / output

### Input
```js
function _0xd265(_0x59617d, _0x58d3c7) {
    var _0x1b87ae = _0x1b87();
    return _0xd265 = function (_0xd26557, _0x4cd01e) {
        _0xd26557 = _0xd26557 - 0x11b;
        var _0x330cd1 = _0x1b87ae[_0xd26557];
        return _0x330cd1;
    }, _0xd265(_0x59617d, _0x58d3c7);
} (function (_0x25544e, _0x16e516) {
    var _0x3b4417 = _0xd265,
        _0x364fc2 = _0x25544e();
    while (!![]) {
        try {
            var _0x494a4b = -parseInt(_0x3b4417(0x129)) / 0x1 * (parseInt(_0x3b4417(0x11e)) / 0x2) + parseInt(_0x3b4417(0x121)) / 0x3 * (-parseInt(_0x3b4417(0x11b)) / 0x4) + parseInt(_0x3b4417(0x128)) / 0x5 * (parseInt(_0x3b4417(0x120)) / 0x6) + -parseInt(_0x3b4417(0x11c)) / 0x7 * (-parseInt(_0x3b4417(0x126)) / 0x8) + -parseInt(_0x3b4417(0x11d)) / 0x9 + parseInt(_0x3b4417(0x123)) / 0xa * (parseInt(_0x3b4417(0x124)) / 0xb) + parseInt(_0x3b4417(0x122)) / 0xc * (-parseInt(_0x3b4417(0x127)) / 0xd);
            if (_0x494a4b === _0x16e516) break;
            else _0x364fc2['push'](_0x364fc2['shift']());
        } catch (_0x34e6fa) {
            _0x364fc2['push'](_0x364fc2['shift']());
        }
    }
}(_0x1b87, 0x5bb84));
function hi() {
    var _0x276aaf = _0xd265;
    console[_0x276aaf(0x125)](_0x276aaf(0x11f));
}
hi();
function _0x1b87() {
    var _0x1c6e3a = ['9283ydPDKF', '20xbNuMP', '4419254bQYIoY', '3910743nXzIpT', '56wRSwvq', 'Hello World!', '18096HjYQyK', '191028gmOSlo', '12lPDxUQ', '67550hRCinP', '847obxRXx', 'log', '8Kzrtej', '4524598zbufur', '970iYozwE'];
    _0x1b87 = function () {
        return _0x1c6e3a;
    };
    return _0x1b87();
}
```

### Output
```javascript
function hi() {
    console['log']('Hello World!');
}
hi();
```

## Credits
Made with ❤️ by [@glizzykingdreko](https://github.com/glizzykingdreko) sponsord by [TakionAPI](https://takionapi.tech)
