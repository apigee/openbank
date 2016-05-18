<?php
/**
 * @file
 * fhir_custom.features.fe_block_settings.inc
 */

/**
 * Implements hook_default_fe_block_settings().
 */
function fhir_custom_default_fe_block_settings() {
  $export = array();

  $export['version'] = '2.0';

  $export['views-slideshow-block'] = array(
    'cache' => -1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 'slideshow-block',
    'module' => 'views',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'fhir_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'fhir_responsive',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  return $export;
}
