# AFIP Document Extract

Extract usefull information from Argentinian AFIP's documents, like SUSS or IVA declarations.

I can be used as a command line or as a module.

It relies on `pdftotext`, so it should be available on your path.

# Installation
```bash
npm install afip-document-extract
```

You will need the `pdftotext` binary available on your path. There are packages available for many different operating systems.

See [https://github.com/nisaacson/pdf-extract#osx](https://github.com/nisaacson/pdf-extract#osx) for how to install the `pdftotext` command

# Usage

## As a module

```javascript
var extract = require('afip-document-extract')
var util    = require('util')

var fileName = 'SUSS_08-2015.pdf'

extract(fileName, function (err, result) {
  if (err) throw err
  console.log(util.inspect(result, { depth: null, colors: true }))
})
```

The output should be an object describing usefull information about the file and its contents.

## As a command line tool

```bash
npm install -g afip-document-extract
```

Execute with the filePath as an argument. Output will be json-formatted object.

```bash
afip-document-extract ./test/data/SUSS_08-2015.pdf
```