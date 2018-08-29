'use strict';

/**
 * Stop all running instances
 *
 * @module stopInstances
 * @requires aws-sdk
 *
 * @version 0.0.1
 */

const {promisify} = require('util');

/**
 * Function to retrieve the instance id
 * @param  {Object} instance Object containing instance information
 * @return {String}          The id of the instance
 */
const getInstanceId = (instance) => {
	return instance.InstanceId;
};

/**
 * Stop all running EC2 instances
 *
 * @private
 *
 * @returns {Object} 
 * @throws {Error} 
 */
module.exports = async (config) => {

    let stop = promisify(config.ec2.stopInstances.bind(config.ec2));
    let instances = config.instances;

    if(!instances.length) {
    	return false;
    }

    let params = {
    	InstanceIds: instances.map(getInstanceId)
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