/*
 Copyright 2017 Google Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 https://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

/**
 * @file
 * ValidateRequest.js
 * Generic Script is for validation of request based on config provided
 */
//var error = validateRequest();

validPayload = {}
function validateRequest(RequestConfig) {
    var key, i, j, ispresent;
    var errorJson = {};
    errorJson.isError = true;
    errorJson.errorResponseCode = 400;

    // validate Headers
    if (RequestConfig.Headers) {
        for (i = 0; i < RequestConfig.Headers.length; i++) {

            for (key in RequestConfig.Headers[i]) {
                ispresent = false;
                var headerVal = context.getVariable("request.header." + key);
                var headerValidation = RequestConfig.Headers[i][key];
                if (headerVal) {
                    print(ispresent);
                    ispresent = true;
                }
                // check if header is mandatory
                if (headerValidation.Mandatory) {
                    if (!ispresent) {
                        print("not present" + key);
                        errorJson.errorDescription = "" + key + " header not present in the request";
                        return errorJson;

                    }
                }


                //validate type of header value
                if (isValidParamType(headerVal, headerValidation, ispresent) === false) {
                    errorJson.errorDescription = "" + key + " header type is invalid";
                    return errorJson;

                }

                // validate max length of header value
                if (isInvalidMaxLength(headerVal, headerValidation, ispresent)) {
                    errorJson.errorDescription = "" + key + " header value length exceeds the maximum length limit";
                    return errorJson;
                }

                // validate min length of header value
                if (isInvalidMinLength(headerVal, headerValidation, ispresent)) {
                    errorJson.errorDescription = "" + key + " header value length less than minimum length limit";
                    return errorJson;
                }

                // validate against list of allowed values for the header
                if (isInvalidParamValue(headerVal, headerValidation, ispresent)) {
                    errorJson.errorDescription = "" + key + " header value is invalid";
                    return errorJson;
                }


            }


        }

    }

    // query parameters validation
    if (RequestConfig.QueryParams) {
        for (i = 0; i < RequestConfig.QueryParams.length; i++) {

            for (key in RequestConfig.QueryParams[i]) {
                ispresent = false;
                var queryParamVal = context.getVariable("request.queryparam." + key);
                var queryParamValidation = RequestConfig.QueryParams[i][key];
                if (queryParamVal) {
                    ispresent = true;
                }
                // check if query param is mandatory
                if (queryParamValidation.Mandatory) {
                    if (!ispresent) {
                        errorJson.errorDescription = "" + key + " query parameter not present in the request";
                        return errorJson;

                    }

                }
                //validate the type of query parameter
                if (isValidParamType(queryParamVal, queryParamValidation, ispresent) === false) {
                    errorJson.errorDescription = "" + key + " query parameter type is invalid";
                    return errorJson;
                }

                // validate max length allowed for the query parameter
                if (isInvalidMaxLength(queryParamVal, queryParamValidation, ispresent)) {
                    errorJson.errorDescription = "" + key + " query parameter value length exceeds the maximum length limit";
                    return errorJson;
                }

                // validae min length allowed for the query parameter
                if (isInvalidMinLength(queryParamVal, queryParamValidation, ispresent)) {
                    errorJson.errorDescription = "" + key + " query parameter value length less than minimum length limit";
                    return errorJson;
                }

                // validate against the list of possible values allowed for the query parameter
                if (isInvalidParamValue(queryParamVal, queryParamValidation, ispresent)) {

                    errorJson.errorDescription = "" + key + " query parameter value is invalid";
                    return errorJson;
                }
            }
        }
    }

    // request payload validation
    var reqVerb = context.getVariable("request.verb");
    if (reqVerb == "POST") {
        if (RequestConfig.Body) {

            for (i = 0; i < RequestConfig.Body.length; i++) {
                for (key in RequestConfig.Body[i]) {


                    ispresent = false;
                    var bodyParam = getBodyParameterVal(key);
                    //context.setVariable("bodyparam", bodyParam);
                    var bodyValidation = RequestConfig.Body[i][key];

                    if (bodyParam != "invalid") {
                        ispresent = true;
                    }

                    // check if the body parameter is mandatory and if not present in the request, return error
                    if (bodyValidation.Mandatory) {

                        if (bodyParam == "invalid") {
                            errorJson.errorDescription = "" + key + " is not present";
                            return errorJson;
                        }

                    }
                    var typeCastedBodyParam = null;
                    //validate the type of the body parameter value
                    var isBodyParamValid = isValidParamType(bodyParam, bodyValidation, ispresent);
                    if (isBodyParamValid === false) {

                        errorJson.errorDescription = "" + key + " type is invalid";
                        return errorJson;
                    }
                    else {
                        if (isBodyParamValid.length == 1) {
                            typeCastedBodyParam = isBodyParamValid[0];
                        }

                    }


                    // validate maximum length of the body parameter
                    if (isInvalidMaxLength(bodyParam, bodyValidation, ispresent)) {
                        errorJson.errorDescription = "" + key + " length exceeds the maximum limit";
                        return errorJson;
                    }

                    //validate minimum length of the body parameter
                    if (isInvalidMinLength(bodyParam, bodyValidation, ispresent)) {
                        errorJson.errorDescription = "" + key + " value length less than minimum length limit";
                        return errorJson;

                    }

                    // validate if the body parameter value is one in the list of allowed values for it
                    if (isInvalidParamValue(bodyParam, bodyValidation, ispresent)) {
                        errorJson.errorDescription = "" + key + " value is invalid";
                        return errorJson;
                    }

                    if (ispresent) {
                        setKeyVal(key, typeCastedBodyParam);
                    }

                }

            }

        }
    }
    context.setVariable("validPayload", JSON.stringify(validPayload));
    errorJson.isError = false;
    errorJson.errorResponseCode = 200;
    return errorJson;
}


