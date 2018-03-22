# JsonMemory

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![dependencies](https://img.shields.io/badge/dependences-0-blue.svg)]()
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![node](https://img.shields.io/badge/node->%3D6.11.4-blue.svg)]()
[![npm version](https://badge.fury.io/js/json-memory.svg)](https://badge.fury.io/js/json-memory)

Badges from [Shields.io](http://shields.io) and [badge.fury.io](https://badge.fury.io).

**Disclaimer: Use at your own risk. Even though I've taken care to avoid errors best of my ability. There is a realm of possibility bugs exist. Be sure to take precaution by backing up your files.**

## Example

```javascript
'use strict'

// Require the JsonMemory class.
const JsonMemory = require('json-memory')

// Declare an instance of JsonMemory by reading an example local JSON file.
var data = new JsonMemory('./example-json-file')

// Prints "Hello world." if the file been written before else prints undefined.
console.log(data.objectValue)

// Add an example property and value.
data.objectValue = 'Hello world.'

// Synchronous write.
data.write()
```

## Installing

First you'll need to install the latest [node](https://nodejs.org/en/). Either by downloading it from their website for Windows or through your Terminal's package program for Linux. Once installed, you can install json-memory either by NPM or downloadable zip.

### Via NPM (Recommended)

Open Command Prompt/Terminal and enter either of the following.

**Local**

```npm install json-memory```

**Global**

```npm install json-memory -g```

### Via Downloadable Zip

Download the latest release from [GitHub](https://github.com/NightfallAlicorn/json-memory/releases) and extract the `json-memory.js` into your project folder. Beware that you have got to `require('./json-memory')` with ./ prefix for local directory when you install by zip.

## Index

* [JsonMemory](#jsonmemory)
* [Example](#example)
* [Installing](#installing)
* [Index](#index)
* [Declaring](#declaring)
* [Naming Collision](#namingcollision)
* [Methods](#methods)

## Declaring

* `file` **string** The local address of the JSON file. Note that '.json' will automatically be added to the file extension if '.json' or '.jsonp' aren't added.
* `load` **boolean|function** Optional. If the parameter is a boolean, the module will attempt to load the file synchronously. Else if the parameter is a function, the module will attempt to load the file asynchronously. Default: true.

```javascript
// Minimum.
var data = new JsonMemory(file)

// Optional.
var data = new JsonMemory(file, loadOrCallback)

// Synchronous file load example.
var data = new JsonMemory('./example-json-file')

console.log(data)

// Asynchronous file load example.
var data = new JsonMemory('./example-json-file', (error) => {
  if (error) {
    console.warn(error)
    return
  }
  console.log(data)
})

// Readying the JSON file without loading it. Not recommended.
var data = new JsonMemory('./example-json-file', false)
```

## Naming Collision

JsonMemory needs a small amount of object space to work with. To avoid issues, do not use any of these method or property  names.

**Methods**

* [read](#read)
* [write](#write)

**Properties**

* `_file` **string** Holds the JSON file directory file path for reading and writing to.

## Methods

### read

Reads the contents from the JSON file and replaces the current object properties and values. Note that all the object properties, excluding module dependent ones, will be lost and replaced with the ones from the JSON file.

* `callback` **function** Optional. If this callback is provided, the read will asynchronous or else it will be synchronous.
    * `error` **[object Error] | null** Provides an error object else null if there isn't any.

```javascript
// Asynchronous Method
data.read((error) => {
  if (error) {
    // Handle error.
    return
  }
  // Handle data if success.
})

// Synchronous Method
data.read()
```

### write

Writes the object properties and values to the JSON file.

* `callback` **function** Optional. If this callback is provided, the write will asynchronous or else it will be synchronous.
    * `error` **[object Error] | null** Provides an error object else null if there isn't any.

```javascript
// Asynchronous Method
data.write((error) => {
  if (error) {
    // Handle error.
    return
  }
  // Handle data if success.
})

// Synchronous Method
data.write()
```