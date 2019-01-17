const db = require('../config/keys').MONGO_URL;

const logger = require('winston');

require('winston-mongodb');

let options = { db };

logger.add(logger.transports.MongoDB, options);

module.exports = logger;
