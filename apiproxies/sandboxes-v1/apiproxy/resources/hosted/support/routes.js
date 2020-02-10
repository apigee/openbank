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
const {
  urlencoded
} = require('express')
const body = urlencoded({
  extended: false
})

module.exports = (app, provider) => {

  //check that the application is up
  app.get('/mock-idp/ping', (req, res) => {
    res.render('pages/ping')
  })

  //get login page
  app.get('/mock-idp/interaction/:grant', async (req, res, next) => {
    try {
      const details = await provider.interactionDetails(req)

      //validate that some consent id is provided
      console.log(JSON.stringify(details)) 

      return res.render('pages/login', {
        details
      })
    } catch (err) {
      return next(err)
    }
  })



  //submit login
  app.post('/mock-idp/interaction/:grant/login', body, async (req, res, next) => {
    res.set('Pragma', 'no-cache')
    res.set('Cache-Control', 'no-cache, no-store')
    try {

      const result = {
        account: 'username'
      }
      await provider.setProviderSession(req, res, result)
      res.status(302).set({
        Location: '/mock-idp/interaction/' + req.params.grant + '/consent'
      }).send()
    } catch (err) {
      next(err)
    }
  })

  //get consent
  app.get('/mock-idp/interaction/:grant/consent', body, async (req, res, next) => {
    try {
      const details = await provider.interactionDetails(req)
      return res.render('pages/consent', {
        details,
      })
    } catch (err) {
      return next(err)
    }
  })

  //submit consent
  app.post('/mock-idp/interaction/:grant/consent', body, async (req, res, next) => {
    res.set('Pragma', 'no-cache')
    res.set('Cache-Control', 'no-cache, no-store')
    try {
      const result = {
        login: {
          account: 'username',
          acr: 'urn:mace:incommon:iap:bronze',
          amr: ['pwd'],
          remember: false,
          ts: Math.floor(Date.now() / 1000),
        },
      }
      if (req.body.consent) result.consent = {}

      const redirectTo = await provider.interactionResult(req, res, result)
      const redirectToRelative = redirectTo.replace(/http(s?):\/\/(.*):(\d{4})/g, '')
      res.status(302).set({
        Location: redirectToRelative
      }).send()
    } catch (err) {
      next(err)
    }
  })
}
