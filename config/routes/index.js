const logger = require("../../logger/winston-mongodb");
const profile = process.env.NODE_ENV;

logger.info(`Loading routes for profile: ${profile}`);

if (!profile || profile === "dev") {
  module.exports = require("./dev");
} else {
  module.exports = require("./docker");
}
