<?php
/**
 * @file
 * Administrative page callbacks for the flexslider module.
 */

/**
 * Submit handler for adding a new option set.
 */
function flexslider_form_optionset_add_submit($form, &$form_state) {
  $optionset = flexslider_optionset_create(array('name' => $form_state['values']['name'], 'title' => $form_state['values']['title']));

  $saved = flexslider_optionset_save($optionset, TRUE);

  if ($saved) {
    drupal_set_message(t('Option set %name was created.', array('%name' => $optionset->name)));
    $form_state['redirect'] = 'admin/config/media/flexslider/edit/' . $optionset->name;
  }
  else {
    drupal_set_message(t('Failed to create option set. Please verify your settings.'), 'error');
  }
}

/**
 * Defines the form elements used to edit the FlexSlider library options
 *
 * @param array $options [optional]
 *  Pass in a set of default values for the options
 * @return array
 *  Returns the option set array
 */
function flexslider_option_elements($options = array()) {
  $form = array();

  // General Slideshow and Animiation Settings
  $form['animation_slideshow'] = array(
    '#type' => 'fieldset',
    '#title' => t('General Slideshow and Animation Settings'),
  );

  $form['animation_slideshow']['animation'] = array(
    '#type' => 'select',
    '#title' => t('Animation'),
    '#description' => t('Select your animation type'),
    '#options' => array(
      'fade'   => t('Fade'),
      'slide'  => t('Slide'),
    ),
    '#default_value' => isset($options['animation']) ? $options['animation'] : _flexslider_optionset_defaults('animation'),
    // @todo add states to enable/disable the direction
  );

  $form['animation_slideshow']['animationSpeed'] = array(
    '#type' => 'textfield',
    '#title' => t('Animation Speed'),
    '#description' => t('Set the speed of animations, in milliseconds'),
    '#element_validate' => array('_flexslider_validate_positive_integer'),
    '#default_value' => isset($options['animationSpeed']) ? $options['animationSpeed'] : _flexslider_optionset_defaults('animationSpeed'),
    '#size' => 30,
  );

  $form['animation_slideshow']['direction'] = array(
    '#type' => 'select',
    '#title' => t('Slide Direction'),
    '#description' => t('Select the sliding direction, "horizontal" or "vertical"'),
    '#options' => array(
      'horizontal'   => t('Horizontal'),
      'vertical'  => t('Vertical'),
    ),
    '#default_value' =>  isset($options['direction']) ? $options['direction'] : _flexslider_optionset_defaults('direction'),
  );

  $form['animation_slideshow']['slideshow'] = array(
    '#type' => 'checkbox',
    '#title' => t('Slideshow'),
    '#description' => t('Animate the slides automatically'),
    '#default_value' => isset($options['slideshow']) ? $options['slideshow'] : _flexslider_optionset_defaults('slideshow'),
  );

  // Build in support for easing plugin
  $easing_options = array('swing' => t('Swing'), 'linear' => t('Linear'));
  if (module_exists('jqeasing')) {
    $easing_options = array_merge($easing_options, _flexslider_jqeasing_options());
    
  }

  $form['animation_slideshow']['easing'] = array(
    '#type' => 'select',
    '#title' => t('Easing'),
    '#multiple' => FALSE,
    '#description' => t('The description appears usually below the item.'),
    '#options' => $easing_options,
    '#default_value' => isset($options['easing']) ? $options['easing'] : _flexslider_optionset_defaults('easing'),
  );

  $form['animation_slideshow']['smoothHeight'] = array(
    '#type' => 'checkbox',
    '#title' => t('Smooth Height'),
    '#description' => t('Animate the height of the slider smoothly for slides of varying height.'),
    '#default_value' => isset($options['smoothHeight']) ? $options['smoothHeight'] : _flexslider_optionset_defaults('smoothHeight'),
  );

  $form['animation_slideshow']['reverse'] = array(
    '#type' => 'checkbox',
    '#title' => t('Reverse'),
    '#description' => t('Animate the slides in reverse'),
    '#default_value' => isset($options['reverse']) ? $options['reverse'] : _flexslider_optionset_defaults('reverse'),
  );

  $form['animation_slideshow']['slideshowSpeed'] = array(
    '#type' => 'textfield',
    '#title' => t('Slideshow speed'),
    '#description' => t('Set the speed of the slideshow cycling, in milliseconds'),
    '#element_validate' => array('_flexslider_validate_positive_integer'),
    '#default_value' => isset($options['slideshowSpeed']) ? $options['slideshowSpeed'] : _flexslider_optionset_defaults('slideshowSpeed'),
    '#size' => 30,
  );

  $form['animation_slideshow']['animationLoop'] = array(
    '#type' => 'checkbox',
    '#title' => t('Loop Slideshow'),
    '#description' => t('Loop the slideshow once it reaches the last slide.'),
    '#default_value' => isset($options['animationLoop']) ? $options['animationLoop'] : _flexslider_optionset_defaults('animationLoop'),
  );

  $form['animation_slideshow']['randomize'] = array(
    '#type' => 'checkbox',
    '#title' => t('Randomize Slide Order'),
    '#description' => t('Randomize the order the slides play back.'),
    '#default_value' => isset($options['randomize']) ? $options['randomize'] : _flexslider_optionset_defaults('randomize'),
  );
  $form['animation_slideshow']['startAt'] = array(
    '#type' => 'textfield',
    '#title' => t('Starting Slide'),
    '#description' => t('The slide that the slider should start on. Ex: For the first slide enter "0", for the second enter "1", etc. If you enter a value which is greater than the number of slides, the slider will default to the first slide.'),
    '#element_validate' => array('_flexslider_validate_positive_integer'),
    '#default_value' => isset($options['startAt']) ? $options['startAt'] : _flexslider_optionset_defaults('startAt'),
    '#size' => 30,
    // @todo add states to disable if randomize is set
  );

  $form['animation_slideshow']['itemWidth'] = array(
    '#type' => 'textfield',
    '#title' => t('Item Width'),
    '#description' => t('Box-model width of individual carousel items, including horizontal borders and padding.'),
    '#size' => 40,
    '#maxlength' => 255,
    '#default_value' => isset($options['itemWidth']) ? $options['itemWidth'] : _flexslider_optionset_defaults('itemWidth'),
  );
  $form['animation_slideshow']['itemMargin'] = array(
    '#type' => 'textfield',
    '#title' => t('Item Margin'),
    '#description' => t('Margin between carousel items. (NB: the margin must be set in your CSS styles. This property merely informs FlexSlider of the margin.)'),
    '#size' => 40,
    '#maxlength' => 255,
    '#default_value' => isset($options['itemMargin']) ? $options['itemMargin'] : _flexslider_optionset_defaults('itemMargin'),
  );
  $form['animation_slideshow']['minItems'] = array(
    '#type' => 'textfield',
    '#title' => t('Minimum Items'),
    '#description' => t('Minimum number of carousel items that should be visible.'),
    '#size' => 40,
    '#maxlength' => 255,
    '#default_value' => isset($options['minItems']) ? $options['minItems'] : _flexslider_optionset_defaults('minItems'),
  );
  $form['animation_slideshow']['maxItems'] = array(
    '#type' => 'textfield',
    '#title' => t('Max Items'),
    '#description' => t('Maximum number of carousel items that should be visible.'),
    '#size' => 40,
    '#maxlength' => 255,
    '#default_value' => isset($options['maxItems']) ? $options['maxItems'] : _flexslider_optionset_defaults('maxItems'),
  );
  $form['animation_slideshow']['move'] = array(
    '#type' => 'textfield',
    '#title' => t('Move'),
    '#description' => t('Number of carousel items that should move on animation. If 0, slider will move all visible items.'),
    '#size' => 40,
    '#maxlength' => 255,
    '#default_value' => isset($options['move']) ? $options['move'] : _flexslider_optionset_defaults('move'),
  );

  // Navigation and Control Settings
  $form['nav_controls'] = array(
    '#type' => 'fieldset',
    '#title' => t('Navigation and Control Settings'),
  );
  $form['nav_controls']['directionNav'] = array(
    '#type' => 'checkbox',
    '#title' => t('Next/Previous Controls'),
    '#description' => t('Add controls for previous/next navigation'),
    '#default_value' => isset($options['directionNav']) ? $options['directionNav'] : _flexslider_optionset_defaults('directionNav'),
  );
  $form['nav_controls']['controlNav'] = array(
    '#type' => 'select',
    '#title' => t('Paging Controls'),
    '#description' => t('Add controls to jump to individual slides. (Note: set to "On" if using Manual Controls)'),
    '#default_value' => isset($options['controlNav']) ? $options['controlNav'] : _flexslider_optionset_defaults('controlNav'),
    '#options' => array(
      0 => t('Off'),
      1 => t('On'),
      'thumbnails' => t('Thumbnails'),
    )
  );
  $form['nav_controls']['thumbCaptions'] = array(
    '#type' => 'checkbox',
    '#title' => t('Thumbnail Captions'),
    '#description' => t('<em>Requires FlexSlider Library 2.2+</em>. After selecting this captions will be added to thumbnails and removed from the main slide.'),
    '#default_value' => isset($options['thumbCaptions']) ? $options['thumbCaptions'] : _flexslider_optionset_defaults('thumbCaptions'),
    '#states' => array(
      'visible' => array(
        ':input[name="controlNav"]' => array('value' => 'thumbnails'),
      ),
    ),
    '#element_validate' => array('_flexslider_validate_minimum_version_22'),
  );
  $form['nav_controls']['thumbCaptionsBoth'] = array(
    '#type' => 'checkbox',
    '#title' => t('Display both thumbnail captions and normal captions'),
    '#description' => t('<em>Requires FlexSlider Library 2.2+</em>. Display captions in the thumbnail as well as in the slider.'),
    '#default_value' => isset($options['thumbCaptionsBoth']) ? $options['thumbCaptionsBoth'] : _flexslider_optionset_defaults('thumbCaptionsBoth'),
    '#states' => array(
      'visible' => array(
        ':input[name="controlNav"]' => array('value' => 'thumbnails'),
      ),
    ),
    '#element_validate' => array('_flexslider_validate_minimum_version_22'),
  );
  $form['nav_controls']['keyboard'] = array(
    '#type' => 'checkbox',
    '#title' => t('Keyboard Navigation'),
    '#description' => t('Allow slider navigating via keyboard left/right keys'),
    '#default_value' => isset($options['keyboard']) ? $options['keyboard'] : _flexslider_optionset_defaults('keyboard'),
  );
  $form['nav_controls']['multipleKeyboard'] = array(
    '#type' => 'checkbox',
    '#title' => t('Multiple Keyboard'),
    '#description' => t('Allow keyboard navigation to affect multiple sliders.'),
    '#default_value' => isset($options['multipleKeyboard']) ? $options['multipleKeyboard'] : _flexslider_optionset_defaults('multipleKeyboard'),
  );
  $form['nav_controls']['mousewheel'] = array(
    '#type' => 'checkbox',
    '#title' => t('Mousewheel Navigation'),
    '#description' => t('Allow slider navigating via mousewheel'),
    '#default_value' => isset($options['mousewheel']) ? $options['mousewheel'] : _flexslider_optionset_defaults('mousewheel'),
    // @todo add check for jquery mousewheel library
  );
  $form['nav_controls']['touch'] = array(
    '#type' => 'checkbox',
    '#title' => t('Touch'),
    '#description' => t('Allow touch swipe navigation.'),
    '#default_value' => isset($options['touch']) ? $options['touch'] : _flexslider_optionset_defaults('touch'),
  );
  $form['nav_controls']['prevText'] = array(
    '#type' => 'textfield',
    '#title' => t('Previous Link Text'),
    '#description' => t('Set the text for the "previous" control item. <em>Text translation can be controlled using the <a href="http://drupal.org/project/stringoverrides">String Overrides module</a>.</em>'),
    '#default_value' => isset($options['prevText']) ? $options['prevText'] : _flexslider_optionset_defaults('prevText'),
  );
  $form['nav_controls']['nextText'] = array(
    '#type' => 'textfield',
    '#title' => t('Next Link Text'),
    '#description' => t('Set the text for the "next" control item. <em>Text translation can be controlled using the <a href="http://drupal.org/project/stringoverrides">String Overrides module</a>.</em>'),
    '#default_value' => isset($options['nextText']) ? $options['nextText'] : _flexslider_optionset_defaults('nextText'),
  );

  // Advanced Options
  $form['advanced'] = array(
    '#type' => 'fieldset',
    '#title' => t('Advanced Options'),
  );
  $form['advanced']['namespace'] = array(
    '#type' => 'textfield',
    '#title' => t('Namespace'),
    '#description' => t('Prefix string attached to the classes of all elements generated by the plugin.'),
    '#size' => 40,
    '#maxlength' => 255,
    '#element_validate' => array('_flexslider_validate_namespace'),
    '#default_value' => isset($options['namespace']) ? $options['namespace'] : _flexslider_optionset_defaults('namespace'),
  );
  $form['advanced']['selector'] = array(
    '#type' => 'textfield',
    '#title' => t('Selector'),
    '#description' => t('Must match a simple pattern. "{container} > {slide}".'),
    '#size' => 40,
    '#maxlength' => 255,
    '#element_validate' => array('_flexslider_validate_selector'),
    '#default_value' => isset($options['selector']) ? $options['selector'] : _flexslider_optionset_defaults('selector'),
  );
  $form['advanced']['sync'] = array(
    '#type' => 'textfield',
    '#title' => t('Sync'),
    '#description' => t('Mirror the actions performed on this slider with another slider.'),
    '#size' => 40,
    '#maxlength' => 255,
    '#default_value' => isset($options['sync']) ? $options['sync'] : _flexslider_optionset_defaults('sync'),
  );
  $form['advanced']['asNavFor'] = array(
    '#type' => 'textfield',
    '#title' => t('Use as navigation'),
    '#description' => t('Turn the slider into a thumbnail navigation for another slider.'),
    '#size' => 40,
    '#maxlength' => 255,
    '#default_value' => isset($options['asNavFor']) ? $options['asNavFor'] : _flexslider_optionset_defaults('asNavFor'),
  );

  $form['advanced']['initDelay'] =  array(
    '#type' => 'textfield',
    '#title' => t('Initialize Delay'),
    '#description' => t('Set an initialization delay, in milliseconds.'),
    '#size' => 20,
    '#maxlength' => 255,
    '#default_value' => isset($options['initDelay']) ? $options['initDelay'] : _flexslider_optionset_defaults('initDelay'),
    //'#element_validate' => add validate on zero or greater integer
  );
  $form['advanced']['useCSS'] = array(
    '#type' => 'checkbox',
    '#title' => t('Use CSS'),
    '#description' => t('Slider will use CSS3 transitions, if available.'),
    '#default_value' => isset($options['useCSS']) ? $options['useCSS'] : _flexslider_optionset_defaults('useCSS'),
  );
  $form['advanced']['video'] = array(
    '#type' => 'checkbox',
    '#title' => t('Video'),
    '#description' => t('Will prevent use of CSS3 3D Transforms, avoiding graphical glitches.'),
    '#default_value' => isset($options['video']) ? $options['video'] : _flexslider_optionset_defaults('video'),
  );
  $form['advanced']['pausePlay'] = array(
    '#type' => 'checkbox',
    '#title' => t('Add Pause/Play Indicator'),
    '#description' => t('Have FlexSlider add an element indicating the current state of the slideshow (i.e. "pause" or "play").'),
    '#default_value' => isset($options['pausePlay']) ? $options['pausePlay'] : _flexslider_optionset_defaults('pausePlay'),
    // @todo add states value for pause/play text
  );
  $form['advanced']['pauseText'] = array(
    '#type' => 'textfield',
    '#title' => t('Pause State Text'),
    '#description' => t('Set the text for the "pause" state indicator. <em>Text translation can be controlled using the <a href="http://drupal.org/project/stringoverrides">String Overrides module</a>.</em>'),
    '#default_value' => isset($options['pauseText']) ? $options['pauseText'] : _flexslider_optionset_defaults('pauseText'),
  );
  $form['advanced']['playText'] = array(
    '#type' => 'textfield',
    '#title' => t('Play State Text'),
    '#description' => t('Set the text for the "play" state indicator. <em>Text translation can be controlled using the <a href="http://drupal.org/project/stringoverrides">String Overrides module</a>.</em>'),
    '#default_value' => isset($options['playText']) ? $options['playText'] : _flexslider_optionset_defaults('playText'),
  );
  $form['advanced']['pauseOnAction'] = array(
    '#type' => 'checkbox',
    '#title' => t('Pause On Controls'),
    '#description' => t('Pause the slideshow when interacting with control elements.'),
    '#default_value' => isset($options['pauseOnAction']) ? $options['pauseOnAction'] : _flexslider_optionset_defaults('pauseOnAction'),
  );
  $form['advanced']['pauseOnHover'] = array(
    '#type' => 'checkbox',
    '#title' => t('Pause On Hover'),
    '#description' => t('Pause the slideshow when hovering over slider, then resume when no longer hovering.'),
    '#default_value' => isset($options['pauseOnHover']) ? $options['pauseOnHover'] : _flexslider_optionset_defaults('pauseOnHover'),
  );
  $form['advanced']['controlsContainer'] = array(
    '#type' => 'textfield',
    '#title' => t('Controls container (Advanced)'),
    '#description' => t('Declare which container the navigation elements should be appended too. Default container is the flexSlider element. Example use would be ".flexslider-container", "#container", etc. If the given element is not found, the default action will be taken.'),
    '#default_value' => isset($options['controlsContainer']) ? $options['controlsContainer'] : _flexslider_optionset_defaults('controlsContainer'),
  );
  $form['advanced']['manualControls'] = array(
    '#type' => 'textfield',
    '#title' => t('Manual controls (Advanced)'),
    '#description' => t('Declare custom control navigation. Example would be ".flex-control-nav li" or "#tabs-nav li img", etc. The number of elements in your controlNav should match the number of slides/tabs.'),
    '#default_value' => isset($options['manualControls']) ? $options['manualControls'] : _flexslider_optionset_defaults('manualControls'),
  );

  return $form;
}

