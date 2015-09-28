'use strict'

// Requires
var parseFloatB = require('../util.js').parseFloatB

// Parser
module.exports = {
  /**
   * Description
   */
  metadata: {
    name: 'UOyEP Cuota Sindical',
    version: '0.0.1'
  },

  /**
   * Returns TRUE if this parser can handle the file
   */
  validate (text) {
    var find = text.match(/^([\w\s]+)\r\n(\d+)\r\n([\w\s]+)\r\n([\w\s]+)\s(\d+)(\d{11})\r\n([\d,]+\%)\r\n/)
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

      var lines = text.split('\r\n')

      result.RazonSocial = lines[0]
      result.NroAfiliado = parseInt(lines[1])
      result.Direccion   = lines[2]

      find = lines[3].match(/([\w\s]+?)\s(\d+?)(\d{11})/)
      result.Localidad   = find[1]
      result.CodPostal   = parseInt(find[2])
      result.CUIT        = find[3]

      find = lines[5].match(/(\w+)\s(\d+)\s(\d+)\s([\d\.]+,\d+)\s([\d\.]+,\d+)/)
      result.MesNombre           = find[1]
      result.Year                = parseInt(find[2])
      result.CantidadDePersonas  = parseInt(find[3])
      result.TotalRemuneraciones = parseFloatB(find[4])
      result.CuotaSindical       = parseFloatB(find[5])

      find = lines[4].match(/([\d,]+?\%)/)
      result.CuotaSindicalRet    = parseFloatB(find[1])

      find = lines[6].match(/([\d\.]+,\d+)\s([\d\.]+,\d+)\s(\d+\/\d+\/\d+)/)
      result.Intereses        = parseFloatB(find[1])
      result.TotalDepositado  = parseFloatB(find[2])
      result.FechaVencimiento = find[3]

      result.BarCode = lines[18].match(/\d+/)[0]

    } catch (e) {
      console.log('Error', e)
      return null
    }

    return result
  }

}
