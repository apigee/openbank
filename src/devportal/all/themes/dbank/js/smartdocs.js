(function ($) {

  /**
  * Provide the summary information for the block settings vertical tabs.
  */
  Drupal.behaviors.SmartDocsSetup = {
    attach: function (context) {
      clickHandlerForSwitchToErrorCodesInResponseSummary();
      urlContainerContentHandler();
      responseSummaryCategoryFieldHandler();
      collapsableDivsManualClickHandler(context);
      createResourceSummaryErrorTab(context);
      responseSchemaObj();
    }

  };

  /*
   * Try It Out Tab Toggle handler
   */
  Drupal.TryItOutRequestPayloadTabToggleHandler = function (elementsArray, payloadArray, blockQuoteArray, requestTableArray, responseObjectArray, responseTableArray, context) {

    function createTabClickCallBack(i){
      return function(){
        var payload = payloadArray[i];
        var newRequestPayloadValue = JSON.stringify(payload, undefined, 2);
        $('[data-role="request-payload-example"]', context).children('textarea').val(newRequestPayloadValue);
        window.apiModelEditor.setRequestPayLoad(newRequestPayloadValue);
        $('#availableTypes', context).html(blockQuoteArray[i]);

        // Response Summary Section
        // -- Request --
        updateResponseSummaryRequestSection();
        $('#RequestBody table', context).remove();
        $('#RequestBody', context).append(requestTableArray[i]);

        // -- Response --
        $("#alt-json-response", context).html(prettifiedJSONString(responseObjectArray[i]));
        $('#ResponseBody table', context).remove();
        $('#ResponseBody', context).append(responseTableArray[i]);

        $('.cardBasedButton', context).click();
        $('.resetButton', context).click();
      }
    }

    if(elementsArray.length === payloadArray.length && payloadArray.length === blockQuoteArray.length){
      for(var i = 0; i < elementsArray.length; i++) {
        $(elementsArray[i], context).click( createTabClickCallBack(i));
      }
    }

    $('#availableTypes', context).html(blockQuoteArray[0]);
  };


  /*
   * Update Response Summary Request payload according to tab select.
   */
  function updateResponseSummaryRequestSection(){
    var jsonPayload = JSON.parse($.trim($('[data-role="request-payload-example"]').find("textarea").val()));
    $("#alt-json-request").html(prettifiedJSONString(jsonPayload));

  }

  /*
   * Populate the Resource Summary Error Tab
   */
  function createResourceSummaryErrorTab(context){

    var ErrorCodesObject = {
      "Error": {
        "messages": [{
          "code": "missing_currency",
          "description": "The currency is missing"
        }, {
          "code": "missing_cardholder_name",
          "description": "The card holder name cannot be empty"
        }, {
          "code": "missing_card_number",
          "description": "The card number cannot be empty"
        }, {
          "code": "incorrect_card_digits",
          "description": " The card number must be 16 digits"
        }, {
          "code": "card_expired",
          "description": "The card has expired"
        }]
      },
      "correlation_id": "{string}"
    };

    var errorTable = '<table class="table table-condensed" style="font-size: 95%;text-align: left;"> <thead class="well"> <tr> <th>Property</th> <th>Type</th> <th>Description</th> </tr> </thead> <tbody> <tr> <td><span class="textGreen">messages</span> </td> <td><span class="textGreen">array</span> </td> <td>Contains an array of JSON objects with error codes and description as shown above </tr> </tbody> </table>';

    var httpStatusCodesTable = '<table class="table table-condensed" style="font-size: 95%;text-align: left;margin-top: 3%;"> <thead class="well"> <tr> <th>Status Code</th> <th>Description</th> </tr> </thead> <tbody> <tr> <td><span class="textGreen">200,201,202</span></td> <td>Created Transaction request - OK.</td> </tr> <tr> <td><span class="textGreen">400<br>Bad Request</span></td> <td>Input Request is invalid or incorrect.</td> </tr> <tr> <td><span class="textGreen">401<br>Unauthorized</span></td> <td>Invalid API Key and Token.</td> </tr> <tr> <td><span class="textGreen">404<br>Not Found</span></td> <td>The requested resource does not exist.</td> </tr> <tr> <td><span class="textGreen">500, 502, 503, 504<br>Server errors</span></td> <td>Server Error at  end.</td> </tr> </tbody> </table>';

    var apiErrorCodesTable = '<br><div class="panel panel-default" style="width: 97% !important;margin-left: 1.5% !important;"> <table class="table table-condensed" style="font-size: 95%;text-align: left; table-layout: fixed;"> <thead class="well"> <tr> <th>Code</th> <th>Description</th> </tr> </thead> </table> <div class="div-table-content" style="overflow-y:auto;"> <table class="table table-condensed apiErrorTableClass" style="font-size: 95%;text-align: left; table-layout: fixed;"> <tbody> <tr> <td><span class="textGreen">missing_transaction_type</span> </td> <td>The transaction type is missing</td> </tr> <tr> <td><span class="textGreen">invalid_transaction_type</span> </td> <td>Input Request is invalid or incorrect. <br><span class="textGreen"><strong>Note:</strong></span> This code is applicable only for secondary transactions. <br>Ex: capture, void, refund</td> </tr> <tr> <td><span class="textGreen">missing_transaction_tag</span> </td> <td>The transaction id is not provided</td> </tr> <tr> <td><span class="textGreen">payment_method_missing</span> </td> <td>The payment method is missing</td> </tr> <tr> <td><span class="textGreen">invalid_payment_method</span> </td> <td>The payment method is not valid</td> </tr> <tr> <td><span class="textGreen">missing_amount</span> </td> <td>The amount is missing</td> </tr> <tr> <td><span class="textGreen">invalid_amount</span> </td> <td>The amount provided is invalid</td> </tr> <tr> <td><span class="textGreen">missing_currency</span> </td> <td>The currency is missing</td> </tr> <tr> <td><span class="textGreen">invalid_currency</span> </td> <td>The currency provided is invalid</td> </tr> <tr> <td><span class="textGreen">missing_merchant_identifier</span> </td> <td>The merchant identifier is missing <br><span class="textGreen"><strong>Note:</strong></span> Only for 3DS Transactions</td> </tr> <tr> <td><span class="textGreen">missing_3DS_info</span> </td> <td>3DS Information (object) is missing</td> </tr> <tr> <td><span class="textGreen">missing_card_info</span> </td> <td>The card information is missing</td> </tr> <tr> <td><span class="textGreen">missing_cardholder_name</span> </td> <td>The card holder name cannot be empty</td> </tr> <tr> <td><span class="textGreen">missing_card_number</span> </td> <td>The card number cannot be empty</td> </tr> <tr> <td><span class="textGreen">invalid_card_number</span> </td> <td>The card number must be numeric</td> </tr> <tr> <td><span class="textGreen">invalid_card_number</span> </td> <td>The credit card number check failed</td> </tr> <tr> <td><span class="textGreen">missing_card_type</span> </td> <td>The card type cannot be empty</td> </tr> <tr> <td><span class="textGreen">invalid_card_type</span> </td> <td>The card type is invalid</td> </tr> <tr> <td><span class="textGreen">incorrect_card_digits</span> </td> <td>American Express card number must be 15 digits</td> </tr> <tr> <td><span class="textGreen">incorrect_card_digits</span> </td> <td>The card number must be 16 digits</td> </tr> <tr> <td><span class="textGreen">invalid_cvv</span> </td> <td>The cvv provided must be numeric</td> </tr> <tr> <td><span class="textGreen">card_expired</span> </td> <td>The card has expired</td> </tr> </tbody> </table> </div> </div>';


    $("#ErrorInfo", context).html('').append('<pre id="alt-json-errorCodes" class="prettyprint" style="overflow: auto;max-height: 300px;""></pre>');
    //$("#alt-json-errorCodes", context).html(JSON.stringify(ErrorCodesObject, undefined, 2));
    $("#ErrorInfo", context).append(errorTable);
    $('#httpStatusCodes', context).html(httpStatusCodesTable);
    //$('#apiErrorCodes', context).html(apiErrorCodesTable);
    $('.div-table-content', context).height($(window).height() * 0.60 + 'px');
  }

  /*
   * Make the collapsable div be manually open and closed.
   * Primary and other transactions only try it out! div - opened
   * Secondary transactions show try it out & resource URL.
   */

  function collapsableDivsManualClickHandler(context) {

    /* ensure any open panels are closed before showing selected */
    $('#accordion', context).on('show.bs.collapse', function() {
      $('#accordion .in', context).collapse('hide');
    });

    // Register click handlers on the collapsable div's
    $('.resourceUrlCollapse', context).bind('click', function() {
      var resourceURLTableEl = $('#resourceURLTable');
      var resourceUrlCollapseArrow = $('#resourceUrlCollapse-arrow');
      if (resourceURLTableEl.hasClass('in')) {
        resourceURLTableEl.removeClass('in');

        resourceUrlCollapseArrow.removeClass('glyphicon-chevron-down');
        resourceUrlCollapseArrow.addClass('glyphicon-chevron-right');
      } else {
        $('#resourceURLTable', context).addClass('in');
        resourceUrlCollapseArrow.removeClass('glyphicon-chevron-right');
        resourceUrlCollapseArrow.addClass('glyphicon-chevron-down');

      }
    });

    $('.headerParametersCollapse', context).bind('click', function() {
      if ($('#headerParametersTable', context).hasClass('in')) {
        $('#headerParametersTable', context).removeClass('in');
        $('#headerParametersCollapse-arrow', context).removeClass('glyphicon-chevron-down');
        $('#headerParametersCollapse-arrow', context).addClass('glyphicon-chevron-right');
      } else {
        $('#headerParametersTable', context).addClass('in');
        $('#headerParametersCollapse-arrow', context).addClass('glyphicon-chevron-down');
        $('#headerParametersCollapse-arrow', context).removeClass('glyphicon-chevron-right')

      }
    });

    var trySampleCallCollapseEl = $('.trySampleCallCollapse', context);
    trySampleCallCollapseEl.bind('click', function() {

      if ($('#tryingOutASampleCall', context).hasClass('in')) {
        $('#tryingOutASampleCall', context).removeClass('in');
        $('#trySampleCallCollapse-arrow', context).removeClass('glyphicon-chevron-down');
        $('#trySampleCallCollapse-arrow', context).addClass('glyphicon-chevron-right');
      } else {
        $('#tryingOutASampleCall', context).addClass('in');
        $('#trySampleCallCollapse-arrow', context).addClass('glyphicon-chevron-down');
        $('#trySampleCallCollapse-arrow', context).removeClass('glyphicon-chevron-right')

      }
    });

    $('.sampleCodeCollapse', context).bind('click', function() {

      if ($('#sampleCodeCollapseDiv', context).hasClass('in')) {
        $('#sampleCodeCollapseDiv', context).removeClass('in');
        $('#sampleCodeCollapse-arrow', context).removeClass('glyphicon-chevron-down');
        $('#sampleCodeCollapse-arrow', context).addClass('glyphicon-chevron-right');
      } else {
        $('#sampleCodeCollapseDiv', context).addClass('in');
        $('#sampleCodeCollapse-arrow', context).addClass('glyphicon-chevron-down');
        $('#sampleCodeCollapse-arrow', context).removeClass('glyphicon-chevron-right')

      }
    });

    $('.queryParametersCollapse', context).bind('click', function() {
      if ($('#queryParametersTable', context).hasClass('in')) {
        $('#queryParametersTable', context).removeClass('in');
        $('#queryParametersCollapse-arrow', context).removeClass('glyphicon-chevron-down');
        $('#queryParametersCollapse-arrow', context).addClass('glyphicon-chevron-right');
      } else {
        $('#queryParametersTable', context).addClass('in');
        $('#queryParametersCollapse-arrow', context).addClass('glyphicon-chevron-down');
        $('#queryParametersCollapse-arrow', context).removeClass('glyphicon-chevron-right')

      }
    });

    $('.integrationCollapse', context).bind('click', function() {
      if ($('#integrationSampleCall', context).hasClass('in')) {
        $('#integrationSampleCall', context).removeClass('in');
        $('#integration-arrow', context).removeClass('glyphicon-chevron-down');
        $('#integration-arrow', context).addClass('glyphicon-chevron-right');
      } else {
        $('#integrationSampleCall', context).addClass('in');
        $('#integration-arrow', context).addClass('glyphicon-chevron-down');
        $('#integration-arrow', context).removeClass('glyphicon-chevron-right')

      }
    });


    if ($.trim( $('.queryParamsSection #queryParametersTable .panel-body', context).html() ).length){
      $('.queryParamsSection', context).show();
    }else{
      $('.queryParamsSection', context).hide();
    }

    // Make "Try it Out!" section open by default.
    trySampleCallCollapseEl.trigger('click');
  }

  /*
   * Switch To Error Codes Section In Response Summary on Click
   */
  function clickHandlerForSwitchToErrorCodesInResponseSummary() {
    $('.switchToErrorCodesInResponseSummary').bind('click', function() {
      $('.resource_summary a[href="#ErrorCodes"]').tab('show');
      document.location.href = "#resourceSummary"; // take to resource summary section when mouse scroll is at bottom of page
    });
  }


  /*
   * Populate URL Container - Sandbox and Live URL table
   */
  function urlContainerContentHandler() {
    var currentResourceURL = $('.url_container').html();
    var resourcePath = $('span[data-role="path"]');
    $('.url_container').html('').append(resourceURLTable);
    $('.sandbox-url').html('').append(currentResourceURL);
    $('.sandbox-url p').css({
      paddingTop: 0
    }).append('<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="glyphicon glyphicon-ok" style="color: #007000;"></i></span>');
    $('.resourcePathForProd').html('').append(resourcePath);
  }


  /*
   * Response summary category field could have multiple text seperated by comma. If a comma isn't needed - just strip it
   */
  function responseSummaryCategoryFieldHandler() {
    //If comma is the last character in a string - strip it from Response Summary Category field.
    var dealWithCommaEl = $('.dealWithComma');
    if (dealWithCommaEl.text().substring(dealWithCommaEl.text().length - 1) === ",") {
      dealWithCommaEl.text(dealWithCommaEl.text().substring(0, dealWithCommaEl.text().length - 1));
    }
  }


  /*
   * Build ResponseSchema Object
   */
  function responseSchemaObj() {

      // Get json response object
      if(jQuery('.response-schema-datatype').text()) {
          var definitionsregEx = /\/definitions\/(.*)\w+/g;
          matches = JSON.parse(jQuery('.response-schema-datatype').text()).dataType.match(definitionsregEx);
          var resSchemaObj = matches[0].substr(13);
          
          var resExpandedSchema = JSON.parse(Apigee.APIModel.apiSchema.expandedSchema);


          var tableContent = '<table class="table table-condensed" style="font-size: 95%;text-align: left;"><thead class="well"><tr><th>Property name</th><th>Type</th><th>Description</th></tr></thead><tbody>'
          for(var key in resExpandedSchema[resSchemaObj].properties) {
              if(!resExpandedSchema[resSchemaObj].properties[key].description)
                  resExpandedSchema[resSchemaObj].properties[key].description = "";
              tableContent += '<tr><td><span class="textGreen" >'+key+'</span></td><td><span class="textGreen" >'+resExpandedSchema[resSchemaObj].properties[key].type+'</span></td><td>'+resExpandedSchema[resSchemaObj].properties[key].description+'</td></tr>';
          }

          tableContent += '</tbody></table>';

          $('#response-object').append(tableContent);
          jQuery('#alt-json-response').text(prettifiedJSONString(resExpandedSchema[resSchemaObj].properties));
      }
  }

})(jQuery);