/**
 * Form builder; Form to edit a given option set.
 */
function flexslider_form_optionset_edit($form, &$form_state) {

  if (empty($form_state['optionset'])) {
    $optionset = flexslider_optionset_create();
  }
  else {
    $optionset = $form_state['optionset'];
  }

  // Title
  $form['title'] = array(
    '#type' => 'textfield',
    '#maxlength' => '255',
    '#title' => t('Title'),
    '#description' => t('A human-readable title for this option set.'),
    '#required' => TRUE,
    '#default_value' => $optionset->title,
  );
  $form['name'] = array(
    '#type' => 'machine_name',
    '#maxlength' => '255',
    '#machine_name' => array(
      'source' => array('title'),
      'exists' => 'flexslider_optionset_exists',
    ),
    '#required' => TRUE,
    '#default_value' => $optionset->name,
  );

  // Options Vertical Tab Group table
  $form['options'] = array(
    '#type' => 'vertical_tabs',
  );

  $default_options = flexslider_option_elements($optionset->options);
  // Add the options to the vertical tabs section
  foreach ($default_options as $key => $value) {
    $form['options'][] = $value;
  }

  return $form;
}

/**
 * Validate a form element that should have an integer value.
 */
function _flexslider_validate_positive_integer($element, &$form_state) {
  $value = $element['#value'];
  if ($value !== '' && (!is_numeric($value) || intval($value) != $value || $value < 0)) {
    form_error($element, t('%name must be a positive integer.', array('%name' => $element['#title'])));
  }
}

