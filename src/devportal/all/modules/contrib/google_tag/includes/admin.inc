<?php

/**
 * @file
 * Contains the administrative page and form callbacks.
 *
 * @author Jim Berry ("solotandem", http://drupal.org/user/240748)
 */

/**
 * Form constructor for the module settings form.
 *
 * @see google_tag_settings_form_validate()
 *
 * @ingroup forms
 */
function google_tag_settings_form($form, &$form_state) {
  // Gather data.
  // @todo Set this on validation errors.
  $default_tab = !empty($form_state['default_tab']) ? $form_state['default_tab'] : '';

  // Build form elements.
  $form['tabs'] = array(
    '#type' => 'vertical_tabs',
    '#default_tab' => $default_tab ? $default_tab : 'edit-general',
    '#attributes' => array('class' => array('google-tag')),
    '#attached' => array(
      'css' => array(drupal_get_path('module', 'google_tag') . '/css/google_tag.admin.css'),
      'js' => array(drupal_get_path('module', 'google_tag') . '/js/google_tag.admin.js'),
    ),
  );
  $form['tabs']['general'] = google_tag_general_fieldset($form_state);
  $form['tabs']['paths'] = google_tag_path_fieldset($form_state);
  $form['tabs']['roles'] = google_tag_role_fieldset($form_state);
  $form['tabs']['statuses'] = google_tag_status_fieldset($form_state);
  $form['tabs']['advanced'] = google_tag_advanced_fieldset($form_state);

  return system_settings_form($form);
}

/**
 * Fieldset builder for the module settings form.
 */
function google_tag_general_fieldset(&$form_state) {
  // Gather data.
  $text = t('sign up for GTM');
  $link = l($text, 'http://www.google.com/tagmanager/web/');

  // Build form elements.
  $fieldset = array(
    '#type' => 'fieldset',
    '#title' => t('General'),
    '#tree' => FALSE,
  );

  $fieldset['google_tag_container_id'] = array(
    '#type' => 'textfield',
    '#title' => t('Container ID'),
    '#description' => t('The ID assigned by Google Tag Manager (GTM) for this website container. To get a container ID, !link and create a container for your website.', array('!link' => $link)),
    '#default_value' => variable_get('google_tag_container_id', ''),
    '#attributes' => array('placeholder' => array('GTM-xxxxxx')),
    '#size' => 10,
    '#maxlength' => 15,
    '#required' => TRUE,
  );

  return $fieldset;
}

/**
 * Fieldset builder for the module settings form.
 *
 * Allows user to specify snippet insertion condition based on page path.
 */
function google_tag_path_fieldset(&$form_state) {
  // Gather data.
  $description = t('On this and the following tab, specify the conditions on which the GTM JavaScript snippet will either be included in or excluded from the page response, thereby enabling or disabling tracking and other analytics.');
  $description .= t(' All conditions must be satisfied for the snippet to be included. The snippet will be excluded if any condition is not met.<br /><br />');
  $description .= t(' On this tab, specify the path condition.');

  $list_description = t('Enter one relative path per line using the "*" character as a wildcard. Example paths are: "%blog" for the blog page, "%blog-wildcard" for each individual blog, and "%front" for the front page.', array('%blog' => 'blog', '%blog-wildcard' => 'blog/*', '%front' => '<front>'));

  // Build form elements.
  $fieldset = array(
    '#type' => 'fieldset',
    '#title' => t('Page paths'),
    '#description' => $description,
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
    '#tree' => FALSE,
  );

  $fieldset['google_tag_path_toggle'] = array(
    '#type' => 'radios',
    '#title' => t('Add snippet on specific paths'),
    '#options' => array(
      t('All paths except the listed paths'),
      t('Only the listed paths'),
    ),
    '#default_value' => variable_get('google_tag_path_toggle', 0),
  );
  $fieldset['google_tag_path_list'] = array(
    '#type' => 'textarea',
    '#title' => t('Listed paths'),
    '#description' => $list_description,
    '#default_value' => variable_get('google_tag_path_list', GOOGLETAGMANAGER_PATHS),
    '#rows' => 10,
  );

  return $fieldset;
}

/**
 * Fieldset builder for the module settings form.
 *
 * Allows user to specify snippet insertion condition based on user role.
 */
