var scope= context.getVariable("accesstoken.scope").toLowerCase().split(' ');

if (scope != null){
  if (scope.indexOf("payment") == -1){
	context.setVariable("error_type", "access_denied");
	context.setVariable("error_variable", "Access denied");
  	context.setVariable("status_code", "401");    
  }
}
