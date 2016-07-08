<?php

/**
 * Menu Local Tasks
 */
function dbank_menu_local_tasks(&$vars) {
  $output = '';

  if (!empty($vars['primary'])) {
    $vars['primary']['#prefix'] = '<h2 class="element-invisible">' . t('Primary tabs') . '</h2>';
    $vars['primary']['#prefix'] .= '<ul class="tabs--primary nav nav-tabs">';
    $vars['primary']['#suffix'] = '</ul>';
    $output .= drupal_render($vars['primary']) . '<hr>';
  }

  if (!empty($vars['secondary'])) {
    $vars['secondary']['#prefix'] = '<h2 class="element-invisible">' . t('Secondary tabs') . '</h2>';
    $vars['secondary']['#prefix'] .= '<ul class="tabs--secondary pagination pagination-sm">';
    $vars['secondary']['#suffix'] = '</ul>';
    $output .= drupal_render($vars['secondary']);
  }

  return $output;
}

/**
 * Implement hook_preprocess_html
 */
function dbank_preprocess_html(&$vars) {
    //drupal_add_css(drupal_get_path('theme', 'dbank') . '/css/font-awesome/css/font-awesome.min.css');
}

function dbank_preprocess_page(&$variables) {
    if (!empty($variables['page']['sidebar_first']) || !empty($variables['page']['sidebar_second'])) {
        $variables['content_column_class'] = ' class="col-sm-8"';
    }

    if($variables['current_path'] == 'forum') {
        drupal_set_title(t('Get answers, ideas, and support from the Community'));
    }
}
