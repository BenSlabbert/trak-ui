const profile = process.env.NODE_ENV;

if (!profile || profile === 'dev' || profile === 'test') {
  module.exports = require('./dev');
} else {
  throw Error(`Unexpected profile: ${profile}`)
}
