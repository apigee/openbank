/**                                                                             
  Copyright 2020 Google LLC                                                     
                                                                                
  Licensed under the Apache License, Version 2.0 (the 'License');               
  you may not use this file except in compliance with the License.              
  You may obtain a copy of the License at                                       
                                                                                
      https://www.apache.org/licenses/LICENSE-2.0                               
                                                                                
  Unless required by applicable law or agreed to in writing, software           
  distributed under the License is distributed on an 'AS IS' BASIS,             
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.      
  See the License for the specific language governing permissions and           
  limitations under the License.                                                
                                                                                
*/

/* eslint no-console:off */
const express = require('express')
const http = require('http')
const path = require('path')
const fs = require('fs')
const swaggerTools = require('swagger-tools')
const async = require('async')
const Provider = require('oidc-provider')
const configuration = require('./support/config')
const routes = require('./support/routes')
const clients = require('./support/clients')

const app = express()
const serverPort = process.env.PORT || 9000
const specDir = './specs/'
const specs = fs.readdirSync(specDir)


const oidc = new Provider('https://localhost:9000/', configuration)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static('public'))

const initializeSandbox = (spec, cb) => {
  const basepath = '/' + path.parse(spec).name + '/'
  swaggerTools.initializeMiddleware(require(specDir + spec), function(middleware) {
    app.use(basepath, middleware.swaggerMetadata())
    app.use(basepath, middleware.swaggerValidator())
    app.use(basepath, middleware.swaggerRouter({
      useStubs: true
    }))
    cb(null)
  })
}

const initializeIdentity = (cb) => {
  oidc.initialize({
      clients: clients
    })
    .then(() => {
      console.log(oidc)
      routes(app, oidc)
      app.use('/mock-idp/', oidc.callback)
      app.enable('trust proxy')
      oidc.proxy = true

      cb(null)
    })
}

const functions = specs.map((spec => (cb) => initializeSandbox(spec, cb)))
functions.push(initializeIdentity)

async.waterfall(functions,
  (err) => {
    if (err) {
      console.log(err)
    } else {
      http.createServer(app).listen(serverPort)
      console.log('Run server on port: ' + serverPort)
    }
  }
)
