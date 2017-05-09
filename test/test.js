const mocha = require('mocha');
const expect = require('chai').expect;
const request = require('request');

const config = require('./config.js')

var access_token;

describe('Bank API Tests', function () {
    before('should get a client credentials token', function (done) {
        var options = {
            uri: config.hostUrl + '/apis/v1/oauth/token',
            auth: {user: config.clientId_AISP, pass: config.clientSecret_AISP},
            form: {grant_type: 'client_credentials'},
            json: true
        };

        request.post(options, function (err, res, body) {
            // if (err) console.log(err);
            // if (res) console.log(res.statusCode);
            // if (body) console.log(body);

            expect(err).to.not.exist;
            expect(body).to.exist;
            expect(body).to.have.property('access_token');

            access_token = body.access_token;
            done();
        });
    });

    it('should get account information', function (done) {
        var options = {
            uri: config.hostUrl + '/apis/v1/accounts/' + config.accountId + '/info',
            auth: {bearer: access_token},
            json: true
        };

        request(options, function (err, res, body) {
            // if (err) console.log(err);
            // if (res) console.log(res.statusCode);
            // if (body) console.log(body);

            expect(err).to.not.exist;
            expect(body).to.exist;
            expect(body).to.have.property('account_number');
            expect(body.account_number).to.equal(config.accountId);
            expect(body).to.not.have.property('balance');

            done();
        });
    });

    it('should get account balance', function (done) {
        var options = {
            uri: config.hostUrl + '/apis/v1/accounts/' + config.accountId + '/balance',
            auth: {bearer: access_token},
            json: true
        };

        request(options, function (err, res, body) {
            // if (err) console.log(err);
            // if (res) console.log(res.statusCode);
            // if (body) console.log(body);

            expect(err).to.not.exist;
            expect(body).to.exist;
            expect(body).to.have.property('account_number');
            expect(body.account_number).to.equal(config.accountId);
            expect(body).to.have.property('balance');

            done();
        });
    });

    it('should make a payment', function (done) {
        this.timeout(10000);

        const jwt = require('jsonwebtoken');
        var payload = {
            'iss': 'https://openbank.apigee.com',
            'aud': 'https://apis-bank-dev.apigee.net',
            'response_type': 'token',
            'client_id': config.clientId_PISP,
            'redirect_uri': 'http://localhost/',
            'scope': 'openid accounts payment',
            'state': 'af0ifjsldkj',
            'acr_values': '2',
            'claims': {
                'paymentinfo': {
                    'type': 'sepa_credit_transfer',
                    'to': {
                        'account_number': '62136000',
                        'remote_bic': 'RBOSGB2109H',
                        'remote_IBAN': 'GB32ESSE40486562136016',
                        'remote_name': 'BigZ online store'
                    },
                    'value': {'currency': 'GBP', 'amount': '200'},
                    'additional': {
                        'subject': 'Online Purchase',
                        'booking_code': '2SFBJ28553',
                        'booking_date': '1462517645809',
                        'value_date': '1462517645809'
                    },
                    'challenge_type': 'SANDBOX_TAN'
                }
            },
            'iat': new Date().getTime()
        };

        var jwt_token = jwt.sign(payload, config.clientSecret_PISP);

        var access_token_PISP;
        var options = {
            uri: config.hostUrl + '/apis/v1/oauth/token',
            auth: {user: config.clientId_PISP, pass: config.clientSecret_PISP},
            form: {grant_type: 'client_credentials'},
            json: true
        };

        request.post(options, function (err, res, body) {
            // if (err) console.log(err);
            // if (res) console.log(res.statusCode);
            // if (body) console.log(body);
            expect(err).to.not.exist;
            expect(body).to.exist;
            expect(body).to.have.property('access_token');

            access_token_PISP = body.access_token;

            var options = {
                uri: config.hostUrl + '/apis/v1/transfers/initiate',
                method: 'POST',
                auth: {bearer: access_token_PISP},
                form: {
                    client_id: config.clientId_PISP,
                    redirect_uri: 'http://localhost/',
                    scope: 'openid accounts payment',
                    'ui-locales': 'en',
                    state: 'af0ifjsldkj',
                    acr_values: 2,
                    request: jwt_token,
                    account_number: config.accountId,
                    customer_id: config.customerId
                },
                json: true
            };

            request(options, function (err, res, body) {
                // if (err) console.log(err);
                // if (res) console.log(res.statusCode);
                // if (body) console.log(body);
                expect(err).to.not.exist;
                expect(body).to.exist;
                expect(body).to.have.property('application_tx_response');
                expect(body.application_tx_response).to.have.string('INITIATED');

                done();
            });
        });
    });

});
