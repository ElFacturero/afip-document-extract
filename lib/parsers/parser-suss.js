'use strict'

// Requires
var parseFloatB = require('../util.js').parseFloatB

// Parser
module.exports = {
  /**
   * Description
   */
  metadata: {
    name: 'SUSS',
    version: '0.0.1'
  },

  /**
   * Returns TRUE if this parser can handle the file
   */
  validate (text) {
    var find = text.match(['931', 'Declaración Jurada', 'en', 'Pesos con centavos', 'S.U.S.S.'].join('\r\n'))
    return (!!find)
  },

  /**
   * Returns a JSON object with the relevant information
   * Or null if there was an error
   */
  parse (text) {
    var result = {}
    var find = null

    try {
      // CUIT
      find = text.match(/(?:C\.U\.I\.T\. )(\d{2}-\d{8}-\d)/)
      result.CUIT = find[1]

      // Periodo (Mes/Año)
      find = text.match(/(\d{2}\/\d{4})(?:\sServicios\sEventuales)/)
      result.Periodo = find[1]

      // Revisión - Orig. (0) - Rect. (1/9)
      find = text.match(/(?:Orig\.\s\(0\)\s-\sRect\.\s\(1\/9\):\s)(\d+)/)
      result.Revision = parseInt(find[1], 10)

      // Empleados en Nomina
      find = text.match(/(?:Empleados\sen\snómina:\s)(\d+)/)
      result.EmpleadosEnNomina = parseInt(find[1], 10)

      // Suma de REM
      find = text.match(/(?:Suma\sde\sRem\.\s)(\d):\s([\d\.]+,[\d]{2})/g)
      result.SumaDeREM = find.map(function (s) {
        var f = s.match(/(?:Suma\sde\sRem\.\s)(\d):\s([\d\.]+,[\d]{2})/)
        return {
          REM: parseInt(f[1], 10),
          value: parseFloatB(f[2])
        }
      })

      // Montos que se Ingresan
      find = text.match(/(\d{3})\s-\s([A-Za-z\s\.]+)([\d\.]+,[\d]{2})/g)
      result.MontosQueSeIngresan = find.map(function (s) {
        var f = s.match(/(\d{3})\s-\s([A-Za-z\s\.]+)([\d\.]+,[\d]{2})/)
        return {
          code: parseInt(f[1], 10),
          name: f[2].trim(),
          value: parseFloatB(f[3])
        }
      })

    } catch (e) {
      console.log('Error', e)
      return null
    }

    return result
  }

}
