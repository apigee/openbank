/**
 * Created by Muthu on 28/11/16.
 */

var prompt_lib		                = require('prompt');
var manager_builder                 = require('./manager');
var async                           = require('async');
var lib 			= require('./lib');

function baseAdapter () {
    this.adapterContext = {};

    this.doTask = function(taskName,context,resourceName,subResourceName, params, cb) {

        /*
        var rName                           = config.configName;
        if (!this.adapterContext[rName]) {
            this.adapterContext[rName]      = {};
        }

        if (!this.adapterContext[rName].initialized) {
            this.prompt(context,config);
            this.adapterContext[rName].initialized = true;
        }
        */

        //TODO: check the taskName and call appropriate function

        switch (taskName.toUpperCase()) {
            case 'CLEAN' : this.clean (context, resourceName, subResourceName, params, function (err, result) {
                cb(err, result)
            }); break;
            case 'BUILD' : this.build (context, resourceName, subResourceName, params, function (err, result) {
                cb(err, result)
            }); break;
            case 'DEPLOY': this.deploy(context, resourceName, subResourceName, params, function (err, result) {
                cb(err, result)
            }); break;
            case 'PROMPT': this.prompt(context, resourceName, subResourceName, params, function (err, result) {
                cb(err, result)
            }); break;
        }

    },


    //do the same activity for all subresources/resources; don't override
    this.gotoSubResources = function(taskName, context, resourceName, subResourceName, params, cb) {
        var manager                         = manager_builder.getManager();

        console.log('climbing down the tree ... ')

        var config                          = context.getConfig(resourceName);

        var resourceType                    = config.type;

        if (!config) return;

        var subResources;

        if(taskName.toUpperCase() != 'CLEAN'){
            subResources                        = config.properties.subResources;
        } else {
            subResources                        = config.properties.subResources;
            subResources.reverse();
        }

        if (subResources && subResources.length > 0) {
            console.log('deploying all subresources')
            // TODO async or promise


            async.eachSeries(subResources,
                function (subResource, callback) {
                    var subResourceType         = subResource.type;
                    var subResourceName         = subResource.name;

                    var adapter                 = manager.getAdapter(resourceType, subResourceType);

                    adapter.doTask(taskName, context, resourceName, subResourceName, params, function (err, result) {
                        if(!err) {
                           callback()
                       } else {
                           callback(err)
                       }
                    });
                },

                function (err) {
                    if(taskName.toUpperCase() == 'CLEAN'){
                        subResources.reverse();
                    }

                    if(!err) {
                        cb()
                    } else {
                        lib.print('ERROR',err);
                        cb(err)
                    }

                }
            );



            //use promise - synchronous invocation
            //loop through subresources
            //for each sub-resource get its adapter based on the resource & subResource type
            //config.configName = getName(resourceName, subResourceName);
            //call doTask on the subresource adapter with the subresource config. (set resourceType and resourceName attributes for the subresource config before passing, when getConfig() is not used
            //if there is an error then log the error (getLog().logErrorStatus(config, error))

        }
    },


    this.clean = function(context, resourceName, subResourceName, params, cb) {
        console.log('base clean');
        this.gotoSubResources();
    },

    this.build = function(context, resourceName, subResourceName, params, cb) {
        console.log('base build');
        this.gotoSubResources();
    },

    this.deploy = function(context, resourceName, subResourceName, params, cb) {
        console.log('base deploy');
        this.gotoSubResources();
    },

    this.isAsynchable = function() {
        return false;
    }

    this.prompt = function(context, resourceName, subResourceName, params, cb) {
        var config = context.getConfig(resourceName);
        if (config.properties.inputs && config.properties.inputs.length > 0) {
            var inputs = config.properties.inputs;

            var required_values = [];

            for(var i=0; i<inputs.length; i++){
                if(!context.getVariable(inputs[i].name) && !context.getVariable(inputs[i].ifNotPresent)) {
                    required_values.push({name: inputs[i].name, description: inputs[i].prompt, type: 'string'});
                }
            }

            prompt_lib.start();

            prompt_lib.get(required_values, function(err, results) {
                var keys = Object.keys(results)
                for(var i=0; i<keys.length; i++){
                    context.setVariable(keys[i], results[keys[i]])
                }
                cb(err, results);
            });
        }

        //check is there inputParams for the specific config
        //check whether all inputParams are found in context.getVariable(); if not prompt and store the input value in the variables (setVariable())

    }
}

exports.baseAdapter 			= new baseAdapter();