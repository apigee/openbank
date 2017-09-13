(function ($){
 	$(document).ready(function() 
 	{
 	alert("yayy");
 	var $input = $('<input type="button" value="CREATE JWT" />');
 	if($("ul.headerParamSection > li.method_details > div.method_data > span[data-role=name]").text() == "Authorization")
 	{
 		alert("inside");
    $input.appendTo($("ul.headerParamSection > li.method_details > div.method_data"));
}
	});
})(jQuery);
