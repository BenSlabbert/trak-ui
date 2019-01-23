const db = require('../config/keys').MONGO_URL;

const logger = require('winston');

if (process.env.NODE_ENV === 'dev') {
  module.exports = logger;
} else {
  require('winston-mongodb');

  let options = { db };

  logger.add(logger.transports.MongoDB, options);

  module.exports = logger;
}
