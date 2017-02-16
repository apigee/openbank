<?php

/**
 * @file
 * Provides info-type hook implementations that are infrequently called.
 *
 * @author Jim Berry ("solotandem", http://drupal.org/user/240748)
 */

/**
 * Implements hook_help().
 */
function _google_tag_help($path, $arg) {
  switch ($path) {
    case 'admin/help#google_tag':
    case 'admin/config/system/google_tag':
      $text = t('Google Tag Manager');
      $link = l($text, 'http://www.google.com/tagmanager/');
      return t('!link is a free service (registration required) to manage the insertion of tags for capturing website analytics.', array('!link' => $link));
  }
}

/**
 * Implements hook_menu().
 */
function _google_tag_menu() {
  $items['admin/config/system/google_tag'] = array(
    'title' => 'Google Tag Manager',
    'description' => 'Configure the website integration with GTM and the resultant capturing of website analytics.',
    'page callback' => 'drupal_get_form',
    'page arguments' => array('google_tag_settings_form'),
    'access arguments' => array('administer google tag manager'),
    'type' => MENU_NORMAL_ITEM,
    'file' => 'includes/admin.inc',
  );

  return $items;
}

/**
 * Implements hook_permission().
 */
function _google_tag_permission() {
  return array(
    'administer google tag manager' => array(
      'title' => t('Administer Google Tag Manager'),
      'description' => t('Configure the website integration with Google Tag Manager.'),
    ),
  );
}