function getBodyParameterVal(param) {
    // check for empty payload
    if (context.getVariable("request.content")) {
        var content = JSON.parse(context.getVariable("request.content"));
        var contextBodyParam = "";
        try {
            var keys = param.split('.');
            var value = content[keys[0]];
            for (var i = 1; i < keys.length; i++) {
                value = value[keys[i]];
            }
            if (value) {
                return value;
            }
            else {
                return "invalid";
            }
        }
        catch (err) {
            return "invalid";
        }
    }
    else return "invalid";
}


function isInvalidMaxLength(param, configparam, ispresent) {
    if (configparam.MaxText && ispresent) {
        if (param.length > configparam.MaxText)
            return true;

        else return false;
    }
    return false;
}


function isInvalidMinLength(param, configparam, ispresent) {
    if (configparam.MinText && ispresent) {
        if (param.length < configparam.MinText)
            return true;

        else return false;
    }

    return false;

}


function isValidParamType(param, configparam, ispresent) {
    var paramtype = Object.prototype.toString.call(param).split(" ")[1].slice(0, -1);
    var valueArr = [];
    if (configparam.ValueType && ispresent) {
        if (paramtype == "String") {
            if (configparam.ValueType == "String") {
                return valueObj;
            }
            else if (configparam.ValueType == "Integer") {
                if (isNaN(param) || isNaN(parseInt(param))) {
                    return false;
                }
                else {
                    valueArr.push(parseInt(param));
                    return valueArr;
                }
            }
            else if (configparam.ValueType == "Float") {
                if (isNaN(param) || isNaN(parseFloat(param))) {
                    return false;
                }
                else {
                    valueArr.push(parseFloat(param));
                    return valueArr;
                }

            }

            else if (configparam.ValueType == "Date") {
                if (isNaN(Date.parse(param))) {
                    return false;
                }
                else {

                    valueArr.push(Date.parse(param));
                    return valueArr;
                }

            }
            else return false;

        }

        else if (paramtype != configparam.ValueType) {
            return false;
        }

        valueArr.push(param);
        return valueArr;
    }
    valueArr.push(param);
    return valueArr;
}


function isInvalidParamValue(param, configparam, ispresent) {
    if (configparam.ValueList && ispresent) {
        if (configparam.ValueList.indexOf(param) <= -1)
            return true;

        else return false;
    }
    return false;
}

function setKeyVal(keyPath, param) {
    var temp = validPayload;  // a moving reference to internal objects within obj
    var keyList = keyPath.split('.');
    var len = keyList.length;
    for (var i = 0; i < len - 1; i++) {
        var elem = keyList[i];
        if (!temp[elem]) temp[elem] = {}
        temp = temp[elem];
    }

    temp[keyList[len - 1]] = param;
}
