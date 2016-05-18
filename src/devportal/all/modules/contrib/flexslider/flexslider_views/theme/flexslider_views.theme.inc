<?php

/**
 * @file
 * Theme functions for FlexSlider Views
 *
 * @author Mathew Winstone <mwinstone@coldfrontlabs.ca>
 */

/**
 * Add a preprocessor to prepare data from FlexSlider Views
 */
function template_process_flexslider_views(&$vars) {
  // Only run the preprocessor if it is a view
  if (!empty($vars['view'])) {
    // Prepare all data to be passed to theme_flexslider().
    $items = array();
    $view = $vars['view'];
    $settings = array();
    $settings['optionset'] = $vars['options']['optionset'];

    $row_plugin = $view->style_plugin->row_plugin;

    foreach ($vars['rows'] as $id => $row) {
      // Render the row into a slide
      $view->row_index = $id;
      $item['slide'] = $row_plugin->render($row);
      $item['caption'] = (isset($row->caption) && !empty($row->caption)) ? $row->caption : NULL;
      $items[] = $item;
    }

    // Add the slide items to the variables
    $vars['items'] = $items;

    // Add the attributes
    $settings['attributes']['id'] = $vars['options']['id'];

    // Reset the options to the processed values
    $vars['settings'] = $settings;
  }
  return $vars;
}
