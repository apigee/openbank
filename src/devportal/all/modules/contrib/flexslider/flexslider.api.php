<?php

/**
 * @file
 * API documentation for FlexSlider
 */

/**
 * By design, FlexSlider should be entirely configurable from the web interface.
 * However some implementations may require to access the FlexSlider library
 * directly by using flexslider_add().
 *
 * Here are some sample uses of flexslider_add().
 */

/**
 * This call will look for an HTML element with and id attribute of "my_image_list"
 * and initialize FlexSlider on it using the option set named "default".
 */
flexslider_add('my_image_list', 'default');

/**
 * You also have the option of skipping the option set parameter if you want
 * to run with the library defaults or plan on adding the settings array
 * into the page manually using drupal_add_js().
 */
flexslider_add('my_image_list');

/**
 * Finally, you can simply have Drupal include the library in the list of
 * javascript libraries. This method would assume you would take care of
 * initializing a FlexSlider instance in your theme or custom javascript
 * file.
 *
 * Ex: $('#slider').flexslider();
 */
flexslider_add();