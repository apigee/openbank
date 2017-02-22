/*
  This is the javascript file that will contain all the custom javascript code that you will be writing to customize the interactivity of the Apigee developer portal.
*/
 (function ($){
 	$(document).ready(function() 
 	{
 		$("#resourceUrlCollapse-arrow").removeClass("glyphicon-chevron-right");
 		$("#resourceUrlCollapse-arrow").addClass("glyphicon-chevron-down");
 		//for the resource url
 		$("#resourceURLTable").addClass("in");

		$("h3.ui-accordion-header > a").click(function(event) {		
			$(this).parent("h3").siblings("div").css("display","none");
			$(this).parent("h3").next().css("display","block");
		});
		$("div.title-description > a.active").addClass("activeTitle");
		$("div.title-description > a.activeTitle").parentsUntil("h3.ui-accordion-header").css("display","block");
		$("section.block.block-block.clearfix").addClass("home-dbank-block");
	});
})(jQuery);
 
