/*
 Copyright 2017 Google Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 https://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

/**
 * @file
 * PathVerification.js
 * Script is used for path verification
 */
var proxyPathSuffix = context.getVariable('proxy.pathsuffix');
var veb = context.getVariable("request.verb");
var pathlist = ['accounts', 'balances', 'transactions', 'beneficiaries', 'standing-orders', 'direct-debits', 'product'];

proxyPathSuffix = proxyPathSuffix.split("/");
var doValidation = false;
print(proxyPathSuffix);
if (proxyPathSuffix.length >= 2) {
    if (pathlist.indexOf(proxyPathSuffix[1]) >= 0 || pathlist.indexOf(proxyPathSuffix[3]) >= 0) {
        doValidation = true;

    }
}
context.setVariable("doValidation", doValidation);