var assert = chai.assert;

var pathname = window.location.pathname
var splits = pathname.split('/')
//expected /v1/o/:orgname/e/:env/samples/:sample/test.html
var org = splits[3]
var env = splits[5]
var sample = splits[7]
var client_id;
var secret;

describe('write your test casr', function(){
	before(function(done){
		done()
	})
	it('do something', function(done){
		var url = 'https://' + org + '-' + env + '.apigee.net'
			$.ajax({
				url:url,
				complete:function(xhr,statusText){ done()},
				error: function(xhr,err){done(err)}
			})				
	})
})	