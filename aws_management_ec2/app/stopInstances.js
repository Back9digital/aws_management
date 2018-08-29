'use strict';

/**
 * Stop all running instances
 *
 * @module stopInstances
 * @requires util
 *
 * @version 0.0.1
 */

const {promisify} = require('util');

/**
 * Stop all running EC2 instances
 *
 * @private
 * 
 * @param  {Object} config Config object containing listing of running instances
 * @return {Object}        Result of call to stop instances
 * @throws {Error} 
 */
module.exports = async (config) => {

    let stop = promisify(config.ec2.stopInstances.bind(config.ec2));
    let instances = config.instances;

    if(!instances.length) {
        console.log("No running EC2 instances");
        return false;
    }

    let params = {
        InstanceIds: instances.map(instance => instance.InstanceId)
    };

    try {
        let result = await stop(params);
        config.stopped = result;

        console.log("Stopping instances:");
        console.log(JSON.stringify(result, null, 2));
        return config;

    } catch (err) {
        throw err;
    }

};