var hbs = require('hbs');
var appStyles = {};
var config = require('../config.json');

appStyles.setBasicStyles = function () {
  // Handlebars helper for logo

    hbs.registerHelper('logo', function(uri){
        if (config.logo_uri != "") {
          uri = config.logo_uri
        }
        else {
          uri = config.base_path+uri;
        }

        return new hbs.SafeString(
            "<img class='img-responsive' src="+uri+">"
        );
    });

    hbs.registerHelper('siteStyles', function () {
        var styles = "";

        if (config.styles.header_background_color != "") {
            styles +=".header, .grass-header-nav{background-color: "+config.styles.header_background_color+"}"
        }
        return new hbs.SafeString(
            "<style>"+styles+"</style>"
        );

        });

    hbs.registerHelper('basePath', function (){
        return new hbs.SafeString(config.base_path);
    });
}


module.exports = appStyles
