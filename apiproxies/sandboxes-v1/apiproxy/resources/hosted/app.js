const app = require('connect')()
const http = require('http')
const path = require('path')
const fs = require('fs')
const swaggerTools = require('swagger-tools')
const serverPort = process.env.PORT || 9000
const async = require('async')
const specDir = './specs/'
const specs = fs.readdirSync(specDir)

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

async.waterfall(specs.map((spec => (cb) => initializeSandbox(spec, cb))),
  (err) => {
    http.createServer(app).listen(serverPort)
    console.log("Run server on port: " + serverPort)
  }
)
