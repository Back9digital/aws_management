"use strict";

const rewire = require("rewire");
const stopInstances = rewire("../../../app/stopInstances.js");

describe("Stop Instances module", function () {

    let configMock;

    beforeEach(function () {

        configMock = {
            ec2: {
                stopInstances: jasmine.createSpy()
            },
            instances: [{
                AvailabilityZone: "eu-west-1",
                InstanceId: "i-1234567890abcdef0",
                InstanceState: {
                    Code: 16,
                    Name: "running"
                },
                InstanceStatus: {
                    Details: [{
                        Name: "reachability",
                        Status: "passed"
                    }],
                    Status: "ok"
                },
                SystemStatus: {
                    Details: [{
                        Name: "reachability",
                        Status: "passed"
                    }],
                    Status: "ok"
                }
            }]
        };

        spyOn(console, "log");
    });

    it("should export a function that stops running instances", function (done) {

        let promisifySpy = jasmine.createSpy().and.returnValue(() => true);
        let reverse = stopInstances.__set__("promisify", promisifySpy);

        stopInstances(configMock).then(() => {
            expect(promisifySpy).toHaveBeenCalled();
            done();
        });

        reverse();
    });

    it("should export a function that does not attempt to stop instances if no running instances were found", function(done){

        configMock.instances = [];

        stopInstances(configMock).then(() => {
            expect(configMock.ec2.stopInstances).not.toHaveBeenCalled();
            done();
        });
    });

    it("should export a function that throws an error if the call to stop running instances fails", function(done) {

        let error = {
            name: 'Error',
            message: 'AWS stopInstances error'
        };

        let fn = () => () => {
            throw error;
        };

        let reverse = stopInstances.__set__("promisify", fn);

        stopInstances(configMock).catch((err) => {
            expect(err).toEqual(error);
            done();
        });
    });
});

