'use strict'

var parsers = require('./parsers')
var extract = require('pdf-text-extract')


module.exports = function (filePath, callback) {

  let options = { 
    layout: 'raw',
    splitPages: false
  }

  extract(filePath, options, function (err, text) {
    if (err) return callback(err)

    // Find parsers that can handle this document
    let validParsers = Object.keys(parsers).filter(function (p) { 
      return parsers[p].validate(text) 
    })

    if (!validParsers.length) return callback(null, null)

    // Parser results
    let result = validParsers.map(function (p) {
      return {
        type: parsers[p].metadata.name,
        data: parsers[p].parse(text)
      }
    })

    callback(null, result)

  })
}