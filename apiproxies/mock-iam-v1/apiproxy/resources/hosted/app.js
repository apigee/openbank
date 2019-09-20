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

/* eslint no-console:off */
const express = require('express')
const Provider = require('oidc-provider')
const configuration = require('./support/config')
const clients = require('./support/clients')
const routes = require('./support/routes')
const path = require('path')
const org = ''
const app = express()
const oidc = new Provider('https://' + org + '-test.apigee.net', configuration)

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static('public'))
Provider.useRequest()

let server

(async () => {
  await oidc.initialize({
    clients
  })
  app.get('/', (req, res) => res.send('Welcome to the Apigee OIDC Mock'))
  routes(app, oidc)
  app.use(oidc.callback)
  app.enable('trust proxy')
  oidc.proxy = true

  server = app.listen(process.env.PORT || 9000, function() {
    console.log('Listening on port %d', server.address().port)
  })

})().catch((err) => {
  if (server && server.listening) server.close()
  console.error(err)
})
