#!/usr/bin/env node

'use strict'

var extract = require('../')
var path = require('path')
var util = require('util')

var fileName = process.argv[2]

if (!fileName) 
  throw new Error('file path must be specified as the argument like "pdf-text-extract /path/to/file"')

var filePath = path.resolve(fileName)

extract(filePath, function (err, result) {
  if (err) throw err
  console.log(util.inspect(result, { depth: null, colors: true }))
})
