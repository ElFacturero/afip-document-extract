'use strict'

// Requires
var parseFloatB = require('../util.js').parseFloatB

// Parser
module.exports = {
  /**
   * Description
   */
  metadata: {
    name: 'UOyEP Contribución Sindical',
    version: '0.0.1'
  },

  /**
   * Returns TRUE if this parser can handle the file
   */
  validate (text) {
    return false
  },

  /**
   * Returns a JSON object with the relevant information
   * Or null if there was an error
   */
  parse (text) {
    var result = {}
    var find = null

    try {
      

      // TODO


    } catch (e) {
      console.log('Error', e)
      return null
    }

    return result
  }

}
