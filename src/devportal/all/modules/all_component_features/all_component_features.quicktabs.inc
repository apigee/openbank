<?php
/**
 * @file
 * all_component_features.quicktabs.inc
 */

/**
 * Implements hook_quicktabs_default_quicktabs().
 */
function all_component_features_quicktabs_default_quicktabs() {
  $export = array();

  $quicktabs = new stdClass();
  $quicktabs->disabled = FALSE; /* Edit this to true to make a default quicktabs disabled initially */
  $quicktabs->api_version = 1;
  $quicktabs->machine_name = 'api_documentation';
  $quicktabs->ajax = 0;
  $quicktabs->hide_empty_tabs = FALSE;
  $quicktabs->default_tab = 1;
  $quicktabs->title = 'API Documentation';
  $quicktabs->tabs = array(
    0 => array(
      'vid' => 'oauthapis_methods',
      'display' => 'frontpage',
      'args' => '',
      'title' => 'OAuth 2.0',
      'weight' => '-100',
      'type' => 'view',
    ),
    1 => array(
      'vid' => 'accountsapis_methods',
      'display' => 'frontpage',
      'args' => '',
      'title' => 'Account Access',
      'weight' => '-99',
      'type' => 'view',
    ),
    2 => array(
      'vid' => 'payment-transfersapis_methods',
      'display' => 'frontpage',
      'args' => '',
      'title' => 'Payment Transfer',
      'weight' => '-98',
      'type' => 'view',
    ),
    3 => array(
      'vid' => 'open-dataapis_methods',
      'display' => 'frontpage',
      'args' => '',
      'title' => 'Open Data',
      'weight' => '-97',
      'type' => 'view',
    ),
    4 => array(
      'vid' => 'userinfoapis_methods',
      'display' => 'frontpage',
      'args' => '',
      'title' => 'User Info',
      'weight' => '-96',
      'type' => 'view',
    ),
    5 => array(
      'vid' => 'productapis_methods',
      'display' => 'frontpage',
      'args' => '',
      'title' => 'Products',
      'weight' => '-95',
      'type' => 'view',
    ),
  );
  $quicktabs->renderer = 'accordion';
  $quicktabs->style = 'default';
  $quicktabs->options = array(
    'history' => 1,
    'jquery_ui' => array(
      'autoHeight' => 1,
      'collapsible' => 1,
    ),
  );

  // Translatables
  // Included for use with string extractors like potx.
  t('API Documentation');
  t('Account Access');
  t('OAuth 2.0');
  t('Open Data');
  t('Payment Transfer');
  t('User Info');

  $export['api_documentation'] = $quicktabs;

  return $export;
}
