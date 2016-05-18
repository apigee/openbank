<?php
/**
 * @file
 * Contains core functions for the Views module support.
 */

/*
 * Implements hook_views_plugins().
 *
 * This function annnounces the style plugin for flexslider views.
 */
function flexslider_views_views_plugins() {
  return array(
    'style' => array(
      // Style plugin for the FlexSlider.
      'flexslider' => array(
        'title' => t('FlexSlider'),
        'help' => t('Display the results in a FlexSlider widget.'),
        'handler' => 'flexslider_views_plugin_style_flexslider',
        'theme' => 'flexslider_views',
        'theme file' => 'flexslider_views.theme.inc',
        'theme path' => drupal_get_path('module', 'flexslider_views') . '/theme',
        'uses row plugin' => TRUE,
        'uses fields' => TRUE,
        'uses options' => TRUE,
        'type' => 'normal',
        'even empty' => FALSE,
      ),
    ),
  );
}
