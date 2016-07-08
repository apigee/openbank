<?php
/**
 * @file
 * Provides block configuration routines.
 *
 * @author Jim Berry ("solotandem", http://drupal.org/user/240748)
 */

/**
 * Implements hook_block_configure().
 */
function _accordion_menu_block_configure($delta) {
  // Gather information.
  $config = accordion_menu_config($delta);
  $options = array('' => '- None -') + menu_get_menus();
  if (module_exists('menu_block')) {
    // Add menu_block sub-menus.
    $menus = menu_block_block_info();
    $block_options = array('' => '- None -');
    foreach ($menus as $delta => $menu) {
      $block_options[$delta] = $menu['info'];
    }
  }
  else {
    drupal_set_message(t('If you enable the !module module, then you may display menu blocks with an accordion effect.', array('!module' => l('Menu Block', 'https://drupal.org/project/menu_block'))), 'warning');
  }

  // We use $_POST as here we don't have access to $form_state.
  if (!empty($_POST) && isset($_POST['accordion_menu_menu_source']) && $_POST['accordion_menu_menu_source'] != '') {
    $menu_name = $_POST['accordion_menu_menu_source'];
    $max_depth = _accordion_menu_get_max_depth($menu_name);
    $options_depth = drupal_map_assoc(range(1, $max_depth));
  }
  elseif (!empty($config['menu_source'])) {
    $menu_name = $config['menu_source'];
    $max_depth = _accordion_menu_get_max_depth($menu_name);
    $options_depth = drupal_map_assoc(range(1, $max_depth));
  }
  else {
    $options_depth = array('none' => t('- Select a Menu Source -'));
  }

  // Build form.
  $fs1['basic_options'] = array(
    '#type' => 'fieldset',
    '#title' => t('Basic options'),
    '#description' => t('To be completed.'),
    '#tree' => FALSE,
  );
  $form1['accordion_menu_menu_name'] = array(
    '#type' => 'textfield',
    '#title' => t('Menu Name'),
    '#default_value' => $config['menu_name'],
  );
  $form1['accordion_menu_menu_source'] = array(
    '#type' => 'select',
    '#title' => t('Menu source'),
    '#description' => t('Select the menu to display as an accordion.'),
    '#default_value' => $config['menu_source'],
    '#options' => $options,
    '#ajax' => array(
      'callback' => '_accordion_menu_form_menu_depth_options',
      'wrapper' => 'accordion-menu-depth',
      'replace' => 'replace',
    ),
  );
  $form1['accordion_menu_menu_depth'] = array(
    '#type' => 'select',
    '#title' => t('Accordion depth'),
    '#description' => t('Select the depth to which the accordion must propagate.'),
    '#default_value' => $config['menu_depth'],
    '#options' => $options_depth,
    '#prefix' => '<div id="accordion-menu-depth">',
    '#suffix' => '</div>',
  );
  if (module_exists('menu_block')) {
    $form1['accordion_menu_block_source'] = array(
      '#type' => 'select',
      '#title' => t('Menu block source'),
      '#description' => t('Select the menu block to display as an accordion. This will override the menu source above.'),
      '#default_value' => $config['block_source'],
      '#options' => $block_options,
    );
  }
  $form1['accordion_menu_script_scope'] = array(
    '#type' => 'textfield',
    '#title' => t('Script scope'),
    '#description' => t('The location in which to place the script. The location must be implemented by the theme. Values include "<strong>header</strong>" and "<strong>footer</strong>" by default.'),
    '#default_value' => $config['script_scope'],
    '#size' => 10,
  );
  $form1['accordion_menu_header_link'] = array(
    '#type' => 'checkbox',
    '#title' => t('Header link'),
    '#description' => t('If checked, header menu items will be output as links. Clicking on the menu item may trigger the accordion effect and a redirect to the header link. <strong>Undesirable</strong>'),
    '#default_value' => $config['header_link'],
  );
  $form1['accordion_menu_menu_expanded'] = array(
    '#type' => 'checkbox',
    '#title' => t('Expand menu'),
    '#description' => t('If checked, menu items in the active trail will be expanded. Otherwise, menus will not be expanded on page load.'),
    '#default_value' => $config['menu_expanded'],
  );
  $fs1['basic_options'] += $form1;

  $fs2['jquery_noticeable'] = array(
    '#type' => 'fieldset',
    '#title' => t('Noticeable options'),
    '#description' => t('These jQuery Accordion options noticeably affect a menu displayed as an accordion. Some are marked as "undesirable" for use with a menu.'),
    '#tree' => FALSE,
  );
  $form2['accordion_menu_header'] = array(
    '#type' => 'textfield',
    '#title' => t('Header'),
    '#description' => t('Selector for the header element.'),
    '#default_value' => $config['header'],
    '#size' => 15,
  );
  $form2['accordion_menu_animated'] = array(
    '#type' => 'textfield',
    '#title' => t('Animation'),
    '#description' => t('Enter the name of an animation, or set to "false" to disable them. In addition to the default of "<strong>slide</strong>", "bounceslide" and all defined easing methods are supported ("bounceslide" requires UI Effects Core). With menu items, the alternative effects are mostly unnoticeable.'),
    '#default_value' => $config['animated'],
    '#size' => 10,
  );
  $form2['accordion_menu_header_icon'] = array(
    '#type' => 'textfield',
    '#title' => t('Header icon'),
    '#description' => t('Enter the name of the icon to use on a header. jQuery recommends using the icons native to the jQuery UI CSS Framework. Default value is "<strong>ui-icon-triangle-1-e</strong>."'),
    '#default_value' => $config['header_icon'],
  );
  $form2['accordion_menu_selected_icon'] = array(
    '#type' => 'textfield',
    '#title' => t('Selected header icon'),
    '#description' => t('Enter the name of the icon to use on a selected header. jQuery recommends using the icons native to the jQuery UI CSS Framework. Default value is "<strong>ui-icon-triangle-1-s</strong>."'),
    '#default_value' => $config['selected_icon'],
  );
  $form2['accordion_menu_empty_icon'] = array(
    '#type' => 'textfield',
    '#title' => t('Empty header icon'),
    '#description' => t('Enter the name of the icon to use on an empty header (i.e., no children). See !link for the icons native to the jQuery UI CSS Framework."', array('!link' => l('this page', 'http://jqueryui.com/themeroller/'))),
    '#default_value' => $config['empty_icon'],
  );
  $form2['accordion_menu_event'] = array(
    '#type' => 'select',
    '#title' => t('Event'),
    '#description' => t('The event on which to trigger the accordion. Suggested use: If the top-level menu item does not link to content, then select "click" to expand the menu. If the top-level menu item links to content, then select "mousedown" to expand the menu and display the linked content. Use "mouseover" at your own risk.'),
    '#default_value' => $config['event'],
    '#options' => drupal_map_assoc(array('click', 'mousedown', 'mouseover')),
  );
  $form2['accordion_menu_collapsible'] = array(
    '#type' => 'checkbox',
    '#title' => t('Collapsible'),
    '#description' => t('Whether all the sections can be closed at once. Allows collapsing the active section by the triggering event.'),
    '#default_value' => $config['collapsible'],
  );
  $form2['accordion_menu_icons'] = array(
    '#type' => 'checkbox',
    '#title' => t('Icons'),
    '#description' => t('If checked, then the icons specified above will be used on header elements. Uncheck to omit the icons.'),
    '#default_value' => $config['icons'],
  );
  $form2['accordion_menu_auto_height'] = array(
    '#type' => 'checkbox',
    '#title' => t('Auto height'),
    '#description' => t('If checked, the highest content part is used as height reference for all other parts. Provides more consistent animations. <strong>Undesirable</strong>'),
    '#default_value' => $config['auto_height'],
  );
  $form2['accordion_menu_clear_style'] = array(
    '#type' => 'checkbox',
    '#title' => t('Clear style'),
    '#description' => t('If checked, clears height and overflow styles after finishing animations. This enables accordions to work with dynamic content, but does not work with auto_height.'),
    '#default_value' => $config['clear_style'],
  );
  $form2['accordion_menu_fill_space'] = array(
    '#type' => 'checkbox',
    '#title' => t('Fill space'),
    '#description' => t('If checked, the accordion completely fills the height of the parent element. Overrides auto_height. <strong>Undesirable</strong>'),
    '#default_value' => $config['fill_space'],
  );
  $fs2['jquery_noticeable'] += $form2;

  $fs3['jquery_unnoticeable'] = array(
    '#type' => 'fieldset',
    '#title' => t('Unnoticeable options'),
    '#description' => t('These jQuery Accordion options do not noticeably affect a menu displayed as an accordion.'),
    '#tree' => FALSE,
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
  );
  $form3['accordion_menu_navigation'] = array(
    '#type' => 'checkbox',
    '#title' => t('Navigation'),
    '#description' => t('If checked, looks for the anchor that matches location.href and activates it. Great for href-based state-saving. Use navigationFilter to implement your own matcher.'),
    '#default_value' => $config['navigation'],
  );
  $fs3['jquery_unnoticeable'] += $form3;


  // Build the form.
  $form['tabs'] = array(
    '#type' => 'vertical_tabs',
    '#default_tab' => 'edit-directories',
  );
  $form['tabs']['basic'] = $fs1['basic_options'];
  $form['tabs']['noticeable'] = $fs2['jquery_noticeable'];
  $form['tabs']['unnoticeable'] = $fs3['jquery_unnoticeable'];

//   $form['#validate'][] = 'accordion_menu_block_validate';

  return $form;
}