function google_tag_role_fieldset(&$form_state) {
  // Gather data.
  $roles = array_map('check_plain', user_roles());

  // Build form elements.
  $fieldset = array(
    '#type' => 'fieldset',
    '#title' => t('User roles'),
    '#description' => t('On this tab, specify the user role condition.'),
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
    '#tree' => FALSE,
  );

  $fieldset['google_tag_role_toggle'] = array(
    '#type' => 'radios',
    '#title' => t('Add snippet for specific roles'),
    '#options' => array(
      t('All roles except the selected roles'),
      t('Only the selected roles'),
    ),
    '#default_value' => variable_get('google_tag_role_toggle', 0),
  );

  $fieldset['google_tag_role_list'] = array(
    '#type' => 'checkboxes',
    '#title' => t('Selected roles'),
    '#default_value' => variable_get('google_tag_role_list', array()),
    '#options' => $roles,
  );

  return $fieldset;
}

/**
 * Fieldset builder for the module settings form.
 *
 * Allows user to specify snippet insertion condition based on response status.
 */
function google_tag_status_fieldset(&$form_state) {
  // Gather data.
  $text = t('list of HTTP status codes');
  $link = l($text, 'http://en.wikipedia.org/wiki/List_of_HTTP_status_codes');
  $list_description = t('Enter one response status per line. For more information, refer to the !link.', array('!link' => $link));

  // Build form elements.
  $fieldset = array(
    '#type' => 'fieldset',
    '#title' => t('Response statuses'),
    '#description' => t('On this tab, specify the page response status condition. If enabled, this condition overrides the page path condition. In other words, if the HTTP response status is one of the listed statuses, then the page path condition is ignored.'),
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
    '#tree' => FALSE,
  );

  $fieldset['google_tag_status_toggle'] = array(
    '#type' => 'checkbox',
    '#title' => t('Override path condition for listed response statuses'),
    '#description' => t('If checked, then the path condition will be ingored for a listed page response status.'),
    '#default_value' => variable_get('google_tag_status_toggle', 0),
  );

  $fieldset['google_tag_status_list'] = array(
    '#type' => 'textarea',
    '#title' => t('Listed statuses'),
    '#description' => $list_description,
    '#default_value' => variable_get('google_tag_status_list', GOOGLETAGMANAGER_STATUSES),
    '#rows' => 5,
  );

  return $fieldset;
}

/**
 * Fieldset builder for the module settings form.
 */
function google_tag_advanced_fieldset(&$form_state) {
  // Build form elements.
  $fieldset = array(
    '#type' => 'fieldset',
    '#title' => t('Advanced'),
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
    '#tree' => FALSE,
  );

  $fieldset['google_tag_compact_tag'] = array(
    '#type' => 'checkbox',
    '#title' => t('Compact the JavaScript snippet'),
    '#description' => t('If checked, then the JavaScript snippet will be compacted to remove unnecessary whitespace. This is <strong>recommended on production sites</strong>. Leave unchecked to output a snippet that can be examined using a JavaScript debugger in the browser.'),
    '#default_value' => variable_get('google_tag_compact_tag', 1),
  );

  return $fieldset;
}

/**
 * Form validation handler for google_tag_settings_form().
 */
function google_tag_settings_form_validate($form, &$form_state) {
  $values = &$form_state['values'];

  // Trim the text values.
  $values['google_tag_container_id'] = trim($values['google_tag_container_id']);
  $values['google_tag_path_list'] = trim($values['google_tag_path_list']);
  $values['google_tag_status_list'] = trim($values['google_tag_status_list']);

  // Replace all types of dashes (n-dash, m-dash, minus) with a normal dash.
  $values['google_tag_container_id'] = str_replace(array('–', '—', '−'), '-', $values['google_tag_container_id']);

  if (!preg_match('/^GTM-\w{4,}$/', $values['google_tag_container_id'])) {
    // @todo Is there a more specific regular expression that applies?
    // @todo Is there a way to "test the connection" to determine a valid ID for
    // a container? It may be valid but not the correct one for the website.
    form_set_error('google_tag_container_id', t('A valid container ID is case sensitive and formatted like GTM-xxxxxx.'));
  }
}
