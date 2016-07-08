<?php
/**
 * @file
 * Provides info-type hook implementations that are infrequently called.
 *
 * @author Jim Berry ("solotandem", http://drupal.org/user/240748)
 */

/**
 * Implements hook_permission().
 */
function _accordion_menu_permission() {
  return array(
    'administer accordion menu' => array(
      'title' => t('Administer accordion menu'),
      'description' => t('Create accordion menu blocks and change settings.'),
    ),
  );
}

/**
 * Implements hook_menu().
 */
function _accordion_menu_menu() {
  $items['admin/config/user-interface/accordion_menu'] = array(
    'title' => 'Accordion Menu',
    'description' => 'Add and modify accordion menu blocks.',
    'page callback' => 'drupal_get_form',
    'page arguments' => array('accordion_menu_settings_form', 2),
    'access arguments' => array('administer accordion menu'),
    'type' => MENU_NORMAL_ITEM,
    'file' => 'includes/setting.inc',
  );
  return $items;
}

/**
 * Implements hook_theme().
 */
function _accordion_menu_theme(&$existing, $type, $theme, $path) {
  return array(
    'accordion_menu_wrapper' => array(
      'template' => 'accordion-menu-wrapper',
      'variables' => array('content' => array(), 'config' => array(), 'delta' => NULL),
      'pattern' => 'accordion_menu_wrapper__',
      'file' => 'includes/view.inc',
    ),
    'accordion_menu_header' => array(
      'render element' => 'element',
      'file' => 'includes/view.inc',
    ),
  );
}

/**
 * Implements hook_block_info().
 */
function _accordion_menu_block_info() {
  $key = 'menu_name';
  for ($delta = 1; $delta <= variable_get('accordion_menu_count', '2'); $delta++) {
    $blocks[$delta]['info'] = variable_get("accordion_menu_{$delta}_{$key}", 'Menu ' . $delta) . ' (accordion)';
    $blocks[$delta]['cache'] = DRUPAL_NO_CACHE;
  }
  return $blocks;
}
