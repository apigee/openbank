<?php
/**
 * @file
 * all_component_features.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function all_component_features_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "captcha" && $api == "captcha") {
    return array("version" => "1");
  }
  if ($module == "context" && $api == "context") {
    return array("version" => "3");
  }
  if ($module == "environment_indicator" && $api == "default_environment_indicator_environments") {
    return array("version" => "1");
  }
  if ($module == "quicktabs" && $api == "quicktabs") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_views_api().
 */
function all_component_features_views_api($module = NULL, $api = NULL) {
  return array("api" => "3.0");
}

/**
 * Implements hook_node_info().
 */
function all_component_features_node_info() {
  $items = array(
    'apps' => array(
      'name' => t('Apps'),
      'base' => 'node_content',
      'description' => t('Use <em>Apps</em> for App Gallery Content'),
      'has_title' => '1',
      'title_label' => t('Apps'),
      'help' => '',
    ),
    'article' => array(
      'name' => t('Article'),
      'base' => 'node_content',
      'description' => t('Use <em>articles</em> for time-sensitive content like news, press releases or blog posts.'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
    'blog_audio' => array(
      'name' => t('Audio'),
      'base' => 'node_content',
      'description' => '',
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
    'blog_image' => array(
      'name' => t('Image'),
      'base' => 'node_content',
      'description' => '',
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
    'blog_video' => array(
      'name' => t('Video'),
      'base' => 'node_content',
      'description' => '',
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
    'page' => array(
      'name' => t('Basic page'),
      'base' => 'node_content',
      'description' => t('Use <em>basic pages</em> for your static content, such as an ‘About us’ page.'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
    'slides' => array(
      'name' => t('Slides'),
      'base' => 'node_content',
      'description' => t('This content type is used to create the slides for the slideshow on the home page'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
    'smart_method' => array(
      'name' => t('SmartDocs Method'),
      'base' => 'node_content',
      'description' => t('Describes all API methods handled by SmartDocs.'),
      'has_title' => '1',
      'title_label' => t('Name'),
      'help' => '',
    ),
    'webform' => array(
      'name' => t('Webform'),
      'base' => 'node_content',
      'description' => t('Create a new form or questionnaire accessible to users. Submission results and statistics are recorded and accessible to privileged users.'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  drupal_alter('node_info', $items);
  return $items;
}
