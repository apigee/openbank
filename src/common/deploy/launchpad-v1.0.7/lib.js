var lodash 			= require('lodash')
var path 			= require('path')
var fs				= require('fs-extra')
var mustache 		= require('mustache')
var prompt_lib		= require('prompt')
var gutil 			= require('gulp-util')
var zipdir          = require('zip-dir')
var spawn 			= require('cross-spawn')

function replace_variables(paths, inject_object) {
    mustache.escape = function (value) {
        return value;
    };

	for(var i=0; i<paths.length; i++){
		var path_to_template = paths[i]

		var data

		try {
			data = fs.readFileSync(path_to_template, 'utf8')
		} catch(e){
			console.log(e)
		}

		var mu_template = String(data)

		try {
			var output = mustache.render(mu_template, inject_object)
		} catch(e) {
			console.log(e)
		}

		try {
			fs.outputFileSync(path_to_template, output)
		} catch (e){
			console.log(e)
		}

		output = '< yet to copy from original template >'
	}
	/*
	fs.walk(proxy_target_dir)
	.on('data', function (item) {
		if(item.stats.isFile()) {
			var path_to_template = item.path
			fs.readFile(path_to_template, function(err, data) {
				if (err) {
					console.error(err)
				} else {
					var mu_template = String(data)
					try {
						var output = mustache.render(mu_template, inject_object)
					} catch(e) {
						print('error' + e)
					}
					fs.outputFile(path_to_template, output, function (err) {
						if (err) {
							console.error(err)
						}
					})
				}
			})
		}
		
	})
	.on('end', function () {
		cb()
	})
	*/
}

function npm_install_local_only(npm_dir, callback) {
	var npm_process 			= spawn('npm', ['install'],{'cwd': npm_dir})

	if(npm_process.stdout){
        npm_process.stdout.setEncoding('utf8');

        npm_process.stdout.on('data', function (data) {
            console.log(data)
        });
	}

    if(npm_process.stderr){
        npm_process.stderr.setEncoding('utf8');

        npm_process.stderr.on('data', function (data) {
            console.log(data)
        });
    }

	npm_process.on('exit', function(code){
		callback(code)
	});
}

function prompt(inputs, cb) {
	var required_values = []

	for(var i=0; i<inputs.length; i++){
		required_values.push({name: inputs[i].name, description: inputs[i].prompt, type: 'string', required: true})
	}

	prompt_lib.start();

	prompt_lib.get(required_values, function(err, results) {
		cb(err, result)
	});

}

function print(level, msg){
	if(level.toUpperCase() == 'ERROR')
		gutil.log(gutil.colors.red(msg));
	else if(level.toUpperCase() == 'INFO')
		gutil.log(gutil.colors.green(msg));
	else if(level.toUpperCase() == 'META')
        gutil.log(gutil.colors.yellow(msg));
	else
		console.log(msg)
}

function normalize_data(obj) {
	if(obj.scopes){
		var list = obj.scopes
		var str = ''
		for (var i=0; i< list.length-1; i++) {
			if(list[i] && list[i].trim()!= '') {
				str += list[i].trim() + ","
			}
		}
		str += list[list.length-1]
		obj.scopes = str
	}
	if(obj.environments){
		var list = obj.environments
		var str = ''
		for (var i=0; i< list.length-1; i++) {
			if(list[i] && list[i].trim()!= '') {
				str += list[i].trim() + ","
			}
		}
		str += list[list.length-1]
		obj.environments = str
	}

	if(obj.proxies){
		var list = obj.proxies
		var str = ''
		for (var i=0; i< list.length-1; i++) {
			if(list[i] && list[i].trim()!= '') {
				str += list[i].trim() + ","
			}
		}
		str += list[list.length-1]
		obj.proxies = str
	}

	return obj
}

function zip(dir, options, cb) {
    zipdir(dir, options, function (err, buffer) {
        cb(err, buffer)
    });
}

function filter_items(items, params) {
	var output = []

	if(params.items) {
        for (var i = 0; i < items.length; i++) {
            var item = items[i]

			if (params.items.indexOf(item.name) != -1)
                output.push(items[i])
        }
    } else {
        output = items
	}

	return output
}

function extract_response(context, collect_info, result) {
    for (var i=0; i<collect_info.length; i++){
        var pattern
		var value

		if(collect_info[i]['from'] && collect_info[i]['from'] != '') {
            pattern = collect_info[i]['from'].split('.')

            if(typeof result == 'string') {
                value = JSON.parse(result)
            } else {
                value = result
            }

        } else {
            value = result
		}

		if(pattern != undefined) {
            for (var j = 0; j < pattern.length; j++) {
                value = value[pattern[j]]
            }
        }

        context.setVariable(collect_info[i]['to'], value)
    }
}

exports.replace_variables 		= replace_variables
exports.npm_install_local_only	= npm_install_local_only
exports.prompt 					= prompt
exports.print 					= print
exports.normalize_data 			= normalize_data
exports.zip                     = zip
exports.filter_items 			= filter_items
exports.extract_response 		= extract_response