var lib				= require('../../lib')
var path            = require('path')
var mustache        = require('mustache')

mustache.escape = function (value) {
    return value;
};


var adapter = function () {
    this.clean 			= clean
    this.build 			= build
    this.deploy 		= deploy
}

function build(context, resourceName, subResourceName, params, cb) {
    cb()
}

function deploy(context, resourceName, subResourceName, params, cb) {
    lib.print('meta','deploying config substitution')

    var config          = context.getConfig(resourceName, subResourceName)

    var items           = lib.filter_items(config.items, params)

    var paths           = []
    var inject_object   = {}

    for (var i=0; i<items.length; i++){
        var paths_tmp       = items[i].filePaths

        if(!paths_tmp || !items[i].name || !items[i].value){
            lib.print('error', 'paths or name or value not mentioned')
        }

        for (var j=0; j<paths_tmp.length; j++) {
            paths.push(path.join(context.getBasePath(resourceName), paths_tmp[j]))
        }

        var toReplace   = items[i].name
        var replaceBy   = mustache.render(items[i].value, context.getAllVariables())

        if(!replaceBy){
            lib.print('ERROR', '' + items[i].value +' not found in context')
        }

        inject_object[toReplace] = replaceBy
    }

    lib.replace_variables(paths, inject_object)

    cb()

}


function clean(context, resourceName, subResourceName, params, cb) {
    cb()
}

exports.adapter 			= adapter
