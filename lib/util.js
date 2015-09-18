module.exports = {}

module.exports.parseFloatB = function parseFloatB (s) {
  return parseFloat(s.replace('.', '').replace(',', '.'))
}
