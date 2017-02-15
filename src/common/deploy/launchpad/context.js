/**
 * Created by Muthu on 28/11/16.
 */

var yaml                            = require('js-yaml');
var fs                              = require('fs');
var path                            = require('path');
var mustache                        = require('mustache');

var instance;

function getContext(config, env) {

    if (!instance) {
        instance                    = new context(config, env);
    }
    return instance;
}


function context(config, env) {
    this.variables                  = {};
    this.env                        = env;
    this.config                     = {};
    this.cmdLineVariables           = {};

    //TODO:if object assign as it is; if text, load (find file type and load accordingly) and assign
    if (typeof config === 'string' || config instanceof String ) {
        var configObj               = null;

        try {
            var current_dir         = process.cwd();
            var config_file_path    = path.join(current_dir, config);
            configObj               = yaml.safeLoad(fs.readFileSync(config_file_path, 'utf8'));
        } catch(e) {
            console.log('ERROR reading config file');
        }

        this.config                 = configObj;

    } else {
        this.config                 = config;
    }

    this.getVariable = function (variableName) {
        // variables[variableName] if not found return undefined
        if (!variableName) return undefined;
        var vName = variableName.replace("$","").replace("\'","");

        return this.variables[vName];
    }

    this.setVariable = function(name, value) {
        this.variables[name]             = value;
    }

    this.cleanVariables = function(name, value) {
        this.variables                   = {}
    }

    this.getAllVariables = function(){
        return this.variables
    }

    this.loadCmdLineVariables = function (){
        var cmd_variables = this.cmdLineVariables

        for (var i=0; i<Object.keys(cmd_variables).length; i++) {
            this.setVariable(Object.keys(cmd_variables)[i], cmd_variables[Object.keys(cmd_variables)[i]])
        }
    }
    this.loadOrgDetail = function (resourceName) {
        var config                  = this.getConfig(resourceName)
        var orgDetails
        if(config)
            orgDetails              = config.properties.edgeOrg
        else {
            console.log('ERROR retrieving config, check parameters')
            return
        }
        if(orgDetails && orgDetails.org)
            this.setVariable('org', mustache.render(orgDetails.org, this.getAllVariables()))

        if(orgDetails && orgDetails.env)
            this.setVariable('env', mustache.render(orgDetails.env, this.getAllVariables()))

        if(orgDetails && orgDetails.token)
            this.setVariable('token', mustache.render(orgDetails.token, this.getAllVariables()))

        if(orgDetails && orgDetails.username)
            this.setVariable('username', mustache.render(orgDetails.username, this.getAllVariables()))

        if(orgDetails && orgDetails.password)
            this.setVariable('password', mustache.render(orgDetails.password, this.getAllVariables()))

    }

    this.loadConfiguration = function (resourceName) {
        var config                  = this.getConfig(resourceName)
        var configurations          = config.properties.configurations

        for(var i=0; i<configurations.length; i++){
            if(configurations[i].env == this.getEnvironment()){
                var keys            = Object.keys(configurations[i])
                for(var j=0; j<keys.length; j++){
                    this.setVariable(keys[j], mustache.render(configurations[i][keys[j]], this.getAllVariables()))
                }
            }
        }
    }

    this.getConfig = function (resourceName, subResourceName) {
        var config = this.config['resources'];

        if (subResourceName) {
            for(var i=0; i<config.length; i++){
                if(config[i].name == resourceName) {
                    for(var j=0; j<config[i].properties.subResources.length; j++){
                        if(config[i].properties.subResources[j].name == subResourceName) {
                            return config[i].properties.subResources[j];
                        }
                    }
                }
            }
        } else if (resourceName) {
            for(var i=0; i<config.length; i++){
                if(config[i].name == resourceName) {
                    return config[i];
                }
            }
        } else {
            return config;
        }
    }

    this.getEnvironment = function() {
        return this.env;
    }

    this.getDeploymentInfo = function () {
        var deploy_info                 = {};

        deploy_info.baseuri             = this.getVariable('edge_host');
        deploy_info.organization        = this.getVariable('org');
        var token                       = this.getVariable('token');
        if(token){
            deploy_info.token               = token;
        } else {
            deploy_info.username            = this.getVariable('username');
            deploy_info.password            = this.getVariable('password');
        }
        deploy_info.environments        = this.getVariable('env').split(',');

        return deploy_info;
    }

    this.getBasePath = function (resourceName) {
        return this.getConfig(resourceName).properties.basePath
    }

    this.setCmdLineVariables = function (args_passed){
        this.cmdLineVariables           = args_passed;
    }
}

exports.getContext = getContext;
