/** 
 * Config.
 *   
 * @module Config
 * @exports config
 * 
 * @version 0.0.1
 */


/**
 * config object
 * 
 * @property {String} env the environement we are in.
 * @property {Object} sentry Sentry conf
 * @property {String} sentry.url The Sentry url.
 */
const config = {
    env: process.env.AWS_ENVIRONMENT,
    sentry: {
        url: process.env.SENTRY_URL || " "
    }
};

module.exports = config;