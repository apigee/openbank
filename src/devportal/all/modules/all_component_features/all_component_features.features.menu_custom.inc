<?php
/**
 * @file
 * all_component_features.features.menu_custom.inc
 */

/**
 * Implements hook_menu_default_menu_custom().
 */
function all_component_features_menu_default_menu_custom() {
  $menus = array();

  // Exported menu: main-menu.
  $menus['main-menu'] = array(
    'menu_name' => 'main-menu',
    'title' => 'Main menu',
    'description' => 'The <em>Main</em> menu is used on many sites to show the major sections of the site, often in a top navigation bar.',
  );
  // Exported menu: management.
  $menus['management'] = array(
    'menu_name' => 'management',
    'title' => 'Management',
    'description' => 'The <em>Management</em> menu contains links for administrative tasks.',
  );
  // Exported menu: menu-api-reference.
  $menus['menu-api-reference'] = array(
    'menu_name' => 'menu-api-reference',
    'title' => 'API Reference',
    'description' => '',
  );
  // Exported menu: menu-apis.
  $menus['menu-apis'] = array(
    'menu_name' => 'menu-apis',
    'title' => 'APIs',
    'description' => 'API Explorer',
  );
  // Exported menu: menu-overview.
  $menus['menu-overview'] = array(
    'menu_name' => 'menu-overview',
    'title' => 'Overview',
    'description' => '',
  );
  // Exported menu: navigation.
  $menus['navigation'] = array(
    'menu_name' => 'navigation',
    'title' => 'Navigation',
    'description' => 'The <em>Navigation</em> menu contains links intended for site visitors. Links are added to the <em>Navigation</em> menu automatically by some modules.',
  );
  // Exported menu: user-menu.
  $menus['user-menu'] = array(
    'menu_name' => 'user-menu',
    'title' => 'User menu',
    'description' => 'The <em>User</em> menu contains links related to the user\'s account, as well as the \'Log out\' link.',
  );
  // Translatables
  // Included for use with string extractors like potx.
  t('API Explorer');
  t('API Reference');
  t('APIs');
  t('Main menu');
  t('Management');
  t('Navigation');
  t('Overview');
  t('The <em>Main</em> menu is used on many sites to show the major sections of the site, often in a top navigation bar.');
  t('The <em>Management</em> menu contains links for administrative tasks.');
  t('The <em>Navigation</em> menu contains links intended for site visitors. Links are added to the <em>Navigation</em> menu automatically by some modules.');
  t('The <em>User</em> menu contains links related to the user\'s account, as well as the \'Log out\' link.');
  t('User menu');

  return $menus;
}
