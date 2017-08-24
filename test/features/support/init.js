/**
 * Created by rmahalank on 8/22/17.
 */
/*jslint node: true */
'use strict';
var apickli = require('apickli');

// Configuration
var config = require("../../config.json");

module.exports = function () {
    // cleanup before every scenario
    this.Before(function () {
        this.apickli = new apickli.Apickli('http', config.edgeBasePath);
        this.apickli.addRequestHeader('Cache-Control', 'no-cache');
        this.apickli.setGlobalVariable('TPPAppClientId', config.TPPAppClientId);
        this.apickli.setGlobalVariable('internalAppKey', config.internalAppKey);
        //callback();
    });
}
