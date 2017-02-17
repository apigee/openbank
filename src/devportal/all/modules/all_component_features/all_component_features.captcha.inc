<?php
/**
 * @file
 * all_component_features.captcha.inc
 */

/**
 * Implements hook_captcha_default_points().
 */
function all_component_features_captcha_default_points() {
  $export = array();

  $captcha = new stdClass();
  $captcha->disabled = FALSE; /* Edit this to true to make a default captcha disabled initially */
  $captcha->api_version = 1;
  $captcha->form_id = 'comment_node_apps_form';
  $captcha->module = '';
  $captcha->captcha_type = '';
  $export['comment_node_apps_form'] = $captcha;

  $captcha = new stdClass();
  $captcha->disabled = FALSE; /* Edit this to true to make a default captcha disabled initially */
  $captcha->api_version = 1;
  $captcha->form_id = 'comment_node_article_form';
  $captcha->module = '';
  $captcha->captcha_type = '';
  $export['comment_node_article_form'] = $captcha;

  $captcha = new stdClass();
  $captcha->disabled = FALSE; /* Edit this to true to make a default captcha disabled initially */
  $captcha->api_version = 1;
  $captcha->form_id = 'comment_node_blog_audio_form';
  $captcha->module = '';
  $captcha->captcha_type = '';
  $export['comment_node_blog_audio_form'] = $captcha;

  $captcha = new stdClass();
  $captcha->disabled = FALSE; /* Edit this to true to make a default captcha disabled initially */
  $captcha->api_version = 1;
  $captcha->form_id = 'comment_node_blog_image_form';
  $captcha->module = '';
  $captcha->captcha_type = '';
  $export['comment_node_blog_image_form'] = $captcha;

  $captcha = new stdClass();
  $captcha->disabled = FALSE; /* Edit this to true to make a default captcha disabled initially */
  $captcha->api_version = 1;
  $captcha->form_id = 'comment_node_blog_video_form';
  $captcha->module = '';
  $captcha->captcha_type = '';
  $export['comment_node_blog_video_form'] = $captcha;

  $captcha = new stdClass();
  $captcha->disabled = FALSE; /* Edit this to true to make a default captcha disabled initially */
  $captcha->api_version = 1;
  $captcha->form_id = 'comment_node_devconnect_blog_form';
  $captcha->module = '';
  $captcha->captcha_type = '';
  $export['comment_node_devconnect_blog_form'] = $captcha;

  $captcha = new stdClass();
  $captcha->disabled = FALSE; /* Edit this to true to make a default captcha disabled initially */
  $captcha->api_version = 1;
  $captcha->form_id = 'comment_node_faq_form';
  $captcha->module = '';
  $captcha->captcha_type = '';
  $export['comment_node_faq_form'] = $captcha;

  $captcha = new stdClass();
  $captcha->disabled = FALSE; /* Edit this to true to make a default captcha disabled initially */
  $captcha->api_version = 1;
  $captcha->form_id = 'comment_node_forum_form';
  $captcha->module = '';
  $captcha->captcha_type = '';
  $export['comment_node_forum_form'] = $captcha;

  $captcha = new stdClass();
  $captcha->disabled = FALSE; /* Edit this to true to make a default captcha disabled initially */
  $captcha->api_version = 1;
  $captcha->form_id = 'comment_node_page_form';
  $captcha->module = '';
  $captcha->captcha_type = '';
  $export['comment_node_page_form'] = $captcha;

  $captcha = new stdClass();
  $captcha->disabled = FALSE; /* Edit this to true to make a default captcha disabled initially */
  $captcha->api_version = 1;
  $captcha->form_id = 'comment_node_slides_form';
  $captcha->module = '';
  $captcha->captcha_type = '';
  $export['comment_node_slides_form'] = $captcha;

  $captcha = new stdClass();
  $captcha->disabled = FALSE; /* Edit this to true to make a default captcha disabled initially */
  $captcha->api_version = 1;
  $captcha->form_id = 'comment_node_smart_method_form';
  $captcha->module = '';
  $captcha->captcha_type = '';
  $export['comment_node_smart_method_form'] = $captcha;

  $captcha = new stdClass();
  $captcha->disabled = FALSE; /* Edit this to true to make a default captcha disabled initially */
  $captcha->api_version = 1;
  $captcha->form_id = 'comment_node_webform_form';
  $captcha->module = '';
  $captcha->captcha_type = '';
  $export['comment_node_webform_form'] = $captcha;

  $captcha = new stdClass();
  $captcha->disabled = FALSE; /* Edit this to true to make a default captcha disabled initially */
  $captcha->api_version = 1;
  $captcha->form_id = 'forum_node_form';
  $captcha->module = '';
  $captcha->captcha_type = '';
  $export['forum_node_form'] = $captcha;

  $captcha = new stdClass();
  $captcha->disabled = FALSE; /* Edit this to true to make a default captcha disabled initially */
  $captcha->api_version = 1;
  $captcha->form_id = 'user_login';
  $captcha->module = '';
  $captcha->captcha_type = '';
  $export['user_login'] = $captcha;

  $captcha = new stdClass();
  $captcha->disabled = FALSE; /* Edit this to true to make a default captcha disabled initially */
  $captcha->api_version = 1;
  $captcha->form_id = 'user_login_block';
  $captcha->module = '';
  $captcha->captcha_type = '';
  $export['user_login_block'] = $captcha;

  $captcha = new stdClass();
  $captcha->disabled = FALSE; /* Edit this to true to make a default captcha disabled initially */
  $captcha->api_version = 1;
  $captcha->form_id = 'user_pass';
  $captcha->module = 'recaptcha';
  $captcha->captcha_type = 'reCAPTCHA';
  $export['user_pass'] = $captcha;

  $captcha = new stdClass();
  $captcha->disabled = FALSE; /* Edit this to true to make a default captcha disabled initially */
  $captcha->api_version = 1;
  $captcha->form_id = 'user_register_form';
  $captcha->module = 'recaptcha';
  $captcha->captcha_type = 'reCAPTCHA';
  $export['user_register_form'] = $captcha;

  return $export;
}
