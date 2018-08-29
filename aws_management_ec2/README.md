# aws_management_ec2
> B9 AWS EC2 Management service

An AWS Lambda to stop all running Amazon Elastic Compute Cloud (Amazon EC2) instances.

## Installing / Getting started

```shell
$ node-lambda run
```

## Developing

### Built With
The project is constructed around Node and requires the [aws-sdk](https://www.npmjs.com/package/aws-sdk) to run.

The project uses jasmine, JSDOC, and gulp as dev dependencies.

### Setting up Dev
1. Install the dependencies:
```shell
$ npm install
$ npm install -g node-lambda
```

2. run:
```shell
$ node-lambda run
```

### Getting the Doc

```shell
gulp doc
```

The above command will generate the documentation for the project in a folder called docs.

## Versioning

- 1.0.0 Creation of the Lambda

## Configuration

For this Lambda to run, the .env file requires the following keys:

- ```AWS_ACCESS_KEY_ID``` AWS Access Key ID of the user which has permission to describe and stop running EC2 instances
- ```AWS_SECRET_ACCESS_KEY``` AWS Secret Access Key of the user which has permission to describe and stop running EC2 instances.


## Tests

#### Unit test:
Unit tests are written with jasmine. You can launch them using:

```shell
$ gulp test
```

Travis will undertake building the project every time a commit(s) are pushed onto the master and production branch.

### Deploy

Deployment is automatically undertaken by Travis when new commits are pushed to the production branch.

## Style guide

The main code of the Lambda is in the file index.js, located at the root of the project folder. The handler function calls the functions underneath that each return a promise. This allows chaining the function calls and proceeding through the logic of the Lambda step by step.
