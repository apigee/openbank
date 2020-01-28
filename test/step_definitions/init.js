/**                                                                             
  Copyright 2019 Google LLC                                                     
                                                                                
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
const apickli = require('apickli')
const {
  Before,
  Given,
  setDefaultTimeout
} = require('cucumber')
const fs = require('fs')
const org = process.env.APIGEE_ORG
const env = process.env.APIGEE_ENV

Before(function() {
  this.apickli = new apickli.Apickli('https',
    org + '-' + env + '.apigee.net')
  this.apickli.fixturesDirectory = './test/fixtures'
  this.apickli.scenarioVariables.clientId = 'e05d0e1a-cd9d-4724-a5a2-448d74faee3c'
  this.apickli.scenarioVariables.clientSecret = 'WqMUPysCvhzZyCSX7lI0gjRQdCV4LD50KR62SrG3450od4ozFBOteeVuXYYr8lK7'
})

Given('I provide a valid eidas cert', function(cb) {
  fs.readFile(this.apickli.fixturesDirectory + '/eidasCert.txt',
    (err, data) => {
      cb(this.apickli.addRequestHeader('SSL-CLIENT-CERT', data))
    })
})

setDefaultTimeout(60 * 1000)
