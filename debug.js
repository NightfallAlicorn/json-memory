'use strict'

const JsonMemory = require('./json-memory')

var data = new JsonMemory('dummy-data.js', (error) => {
  if (error) {
    console.log(error.message)
    return
  }

  // This will print undefined on first run since file doesn't exist with property.
  // However, since the file is saved with a stored value right after first load,
  // re-running the script will then load print 'Hello world.' from that property.
  console.log(data.EXAMPLE_PROPERTY)
})

data.EXAMPLE_PROPERTY = 'Hello world.'

data.write()
