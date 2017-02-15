<?php
/**
 * @file
 * all_component_features.features.user_role.inc
 */

/**
 * Implements hook_user_default_roles().
 */
function all_component_features_user_default_roles() {
  $roles = array();

  // Exported role: Developer.
  $roles['Developer'] = array(
    'name' => 'Developer',
    'weight' => 13,
  );

  // Exported role: Finance Administrator.
  $roles['Finance Administrator'] = array(
    'name' => 'Finance Administrator',
    'weight' => 12,
  );

  // Exported role: Monetization Administrator.
  $roles['Monetization Administrator'] = array(
    'name' => 'Monetization Administrator',
    'weight' => 11,
  );

  // Exported role: administrator.
  $roles['administrator'] = array(
    'name' => 'administrator',
    'weight' => 10,
  );

  return $roles;
}
