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
 * style.js
 * Style Controller.
 * The controller for the UI operations.
 */
var hbs = require('hbs');
var appStyles = {};
var config = require('../config.json');
appStyles.setBasicStyles = function () {
    // Handlebars helper for logo

    hbs.registerHelper('logo', function (uri) {
        if (config.logo_uri != "") {
            uri = config.logo_uri
        }
        else {
            uri = config.base_path + uri;
        }

        return new hbs.SafeString(
            "<img class='img-responsive' src=" + uri + ">"
        );
    });

    hbs.registerHelper('siteStyles', function () {
        var styles = "";
        if (config.styles.header_background_color != "") {
            styles += ".header, .grass-header-nav{background-color: " + config.styles.header_background_color + "}"
        }
        return new hbs.SafeString(
            "<style>" + styles + "</style>"
        );

    });
    hbs.registerHelper('basePath', function () {
        return new hbs.SafeString(config.base_path);
    });
    hbs.registerHelper('buildJSON', function (obj) {
        return JSON.stringify(obj);
    });
    hbs.registerHelper('formatPermission', function (permissionArray) {
        var permissionTypes = [];
        var permissionStrings = {};
        for (var i in permissionArray) {
            var permission = permissionArray[i].replace(/([A-Z]{1})/g, function myFunction(x) {
                return ',' + x;
            });
            permission = permission.split(",");
            permission = permission.splice(1);
            if (permissionTypes.indexOf(permission[0]) === -1) {
                var perm = permission[0];
                permissionTypes.push(perm);
                permissionStrings[perm] = "<strong>" + perm + "</strong>" + " permission for ";
                permission = permission.splice(1);

                permissionStrings[perm] += "<strong>" + permission.join(" ") + "</strong>";
                //permissionStrings.push(permission[0] +" permission for"+permission[1]+permission[2]);
            } else {
                var perm = permission[0];
                permission = permission.splice(1);
                permissionStrings[perm] += ", <strong>" + permission.join(" ") + "</strong>";
            }
        }
        var res = "";
        for (var str in permissionStrings) {
            res += permissionStrings[str] + "\n";
        }
        return new hbs.SafeString(res);
    });
    hbs.registerHelper('formatDate', function (dateTime) {
        var date = dateTime.split('T')[0];
        return date;
    });
}


module.exports = appStyles
