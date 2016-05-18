<?php

/**
 * @file
 * Rules integration for feedback.
 *
 * @addtogroup rules
 * @{
 */

/**
 * Implements hook_rules_event_info().
 */
function feedback_rules_event_info() {
  $defaults = array(
    'group' => t('Feedback'),
    'module' => 'feedback',
    'access callback' => 'feedback_rules_integration_access',
  );
  return array(
    'feedback_insert' => $defaults + array(
      'label' => t('After saving new feedback'),
      'variables' => array(
        'feedback' => array('type' => 'feedback', 'label' => t('Feedback message')),
      ),
    ),
    'feedback_update' => $defaults + array(
      'label' => t('After saving existing feedback'),
      'variables' => array(
        'feedback' => array(
          'type' => 'feedback',
          'label' => t('Feedback message'),
        ),
        'feedback_unchanged' => array(
          'type' => 'feedback',
          'label' => t('unchanged feedback entity'),
          'handler' => 'rules_events_entity_unchanged',
        ),
      ),
    ),
  );
}

/**
 * Rules integration access callback.
 */
function feedback_rules_integration_access($type, $name) {
  if ($type == 'event' || $type == 'condition') {
    return entity_access('view', 'feedback');
  }
}

/**
 * @}
 */
