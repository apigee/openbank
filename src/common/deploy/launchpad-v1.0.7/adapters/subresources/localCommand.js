var lib				= require('../../lib')
var child_process   = require('child_process')
var async           = require('async')
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
    lib.print('meta','building localCommand resources')
    cb()
}

function deploy(context, resourceName, subResourceName, params, cb) {
    //opts = lib.build_opts(context, resourceName, subResourceName)
    lib.print('meta','deploying localCommand resources')

    var config          = context.getConfig(resourceName, subResourceName)

    var items           = lib.filter_items(config.items, params)

    for (var i=0; i< items.length; i++) {
        items[i].basePath = context.getBasePath(resourceName)
        items[i].context  = context
    }

    async.each(items, run_command, function(err){
        if(err){
            lib.print('ERROR', err)
            cb()
        } else {
            cb()
        }

    })
}

function run_command(item, callback) {
    var context = item.context
    var basePath = item.basePath
    var cmd     = mustache.render(item.cmd, context.getAllVariables())
    var cmds    = cmd.split(' ')

    var command = child_process.spawn(cmds[0], cmds.slice(1),{'cwd': basePath})

    var result = '';

    command.stdout.on('data', function(data) {
        result += data.toString();
    });

    command.stderr.on('data', function(data) {
        //result += data.toString();
    });

    command.on('exit', function(code) {
        lib.print('info', 'command run : ' + item.name)
        lib.print('info', 'output : ' + result)

        if(item.assignResponse && item.assignResponse.length > 0){
            lib.extract_response(context, item.assignResponse, result)
        }

        callback()
    });
}

function clean(context, resourceName, subResourceName, params, cb) {
    lib.print('meta','cleaning localCommand resources')
    cb()
}

exports.adapter 			= adapter