/**
 * Form validation handler for hook_block_configure().
 */
function _accordion_menu_block_validate($form, &$form_state) {
  foreach (array('animated', 'script_scope') as $key) {
    // Value may include letters only.
    // This is not validating the string, but simply requiring one.
    $value = $form_state['values']['accordion_menu_' . $key];
    if (preg_match('@[^a-z]@', strtolower($value))) {
      form_set_error('accordion_menu_' . $key, t('Enter a string with only letters. (' . $key . ')'));
    }
  }
  // Value may include letters and a digit only.
  // This is not a true test for an HTML tag, but should prevent foul play.
  $key = 'header';
  $value = $form_state['values']['accordion_menu_' . $key];
  preg_match('@^([a-z]+([1-9]|)).*@', strtolower($value), $matches);
  if (empty($matches) || $matches[0] != $matches[1]) {
    form_set_error('accordion_menu_' . $key, t('Enter a valid HTML tag. (' . $key . ')'));
  }
  // Do not allow both menu source options to be blank.
  $key1 = 'menu_source';
  $value1 = $form_state['values']['accordion_menu_' . $key1];
  $key2 = 'block_source';
  $value2 = isset($form_state['values']['accordion_menu_' . $key2]) ? $form_state['values']['accordion_menu_' . $key2] : NULL;
  $key3 = 'menu_depth';
  $value3 = $form_state['values']['accordion_menu_' . $key3];
  if ($value2) {
    if (empty($value1) && empty($value2)) {
      form_set_error('accordion_menu_' . $key1, t('Select either a menu source or a menu block source. (' . $key1 . ')'));
      form_set_error('accordion_menu_' . $key2, t('Select either a menu source or a menu block source. (' . $key2 . ')'));
    }
  }
  elseif (empty($value1)) {
    form_set_error('accordion_menu_' . $key1, t('Select a menu source. (' . $key1 . ')'));
  }
  // In any case, we DO need the depth.
  if (empty($value3) || $value3 == 'none') {
    form_set_error('accordion_menu_' . $key3, t('Select a depth of the menu for accordion.'));
  }
}

/**
 * Implements hook_block_save().
 */
function _accordion_menu_block_save($delta, $edit) {
  if (!empty($delta)) {
    $config = accordion_menu_config();
    unset($config['delta']);
    // Save the block configuration settings.
    foreach ($config as $key => $value) {
      variable_set("accordion_menu_{$delta}_{$key}", $edit['accordion_menu_' . $key]);
    }
  }
}
