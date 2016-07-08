<?php

/**
 * Class for tab content of type "node" - this is for rendering a node as tab
 * content.
 */
class QuickNodeContent extends QuickContent {
  
  public static function getType() {
    return 'node';
  }

  public function optionsForm($delta, $qt) {
    $tab = $this->settings;
    $form = array();
    $form['node']['nid'] = array(
      '#type' => 'textfield',
      '#title' => t('Node'),
      '#description' => t('The node ID of the node.'),
      '#maxlength' => 10,
      '#size' => 20,
      '#default_value' => isset($tab['nid']) ? $tab['nid'] : '',
    );
    $entity_info = entity_get_info('node');
    $view_modes = array();
    foreach ($entity_info['view modes'] as $view_mode_name => $view_mode) {
      $view_modes[$view_mode_name] = $view_mode['label'];
    }
    $form['node']['view_mode'] = array(
      '#type' => 'select',
      '#title' => t('View mode'),
      '#options' => $view_modes,
      '#default_value' => isset($tab['view_mode']) ? $tab['view_mode'] : 'full',
     );
     $form['node']['hide_title'] = array(
      '#type' => 'checkbox',
      '#title' => t('Hide the title of this node'),
      '#default_value' => isset($tab['hide_title']) ? $tab['hide_title'] : 1,
    );
    return $form;
  }

  public function render($hide_empty = FALSE, $args = array()) {
    if ($this->rendered_content) {
      return $this->rendered_content;
    }
    $item = $this->settings;
    if (!empty($args)) {
      // The args have been passed in from an ajax request.
      // The first element of the args array is the qt_name, which we don't need
      // for this content type.
      array_shift($args);
      list($item['nid'], $item['view_mode'], $item['hide_title']) = $args;
    }
    $output = array();
    if (isset($item['nid'])) {
      $node = node_load($item['nid']);
      if (!empty($node)) {
        if (node_access('view', $node)) {
          $buildmode = $item['view_mode'];
          $nstruct = node_view($node, $buildmode);
          if ($item['hide_title']) {
            $nstruct['#node']->title = NULL;
          }
          $output = $nstruct;
        }
        elseif (!$hide_empty) {
          $output = array('#markup' => theme('quicktabs_tab_access_denied', array('tab' => $item)));
        }
      }
    }
    return $output;
  }
  
  public function getAjaxKeys() {
    return array('nid', 'view_mode', 'hide_title');
  }
}