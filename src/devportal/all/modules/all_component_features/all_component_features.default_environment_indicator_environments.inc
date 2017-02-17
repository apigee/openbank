<?php
/**
 * @file
 * all_component_features.default_environment_indicator_environments.inc
 */

/**
 * Implements hook_default_environment_indicator_environment().
 */
function all_component_features_default_environment_indicator_environment() {
  $export = array();

  $environment = new stdClass();
  $environment->disabled = FALSE; /* Edit this to true to make a default environment disabled initially */
  $environment->api_version = 1;
  $environment->machine = 'development_environment';
  $environment->name = 'Development Environment';
  $environment->regexurl = 'dev-*';
  $environment->settings = array(
    'color' => '#fd7272',
    'text_color' => '#ffffff',
    'weight' => '',
    'position' => 'top',
    'fixed' => 0,
  );
  $export['development_environment'] = $environment;

  $environment = new stdClass();
  $environment->disabled = FALSE; /* Edit this to true to make a default environment disabled initially */
  $environment->api_version = 1;
  $environment->machine = 'testing_environment';
  $environment->name = 'Testing Environment';
  $environment->regexurl = 'test-*';
  $environment->settings = array(
    'color' => '#fbf479',
    'text_color' => '#ffffff',
    'weight' => '',
    'position' => 'top',
    'fixed' => 0,
  );
  $export['testing_environment'] = $environment;

  return $export;
}
