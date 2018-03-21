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

var gulp = require('gulp');
var cucumber = require('gulp-cucumber');
var eslint = require('gulp-eslint');
var prompt_lib      = require('prompt');
var gulpSequence = require('gulp-sequence')
var mustache        = require('mustache');
var path            = require('path');
var fs              = require('fs-extra');
var request         = require('request');
const Datastore = require('@google-cloud/datastore');



gulp.task('lint', function() {

    return gulp.src(['./src/**/*.js', '!**/node_modules/**', '!**/target/**','!**/public/js/**', '!**/devportal/**', '!**/jsrsasign-all-min.js', '!**/ValidateRequest.js'])
        .pipe(eslint({
            fix: true
        }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});


gulp.task('startdeploy', function( cb) {



    var switch_opdk = [];
    switch_opdk.push({name: 'hasdatastore', description: 'Do you have cloud datastore instance? Enter - true/false' ,type: 'boolean', required: true});

    prompt_lib.get(switch_opdk, function(err, results) {
        if(results['hasdatastore']){
            var required_values = [];
            required_values.push({name: 'datastoreProject', description: 'Enter the cloud datastore project name', type: 'string', required: true});
            required_values.push({name: 'serviceaccount_Private_Key', description: 'Enter the service account private key', type: 'string', required: true});
            required_values.push({name: 'token_uri', description: 'Enter the token uri of the service account', type: 'string', required: true});
            required_values.push({name: 'client_email', description: 'Enter the client email of the service account', type: 'string', required: true});
            required_values.push({name: 'bankPrivateKey', description: 'Enter the complete path of banks private key', type: 'string', required: true});
            required_values.push({name: 'bankPublicKey', description: 'Enter the complete path of banks public key', type: 'string', required: true});
            required_values.push({name: 'tppPrivateKey', description: 'Enter the complete path of tpp private key', type: 'string', required: true});
            required_values.push({name: 'tppPublicKey', description: 'Enter the complete path of tpp public key', type: 'string', required: true});
            
            prompt_lib.start();

            prompt_lib.get(required_values, function(err, results) {

                UploadDataDatastore(results, function(){

                    results.hasdatastore = true;
                    post_prompt(err, results, function( callback)
                    {

                        require('edge-launchpad')(gulp);

                        cb();
                    });

                });

                
            });
        } else {
            
                var required_values = [];
                

                required_values.push({name: 'bankPrivateKey', description: 'Enter the complete path of banks private key', type: 'string', required: true});
                required_values.push({name: 'bankPublicKey', description: 'Enter the complete path of banks public key', type: 'string', required: true});
                required_values.push({name: 'tppPrivateKey', description: 'Enter the complete path of tpp private key', type: 'string', required: true});
                required_values.push({name: 'tppPublicKey', description: 'Enter the complete path of tpp public key', type: 'string', required: true});

                prompt_lib.start();

            prompt_lib.get(required_values, function(err, results) {

                    results.hasdatastore = false;
                    results["datastoreProject"] = "projectIdHere";
                    results["serviceaccount_Private_Key"] = "privateKey";
                    results["token_uri"] = "http://tokenUriHere";
                    results["client_email"] = "clientmailhere";
                    post_prompt(err, results, function( callback)
                    {
                        require('edge-launchpad')(gulp);

                        cb();
                    });

                

                
            });
                
            
        }
    });
    
});

gulp.task('test', function() {
    return gulp.src('test/features/*')
        .pipe(cucumber({
            'steps': ['test/features/step_definitions/env.js','test/features/step_definitions/apickli-gherkin.js','test/features/step_definitions/auth+consent.js','test/features/step_definitions/accounts.js','test/features/step_definitions/payments.js'],
            'support': 'test/features/support/*.js',
            'format': 'pretty'
        }));
});



gulp.task('openbankdeploy', function (cb) {
  gulpSequence('startdeploy','deploy', cb);
})

function post_prompt(err, results, cb) {
    var inject_object = {};
    var files_list = ['config.yml.template','test/testbank_jwt.pem.template','test/testbank_jwt_pub.pem.template','test/testtpp_jwt.pem.template','test/testtpp_jwt_pub.pem.template'];
    var paths = [];

    for (var j=0; j<files_list.length; j++) {
        paths.push(path.join(__dirname, files_list[j]))
    }


    if(results["bankPrivateKey"])
    {
        var bankPrivateKey = fs.readFileSync(results.bankPrivateKey, 'utf8');
        results["bankPrivateKey"] = bankPrivateKey;
        results["bankPrivateKeySingleLine"] = bankPrivateKey.split("\n").join("");
    }
    if(results["bankPublicKey"])
    {
        var bankPublicKey = fs.readFileSync(results.bankPublicKey, 'utf8');
        results["bankPublicKey"] = bankPublicKey;
        results["bankPublicKeySingleLine"] = bankPublicKey.split("\n").join("");
    }
    if(results["tppPrivateKey"])
    {
        var tppPrivateKey = fs.readFileSync(results.tppPrivateKey, 'utf8');
        results["tppPrivateKey"] = tppPrivateKey;
        results["tppPrivateKeySingleLine"] = tppPrivateKey.split("\n").join("");
    }
    if(results["tppPublicKey"])
    {
        var tppPublicKey = fs.readFileSync(results.tppPublicKey, 'utf8');
        results["tppPublicKey"] = tppPublicKey;
        results["tppPublicKeySingleLine"] = tppPublicKey.split("\n").join("");
    }
    var keys = Object.keys(results)

    for(var i=0; i<keys.length; i++){
        inject_object[keys[i]] = results[keys[i]]
    }

    if(!results.hasdatastore){
        inject_object.sbconnector = "/connector/v1.0.1/apisbank";
    }
    replace_variables(paths, inject_object, function(callback)
        {
            cb(err,results);
        });
            
       
}



function replace_variables(paths, inject_object, cb) {
    mustache.escape = function (value) {
        return value;
    };

    for(var i=0; i<paths.length; i++){
        var path_to_template = paths[i]

        var data

        try {
            data = fs.readFileSync(path_to_template, 'utf8')
        } catch(e){
            console.log(e);
            cb();
        }

        var mu_template = String(data)

        try {
            var output = mustache.render(mu_template, inject_object)
        } catch(e) {
            console.log(e)
            cb();
        }

        try {
            fs.outputFileSync(path_to_template.split('.').slice(0,2).join('.'), output)
        } catch (e){
            console.log(e)
            cb();
        }

        output = '< yet to copy from original template >'
    }
    cb();
}

function populateDatastore(datastore,data,kind,cb)
{
  //var requestPayload = apigee.getVariable(req, 'request.content');
   var requestPayload = data;
   var tasks = JSON.parse(requestPayload);
   var kind = kind;
   var entities = [];
   var uuid = "";
   for(var i=0; i< tasks.length; i++)
   {
      var obj = {};
      tasks[i].uuid = generateUUID();
      obj.key = datastore.key([kind,tasks[i].uuid]);
      obj.data = tasks[i];
      entities.push(obj);
   }

  datastore.upsert(entities).then(() => {
    // entities inserted successfully.
    cb();
  
  });
}

function UploadDataDatastore(results,cb)
{
    var keyFilename = "service.json";
    var keyFilePath = path.join(__dirname, keyFilename);

    var keyData = fs.readFileSync(keyFilePath, 'utf8');
    var keyDataObj = JSON.parse(keyData);
    keyDataObj.project_id = results["datastoreProject"];
    keyDataObj.private_key = results["serviceaccount_Private_Key"];
    keyDataObj.token_uri = results["token_uri"];
    keyDataObj.client_email = results["client_email"];
    fs.outputFileSync(keyFilePath, JSON.stringify(keyDataObj).split("\\\\n").join("\\n"));

    var datastore = Datastore({
                    projectId: results["datastoreProject"],
                    keyFilename : "./service.json"
                    });

    var dsDataFilesPath = "setup/data";
    dsDataFilesPath = path.join(__dirname, dsDataFilesPath);
    var required_values = [];
    var datafilelist = fs.readdirSync(dsDataFilesPath);

    var index = 0;
    syncLoop(datafilelist.length, function(loop){
                var j = index;
                var filepath = dsDataFilesPath + "/" +datafilelist[j];
                var data = fs.readFileSync(filepath, 'utf8');
                populateDatastore(datastore, data,datafilelist[j].split(".")[0], function()
                {
                    index++;
                    console.log(datafilelist[j].split(".")[0] + " created successfully.");
                    if(index == datafilelist.length)
                    {
                        cb(null);
                    }
                    else
                    {
                        loop.next();
                    }
                });
            
        }, null);
    /*fs.readdirSync(dsDataFilesPath).forEach(file => 
    {
        var filepath = dsDataFilesPath + "/" +file;
        var data = fs.readFileSync(filepath, 'utf8');
        populateDatastore(datastore, data,file.split(".")[0], function()
            {
                console.log(file.split(".")[0] + " created successfully.");
            });
    })*/
}


function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};


function syncLoop(iterations, process, exit){
    var index = 0,
        done = false,
        shouldExit = false;
    var loop = {
        next:function(){
            if(done){
                if(shouldExit && exit){
                    return exit(); // Exit if we're done
                }
            }
            // If we're not finished
            if(index < iterations){
                index++; // Increment our index
                process(loop); // Run our process, pass in the loop
            // Otherwise we're done
            } else {
                done = true; // Make sure we say we're done
                if(exit) exit(); // Call the callback on exit
            }
        },
        iteration:function(){
            return index - 1; // Return the loop number we're on
        },
        break:function(end){
            done = true; // End the loop
            shouldExit = end; // Passing end as true means we still call the exit callback
        }
    };
    loop.next();
    return loop;
}