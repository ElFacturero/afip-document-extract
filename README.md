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

The output should be an array of recognized objects describing usefull information about the file and its contents.

```javascript
[ { 
    type: 'SUSS',
    data:
    {   
      CUIT: '**-********-*',
      Periodo: '08/2015',
      Revision: 0,
      EmpleadosEnNomina: 8,
      SumaDeREM: 
      [ 
        { REM: 1, value: 80947.05 },
        { REM: 2, value: 80947.05 },
        { REM: 3, value: 80947.05 },
        { REM: 4, value: 80947.05 },
        { REM: 5, value: 80947.05 },
        { REM: 6, value: 0 },
        { REM: 7, value: 0 },
        { REM: 8, value: 80947.05 },
        { REM: 9, value: 80947.05 } 
      ],
      MontosQueSeIngresan: 
      [ 
        { code: 351, name: 'Contribuciones de Seguridad Social', value: 14489.55 },
        { code: 302, name: 'Aportes de Obra Social', value: 2064.14 },
        { code: 301, name: 'Aportes de Seguridad Social', value: 11696.87 },
        { code: 360, name: 'Contribuciones RENATEA', value: 0 },
        { code: 312, name: 'L.R.T.', value: 2870.33 },
        { code: 352, name: 'Contribuciones de Obra Social', value: 4128.31 },
        { code: 28,  name: 'Seguro Colectivo de Vida Obligatorio', value: 32.8 },
        { code: 935, name: 'Aportes RENATEA', value: 0 } ] } } 
      ]
    }
} ]
```

## As a command line tool

```bash
npm install -g afip-document-extract
```

Execute with the filePath as an argument. Output will be json-formatted object.

```bash
afip-document-extract ./test/data/SUSS_08-2015.pdf
```