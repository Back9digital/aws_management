'use strict';

/**
 * Lambda to stop all running EC2 instances
 *
 * @module aws_management_ec2
 * @exports handler
 * 
 * @requires aws-sdk
 * 
 * @version 0.0.1
 */

const AWS = require('aws-sdk');
const config = require('./config');
const describeInstances = require('./app/describeInstances');
const stopInstances = require('./app/stopInstances');

const Raven = require('raven');
Raven.config(config.env === 'production' && config.sentry.url, {captureUnhandledRejections: true}).install();

/**
 * Sentry handler
 */
Raven.context(function () {
    /**
     * Lambda handler
     *
     * @public
     *
     * @param {Object} event
     * @param {Object} context
     * @param {Function} callback
     *
     */
    exports.handler = (event, context, callback) => {

        config.ec2 = new AWS.EC2({apiVersion: '2016-11-15'});
        
        describeInstances(config)
            .then(stopInstances)
            .catch((err) => {
                    err.lambda = "aws_management_ec2";
                    Raven.captureException(err);
                    callback(JSON.stringify(err, null, 2));
                });
            };

});