var resourceURLTable = '<table class="table table-condensed table-bordered" style="font-size: 95%;text-align: left;"> <thead class="well"> <tr> <th>Environment</th> <th>URL</th> </tr> </thead> <tbody> <tr> <td><span class="textGreen">Sandbox</span> </td> <td class="sandbox-url"></td></tr></tbody></table>';


/*
 * Pretty Print JSON for Resource Summary
 */
function prettifiedJSONString(payload) {
  //Checks up to 4 Levels of JSON objects(object inside ->object inside ->object...) - TODO make it generic
  var json = payload;
  for (var key1 in json) {
    var type1 = typeof(json[key1]);
    if (type1 === "object") {
      for (var key2 in json[key1]) {
        var type2 = typeof(json[key1][key2]);
        if (type2 === "object") {
          for (var key3 in json[key1][key2]) {
            var type3 = typeof(json[key1][key2][key3]);
            if (type3 === "object") {
              for (var key4 in json[key1][key2][key3]) {
                var type4 = typeof(json[key1][key2][key3][key4]);
                if (type4 === "object") {
                  for (var key5 in json[key1][key2][key3][key4]) {
                    json[key1][key2][key3][key4][key5] = '{' + typeof(json[key1][key2][key3][key4][key5]) + '}';
                  }
                } else {
                  json[key1][key2][key3][key4] = '{' + typeof(json[key1][key2][key3][key4]) + '}';
                }
              }
            } else {
              json[key1][key2][key3] = '{' + typeof(json[key1][key2][key3]) + '}';
            }
          }
        } else {
          json[key1][key2] = '{' + typeof(json[key1][key2]) + '}';
        }
      }
    } else {
      json[key1] = '{' + typeof(json[key1]) + '}';
    }
  }
  return JSON.stringify(json, undefined, 2); // indentation level = 2
}
