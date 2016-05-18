<?php
/**
 * @file
 * flexslider_example.features.menu_custom.inc
 */

/**
 * Implements hook_menu_default_menu_custom().
 */
function flexslider_example_menu_default_menu_custom() {
  $menus = array();

  // Exported menu: menu-flexslider-example.
  $menus['menu-flexslider-example'] = array(
    'menu_name' => 'menu-flexslider-example',
    'title' => 'FlexSlider Example',
    'description' => 'Example FlexSlider implementations',
  );
  // Translatables
  // Included for use with string extractors like potx.
  t('Example FlexSlider implementations');
  t('FlexSlider Example');


  return $menus;
}
