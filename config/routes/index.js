const profile = process.env.NODE_ENV;

if (!profile || profile === 'dev' || profile === 'docker') {
  module.exports = require('./dev');
} else {
  throw Error(`Unexpected profile: ${profile}`)
}
