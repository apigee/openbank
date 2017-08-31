/*jslint node: true */
'use strict';
var apickli = require('apickli');
var jwt = require('jsonwebtoken');
var fs = require('fs-extra');
var cert = fs.readFileSync(process.cwd() + '/testtpp_jwt.pem');
function getClientAssertion(clientId) {
    var token_payment = jwt.sign({
        "iss": clientId,
        "exp": 1546300800,
        "iat": 1502966900
    }, cert, {"algorithm": "RS256"});

    return token_payment;
}

module.exports = function () {

    this.Given(/^Tpp obtains accesstoken for accounts claim and store in global scope$/, function (callback) {

        this.apickli.setRequestBody('{         "ClientId": "' + this.apickli.getGlobalVariable("TPPAppClientId") + '", "ResponseType": "code id_token",         "ResponseTypeToken": "true",         "ResponseTypeCode": "false",         "ResponseTypeIdToken": "false",         "Scope": "openid accounts",         "Type": "accounts",         "RedirectUri": "http://localhost/",         "RequestId": "1001",         "RequestState": "af0ifjsldkj",         "ApplicationName": "AISP_App_v2",                  "CustomerId": "10203040",         "Nonce": "n-0S6_WzA2Mj",         "TppId": "12345"     }');
        this.apickli.setRequestHeader('x-apikey', this.apickli.getGlobalVariable("internalAppKey"));
        this.apickli.setRequestHeader('Content-Type', 'application/json');
        var othis = this;
        this.apickli.post('/apis/v2/oauth/authorized', function (error, response) {
            if (!error && response.statusCode == 200) {
                var accesstoken = JSON.parse(response.body).application_tx_response.split('&')[1];
                accesstoken = accesstoken.split('=')[1];
                othis.apickli.setGlobalVariable('accesstoken', accesstoken)
                callback();
            }
            else {
                callback(new Error(error));
            }
        });
    });
    this.Given(/^TPP sets the request headers$/, function (headers, callback) {
        this.apickli.setHeaders(headers.hashes());
        callback();
    });
    this.When(/^the TPP makes the GET (.*)$/, function (resource, callback) {
        this.apickli.get(resource, function (error, response) {
            if (error) {
                callback(new Error(error));
            }
            callback();
        });
    });

    this.Given(/^TPP obtains the oauth accesstoken\-client credentials with accounts scope and store in global scope$/, function (callback) {
        this.apickli.setRequestBody('grant_type=client_credentials&scope=accounts&client_assertion=' + getClientAssertion(this.apickli.getGlobalVariable("TPPAppClientId")));
        this.apickli.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        var othis = this;
        this.apickli.post('/apis/v2/oauth/token', function (error, response) {
            if (!error && response.statusCode == 200) {
                var accesstoken = JSON.parse(response.body).access_token;
                othis.apickli.setGlobalVariable('accesstoken_cc', accesstoken);
                callback();
            }
            else {
                callback(new Error(error));
            }
        });
    });

    this.Given(/^TPP obtains the oauth accesstoken\-client credentials with invalid scope and store in global scope$/, function (callback) {
        this.apickli.setRequestBody('grant_type=client_credentials&scope=openid&client_assertion=' + getClientAssertion(this.apickli.getGlobalVariable("TPPAppClientId")));
        this.apickli.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        var othis = this;
        this.apickli.post('/apis/v2/oauth/token', function (error, response) {
            if (!error && response.statusCode == 200) {
                var accesstoken = JSON.parse(response.body).access_token;
                othis.apickli.setGlobalVariable('accesstoken_cc_invalid', accesstoken);
                callback();
            }
            else {
                callback(new Error(error));
            }
        });
    });

    this.When(/^the TPP makes the DELETE (.*)$/, function (resource, callback) {
        this.apickli.delete(resource, function (error, response) {
            if (error) {
                callback(new Error(error));
            }

            callback();
        });
    });

    this.When(/^the TPP makes the POST (.*)$/, function (resource, callback) {
        this.apickli.post(resource, function (error, response) {
            if (error) {
                callback(new Error(error));
            }

            callback();
        });
    });

    this.Given(/^TPP obtains the oauth accesstoken for account with no associated data and store in global scope$/, function (callback) {
        //TODO:set ClientId , RequestId ApplicationId , ApplicationName , CustomerId , TppId
        this.apickli.setRequestBody('{         "ClientId": "' + this.apickli.getGlobalVariable("TPPAppClientId") + '", "ResponseType": "code id_token",         "ResponseTypeToken": "true",         "ResponseTypeCode": "false",         "ResponseTypeIdToken": "false",         "Scope": "openid accounts",         "Type": "accounts",         "RedirectUri": "http://localhost/",         "RequestId": "1002",         "RequestState": "af0ifjsldkj",         "ApplicationName": "AISP_App_v2",                  "CustomerId": "10203040",         "Nonce": "n-0S6_WzA2Mj",         "TppId": "12345"     }');
        //TODO:set internal consent key
        this.apickli.setRequestHeader('x-apikey', this.apickli.getGlobalVariable("internalAppKey"));
        this.apickli.setRequestHeader('Content-Type', 'application/json');
        var othis = this;
        this.apickli.post('/apis/v2/oauth/authorized', function (error, response) {
            if (!error && response.statusCode == 200) {
                var accesstoken = JSON.parse(response.body).application_tx_response.split('&')[1];
                accesstoken = accesstoken.split('=')[1];
                othis.apickli.setGlobalVariable('accesstoken_emptyaccount', accesstoken);
                callback();
            }
            else {
                callback(new Error(error));
            }
        });
    });
    this.Then(/^the response body should be empty$/, function (callback) {
        if (this.apickli.getResponseObject().body == '{}') {
            callback();
        }
        else {
            callback(new Error('response body not empty'));
        }
    });
    this.Given(/^TPP obtains the oauth accesstoken for accountRequest with with permissions ReadAccountsDetail and store in global scope$/, function (callback) {
        //TODO:set ClientId , RequestId ApplicationId , ApplicationName , CustomerId , TppId
        this.apickli.setRequestBody('{         "ClientId": "' + this.apickli.getGlobalVariable("TPPAppClientId") + '", "ResponseType": "code id_token",         "ResponseTypeToken": "true",         "ResponseTypeCode": "false",         "ResponseTypeIdToken": "false",         "Scope": "openid accounts",         "Type": "accounts",         "RedirectUri": "http://localhost/",         "RequestId": "1003",         "RequestState": "af0ifjsldkj",         "ApplicationName": "AISP_App_v2",                  "CustomerId": "10203040",         "Nonce": "n-0S6_WzA2Mj",         "TppId": "12345"     }');
        //TODO:set internal consent key
        this.apickli.setRequestHeader('x-apikey', this.apickli.getGlobalVariable("internalAppKey"));
        this.apickli.setRequestHeader('Content-Type', 'application/json');
        var othis = this;
        this.apickli.post('/apis/v2/oauth/authorized', function (error, response) {
            if (!error && response.statusCode == 200) {
                var accesstoken = JSON.parse(response.body).application_tx_response.split('&')[1];
                accesstoken = accesstoken.split('=')[1];
                othis.apickli.setGlobalVariable('accesstoken_ReadAccountsDetailPermission', accesstoken);
                callback();
            }
            else {
                callback(new Error(error));
            }
        });
    });
    this.Given(/^TPP obtains the oauth accesstoken for accountRequest with with permissions ReadBalances and store in global scope$/, function (callback) {
        //TODO:set ClientId , RequestId ApplicationId , ApplicationName , CustomerId , TppId
        this.apickli.setRequestBody('{         "ClientId": "' + this.apickli.getGlobalVariable("TPPAppClientId") + '", "ResponseType": "code id_token",         "ResponseTypeToken": "true",         "ResponseTypeCode": "false",         "ResponseTypeIdToken": "false",         "Scope": "openid accounts",         "Type": "accounts",         "RedirectUri": "http://localhost/",         "RequestId": "1004",         "RequestState": "af0ifjsldkj",         "ApplicationName": "AISP_App_v2",                  "CustomerId": "10203040",         "Nonce": "n-0S6_WzA2Mj",         "TppId": "12345"     }');
        //TODO:set internal consent key
        this.apickli.setRequestHeader('x-apikey', this.apickli.getGlobalVariable("internalAppKey"));
        this.apickli.setRequestHeader('Content-Type', 'application/json');
        var othis = this;
        this.apickli.post('/apis/v2/oauth/authorized', function (error, response) {
            if (!error && response.statusCode == 200) {
                var accesstoken = JSON.parse(response.body).application_tx_response.split('&')[1];
                accesstoken = accesstoken.split('=')[1];
                othis.apickli.setGlobalVariable('accesstoken_ReadBalancesPermission', accesstoken);
                callback();
            }
            else {
                callback(new Error(error));
            }
        });
    });
    this.Given(/^TPP set body to (.*)$/, function (bodyValue, callback) {
        this.apickli.setRequestBody(bodyValue);
        callback();
    });

    this.Given(/^TPP obtains the account request JWS token and store in global scope$/, function (callback) {
        var othis = this;
        othis.apickli.setGlobalVariable('account_request_jws', "eyJhbGciOiJSUzI1NiIsImtpZCI6IjkwMjEwQUJBRCIsImI2NCI6ZmFsc2UsImh0dHA6Ly9vcGVuYmFua2luZy5vcmcudWsvaWF0IjoiMjAxNy0wNi0xMlQyMDowNTo1MCswMDowMCIsImh0dHA6Ly9vcGVuYmFua2luZy5vcmcudWsvaXNzIjoiQz1VSywgU1Q9RW5nbGFuZCwgTD1Mb25kb24sIE89QWNtZSBMdGQuIiwiY3JpdCI6WyJiNjQiLCJodHRwOi8vb3BlbmJhbmtpbmcub3JnLnVrL2lhdCIsImh0dHA6Ly9vcGVuYmFua2luZy5vcmcudWsvaXNzIl19..ZXlKaGJHY2lPaUpTVXpJMU5pSXNJbXRwWkNJNklqa3dNakV3UVVKQlJDSXNJbUkyTkNJNlptRnNjMlVzSW1oMGRIQTZMeTl2Y0dWdVltRnVhMmx1Wnk1dmNtY3VkV3N2YVdGMElqb2lNakF4Tnkwd05pMHhNbFF5TURvd05UbzFNQ3N3TURvd01DSXNJbWgwZEhBNkx5OXZjR1Z1WW1GdWEybHVaeTV2Y21jdWRXc3ZhWE56SWpvaVF6MVZTeXdnVTFROVJXNW5iR0Z1WkN3Z1REMU1iMjVrYjI0c0lFODlRV050WlNCTWRHUXVJaXdpWTNKcGRDSTZXeUppTmpRaUxDSm9kSFJ3T2k4dmIzQmxibUpoYm10cGJtY3ViM0puTG5WckwybGhkQ0lzSW1oMGRIQTZMeTl2Y0dWdVltRnVhMmx1Wnk1dmNtY3VkV3N2YVhOeklsMTkuWlhsS2FHSkhZMmxQYVVwVFZYcEpNVTVwU1hOSmJYUndXa05KTmtscWEzZE5ha1YzVVZWS1FsSkRTWE5KYlVreVRrTkpObHB0Um5Oak1sVnpTVzFvTUdSSVFUWk1lVGwyWTBkV2RWbHRSblZoTW14MVduazFkbU50WTNWa1YzTjJZVmRHTUVscWIybE5ha0Y0VG5rd2QwNXBNSGhOYkZGNVRVUnZkMDVVYnpGTlEzTjNUVVJ2ZDAxRFNYTkpiV2d3WkVoQk5reDVPWFpqUjFaMVdXMUdkV0V5YkhWYWVUVjJZMjFqZFdSWGMzWmhXRTU2U1dwdmFWRjZNVlpUZVhkblZURlJPVkpYTlc1aVIwWjFXa04zWjFSRU1VMWlNalZyWWpJMGMwbEZPRGxSVjA1MFdsTkNUV1JIVVhWSmFYZHBXVE5LY0dSRFNUWlhlVXBwVG1wUmFVeERTbTlrU0ZKM1QyazRkbUl6UW14aWJVcG9ZbTEwY0dKdFkzVmlNMHB1VEc1V2Nrd3liR2hrUTBselNXMW9NR1JJUVRaTWVUbDJZMGRXZFZsdFJuVmhNbXgxV25rMWRtTnRZM1ZrVjNOMllWaE9la2xzTVRrdVpYbEtSVmxZVW1oSmFuQTNTV3hDYkdOdE1YQmpNMDV3WWpJMWVrbHFjR0pKYkVwc1dWZFNRbGt5VG5aa1Z6VXdZekJTYkdSSFJuQmlRMGx6U1d4S2JGbFhVa05aVjNob1ltMU9iR041U1hOSmJFcHNXVmRTUTFwWE5XeGFiV3hxWVZkR2VXRlhWbnBTUjFZd1dWZHNjMGxwZDJsVmJWWm9Xa1ZTY0dOdFZtcGtSVkpzV1cxc01HTjVTWE5KYkVwc1dWZFNVV050T1d0a1YwNHdZM2xKYzBsc1NteFpWMUpVWkVkR2RWcEhiSFZhTURsNVdrZFdlV013VW14a1IwWndZa05KYzBsc1NteFpWMUpWWTIxR2RXTXlSbXBrUjJ4MlltNU9SR050Vm10aFdGSjZTV2wzYVZWdFZtaGFSbEo1V1ZjMWVsbFhUakJoVnpsMVl6QlNiRmx0YkRCamVVbHpTV3hLYkZsWFVsVmpiVVoxWXpKR2FtUkhiSFppYms1RldsaFNhR0ZYZDJsWVUzZHBVbGhvZDJGWVNtaGtSMngyWW10U2FHUkhWbFZoVnpGc1NXcHZhVTFxUVhsT1V6QjNUME13ZDAxc1VYZE5SRzkzVFVSdmQwMURNSGROUkc5M1RVTkpjMGxzVW5sWlZ6VjZXVmRPTUdGWE9YVlNia3AyWWxWU2FHUkhWbFZoVnpGc1NXcHZhVTFxUVhoTmFUQjNUbE13ZDAweFVYZE5SRzkzVFVSdmQwMURNSGROUkc5M1RVTkpjMGxzVW5sWlZ6VjZXVmRPTUdGWE9YVldSemxGV1ZoU2JGWkhiSFJhVTBrMlNXcEpkMDFxVlhSTlJGVjBUVVJvVlUxRVFUWk5SRUUyVFVSQmRFMUVRVFpOUkVGcFpsTjNhVlZ0YkhwaGVVazJaVE14T1EuSWtCSENzSmxUTDRpT0tZblQ5RzRab211R21iZmpjUHFGQUttYjU4cnBrMnZSRElFTFE1RjFnOU9NOGlZYl8yRVdsLVZTQ1Q5UmVEV3R5REJtLUN4bzBwMlptRmZtTnRhRXM2T05TamZDaXptdDBtTGVRczAtRVJRSlp1UUZMaGdKMGZWZzFLYWJwSmF3VFNlLW9GcVBVOG4tajA1R1BxdXdLeTRhSE9GLTJQYVFFbHAxU3RhYmhYT3lTU3NkYTZJU3RvTFBKaXpUdVV4N3VLN0tHTGRXblhZaTdZa0RpcUlFN2RkM0l4UUN5MDh2SmUwMk9Qc1c0VDNEdWhYLVdCc0hIdDkzMURCa3FtbGN6VTdUSHEyRXJZZ1hxa1d6SFpRaHl3dWhJX0NYaFVOX0Z2RzhjZk5Sd1dvYXVsaGFmWGNSUXVMVXZ6MmNQeU1VMHV5WktkV09B");
        callback();
    });
};