/**
 * Validate a form element that should have a number as value.
 */
function _flexslider_validate_number($element, &$form_state) {
  $value = $element['#value'];
  if ($value !== '' && !is_numeric($value)) {
    form_error($element, t('%name must be a number.', array('%name' => $element['#option_name'])));
  }
}

/**
 * Form builder; Form to delete a given option set.
 */
function flexslider_optionset_form_delete($form, &$form_state, $optionset) {
  $form_state['optionset'] = &$optionset;

  // Deleting an export in code will revert it.
  $op = ($optionset->export_type & EXPORT_IN_CODE) ? 'Revert' : 'Delete';

  return confirm_form(
    $form,
    t('Are you sure you want to @action the option set %name?', array('@action' => t(drupal_strtolower($op)), '%name' => $optionset->name)),
    'admin/config/media/flexslider',
    NULL,
    t($op),  t('Cancel')
  );
}

/**
 * Submit handler for deleting an option set.
 */
function flexslider_optionset_form_delete_submit($form, &$form_state) {
  $optionset = &$form_state['optionset'];
  $op = ($optionset->export_type & EXPORT_IN_CODE) ? 'reverted' : 'deleted';

  ctools_include('export');
  ctools_export_crud_delete('flexslider_optionset', $optionset);

  drupal_set_message(t('Option set %name was ' . $op . '.', array('%name' => $optionset->name)));
  $form_state['redirect'] = 'admin/config/media/flexslider';
}


