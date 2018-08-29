'use strict';

/**
 * Describe all running instances
 *
 * @module describeInstances
 * @requires util
 *
 * @version 0.0.1
 */

const {promisify} = require('util');

/**
 * Retrieve listing of all running EC2 instances
 *
 * @private
 *
 * @returns {Object} 
 * @throws {Error} 
 */
module.exports = async (config) => {

    let describe = promisify(config.ec2.describeInstanceStatus.bind(config.ec2));

    try {

        let result = await describe();
        config.instances = result.InstanceStatuses;

        console.log("Running instances:");
        console.log(JSON.stringify(result, null, 2));

        return config;

    } catch (err) {
        throw err;
    }

};