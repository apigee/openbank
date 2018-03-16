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
function encodeValue(value) {
  var valueProto = {};

  if (typeof(value) === "boolean") {
    valueProto.booleanValue = value;
    return valueProto;
  }

  if (value == null) {
    valueProto.nullValue = 0;
    return valueProto;
  }

  if (typeof(value) === "number") {
    if (value % 1 === 0) {
      valueProto.integerValue = value;
    } else {
      valueProto.doubleValue = value;
    }
    return valueProto;
  }

  if (value instanceof Date) {
    var seconds = value.getTime() / 1000;

    valueProto.timestampValue = {
      seconds: Math.floor(seconds),
      nanos: value.getMilliseconds() * 1e6,
    };

    return valueProto;
  }

  if (typeof(value) === "string") {
    valueProto.stringValue = value;
    return valueProto;
  }
  if (value instanceof Array) 
  {
    valueProto.arrayValue = {
      values: value.map(encodeValue),
    };
    return valueProto;
  }

  if (toString.call(value) === '[object Object]') {
    if (!isEmpty(value)) {
      //value = extend(true, {}, value);

      for (var prop in value) {
        if (value.hasOwnProperty(prop)) {
          value[prop] = encodeValue(value[prop]);
        }
      }
    }

    valueProto.entityValue = {
      properties: value,
    };

    return valueProto;
  }

  throw new Error('Unsupported field value, ' + value + ', was provided.');
}


function decodeValueProto(valueProto) {
  var valueType = "";
  for(var key in valueProto){
    valueType = key
  }
  //var valueType = valueProto.valueType;
  var value = valueProto[valueType];

  switch (valueType) {
    case 'arrayValue': {
      return value.values.map(decodeValueProto);
    }

    /*case 'blobValue': {
      return new Buffer(value, 'base64');
    }*/

    case 'nullValue': {
      return null;
    }

    case 'doubleValue': {
      return parseFloat(value);
    }

    case 'integerValue': {
      return parseInt(value);
    }

    case 'entityValue': {
      return entityFromEntityProto(value);
    }

    case 'timestampValue': {
      var milliseconds = parseInt(value.nanos, 10) / 1e6;
      return new Date(parseInt(value.seconds, 10) * 1000 + milliseconds);
    }

    default: {
      return value;
    }
  }
}


function entityFromEntityProto(entityProto) {
  var entityObject = {};

  var properties = entityProto.properties || {};

  for (var property in properties) {
    var value = properties[property];
    entityObject[property] = decodeValueProto(value);
  }

  return entityObject;
}



function isEmpty(myObject) {
    for(var key in myObject) {
        if (myObject.hasOwnProperty(key)) {
            return false;
        }
    }

    return true;
}
function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
}