/**
 * Form builder; Form for advanced module settings.
 */
function flexslider_form_settings() {
  $form = array();

  $form['library'] = array(
    '#type' => 'fieldset',
    '#title' => 'Library',
  );

  // Debug mode toggle
  $form['library']['flexslider_debug'] = array(
    '#type' => 'checkbox',
    '#title' => t('Enable debug mode'),
    '#description' => t('Load the human-readable version of the FlexSlider library.'),
    '#default_value' => variable_get('flexslider_debug', FALSE),
    '#access' => user_access('administer flexslider'),
  );

  return system_settings_form($form);
}

/**
 * Submit handler for the advanced module settings.
 */
function flexslider_form_settings_submit($form, &$form_state) {
  // Do nothing for now
}

/**
 * Validation functions
 */
function _flexslider_validate_namespace($element, &$form_state) {
  // @todo
  // @see form_error()
  return TRUE;
}

function _flexslider_validate_selector($element, &$form_state) {
  // @todo
  // @see form_error()
  return TRUE;
}

/**
 * Validate a form element that should have a number as value.
 */
function _flexslider_validate_minimum_version_22($element, &$form_state) {
  $lib = libraries_detect('flexslider');
  if (!isset($lib['version'])) {
    drupal_set_message(t('Unable to detect FlexSlider library version. Some options may not function properly. Please review the README.md file for installation instructions.'), 'warning');
  }
  else {
    $version = $lib['version'];
    $required = "2.2";

    if (!version_compare($version, $required, '>=')) {
      form_error($element, t('To use %name you must install FlexSlider version !required or higher.', array(
        '%name' => $element['#title'],
        '!required' => l($required, 'https://github.com/woothemes/FlexSlider/tree/version/2.2'),
      )));
    }
  }
}
