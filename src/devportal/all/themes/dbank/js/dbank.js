/*
  This is the javascript file that will contain all the custom javascript code that you will be writing to customize the interactivity of the Apigee developer portal.
*/
 (function ($)
 {
 	



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
		$("#navbar > div.container").css("width","100%");
		$("div.verb-auth > p").attr("data-role","verb-role");


// add buttons
 	
 	/*if($("ul.headerParamSection input[name=Authorization]").length >0)
 	{
 	var $input = $('<input type="button" class="createjwt" value="Create JWT" />');
    $input.appendTo($("ul.headerParamSection input[name=Authorization]").parent().next());

    var $jwtDialogDiv = $('<div id="dialogJWT" style="background:#FFFFFF;"><label>Content-Type</label><input type="text" name="jwt_contentType" value="qwerty"></input></div>');
    $jwtDialogDiv.appendTo($('body'));
    
    $('#dialogJWT').dialog({
                autoOpen: false,
                title: 'Create JWT',
                resizable : false,
            	width : 600,
            	height:200,
                modal : true,
                dialogClass : "dialog-div",
                open: function(event, ui) {
					        $(".ui-dialog-titlebar-close", ui.dialog | ui).hide();
					    },
                buttons: [
            {
                text: "Create",
                click: createJWT
                
            },
            {
                text: "Cancel",
                click: function() {
                    $( this ).dialog( "close" );
                }
            }
        ]
            });
	}


	function showJwt()
	{
		alert("yay");
		
		$("input[name=jwt_contentType]").val($("ul.headerParamSection input[name=Content-Type]").val());
		$("#dialogJWT").dialog("open");


	}
	function createJWT()
	{
		$("#dialogJWT").dialog("close");
		alert("yay1");

		$("ul.headerParamSection input[name=Authorization]").val($("input[name=jwt_contentType]").val());
		//var w = window.open("http://www.google.com", "oauth2Window", "resizable=yes,scrollbars=yes,status=1,toolbar=1,height=500,width=500");

		//$("#dialogJWT").dialog("open");


	}

	function myfunction()
	{
		alert("success");
	}*/




// oauth set button
//$('div[data-role=oauth2_modal]')


// override existing button


	//alert("in button");
	
	

	});

	


})(jQuery);
 
 
