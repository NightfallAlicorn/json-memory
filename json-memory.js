'use strict'

const fs = require('fs')
const path = require('path')

const EXCLUDED_PROPERTIES = ['_file']
const FILE_ENCODING = 'UTF-8'
const FILE_EXTENSIONS = ['.json', '.jsonp']

/**
 * Resolves file path conflicts with the OS and local path input.
 * @param {string} file The file directory of the JSON file.
 * @returns {string} The resolved file path.
 */
const resolvePath = function resolvePath (file) {
  return file.substring(0, 2) === './' ? path.resolve(__dirname, file) : path.resolve(file)
}

module.exports = class JsonMemory {
  /**
   * JsonMemory class object that provides easy read and write functionality.
   * @param {string} file Path to the JSON file. Prefix with './' for local script folder.
   * @param {boolean|function(Error):void} [loadOrCallback=] If the parameter is a boolean,
   * the module will attempt to load the file synchronous. Else if the parameter is a function,
   * the module will attempt to load the file asynchronous. Default: true.
   */
  constructor (file, loadOrCallback) {
    this._file = resolvePath(file)

    // Add file '.json' extension if there currently isn't one.
    let extension = path.extname(this._file.toLowerCase())
    if (FILE_EXTENSIONS.indexOf(extension) === -1) {
      this._file += '.json'
    }

    // Auto load the file during declare.
    if (loadOrCallback === undefined || loadOrCallback === true) {
      // Synchronous
      return this.read()
    } else if (typeof loadOrCallback === 'function') {
      // Asynchronous
      this.read((error) => {
        loadOrCallback(error)
      })
    }
  }

  /**
   * Read the object values from the JSON file.
   *
   * If the callback is included. The read will be asynchronous with the data provided in the callback.
   *
   * If the callback is excluded. The read will be synchronous with the data provided in the object itself.
   * @param {function (Error} callback Optional. Use for asynchronous JSON reading.
   * @returns {JsonMemory} 'this' object reference link.
   */
  read (callback) {
    // Remove non-built-in module properties from the object.
    Object.getOwnPropertyNames(this).forEach((value) => {
      if (EXCLUDED_PROPERTIES.indexOf(value) === -1) {
        delete this[value]
      }
    })

    if (typeof callback === 'function') {
      // Asynchronous
      fs.readFile(this._file, FILE_ENCODING, (error, data) => {
        if (error) {
          callback(error.message)
        } else {
          Object.assign(this, JSON.parse(data))
          callback(null, this)
        }
      })
    } else {
      // Synchronous
      try {
        let data = fs.readFileSync(this._file, FILE_ENCODING)
        Object.assign(this, JSON.parse(data))
      } catch (error) {
        console.warn(error.message)
      }
    }
    return this
  }

  /**
   * Returns a string of the class object type.
   */
  toString () {
    return `[object ${this.constructor.name}]`
  }

  /**
   * Write the object values to the JSON file.
   *
   * If the callback is included. The write will be asynchronous with a callback provided when the operation is done.
   *
   * If the callback is excluded. The write will be synchronous.
   * @param {function (Error} callback Optional. Use for asynchronous JSON writing.
   * @returns {JsonMemory} 'this' object reference link.
   */
  write (callback) {
    // Deep copy the object so that it's not object referenced.
    let data = JSON.parse(JSON.stringify(this))

    // Remove built-in module properties from object root.
    EXCLUDED_PROPERTIES.forEach((value) => {
      delete data[value]
    })

    if (typeof callback === 'function') {
      // Asynchronous
      fs.writeFile(this._file, JSON.stringify(data), FILE_ENCODING, (error) => {
        if (error) {
          callback(error.message)
        } else {
          callback(null)
        }
      })
    } else {
      // Synchronous
      fs.writeFileSync(this._file, JSON.stringify(data), FILE_ENCODING)
    }
    return this
  }
}
