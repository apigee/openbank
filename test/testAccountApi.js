const mocha = require('mocha');
const assert = require('chai').assert;
const expect = require('chai').expect;
const request = require('request');

const config = require('./config.js')

    var access_token;

describe('Bank API Tests', function() {
  before('should get a client credentials token', function(done) {
    var options = {
      uri: config.hostUrl + '/apis/v1/oauth/token',
      auth: {user: config.clientId, pass: config.clientSecret},
      form: {grant_type: 'client_credentials'},
      json: true
    };

    console.log(JSON.stringify(options, null, 2));

    request.post(options, function(err, res, body) {
      if (err) console.log(err);
      if (res) console.log(res.statusCode);
      if (body) console.log(body);

      expect(err).to.not.exist;
      expect(body).to.exist;
      expect(body).to.have.property('access_token');

      access_token = body.access_token;
      done();
    });
  });

  it('should get account information', function(done) {

  });

  it('should get account balance', function(done) {

  });

  it('should make a payment', function(done) {

  });

});
