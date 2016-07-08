<?php
/**
 * @file
 * Provides module configuration routines.
 *
 * @author Jim Berry ("solotandem", http://drupal.org/user/240748)
 */

/**
 * Form constructor for the module settings form.
 *
 * @see accordion_menu_settings_form_validate()
 * @see http://jqueryui.com/demos/accordion/ (for jQuery 1.6 options)
 *
 * @ingroup forms
 */
function accordion_menu_settings_form($form, &$form_state) {
  $form['accordion_menu_count'] = array(
    '#type' => 'textfield',
    '#title' => t('Number of menu blocks'),
    '#description' => t('Enter the number of accordion menu blocks to create (0-99). The accordion menu theme functions may be called by another module or theme even if no blocks are created.'),
    '#default_value' => variable_get('accordion_menu_count', '2'),
    '#size' => 2,
  );

  // Custom validation to make sure the user is entering numbers.
  $form['#validate'][] = 'accordion_menu_settings_form_validate';

  return system_settings_form($form);
}

/**
 * Form validation handler for accordion_menu_settings_form().
 *
 * @todo Delete variables if count is reduced?
 */
function accordion_menu_settings_form_validate($form, &$form_state) {
  $number = $form_state['values']['accordion_menu_count'];
  // Check to make sure it is a number and that is a maximum of 2 digits.
  if (!is_numeric($number) || strlen($number) > 2) {
    form_set_error('accordion_menu_count', t('You must enter a number from 0 to 99.'));
  }
}
