SUBTHEMING APIGEE RESPONSIVE THEME HOWTO
----------------------------------------
This is a starter kit for all the theme developers who wish to customise the
look and feel of the Apigee developer portal and yet maintain the responsive
features provided by the Apigee Responsive theme.

This starter kit theme will not have any features on its own. You might need to
build your features and customisation using the skeleton provided by this
starter kit theme.

STEP BY STEP INSTRUCTIONS
-------------------------
In order to get your theme up and working you need to make the following
changes:

1. Copy the apigee_responsive_starterkit folder to your sites/all/themes folder
2. Rename the apigee_responsive_starterkit folder to YOUR_THEME_NAME
3. Rename the apigee_responsive_starterkit.info file to YOUR_THEME_NAME.info
4. Rename the css/apigee_responsive_starterkit.css to css/YOUR_THEME_NAME.css
5. Rename the js/apigee_responsive_starterkit.js to YOUR_THEME_NAME.js
6. Edit YOUR_THEME_NAME.info file and replace the following lines:

	stylesheets[all][] = css/apigee_responsive_starterkit.css
	scripts[] = js/apigee_responsive_starterkit.js

  with these following lines:

	stylesheets[all][] = css/YOUR_THEME_NAME.css
	scripts[] = js/YOUR_THEME_NAME.js

7. Change the name of the theme in YOUR_THEME_NAME.info file from Apigee
   Responsive Starter Kit to YOUR THEME NAME.
8. If you wish to add a new screenshot for your theme then replace the existing
   screenshot.png with you theme's screenshot.png
9. If you wish to add a new logo to your theme then replace the exiting logo.png
   with your themes logo.png.
10. If you wish to add a new favicon to your theme replace the existing
    favicon.ico with your themes favicon.ico.

MORE INFORMATION
----------------
For more information, see:

The Apigee documentation at:
   http://apigee.com/docs/developer-services/content/customizing-theme

