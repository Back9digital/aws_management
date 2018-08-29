"use strict";

const rewire = require("rewire");
const describeInstances = rewire("../../../app/describeInstances.js");

describe("Describe Instances module", function () {

    let configMock;

    beforeEach(function () {

        configMock = {
            ec2: {
                describeInstanceStatus: () => {}
            }
        };

        spyOn(console, "log");

    });

    it("should export a function that retrieves a listing of instances statuses", function (done) {

        let promisifySpy = jasmine.createSpy().and.returnValue(() => true);
        let reverse = describeInstances.__set__("promisify", promisifySpy);

        describeInstances(configMock).then(() => {
            expect(promisifySpy).toHaveBeenCalled();
            done();
        });

        reverse();
    });

    it("should export a function that throws an error if describe instance status fails", function(done) {

        let error = {
            name: 'Error',
            message: 'AWS describeInstanceStatus error'
        };

        let fn = () => () => {
            throw error;
        };

        let reverse = describeInstances.__set__("promisify", fn);

        describeInstances(configMock).catch((err) => {
            expect(err).toEqual(error);
            done();
        });

    });

   
});

