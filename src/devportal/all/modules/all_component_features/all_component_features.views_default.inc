<?php
/**
 * @file
 * all_component_features.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function all_component_features_views_default_views() {
  $export = array();

  $view = new view();
  $view->name = 'accounts_methods';
  $view->description = 'This view lists methods within the Accounts model.';
  $view->tag = 'smartdocs';
  $view->base_table = 'node';
  $view->human_name = 'Accounts Method Listing';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'none';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['style_options']['grouping'] = array(
    0 => array(
      'field' => 'tags',
      'rendered' => 1,
      'rendered_strip' => 0,
    ),
  );
  $handler->display->display_options['row_plugin'] = 'fields';
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['exclude'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  /* Field: Content: Security schemes */
  $handler->display->display_options['fields']['security']['id'] = 'security';
  $handler->display->display_options['fields']['security']['table'] = 'field_data_field_smart_method_security';
  $handler->display->display_options['fields']['security']['field'] = 'field_smart_method_security';
  $handler->display->display_options['fields']['security']['label'] = '';
  $handler->display->display_options['fields']['security']['exclude'] = TRUE;
  $handler->display->display_options['fields']['security']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['security']['alter']['text'] = '<span title="This method needs authentication." class="icon_lock"></span>';
  $handler->display->display_options['fields']['security']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['security']['delta_limit'] = 1;
  /* Field: Content: Body */
  $handler->display->display_options['fields']['body']['id'] = 'body';
  $handler->display->display_options['fields']['body']['table'] = 'field_data_body';
  $handler->display->display_options['fields']['body']['field'] = 'body';
  $handler->display->display_options['fields']['body']['label'] = '';
  $handler->display->display_options['fields']['body']['exclude'] = TRUE;
  $handler->display->display_options['fields']['body']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['body']['type'] = 'text_plain';
  /* Field: Content: Resource base URL */
  $handler->display->display_options['fields']['base_url']['id'] = 'base_url';
  $handler->display->display_options['fields']['base_url']['table'] = 'field_data_field_smart_method_base_url';
  $handler->display->display_options['fields']['base_url']['field'] = 'field_smart_method_base_url';
  $handler->display->display_options['fields']['base_url']['label'] = '';
  $handler->display->display_options['fields']['base_url']['exclude'] = TRUE;
  $handler->display->display_options['fields']['base_url']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['base_url']['type'] = 'text_plain';
  /* Field: Content: Resource path */
  $handler->display->display_options['fields']['resource_path']['id'] = 'resource_path';
  $handler->display->display_options['fields']['resource_path']['table'] = 'field_data_field_smart_method_resource_path';
  $handler->display->display_options['fields']['resource_path']['field'] = 'field_smart_method_resource_path';
  $handler->display->display_options['fields']['resource_path']['label'] = '';
  $handler->display->display_options['fields']['resource_path']['exclude'] = TRUE;
  $handler->display->display_options['fields']['resource_path']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['resource_path']['type'] = 'text_plain';
  /* Field: Content: Tags */
  $handler->display->display_options['fields']['tags']['id'] = 'tags';
  $handler->display->display_options['fields']['tags']['table'] = 'field_data_field_smart_method_tags';
  $handler->display->display_options['fields']['tags']['field'] = 'field_smart_method_tags';
  $handler->display->display_options['fields']['tags']['label'] = '';
  $handler->display->display_options['fields']['tags']['exclude'] = TRUE;
  $handler->display->display_options['fields']['tags']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['tags']['alter']['text'] = '<h3 class="method-tag-header">[tags]</h3>
<div class="clearfix method_details">
  <div class="method_data title-header">Method</div>
  <div class="method_data description-header">Description</div>
</div>';
  $handler->display->display_options['fields']['tags']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['tags']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Content: HTTP verb */
  $handler->display->display_options['fields']['verb']['id'] = 'verb';
  $handler->display->display_options['fields']['verb']['table'] = 'field_data_field_smart_method_verb';
  $handler->display->display_options['fields']['verb']['field'] = 'field_smart_method_verb';
  $handler->display->display_options['fields']['verb']['label'] = '';
  $handler->display->display_options['fields']['verb']['exclude'] = TRUE;
  $handler->display->display_options['fields']['verb']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['verb']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Global: Custom text */
  $handler->display->display_options['fields']['display']['id'] = 'display';
  $handler->display->display_options['fields']['display']['table'] = 'views';
  $handler->display->display_options['fields']['display']['field'] = 'nothing';
  $handler->display->display_options['fields']['display']['label'] = '';
  $handler->display->display_options['fields']['display']['alter']['text'] = '<div class="method_details clearfix">
  <div class="method_data title">
    <div class="verb-auth"><p data-role="verb" class="[verb]">[verb]</p>[security]</div>
    <div class="title-description">[title]<p title="[base_url][resource_path]" class="resource_path" data-role="resource_path">[base_url][resource_path]</p></div>
  </div>
  <div class="method_data description">[body]</div>
</div>';
  $handler->display->display_options['fields']['display']['element_label_colon'] = FALSE;
  /* Sort criterion: Content: Post date */
  $handler->display->display_options['sorts']['created']['id'] = 'created';
  $handler->display->display_options['sorts']['created']['table'] = 'node';
  $handler->display->display_options['sorts']['created']['field'] = 'created';
  $handler->display->display_options['sorts']['created']['order'] = 'DESC';
  /* Filter criterion: Content: Model (field_smart_method_model) */
  $handler->display->display_options['filters']['model_tid']['id'] = 'model_tid';
  $handler->display->display_options['filters']['model_tid']['table'] = 'field_data_field_smart_method_model';
  $handler->display->display_options['filters']['model_tid']['field'] = 'field_smart_method_model_tid';
  $handler->display->display_options['filters']['model_tid']['value'] = array(
    0 => '55',
  );
  $handler->display->display_options['filters']['model_tid']['group'] = 1;
  $handler->display->display_options['filters']['model_tid']['expose']['operator'] = FALSE;
  $handler->display->display_options['filters']['model_tid']['vocabulary'] = 'smartdocs_models';

  /* Display: Front-page Block */
  $handler = $view->new_display('block', 'Front-page Block', 'frontpage');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'Accounts APIs';
  $handler->display->display_options['display_description'] = 'This block may be placed on the site home page. It lists the 5 most recently-updated published methods in the model.';
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = 5;
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['exclude'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  /* Field: Content: Security schemes */
  $handler->display->display_options['fields']['security']['id'] = 'security';
  $handler->display->display_options['fields']['security']['table'] = 'field_data_field_smart_method_security';
  $handler->display->display_options['fields']['security']['field'] = 'field_smart_method_security';
  $handler->display->display_options['fields']['security']['label'] = '';
  $handler->display->display_options['fields']['security']['exclude'] = TRUE;
  $handler->display->display_options['fields']['security']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['security']['alter']['text'] = '<span title="This method needs authentication." class="icon_lock"></span>';
  $handler->display->display_options['fields']['security']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['security']['delta_limit'] = 1;
  /* Field: Content: Resource path */
  $handler->display->display_options['fields']['resource_path']['id'] = 'resource_path';
  $handler->display->display_options['fields']['resource_path']['table'] = 'field_data_field_smart_method_resource_path';
  $handler->display->display_options['fields']['resource_path']['field'] = 'field_smart_method_resource_path';
  $handler->display->display_options['fields']['resource_path']['label'] = '';
  $handler->display->display_options['fields']['resource_path']['exclude'] = TRUE;
  $handler->display->display_options['fields']['resource_path']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['resource_path']['type'] = 'text_plain';
  /* Field: Content: HTTP verb */
  $handler->display->display_options['fields']['verb']['id'] = 'verb';
  $handler->display->display_options['fields']['verb']['table'] = 'field_data_field_smart_method_verb';
  $handler->display->display_options['fields']['verb']['field'] = 'field_smart_method_verb';
  $handler->display->display_options['fields']['verb']['label'] = '';
  $handler->display->display_options['fields']['verb']['exclude'] = TRUE;
  $handler->display->display_options['fields']['verb']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['verb']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Global: Custom text */
  $handler->display->display_options['fields']['display']['id'] = 'display';
  $handler->display->display_options['fields']['display']['table'] = 'views';
  $handler->display->display_options['fields']['display']['field'] = 'nothing';
  $handler->display->display_options['fields']['display']['label'] = '';
  $handler->display->display_options['fields']['display']['alter']['text'] = '<div class="method_details clearfix">
  <div class="method_data title">
    <div class="verb-auth"><p data-role="verb" class="[verb]">[verb]</p>[security]</div>
    <div class="title-description">[title]<p title="[resource_path]" class="resource_path" data-role="resource_path">[resource_path]</p></div>
  </div>
</div>';
  $handler->display->display_options['fields']['display']['element_label_colon'] = FALSE;

  /* Display: Model index page */
  $handler = $view->new_display('page', 'Model index page', 'modelindex');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'Accounts';
  $handler->display->display_options['display_description'] = 'This display provides the content for the model’s index page. It lists all published methods in the model.';
  $handler->display->display_options['defaults']['header'] = FALSE;
  /* Header: Global: Text area */
  $handler->display->display_options['header']['model_description']['id'] = 'model_description';
  $handler->display->display_options['header']['model_description']['table'] = 'views';
  $handler->display->display_options['header']['model_description']['field'] = 'area';
  $handler->display->display_options['header']['model_description']['empty'] = TRUE;
  $handler->display->display_options['header']['model_description']['content'] = 'Account access APIs.';
  $handler->display->display_options['header']['model_description']['format'] = 'plain_text';
  $handler->display->display_options['path'] = 'taxonomy/term/55';

  /* Display: Method TOC */
  $handler = $view->new_display('block', 'Method TOC', 'methodtoc');
  $handler->display->display_options['display_description'] = 'This block may optionally be placed in a sidebar to provide a table of contents for methods in the Accounts model.';
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['exclude'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  /* Field: Content: Security schemes */
  $handler->display->display_options['fields']['security']['id'] = 'security';
  $handler->display->display_options['fields']['security']['table'] = 'field_data_field_smart_method_security';
  $handler->display->display_options['fields']['security']['field'] = 'field_smart_method_security';
  $handler->display->display_options['fields']['security']['label'] = '';
  $handler->display->display_options['fields']['security']['exclude'] = TRUE;
  $handler->display->display_options['fields']['security']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['security']['alter']['text'] = '<span title="This method needs authentication." class="icon_lock"></span>';
  $handler->display->display_options['fields']['security']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['security']['delta_limit'] = 1;
  /* Field: Content: Resource path */
  $handler->display->display_options['fields']['resource_path']['id'] = 'resource_path';
  $handler->display->display_options['fields']['resource_path']['table'] = 'field_data_field_smart_method_resource_path';
  $handler->display->display_options['fields']['resource_path']['field'] = 'field_smart_method_resource_path';
  $handler->display->display_options['fields']['resource_path']['label'] = '';
  $handler->display->display_options['fields']['resource_path']['exclude'] = TRUE;
  $handler->display->display_options['fields']['resource_path']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['resource_path']['type'] = 'text_plain';
  /* Field: Content: Tags */
  $handler->display->display_options['fields']['tags']['id'] = 'tags';
  $handler->display->display_options['fields']['tags']['table'] = 'field_data_field_smart_method_tags';
  $handler->display->display_options['fields']['tags']['field'] = 'field_smart_method_tags';
  $handler->display->display_options['fields']['tags']['label'] = '';
  $handler->display->display_options['fields']['tags']['exclude'] = TRUE;
  $handler->display->display_options['fields']['tags']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['tags']['alter']['text'] = '<h3 class="method-tag-header">[tags]</h3>';
  $handler->display->display_options['fields']['tags']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['tags']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Content: HTTP verb */
  $handler->display->display_options['fields']['verb']['id'] = 'verb';
  $handler->display->display_options['fields']['verb']['table'] = 'field_data_field_smart_method_verb';
  $handler->display->display_options['fields']['verb']['field'] = 'field_smart_method_verb';
  $handler->display->display_options['fields']['verb']['label'] = '';
  $handler->display->display_options['fields']['verb']['exclude'] = TRUE;
  $handler->display->display_options['fields']['verb']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['verb']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Global: Custom text */
  $handler->display->display_options['fields']['display']['id'] = 'display';
  $handler->display->display_options['fields']['display']['table'] = 'views';
  $handler->display->display_options['fields']['display']['field'] = 'nothing';
  $handler->display->display_options['fields']['display']['label'] = '';
  $handler->display->display_options['fields']['display']['alter']['text'] = '<div class="method_details clearfix">
  <div class="method_data title">
    <div class="verb-auth"><p data-role="verb" class="[verb]">[verb]</p>[security]</div>
    <div class="title-description">[title]<p title="[resource_path]" class="resource_path" data-role="resource_path">[resource_path]</p></div>
  </div>
</div>';
  $handler->display->display_options['fields']['display']['element_label_colon'] = FALSE;
  $export['accounts_methods'] = $view;

  $view = new view();
  $view->name = 'apis_methods';
  $view->description = 'This view lists methods within the APIs model.';
  $view->tag = 'smartdocs';
  $view->base_table = 'node';
  $view->human_name = 'APIs Method Listing';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'none';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['style_options']['grouping'] = array(
    0 => array(
      'field' => 'tags',
      'rendered' => 1,
      'rendered_strip' => 0,
    ),
  );
  $handler->display->display_options['row_plugin'] = 'fields';
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['exclude'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  /* Field: Content: Security schemes */
  $handler->display->display_options['fields']['security']['id'] = 'security';
  $handler->display->display_options['fields']['security']['table'] = 'field_data_field_smart_method_security';
  $handler->display->display_options['fields']['security']['field'] = 'field_smart_method_security';
  $handler->display->display_options['fields']['security']['label'] = '';
  $handler->display->display_options['fields']['security']['exclude'] = TRUE;
  $handler->display->display_options['fields']['security']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['security']['alter']['text'] = '<span title="This method needs authentication." class="icon_lock"></span>';
  $handler->display->display_options['fields']['security']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['security']['delta_limit'] = 1;
  /* Field: Content: Body */
  $handler->display->display_options['fields']['body']['id'] = 'body';
  $handler->display->display_options['fields']['body']['table'] = 'field_data_body';
  $handler->display->display_options['fields']['body']['field'] = 'body';
  $handler->display->display_options['fields']['body']['label'] = '';
  $handler->display->display_options['fields']['body']['exclude'] = TRUE;
  $handler->display->display_options['fields']['body']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['body']['type'] = 'text_plain';
  /* Field: Content: Resource base URL */
  $handler->display->display_options['fields']['base_url']['id'] = 'base_url';
  $handler->display->display_options['fields']['base_url']['table'] = 'field_data_field_smart_method_base_url';
  $handler->display->display_options['fields']['base_url']['field'] = 'field_smart_method_base_url';
  $handler->display->display_options['fields']['base_url']['label'] = '';
  $handler->display->display_options['fields']['base_url']['exclude'] = TRUE;
  $handler->display->display_options['fields']['base_url']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['base_url']['type'] = 'text_plain';
  /* Field: Content: Resource path */
  $handler->display->display_options['fields']['resource_path']['id'] = 'resource_path';
  $handler->display->display_options['fields']['resource_path']['table'] = 'field_data_field_smart_method_resource_path';
  $handler->display->display_options['fields']['resource_path']['field'] = 'field_smart_method_resource_path';
  $handler->display->display_options['fields']['resource_path']['label'] = '';
  $handler->display->display_options['fields']['resource_path']['exclude'] = TRUE;
  $handler->display->display_options['fields']['resource_path']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['resource_path']['type'] = 'text_plain';
  /* Field: Content: Tags */
  $handler->display->display_options['fields']['tags']['id'] = 'tags';
  $handler->display->display_options['fields']['tags']['table'] = 'field_data_field_smart_method_tags';
  $handler->display->display_options['fields']['tags']['field'] = 'field_smart_method_tags';
  $handler->display->display_options['fields']['tags']['label'] = '';
  $handler->display->display_options['fields']['tags']['exclude'] = TRUE;
  $handler->display->display_options['fields']['tags']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['tags']['alter']['text'] = '<h3 class="method-tag-header">[tags]</h3>
<div class="clearfix method_details">
  <div class="method_data title-header">Method</div>
  <div class="method_data description-header">Description</div>
</div>';
  $handler->display->display_options['fields']['tags']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['tags']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Content: HTTP verb */
  $handler->display->display_options['fields']['verb']['id'] = 'verb';
  $handler->display->display_options['fields']['verb']['table'] = 'field_data_field_smart_method_verb';
  $handler->display->display_options['fields']['verb']['field'] = 'field_smart_method_verb';
  $handler->display->display_options['fields']['verb']['label'] = '';
  $handler->display->display_options['fields']['verb']['exclude'] = TRUE;
  $handler->display->display_options['fields']['verb']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['verb']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Global: Custom text */
  $handler->display->display_options['fields']['display']['id'] = 'display';
  $handler->display->display_options['fields']['display']['table'] = 'views';
  $handler->display->display_options['fields']['display']['field'] = 'nothing';
  $handler->display->display_options['fields']['display']['label'] = '';
  $handler->display->display_options['fields']['display']['alter']['text'] = '<div class="method_details clearfix">
  <div class="method_data title">
    <div class="verb-auth"><p data-role="verb" class="[verb]">[verb]</p>[security]</div>
    <div class="title-description">[title]<p title="[base_url][resource_path]" class="resource_path" data-role="resource_path">[base_url][resource_path]</p></div>
  </div>
  <div class="method_data description">[body]</div>
</div>';
  $handler->display->display_options['fields']['display']['element_label_colon'] = FALSE;
  /* Sort criterion: Content: Post date */
  $handler->display->display_options['sorts']['created']['id'] = 'created';
  $handler->display->display_options['sorts']['created']['table'] = 'node';
  $handler->display->display_options['sorts']['created']['field'] = 'created';
  $handler->display->display_options['sorts']['created']['order'] = 'DESC';
  /* Filter criterion: Content: Model (field_smart_method_model) */
  $handler->display->display_options['filters']['model_tid']['id'] = 'model_tid';
  $handler->display->display_options['filters']['model_tid']['table'] = 'field_data_field_smart_method_model';
  $handler->display->display_options['filters']['model_tid']['field'] = 'field_smart_method_model_tid';
  $handler->display->display_options['filters']['model_tid']['value'] = array(
    0 => '26',
  );
  $handler->display->display_options['filters']['model_tid']['group'] = 1;
  $handler->display->display_options['filters']['model_tid']['expose']['operator'] = FALSE;
  $handler->display->display_options['filters']['model_tid']['vocabulary'] = 'smartdocs_models';

  /* Display: Front-page Block */
  $handler = $view->new_display('block', 'Front-page Block', 'frontpage');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'APIs APIs';
  $handler->display->display_options['display_description'] = 'This block may be placed on the site home page. It lists the 5 most recently-updated published methods in the model.';
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = 5;
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['exclude'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  /* Field: Content: Security schemes */
  $handler->display->display_options['fields']['security']['id'] = 'security';
  $handler->display->display_options['fields']['security']['table'] = 'field_data_field_smart_method_security';
  $handler->display->display_options['fields']['security']['field'] = 'field_smart_method_security';
  $handler->display->display_options['fields']['security']['label'] = '';
  $handler->display->display_options['fields']['security']['exclude'] = TRUE;
  $handler->display->display_options['fields']['security']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['security']['alter']['text'] = '<span title="This method needs authentication." class="icon_lock"></span>';
  $handler->display->display_options['fields']['security']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['security']['delta_limit'] = 1;
  /* Field: Content: Resource path */
  $handler->display->display_options['fields']['resource_path']['id'] = 'resource_path';
  $handler->display->display_options['fields']['resource_path']['table'] = 'field_data_field_smart_method_resource_path';
  $handler->display->display_options['fields']['resource_path']['field'] = 'field_smart_method_resource_path';
  $handler->display->display_options['fields']['resource_path']['label'] = '';
  $handler->display->display_options['fields']['resource_path']['exclude'] = TRUE;
  $handler->display->display_options['fields']['resource_path']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['resource_path']['type'] = 'text_plain';
  /* Field: Content: HTTP verb */
  $handler->display->display_options['fields']['verb']['id'] = 'verb';
  $handler->display->display_options['fields']['verb']['table'] = 'field_data_field_smart_method_verb';
  $handler->display->display_options['fields']['verb']['field'] = 'field_smart_method_verb';
  $handler->display->display_options['fields']['verb']['label'] = '';
  $handler->display->display_options['fields']['verb']['exclude'] = TRUE;
  $handler->display->display_options['fields']['verb']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['verb']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Global: Custom text */
  $handler->display->display_options['fields']['display']['id'] = 'display';
  $handler->display->display_options['fields']['display']['table'] = 'views';
  $handler->display->display_options['fields']['display']['field'] = 'nothing';
  $handler->display->display_options['fields']['display']['label'] = '';
  $handler->display->display_options['fields']['display']['alter']['text'] = '<div class="method_details clearfix">
  <div class="method_data title">
    <div class="verb-auth"><p data-role="verb" class="[verb]">[verb]</p>[security]</div>
    <div class="title-description">[title]<p title="[resource_path]" class="resource_path" data-role="resource_path">[resource_path]</p></div>
  </div>
</div>';
  $handler->display->display_options['fields']['display']['element_label_colon'] = FALSE;

  /* Display: Model index page */
  $handler = $view->new_display('page', 'Model index page', 'modelindex');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'APIs';
  $handler->display->display_options['display_description'] = 'This display provides the content for the model’s index page. It lists all published methods in the model.';
  $handler->display->display_options['defaults']['header'] = FALSE;
  $handler->display->display_options['path'] = 'taxonomy/term/26';

  /* Display: Method TOC */
  $handler = $view->new_display('block', 'Method TOC', 'methodtoc');
  $handler->display->display_options['display_description'] = 'This block may optionally be placed in a sidebar to provide a table of contents for methods in the APIs model.';
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['exclude'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  /* Field: Content: Security schemes */
  $handler->display->display_options['fields']['security']['id'] = 'security';
  $handler->display->display_options['fields']['security']['table'] = 'field_data_field_smart_method_security';
  $handler->display->display_options['fields']['security']['field'] = 'field_smart_method_security';
  $handler->display->display_options['fields']['security']['label'] = '';
  $handler->display->display_options['fields']['security']['exclude'] = TRUE;
  $handler->display->display_options['fields']['security']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['security']['alter']['text'] = '<span title="This method needs authentication." class="icon_lock"></span>';
  $handler->display->display_options['fields']['security']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['security']['delta_limit'] = 1;
  /* Field: Content: Resource path */
  $handler->display->display_options['fields']['resource_path']['id'] = 'resource_path';
  $handler->display->display_options['fields']['resource_path']['table'] = 'field_data_field_smart_method_resource_path';
  $handler->display->display_options['fields']['resource_path']['field'] = 'field_smart_method_resource_path';
  $handler->display->display_options['fields']['resource_path']['label'] = '';
  $handler->display->display_options['fields']['resource_path']['exclude'] = TRUE;
  $handler->display->display_options['fields']['resource_path']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['resource_path']['type'] = 'text_plain';
  /* Field: Content: Tags */
  $handler->display->display_options['fields']['tags']['id'] = 'tags';
  $handler->display->display_options['fields']['tags']['table'] = 'field_data_field_smart_method_tags';
  $handler->display->display_options['fields']['tags']['field'] = 'field_smart_method_tags';
  $handler->display->display_options['fields']['tags']['label'] = '';
  $handler->display->display_options['fields']['tags']['exclude'] = TRUE;
  $handler->display->display_options['fields']['tags']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['tags']['alter']['text'] = '<h3 class="method-tag-header">[tags]</h3>';
  $handler->display->display_options['fields']['tags']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['tags']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Content: HTTP verb */
  $handler->display->display_options['fields']['verb']['id'] = 'verb';
  $handler->display->display_options['fields']['verb']['table'] = 'field_data_field_smart_method_verb';
  $handler->display->display_options['fields']['verb']['field'] = 'field_smart_method_verb';
  $handler->display->display_options['fields']['verb']['label'] = '';
  $handler->display->display_options['fields']['verb']['exclude'] = TRUE;
  $handler->display->display_options['fields']['verb']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['verb']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Global: Custom text */
  $handler->display->display_options['fields']['display']['id'] = 'display';
  $handler->display->display_options['fields']['display']['table'] = 'views';
  $handler->display->display_options['fields']['display']['field'] = 'nothing';
  $handler->display->display_options['fields']['display']['label'] = '';
  $handler->display->display_options['fields']['display']['alter']['text'] = '<div class="method_details clearfix">
  <div class="method_data title">
    <div class="verb-auth"><p data-role="verb" class="[verb]">[verb]</p>[security]</div>
    <div class="title-description">[title]<p title="[resource_path]" class="resource_path" data-role="resource_path">[resource_path]</p></div>
  </div>
</div>';
  $handler->display->display_options['fields']['display']['element_label_colon'] = FALSE;
  $export['apis_methods'] = $view;

  $view = new view();
  $view->name = 'blog';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'Blog';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'Blog Post Large';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'full';
  $handler->display->display_options['pager']['options']['items_per_page'] = '4';
  $handler->display->display_options['style_plugin'] = 'list';
  $handler->display->display_options['style_options']['default_row_class'] = FALSE;
  $handler->display->display_options['style_options']['row_class_special'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'node';
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  /* Sort criterion: Content: Post date */
  $handler->display->display_options['sorts']['created']['id'] = 'created';
  $handler->display->display_options['sorts']['created']['table'] = 'node';
  $handler->display->display_options['sorts']['created']['field'] = 'created';
  $handler->display->display_options['sorts']['created']['order'] = 'DESC';
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'article' => 'article',
  );

  /* Display: Blog Post Medium */
  $handler = $view->new_display('page', 'Blog Post Medium', 'page');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'Blog Post Medium';
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'full';
  $handler->display->display_options['pager']['options']['items_per_page'] = '4';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['pager']['options']['id'] = '0';
  $handler->display->display_options['pager']['options']['quantity'] = '9';
  $handler->display->display_options['path'] = 'blog-medium-image';

  /* Display: Blog Post Large */
  $handler = $view->new_display('page', 'Blog Post Large', 'page_1');
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'node';
  $handler->display->display_options['row_options']['view_mode'] = 'large_image';
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['path'] = 'blog-large-image';

  /* Display: Monthly Timeline */
  $handler = $view->new_display('page', 'Monthly Timeline', 'page_monthly_timeline');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'Blog Post Timeline';
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'full';
  $handler->display->display_options['pager']['options']['items_per_page'] = '10';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['pager']['options']['id'] = '0';
  $handler->display->display_options['pager']['options']['quantity'] = '9';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['style_options']['grouping'] = array(
    0 => array(
      'field' => 'created',
      'rendered' => 1,
      'rendered_strip' => 0,
    ),
  );
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Post date */
  $handler->display->display_options['fields']['created']['id'] = 'created';
  $handler->display->display_options['fields']['created']['table'] = 'node';
  $handler->display->display_options['fields']['created']['field'] = 'created';
  $handler->display->display_options['fields']['created']['label'] = '';
  $handler->display->display_options['fields']['created']['exclude'] = TRUE;
  $handler->display->display_options['fields']['created']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['created']['date_format'] = 'custom';
  $handler->display->display_options['fields']['created']['custom_date_format'] = 'F Y';
  /* Field: Content: Nid */
  $handler->display->display_options['fields']['nid']['id'] = 'nid';
  $handler->display->display_options['fields']['nid']['table'] = 'node';
  $handler->display->display_options['fields']['nid']['field'] = 'nid';
  $handler->display->display_options['fields']['nid']['label'] = '';
  $handler->display->display_options['fields']['nid']['element_label_colon'] = FALSE;
  $handler->display->display_options['defaults']['arguments'] = FALSE;
  $handler->display->display_options['path'] = 'blog-timeline';

  /* Display: Archives */
  $handler = $view->new_display('block', 'Archives', 'block_archives');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'ARCHIVES';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['arguments'] = FALSE;
  /* Contextual filter: Content: Created year + month */
  $handler->display->display_options['arguments']['created_year_month']['id'] = 'created_year_month';
  $handler->display->display_options['arguments']['created_year_month']['table'] = 'node';
  $handler->display->display_options['arguments']['created_year_month']['field'] = 'created_year_month';
  $handler->display->display_options['arguments']['created_year_month']['default_action'] = 'summary';
  $handler->display->display_options['arguments']['created_year_month']['default_argument_type'] = 'fixed';
  $handler->display->display_options['arguments']['created_year_month']['summary']['sort_order'] = 'desc';
  $handler->display->display_options['arguments']['created_year_month']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['created_year_month']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['created_year_month']['summary_options']['count'] = FALSE;
  $handler->display->display_options['arguments']['created_year_month']['summary_options']['items_per_page'] = '25';

  /* Display: Recent Post */
  $handler = $view->new_display('block', 'Recent Post', 'latest');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'Latest';
  $handler->display->display_options['defaults']['css_class'] = FALSE;
  $handler->display->display_options['css_class'] = 'recent-post';
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '3';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'list';
  $handler->display->display_options['style_options']['default_row_class'] = FALSE;
  $handler->display->display_options['style_options']['row_class_special'] = FALSE;
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['title']['element_wrapper_class'] = 'right-block-posts';
  $handler->display->display_options['fields']['title']['element_default_classes'] = FALSE;
  /* Field: Content: Post date */
  $handler->display->display_options['fields']['created']['id'] = 'created';
  $handler->display->display_options['fields']['created']['table'] = 'node';
  $handler->display->display_options['fields']['created']['field'] = 'created';
  $handler->display->display_options['fields']['created']['label'] = '';
  $handler->display->display_options['fields']['created']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['created']['element_wrapper_class'] = 'clearfix small-text';
  $handler->display->display_options['fields']['created']['element_default_classes'] = FALSE;
  $handler->display->display_options['fields']['created']['date_format'] = 'custom';
  $handler->display->display_options['fields']['created']['custom_date_format'] = 'd M Y';
  $handler->display->display_options['fields']['created']['second_date_format'] = 'long';
  $handler->display->display_options['defaults']['arguments'] = FALSE;

  /* Display: Popular Post */
  $handler = $view->new_display('block', 'Popular Post', 'popular');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'Popular';
  $handler->display->display_options['defaults']['css_class'] = FALSE;
  $handler->display->display_options['css_class'] = 'popular-post';
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '3';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'list';
  $handler->display->display_options['style_options']['default_row_class'] = FALSE;
  $handler->display->display_options['style_options']['row_class_special'] = FALSE;
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['title']['element_wrapper_class'] = 'right-block-posts';
  $handler->display->display_options['fields']['title']['element_default_classes'] = FALSE;
  /* Field: Content: Post date */
  $handler->display->display_options['fields']['created']['id'] = 'created';
  $handler->display->display_options['fields']['created']['table'] = 'node';
  $handler->display->display_options['fields']['created']['field'] = 'created';
  $handler->display->display_options['fields']['created']['label'] = '';
  $handler->display->display_options['fields']['created']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['created']['element_wrapper_class'] = 'clearfix small-text';
  $handler->display->display_options['fields']['created']['element_default_classes'] = FALSE;
  $handler->display->display_options['fields']['created']['date_format'] = 'custom';
  $handler->display->display_options['fields']['created']['custom_date_format'] = 'd M Y';
  $handler->display->display_options['fields']['created']['second_date_format'] = 'long';
  $handler->display->display_options['defaults']['sorts'] = FALSE;
  $handler->display->display_options['defaults']['arguments'] = FALSE;

  /* Display: Blog Timeline */
  $handler = $view->new_display('block', 'Blog Timeline', 'block_timeline');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'Blog Timeline';
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '1';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'node';
  $handler->display->display_options['row_options']['view_mode'] = 'time_line';
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['arguments'] = FALSE;
  /* Contextual filter: Content: Nid */
  $handler->display->display_options['arguments']['nid']['id'] = 'nid';
  $handler->display->display_options['arguments']['nid']['table'] = 'node';
  $handler->display->display_options['arguments']['nid']['field'] = 'nid';
  $handler->display->display_options['arguments']['nid']['default_action'] = 'default';
  $handler->display->display_options['arguments']['nid']['default_argument_type'] = 'node';
  $handler->display->display_options['arguments']['nid']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['nid']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['nid']['summary_options']['items_per_page'] = '25';

  /* Display: Refresh The Blogs */
  $handler = $view->new_display('block', 'Refresh The Blogs', 'block_3');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'REFRESH THE BLOG';
  $handler->display->display_options['defaults']['css_class'] = FALSE;
  $handler->display->display_options['css_class'] = 'refresh-blog';
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '2';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'list';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Media */
  $handler->display->display_options['fields']['field_media']['id'] = 'field_media';
  $handler->display->display_options['fields']['field_media']['table'] = 'field_data_field_media';
  $handler->display->display_options['fields']['field_media']['field'] = 'field_media';
  $handler->display->display_options['fields']['field_media']['label'] = '';
  $handler->display->display_options['fields']['field_media']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_media']['element_wrapper_type'] = '0';
  $handler->display->display_options['fields']['field_media']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_media']['type'] = 'media';
  $handler->display->display_options['fields']['field_media']['settings'] = array(
    'file_view_mode' => 'media_small',
  );
  $handler->display->display_options['fields']['field_media']['delta_limit'] = '1';
  $handler->display->display_options['fields']['field_media']['delta_offset'] = '0';
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  /* Field: Content: Post date */
  $handler->display->display_options['fields']['created']['id'] = 'created';
  $handler->display->display_options['fields']['created']['table'] = 'node';
  $handler->display->display_options['fields']['created']['field'] = 'created';
  $handler->display->display_options['fields']['created']['label'] = '';
  $handler->display->display_options['fields']['created']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['created']['date_format'] = 'custom';
  $handler->display->display_options['fields']['created']['custom_date_format'] = 'd M Y';
  $handler->display->display_options['defaults']['arguments'] = FALSE;

  /* Display: Archives In Left Sidebar */
  $handler = $view->new_display('block', 'Archives In Left Sidebar', 'block_4');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'ARCHIVES';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['arguments'] = FALSE;
  /* Contextual filter: Content: Created year + month */
  $handler->display->display_options['arguments']['created_year_month']['id'] = 'created_year_month';
  $handler->display->display_options['arguments']['created_year_month']['table'] = 'node';
  $handler->display->display_options['arguments']['created_year_month']['field'] = 'created_year_month';
  $handler->display->display_options['arguments']['created_year_month']['default_action'] = 'summary';
  $handler->display->display_options['arguments']['created_year_month']['default_argument_type'] = 'fixed';
  $handler->display->display_options['arguments']['created_year_month']['summary']['sort_order'] = 'desc';
  $handler->display->display_options['arguments']['created_year_month']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['created_year_month']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['created_year_month']['summary_options']['count'] = FALSE;
  $handler->display->display_options['arguments']['created_year_month']['summary_options']['items_per_page'] = '25';

  /* Display: Blog Slider Front */
  $handler = $view->new_display('block', 'Blog Slider Front', 'block_5');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['defaults']['css_class'] = FALSE;
  $handler->display->display_options['css_class'] = 'slider-post';
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '10';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['footer'] = FALSE;
  /* Footer: Global: Text area */
  $handler->display->display_options['footer']['area']['id'] = 'area';
  $handler->display->display_options['footer']['area']['table'] = 'views';
  $handler->display->display_options['footer']['area']['field'] = 'area';
  $handler->display->display_options['footer']['area']['content'] = '<div style=\'text-align:right;padding:20px 0 40px 0;\'>
[button type="link" class="line-color nobg" link="/blog"]View All Blog Post[/button]
</div>';
  $handler->display->display_options['footer']['area']['format'] = 'full_html';

  /* Display: Blogs */
  $handler = $view->new_display('page', 'Blogs', 'page_blog');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'Blogs';
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'full';
  $handler->display->display_options['pager']['options']['items_per_page'] = '4';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['pager']['options']['id'] = '0';
  $handler->display->display_options['pager']['options']['quantity'] = '9';
  $handler->display->display_options['path'] = 'blogs';
  $handler->display->display_options['menu']['type'] = 'normal';
  $handler->display->display_options['menu']['title'] = 'Blogs';
  $handler->display->display_options['menu']['weight'] = '-50';
  $handler->display->display_options['menu']['name'] = 'main-menu';
  $handler->display->display_options['menu']['context'] = 0;
  $handler->display->display_options['menu']['context_only_inline'] = 0;

  /* Display: Index Blog */
  $handler = $view->new_display('page', 'Index Blog', 'page_2');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'full';
  $handler->display->display_options['pager']['options']['items_per_page'] = '0';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['pager']['options']['id'] = '0';
  $handler->display->display_options['pager']['options']['quantity'] = '9';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['path'] = 'index-blog';
  $export['blog'] = $view;

  $view = new view();
  $view->name = 'oauth_methods';
  $view->description = 'This view lists methods within the OAuth model.';
  $view->tag = 'smartdocs';
  $view->base_table = 'node';
  $view->human_name = 'OAuth Method Listing';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'none';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['style_options']['grouping'] = array(
    0 => array(
      'field' => 'tags',
      'rendered' => 1,
      'rendered_strip' => 0,
    ),
  );
  $handler->display->display_options['row_plugin'] = 'fields';
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['exclude'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  /* Field: Content: Security schemes */
  $handler->display->display_options['fields']['security']['id'] = 'security';
  $handler->display->display_options['fields']['security']['table'] = 'field_data_field_smart_method_security';
  $handler->display->display_options['fields']['security']['field'] = 'field_smart_method_security';
  $handler->display->display_options['fields']['security']['label'] = '';
  $handler->display->display_options['fields']['security']['exclude'] = TRUE;
  $handler->display->display_options['fields']['security']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['security']['alter']['text'] = '<span title="This method needs authentication." class="icon_lock"></span>';
  $handler->display->display_options['fields']['security']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['security']['delta_limit'] = 1;
  /* Field: Content: Body */
  $handler->display->display_options['fields']['body']['id'] = 'body';
  $handler->display->display_options['fields']['body']['table'] = 'field_data_body';
  $handler->display->display_options['fields']['body']['field'] = 'body';
  $handler->display->display_options['fields']['body']['label'] = '';
  $handler->display->display_options['fields']['body']['exclude'] = TRUE;
  $handler->display->display_options['fields']['body']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['body']['type'] = 'text_plain';
  /* Field: Content: Resource base URL */
  $handler->display->display_options['fields']['base_url']['id'] = 'base_url';
  $handler->display->display_options['fields']['base_url']['table'] = 'field_data_field_smart_method_base_url';
  $handler->display->display_options['fields']['base_url']['field'] = 'field_smart_method_base_url';
  $handler->display->display_options['fields']['base_url']['label'] = '';
  $handler->display->display_options['fields']['base_url']['exclude'] = TRUE;
  $handler->display->display_options['fields']['base_url']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['base_url']['type'] = 'text_plain';
  /* Field: Content: Resource path */
  $handler->display->display_options['fields']['resource_path']['id'] = 'resource_path';
  $handler->display->display_options['fields']['resource_path']['table'] = 'field_data_field_smart_method_resource_path';
  $handler->display->display_options['fields']['resource_path']['field'] = 'field_smart_method_resource_path';
  $handler->display->display_options['fields']['resource_path']['label'] = '';
  $handler->display->display_options['fields']['resource_path']['exclude'] = TRUE;
  $handler->display->display_options['fields']['resource_path']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['resource_path']['type'] = 'text_plain';
  /* Field: Content: Tags */
  $handler->display->display_options['fields']['tags']['id'] = 'tags';
  $handler->display->display_options['fields']['tags']['table'] = 'field_data_field_smart_method_tags';
  $handler->display->display_options['fields']['tags']['field'] = 'field_smart_method_tags';
  $handler->display->display_options['fields']['tags']['label'] = '';
  $handler->display->display_options['fields']['tags']['exclude'] = TRUE;
  $handler->display->display_options['fields']['tags']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['tags']['alter']['text'] = '<h3 class="method-tag-header">[tags]</h3>
<div class="clearfix method_details">
  <div class="method_data title-header">Method</div>
  <div class="method_data description-header">Description</div>
</div>';
  $handler->display->display_options['fields']['tags']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['tags']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Content: HTTP verb */
  $handler->display->display_options['fields']['verb']['id'] = 'verb';
  $handler->display->display_options['fields']['verb']['table'] = 'field_data_field_smart_method_verb';
  $handler->display->display_options['fields']['verb']['field'] = 'field_smart_method_verb';
  $handler->display->display_options['fields']['verb']['label'] = '';
  $handler->display->display_options['fields']['verb']['exclude'] = TRUE;
  $handler->display->display_options['fields']['verb']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['verb']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Global: Custom text */
  $handler->display->display_options['fields']['display']['id'] = 'display';
  $handler->display->display_options['fields']['display']['table'] = 'views';
  $handler->display->display_options['fields']['display']['field'] = 'nothing';
  $handler->display->display_options['fields']['display']['label'] = '';
  $handler->display->display_options['fields']['display']['alter']['text'] = '<div class="method_details clearfix">
  <div class="method_data title">
    <div class="verb-auth"><p data-role="verb" class="[verb]">[verb]</p>[security]</div>
    <div class="title-description">[title]<p title="[base_url][resource_path]" class="resource_path" data-role="resource_path">[base_url][resource_path]</p></div>
  </div>
  <div class="method_data description">[body]</div>
</div>';
  $handler->display->display_options['fields']['display']['element_label_colon'] = FALSE;
  /* Sort criterion: Content: Post date */
  $handler->display->display_options['sorts']['created']['id'] = 'created';
  $handler->display->display_options['sorts']['created']['table'] = 'node';
  $handler->display->display_options['sorts']['created']['field'] = 'created';
  $handler->display->display_options['sorts']['created']['order'] = 'DESC';
  /* Filter criterion: Content: Model (field_smart_method_model) */
  $handler->display->display_options['filters']['model_tid']['id'] = 'model_tid';
  $handler->display->display_options['filters']['model_tid']['table'] = 'field_data_field_smart_method_model';
  $handler->display->display_options['filters']['model_tid']['field'] = 'field_smart_method_model_tid';
  $handler->display->display_options['filters']['model_tid']['value'] = array(
    0 => '66',
  );
  $handler->display->display_options['filters']['model_tid']['group'] = 1;
  $handler->display->display_options['filters']['model_tid']['expose']['operator'] = FALSE;
  $handler->display->display_options['filters']['model_tid']['vocabulary'] = 'smartdocs_models';

  /* Display: Front-page Block */
  $handler = $view->new_display('block', 'Front-page Block', 'frontpage');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'OAuth APIs';
  $handler->display->display_options['display_description'] = 'This block may be placed on the site home page. It lists the 5 most recently-updated published methods in the model.';
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = 5;
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['exclude'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  /* Field: Content: Security schemes */
  $handler->display->display_options['fields']['security']['id'] = 'security';
  $handler->display->display_options['fields']['security']['table'] = 'field_data_field_smart_method_security';
  $handler->display->display_options['fields']['security']['field'] = 'field_smart_method_security';
  $handler->display->display_options['fields']['security']['label'] = '';
  $handler->display->display_options['fields']['security']['exclude'] = TRUE;
  $handler->display->display_options['fields']['security']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['security']['alter']['text'] = '<span title="This method needs authentication." class="icon_lock"></span>';
  $handler->display->display_options['fields']['security']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['security']['delta_limit'] = 1;
  /* Field: Content: Resource path */
  $handler->display->display_options['fields']['resource_path']['id'] = 'resource_path';
  $handler->display->display_options['fields']['resource_path']['table'] = 'field_data_field_smart_method_resource_path';
  $handler->display->display_options['fields']['resource_path']['field'] = 'field_smart_method_resource_path';
  $handler->display->display_options['fields']['resource_path']['label'] = '';
  $handler->display->display_options['fields']['resource_path']['exclude'] = TRUE;
  $handler->display->display_options['fields']['resource_path']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['resource_path']['type'] = 'text_plain';
  /* Field: Content: HTTP verb */
  $handler->display->display_options['fields']['verb']['id'] = 'verb';
  $handler->display->display_options['fields']['verb']['table'] = 'field_data_field_smart_method_verb';
  $handler->display->display_options['fields']['verb']['field'] = 'field_smart_method_verb';
  $handler->display->display_options['fields']['verb']['label'] = '';
  $handler->display->display_options['fields']['verb']['exclude'] = TRUE;
  $handler->display->display_options['fields']['verb']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['verb']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Global: Custom text */
  $handler->display->display_options['fields']['display']['id'] = 'display';
  $handler->display->display_options['fields']['display']['table'] = 'views';
  $handler->display->display_options['fields']['display']['field'] = 'nothing';
  $handler->display->display_options['fields']['display']['label'] = '';
  $handler->display->display_options['fields']['display']['alter']['text'] = '<div class="method_details clearfix">
  <div class="method_data title">
    <div class="verb-auth"><p data-role="verb" class="[verb]">[verb]</p>[security]</div>
    <div class="title-description">[title]<p title="[resource_path]" class="resource_path" data-role="resource_path">[resource_path]</p></div>
  </div>
</div>';
  $handler->display->display_options['fields']['display']['element_label_colon'] = FALSE;

  /* Display: Model index page */
  $handler = $view->new_display('page', 'Model index page', 'modelindex');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'OAuth';
  $handler->display->display_options['display_description'] = 'This display provides the content for the model’s index page. It lists all published methods in the model.';
  $handler->display->display_options['defaults']['header'] = FALSE;
  $handler->display->display_options['path'] = 'taxonomy/term/66';

  /* Display: Method TOC */
  $handler = $view->new_display('block', 'Method TOC', 'methodtoc');
  $handler->display->display_options['display_description'] = 'This block may optionally be placed in a sidebar to provide a table of contents for methods in the OAuth model.';
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['exclude'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  /* Field: Content: Security schemes */
  $handler->display->display_options['fields']['security']['id'] = 'security';
  $handler->display->display_options['fields']['security']['table'] = 'field_data_field_smart_method_security';
  $handler->display->display_options['fields']['security']['field'] = 'field_smart_method_security';
  $handler->display->display_options['fields']['security']['label'] = '';
  $handler->display->display_options['fields']['security']['exclude'] = TRUE;
  $handler->display->display_options['fields']['security']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['security']['alter']['text'] = '<span title="This method needs authentication." class="icon_lock"></span>';
  $handler->display->display_options['fields']['security']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['security']['delta_limit'] = 1;
  /* Field: Content: Resource path */
  $handler->display->display_options['fields']['resource_path']['id'] = 'resource_path';
  $handler->display->display_options['fields']['resource_path']['table'] = 'field_data_field_smart_method_resource_path';
  $handler->display->display_options['fields']['resource_path']['field'] = 'field_smart_method_resource_path';
  $handler->display->display_options['fields']['resource_path']['label'] = '';
  $handler->display->display_options['fields']['resource_path']['exclude'] = TRUE;
  $handler->display->display_options['fields']['resource_path']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['resource_path']['type'] = 'text_plain';
  /* Field: Content: Tags */
  $handler->display->display_options['fields']['tags']['id'] = 'tags';
  $handler->display->display_options['fields']['tags']['table'] = 'field_data_field_smart_method_tags';
  $handler->display->display_options['fields']['tags']['field'] = 'field_smart_method_tags';
  $handler->display->display_options['fields']['tags']['label'] = '';
  $handler->display->display_options['fields']['tags']['exclude'] = TRUE;
  $handler->display->display_options['fields']['tags']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['tags']['alter']['text'] = '<h3 class="method-tag-header">[tags]</h3>';
  $handler->display->display_options['fields']['tags']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['tags']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Content: HTTP verb */
  $handler->display->display_options['fields']['verb']['id'] = 'verb';
  $handler->display->display_options['fields']['verb']['table'] = 'field_data_field_smart_method_verb';
  $handler->display->display_options['fields']['verb']['field'] = 'field_smart_method_verb';
  $handler->display->display_options['fields']['verb']['label'] = '';
  $handler->display->display_options['fields']['verb']['exclude'] = TRUE;
  $handler->display->display_options['fields']['verb']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['verb']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Global: Custom text */
  $handler->display->display_options['fields']['display']['id'] = 'display';
  $handler->display->display_options['fields']['display']['table'] = 'views';
  $handler->display->display_options['fields']['display']['field'] = 'nothing';
  $handler->display->display_options['fields']['display']['label'] = '';
  $handler->display->display_options['fields']['display']['alter']['text'] = '<div class="method_details clearfix">
  <div class="method_data title">
    <div class="verb-auth"><p data-role="verb" class="[verb]">[verb]</p>[security]</div>
    <div class="title-description">[title]<p title="[resource_path]" class="resource_path" data-role="resource_path">[resource_path]</p></div>
  </div>
</div>';
  $handler->display->display_options['fields']['display']['element_label_colon'] = FALSE;
  $export['oauth_methods'] = $view;

  $view = new view();
  $view->name = 'open-data---products_methods';
  $view->description = 'This view lists methods within the Open Data - Products model.';
  $view->tag = 'smartdocs';
  $view->base_table = 'node';
  $view->human_name = 'Open Data - Products Method Listing';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'none';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['style_options']['grouping'] = array(
    0 => array(
      'field' => 'tags',
      'rendered' => 1,
      'rendered_strip' => 0,
    ),
  );
  $handler->display->display_options['row_plugin'] = 'fields';
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['exclude'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  /* Field: Content: Security schemes */
  $handler->display->display_options['fields']['security']['id'] = 'security';
  $handler->display->display_options['fields']['security']['table'] = 'field_data_field_smart_method_security';
  $handler->display->display_options['fields']['security']['field'] = 'field_smart_method_security';
  $handler->display->display_options['fields']['security']['label'] = '';
  $handler->display->display_options['fields']['security']['exclude'] = TRUE;
  $handler->display->display_options['fields']['security']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['security']['alter']['text'] = '<span title="This method needs authentication." class="icon_lock"></span>';
  $handler->display->display_options['fields']['security']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['security']['delta_limit'] = 1;
  /* Field: Content: Body */
  $handler->display->display_options['fields']['body']['id'] = 'body';
  $handler->display->display_options['fields']['body']['table'] = 'field_data_body';
  $handler->display->display_options['fields']['body']['field'] = 'body';
  $handler->display->display_options['fields']['body']['label'] = '';
  $handler->display->display_options['fields']['body']['exclude'] = TRUE;
  $handler->display->display_options['fields']['body']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['body']['type'] = 'text_plain';
  /* Field: Content: Resource base URL */
  $handler->display->display_options['fields']['base_url']['id'] = 'base_url';
  $handler->display->display_options['fields']['base_url']['table'] = 'field_data_field_smart_method_base_url';
  $handler->display->display_options['fields']['base_url']['field'] = 'field_smart_method_base_url';
  $handler->display->display_options['fields']['base_url']['label'] = '';
  $handler->display->display_options['fields']['base_url']['exclude'] = TRUE;
  $handler->display->display_options['fields']['base_url']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['base_url']['type'] = 'text_plain';
  /* Field: Content: Resource path */
  $handler->display->display_options['fields']['resource_path']['id'] = 'resource_path';
  $handler->display->display_options['fields']['resource_path']['table'] = 'field_data_field_smart_method_resource_path';
  $handler->display->display_options['fields']['resource_path']['field'] = 'field_smart_method_resource_path';
  $handler->display->display_options['fields']['resource_path']['label'] = '';
  $handler->display->display_options['fields']['resource_path']['exclude'] = TRUE;
  $handler->display->display_options['fields']['resource_path']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['resource_path']['type'] = 'text_plain';
  /* Field: Content: Tags */
  $handler->display->display_options['fields']['tags']['id'] = 'tags';
  $handler->display->display_options['fields']['tags']['table'] = 'field_data_field_smart_method_tags';
  $handler->display->display_options['fields']['tags']['field'] = 'field_smart_method_tags';
  $handler->display->display_options['fields']['tags']['label'] = '';
  $handler->display->display_options['fields']['tags']['exclude'] = TRUE;
  $handler->display->display_options['fields']['tags']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['tags']['alter']['text'] = '<h3 class="method-tag-header">[tags]</h3>
<div class="clearfix method_details">
  <div class="method_data title-header">Method</div>
  <div class="method_data description-header">Description</div>
</div>';
  $handler->display->display_options['fields']['tags']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['tags']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Content: HTTP verb */
  $handler->display->display_options['fields']['verb']['id'] = 'verb';
  $handler->display->display_options['fields']['verb']['table'] = 'field_data_field_smart_method_verb';
  $handler->display->display_options['fields']['verb']['field'] = 'field_smart_method_verb';
  $handler->display->display_options['fields']['verb']['label'] = '';
  $handler->display->display_options['fields']['verb']['exclude'] = TRUE;
  $handler->display->display_options['fields']['verb']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['verb']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Global: Custom text */
  $handler->display->display_options['fields']['display']['id'] = 'display';
  $handler->display->display_options['fields']['display']['table'] = 'views';
  $handler->display->display_options['fields']['display']['field'] = 'nothing';
  $handler->display->display_options['fields']['display']['label'] = '';
  $handler->display->display_options['fields']['display']['alter']['text'] = '<div class="method_details clearfix">
  <div class="method_data title">
    <div class="verb-auth"><p data-role="verb" class="[verb]">[verb]</p>[security]</div>
    <div class="title-description">[title]<p title="[base_url][resource_path]" class="resource_path" data-role="resource_path">[base_url][resource_path]</p></div>
  </div>
  <div class="method_data description">[body]</div>
</div>';
  $handler->display->display_options['fields']['display']['element_label_colon'] = FALSE;
  /* Sort criterion: Content: Post date */
  $handler->display->display_options['sorts']['created']['id'] = 'created';
  $handler->display->display_options['sorts']['created']['table'] = 'node';
  $handler->display->display_options['sorts']['created']['field'] = 'created';
  $handler->display->display_options['sorts']['created']['order'] = 'DESC';
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'smart_method' => 'smart_method',
  );
  /* Filter criterion: Content: Model (field_smart_method_model) */
  $handler->display->display_options['filters']['model_tid']['id'] = 'model_tid';
  $handler->display->display_options['filters']['model_tid']['table'] = 'field_data_field_smart_method_model';
  $handler->display->display_options['filters']['model_tid']['field'] = 'field_smart_method_model_tid';
  $handler->display->display_options['filters']['model_tid']['value'] = array(
    0 => '75',
  );
  $handler->display->display_options['filters']['model_tid']['group'] = 1;
  $handler->display->display_options['filters']['model_tid']['expose']['operator'] = FALSE;
  $handler->display->display_options['filters']['model_tid']['vocabulary'] = 'smartdocs_models';

  /* Display: Front-page Block */
  $handler = $view->new_display('block', 'Front-page Block', 'frontpage');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'Open Data - Products APIs';
  $handler->display->display_options['display_description'] = 'This block may be placed on the site home page. It lists the 5 most recently-updated published methods in the model.';
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = 5;
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['exclude'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  /* Field: Content: Security schemes */
  $handler->display->display_options['fields']['security']['id'] = 'security';
  $handler->display->display_options['fields']['security']['table'] = 'field_data_field_smart_method_security';
  $handler->display->display_options['fields']['security']['field'] = 'field_smart_method_security';
  $handler->display->display_options['fields']['security']['label'] = '';
  $handler->display->display_options['fields']['security']['exclude'] = TRUE;
  $handler->display->display_options['fields']['security']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['security']['alter']['text'] = '<span title="This method needs authentication." class="icon_lock"></span>';
  $handler->display->display_options['fields']['security']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['security']['delta_limit'] = 1;
  /* Field: Content: Resource path */
  $handler->display->display_options['fields']['resource_path']['id'] = 'resource_path';
  $handler->display->display_options['fields']['resource_path']['table'] = 'field_data_field_smart_method_resource_path';
  $handler->display->display_options['fields']['resource_path']['field'] = 'field_smart_method_resource_path';
  $handler->display->display_options['fields']['resource_path']['label'] = '';
  $handler->display->display_options['fields']['resource_path']['exclude'] = TRUE;
  $handler->display->display_options['fields']['resource_path']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['resource_path']['type'] = 'text_plain';
  /* Field: Content: HTTP verb */
  $handler->display->display_options['fields']['verb']['id'] = 'verb';
  $handler->display->display_options['fields']['verb']['table'] = 'field_data_field_smart_method_verb';
  $handler->display->display_options['fields']['verb']['field'] = 'field_smart_method_verb';
  $handler->display->display_options['fields']['verb']['label'] = '';
  $handler->display->display_options['fields']['verb']['exclude'] = TRUE;
  $handler->display->display_options['fields']['verb']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['verb']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Global: Custom text */
  $handler->display->display_options['fields']['display']['id'] = 'display';
  $handler->display->display_options['fields']['display']['table'] = 'views';
  $handler->display->display_options['fields']['display']['field'] = 'nothing';
  $handler->display->display_options['fields']['display']['label'] = '';
  $handler->display->display_options['fields']['display']['alter']['text'] = '<div class="method_details clearfix">
  <div class="method_data title">
    <div class="verb-auth"><p data-role="verb" class="[verb]">[verb]</p>[security]</div>
    <div class="title-description">[title]<p title="[resource_path]" class="resource_path" data-role="resource_path">[resource_path]</p></div>
  </div>
</div>';
  $handler->display->display_options['fields']['display']['element_label_colon'] = FALSE;

  /* Display: Model index page */
  $handler = $view->new_display('page', 'Model index page', 'modelindex');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'Open Data - Products';
  $handler->display->display_options['display_description'] = 'This display provides the content for the model’s index page. It lists all published methods in the model.';
  $handler->display->display_options['path'] = 'taxonomy/term/75';

  /* Display: Method TOC */
  $handler = $view->new_display('block', 'Method TOC', 'methodtoc');
  $handler->display->display_options['display_description'] = 'This block may optionally be placed in a sidebar to provide a table of contents for methods in the Open Data - Products model.';
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['exclude'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  /* Field: Content: Security schemes */
  $handler->display->display_options['fields']['security']['id'] = 'security';
  $handler->display->display_options['fields']['security']['table'] = 'field_data_field_smart_method_security';
  $handler->display->display_options['fields']['security']['field'] = 'field_smart_method_security';
  $handler->display->display_options['fields']['security']['label'] = '';
  $handler->display->display_options['fields']['security']['exclude'] = TRUE;
  $handler->display->display_options['fields']['security']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['security']['alter']['text'] = '<span title="This method needs authentication." class="icon_lock"></span>';
  $handler->display->display_options['fields']['security']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['security']['delta_limit'] = 1;
  /* Field: Content: Resource path */
  $handler->display->display_options['fields']['resource_path']['id'] = 'resource_path';
  $handler->display->display_options['fields']['resource_path']['table'] = 'field_data_field_smart_method_resource_path';
  $handler->display->display_options['fields']['resource_path']['field'] = 'field_smart_method_resource_path';
  $handler->display->display_options['fields']['resource_path']['label'] = '';
  $handler->display->display_options['fields']['resource_path']['exclude'] = TRUE;
  $handler->display->display_options['fields']['resource_path']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['resource_path']['type'] = 'text_plain';
  /* Field: Content: Tags */
  $handler->display->display_options['fields']['tags']['id'] = 'tags';
  $handler->display->display_options['fields']['tags']['table'] = 'field_data_field_smart_method_tags';
  $handler->display->display_options['fields']['tags']['field'] = 'field_smart_method_tags';
  $handler->display->display_options['fields']['tags']['label'] = '';
  $handler->display->display_options['fields']['tags']['exclude'] = TRUE;
  $handler->display->display_options['fields']['tags']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['tags']['alter']['text'] = '<h3 class="method-tag-header">[tags]</h3>';
  $handler->display->display_options['fields']['tags']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['tags']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Content: HTTP verb */
  $handler->display->display_options['fields']['verb']['id'] = 'verb';
  $handler->display->display_options['fields']['verb']['table'] = 'field_data_field_smart_method_verb';
  $handler->display->display_options['fields']['verb']['field'] = 'field_smart_method_verb';
  $handler->display->display_options['fields']['verb']['label'] = '';
  $handler->display->display_options['fields']['verb']['exclude'] = TRUE;
  $handler->display->display_options['fields']['verb']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['verb']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Global: Custom text */
  $handler->display->display_options['fields']['display']['id'] = 'display';
  $handler->display->display_options['fields']['display']['table'] = 'views';
  $handler->display->display_options['fields']['display']['field'] = 'nothing';
  $handler->display->display_options['fields']['display']['label'] = '';
  $handler->display->display_options['fields']['display']['alter']['text'] = '<div class="method_details clearfix">
  <div class="method_data title">
    <div class="verb-auth"><p data-role="verb" class="[verb]">[verb]</p>[security]</div>
    <div class="title-description">[title]<p title="[resource_path]" class="resource_path" data-role="resource_path">[resource_path]</p></div>
  </div>
</div>';
  $handler->display->display_options['fields']['display']['element_label_colon'] = FALSE;
  $export['open-data---products_methods'] = $view;

  $view = new view();
  $view->name = 'open-data_methods';
  $view->description = 'This view lists methods within the Open Data model.';
  $view->tag = 'smartdocs';
  $view->base_table = 'node';
  $view->human_name = 'Open Data Method Listing';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'none';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['style_options']['grouping'] = array(
    0 => array(
      'field' => 'tags',
      'rendered' => 1,
      'rendered_strip' => 0,
    ),
  );
  $handler->display->display_options['row_plugin'] = 'fields';
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['exclude'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  /* Field: Content: Security schemes */
  $handler->display->display_options['fields']['security']['id'] = 'security';
  $handler->display->display_options['fields']['security']['table'] = 'field_data_field_smart_method_security';
  $handler->display->display_options['fields']['security']['field'] = 'field_smart_method_security';
  $handler->display->display_options['fields']['security']['label'] = '';
  $handler->display->display_options['fields']['security']['exclude'] = TRUE;
  $handler->display->display_options['fields']['security']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['security']['alter']['text'] = '<span title="This method needs authentication." class="icon_lock"></span>';
  $handler->display->display_options['fields']['security']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['security']['delta_limit'] = 1;
  /* Field: Content: Body */
  $handler->display->display_options['fields']['body']['id'] = 'body';
  $handler->display->display_options['fields']['body']['table'] = 'field_data_body';
  $handler->display->display_options['fields']['body']['field'] = 'body';
  $handler->display->display_options['fields']['body']['label'] = '';
  $handler->display->display_options['fields']['body']['exclude'] = TRUE;
  $handler->display->display_options['fields']['body']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['body']['type'] = 'text_plain';
  /* Field: Content: Resource base URL */
  $handler->display->display_options['fields']['base_url']['id'] = 'base_url';
  $handler->display->display_options['fields']['base_url']['table'] = 'field_data_field_smart_method_base_url';
  $handler->display->display_options['fields']['base_url']['field'] = 'field_smart_method_base_url';
  $handler->display->display_options['fields']['base_url']['label'] = '';
  $handler->display->display_options['fields']['base_url']['exclude'] = TRUE;
  $handler->display->display_options['fields']['base_url']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['base_url']['type'] = 'text_plain';
  /* Field: Content: Resource path */
  $handler->display->display_options['fields']['resource_path']['id'] = 'resource_path';
  $handler->display->display_options['fields']['resource_path']['table'] = 'field_data_field_smart_method_resource_path';
  $handler->display->display_options['fields']['resource_path']['field'] = 'field_smart_method_resource_path';
  $handler->display->display_options['fields']['resource_path']['label'] = '';
  $handler->display->display_options['fields']['resource_path']['exclude'] = TRUE;
  $handler->display->display_options['fields']['resource_path']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['resource_path']['type'] = 'text_plain';
  /* Field: Content: Tags */
  $handler->display->display_options['fields']['tags']['id'] = 'tags';
  $handler->display->display_options['fields']['tags']['table'] = 'field_data_field_smart_method_tags';
  $handler->display->display_options['fields']['tags']['field'] = 'field_smart_method_tags';
  $handler->display->display_options['fields']['tags']['label'] = '';
  $handler->display->display_options['fields']['tags']['exclude'] = TRUE;
  $handler->display->display_options['fields']['tags']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['tags']['alter']['text'] = '<h3 class="method-tag-header">[tags]</h3>
<div class="clearfix method_details">
  <div class="method_data title-header">Method</div>
  <div class="method_data description-header">Description</div>
</div>';
  $handler->display->display_options['fields']['tags']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['tags']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Content: HTTP verb */
  $handler->display->display_options['fields']['verb']['id'] = 'verb';
  $handler->display->display_options['fields']['verb']['table'] = 'field_data_field_smart_method_verb';
  $handler->display->display_options['fields']['verb']['field'] = 'field_smart_method_verb';
  $handler->display->display_options['fields']['verb']['label'] = '';
  $handler->display->display_options['fields']['verb']['exclude'] = TRUE;
  $handler->display->display_options['fields']['verb']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['verb']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Global: Custom text */
  $handler->display->display_options['fields']['display']['id'] = 'display';
  $handler->display->display_options['fields']['display']['table'] = 'views';
  $handler->display->display_options['fields']['display']['field'] = 'nothing';
  $handler->display->display_options['fields']['display']['label'] = '';
  $handler->display->display_options['fields']['display']['alter']['text'] = '<div class="method_details clearfix">
  <div class="method_data title">
    <div class="verb-auth"><p data-role="verb" class="[verb]">[verb]</p>[security]</div>
    <div class="title-description">[title]<p title="[base_url][resource_path]" class="resource_path" data-role="resource_path">[base_url][resource_path]</p></div>
  </div>
  <div class="method_data description">[body]</div>
</div>';
  $handler->display->display_options['fields']['display']['element_label_colon'] = FALSE;
  /* Sort criterion: Content: Post date */
  $handler->display->display_options['sorts']['created']['id'] = 'created';
  $handler->display->display_options['sorts']['created']['table'] = 'node';
  $handler->display->display_options['sorts']['created']['field'] = 'created';
  $handler->display->display_options['sorts']['created']['order'] = 'DESC';
  /* Filter criterion: Content: Model (field_smart_method_model) */
  $handler->display->display_options['filters']['model_tid']['id'] = 'model_tid';
  $handler->display->display_options['filters']['model_tid']['table'] = 'field_data_field_smart_method_model';
  $handler->display->display_options['filters']['model_tid']['field'] = 'field_smart_method_model_tid';
  $handler->display->display_options['filters']['model_tid']['value'] = array(
    0 => '72',
  );
  $handler->display->display_options['filters']['model_tid']['group'] = 1;
  $handler->display->display_options['filters']['model_tid']['expose']['operator'] = FALSE;
  $handler->display->display_options['filters']['model_tid']['vocabulary'] = 'smartdocs_models';

  /* Display: Front-page Block */
  $handler = $view->new_display('block', 'Front-page Block', 'frontpage');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'Open Data APIs';
  $handler->display->display_options['display_description'] = 'This block may be placed on the site home page. It lists the 5 most recently-updated published methods in the model.';
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = 5;
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['exclude'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  /* Field: Content: Security schemes */
  $handler->display->display_options['fields']['security']['id'] = 'security';
  $handler->display->display_options['fields']['security']['table'] = 'field_data_field_smart_method_security';
  $handler->display->display_options['fields']['security']['field'] = 'field_smart_method_security';
  $handler->display->display_options['fields']['security']['label'] = '';
  $handler->display->display_options['fields']['security']['exclude'] = TRUE;
  $handler->display->display_options['fields']['security']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['security']['alter']['text'] = '<span title="This method needs authentication." class="icon_lock"></span>';
  $handler->display->display_options['fields']['security']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['security']['delta_limit'] = 1;
  /* Field: Content: Resource path */
  $handler->display->display_options['fields']['resource_path']['id'] = 'resource_path';
  $handler->display->display_options['fields']['resource_path']['table'] = 'field_data_field_smart_method_resource_path';
  $handler->display->display_options['fields']['resource_path']['field'] = 'field_smart_method_resource_path';
  $handler->display->display_options['fields']['resource_path']['label'] = '';
  $handler->display->display_options['fields']['resource_path']['exclude'] = TRUE;
  $handler->display->display_options['fields']['resource_path']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['resource_path']['type'] = 'text_plain';
  /* Field: Content: HTTP verb */
  $handler->display->display_options['fields']['verb']['id'] = 'verb';
  $handler->display->display_options['fields']['verb']['table'] = 'field_data_field_smart_method_verb';
  $handler->display->display_options['fields']['verb']['field'] = 'field_smart_method_verb';
  $handler->display->display_options['fields']['verb']['label'] = '';
  $handler->display->display_options['fields']['verb']['exclude'] = TRUE;
  $handler->display->display_options['fields']['verb']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['verb']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Global: Custom text */
  $handler->display->display_options['fields']['display']['id'] = 'display';
  $handler->display->display_options['fields']['display']['table'] = 'views';
  $handler->display->display_options['fields']['display']['field'] = 'nothing';
  $handler->display->display_options['fields']['display']['label'] = '';
  $handler->display->display_options['fields']['display']['alter']['text'] = '<div class="method_details clearfix">
  <div class="method_data title">
    <div class="verb-auth"><p data-role="verb" class="[verb]">[verb]</p>[security]</div>
    <div class="title-description">[title]<p title="[resource_path]" class="resource_path" data-role="resource_path">[resource_path]</p></div>
  </div>
</div>';
  $handler->display->display_options['fields']['display']['element_label_colon'] = FALSE;

  /* Display: Model index page */
  $handler = $view->new_display('page', 'Model index page', 'modelindex');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'Open Data';
  $handler->display->display_options['display_description'] = 'This display provides the content for the model’s index page. It lists all published methods in the model.';
  $handler->display->display_options['defaults']['header'] = FALSE;
  $handler->display->display_options['path'] = 'taxonomy/term/72';

  /* Display: Method TOC */
  $handler = $view->new_display('block', 'Method TOC', 'methodtoc');
  $handler->display->display_options['display_description'] = 'This block may optionally be placed in a sidebar to provide a table of contents for methods in the Open Data model.';
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['exclude'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  /* Field: Content: Security schemes */
  $handler->display->display_options['fields']['security']['id'] = 'security';
  $handler->display->display_options['fields']['security']['table'] = 'field_data_field_smart_method_security';
  $handler->display->display_options['fields']['security']['field'] = 'field_smart_method_security';
  $handler->display->display_options['fields']['security']['label'] = '';
  $handler->display->display_options['fields']['security']['exclude'] = TRUE;
  $handler->display->display_options['fields']['security']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['security']['alter']['text'] = '<span title="This method needs authentication." class="icon_lock"></span>';
  $handler->display->display_options['fields']['security']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['security']['delta_limit'] = 1;
  /* Field: Content: Resource path */
  $handler->display->display_options['fields']['resource_path']['id'] = 'resource_path';
  $handler->display->display_options['fields']['resource_path']['table'] = 'field_data_field_smart_method_resource_path';
  $handler->display->display_options['fields']['resource_path']['field'] = 'field_smart_method_resource_path';
  $handler->display->display_options['fields']['resource_path']['label'] = '';
  $handler->display->display_options['fields']['resource_path']['exclude'] = TRUE;
  $handler->display->display_options['fields']['resource_path']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['resource_path']['type'] = 'text_plain';
  /* Field: Content: Tags */
  $handler->display->display_options['fields']['tags']['id'] = 'tags';
  $handler->display->display_options['fields']['tags']['table'] = 'field_data_field_smart_method_tags';
  $handler->display->display_options['fields']['tags']['field'] = 'field_smart_method_tags';
  $handler->display->display_options['fields']['tags']['label'] = '';
  $handler->display->display_options['fields']['tags']['exclude'] = TRUE;
  $handler->display->display_options['fields']['tags']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['tags']['alter']['text'] = '<h3 class="method-tag-header">[tags]</h3>';
  $handler->display->display_options['fields']['tags']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['tags']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Content: HTTP verb */
  $handler->display->display_options['fields']['verb']['id'] = 'verb';
  $handler->display->display_options['fields']['verb']['table'] = 'field_data_field_smart_method_verb';
  $handler->display->display_options['fields']['verb']['field'] = 'field_smart_method_verb';
  $handler->display->display_options['fields']['verb']['label'] = '';
  $handler->display->display_options['fields']['verb']['exclude'] = TRUE;
  $handler->display->display_options['fields']['verb']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['verb']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Global: Custom text */
  $handler->display->display_options['fields']['display']['id'] = 'display';
  $handler->display->display_options['fields']['display']['table'] = 'views';
  $handler->display->display_options['fields']['display']['field'] = 'nothing';
  $handler->display->display_options['fields']['display']['label'] = '';
  $handler->display->display_options['fields']['display']['alter']['text'] = '<div class="method_details clearfix">
  <div class="method_data title">
    <div class="verb-auth"><p data-role="verb" class="[verb]">[verb]</p>[security]</div>
    <div class="title-description">[title]<p title="[resource_path]" class="resource_path" data-role="resource_path">[resource_path]</p></div>
  </div>
</div>';
  $handler->display->display_options['fields']['display']['element_label_colon'] = FALSE;
  $export['open-data_methods'] = $view;

  $view = new view();
  $view->name = 'payment-transfers_methods';
  $view->description = 'This view lists methods within the Payment Transfers model.';
  $view->tag = 'smartdocs';
  $view->base_table = 'node';
  $view->human_name = 'Payment Transfers Method Listing';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'none';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['style_options']['grouping'] = array(
    0 => array(
      'field' => 'tags',
      'rendered' => 1,
      'rendered_strip' => 0,
    ),
  );
  $handler->display->display_options['row_plugin'] = 'fields';
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['exclude'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  /* Field: Content: Security schemes */
  $handler->display->display_options['fields']['security']['id'] = 'security';
  $handler->display->display_options['fields']['security']['table'] = 'field_data_field_smart_method_security';
  $handler->display->display_options['fields']['security']['field'] = 'field_smart_method_security';
  $handler->display->display_options['fields']['security']['label'] = '';
  $handler->display->display_options['fields']['security']['exclude'] = TRUE;
  $handler->display->display_options['fields']['security']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['security']['alter']['text'] = '<span title="This method needs authentication." class="icon_lock"></span>';
  $handler->display->display_options['fields']['security']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['security']['delta_limit'] = 1;
  /* Field: Content: Body */
  $handler->display->display_options['fields']['body']['id'] = 'body';
  $handler->display->display_options['fields']['body']['table'] = 'field_data_body';
  $handler->display->display_options['fields']['body']['field'] = 'body';
  $handler->display->display_options['fields']['body']['label'] = '';
  $handler->display->display_options['fields']['body']['exclude'] = TRUE;
  $handler->display->display_options['fields']['body']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['body']['type'] = 'text_plain';
  /* Field: Content: Resource base URL */
  $handler->display->display_options['fields']['base_url']['id'] = 'base_url';
  $handler->display->display_options['fields']['base_url']['table'] = 'field_data_field_smart_method_base_url';
  $handler->display->display_options['fields']['base_url']['field'] = 'field_smart_method_base_url';
  $handler->display->display_options['fields']['base_url']['label'] = '';
  $handler->display->display_options['fields']['base_url']['exclude'] = TRUE;
  $handler->display->display_options['fields']['base_url']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['base_url']['type'] = 'text_plain';
  /* Field: Content: Resource path */
  $handler->display->display_options['fields']['resource_path']['id'] = 'resource_path';
  $handler->display->display_options['fields']['resource_path']['table'] = 'field_data_field_smart_method_resource_path';
  $handler->display->display_options['fields']['resource_path']['field'] = 'field_smart_method_resource_path';
  $handler->display->display_options['fields']['resource_path']['label'] = '';
  $handler->display->display_options['fields']['resource_path']['exclude'] = TRUE;
  $handler->display->display_options['fields']['resource_path']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['resource_path']['type'] = 'text_plain';
  /* Field: Content: Tags */
  $handler->display->display_options['fields']['tags']['id'] = 'tags';
  $handler->display->display_options['fields']['tags']['table'] = 'field_data_field_smart_method_tags';
  $handler->display->display_options['fields']['tags']['field'] = 'field_smart_method_tags';
  $handler->display->display_options['fields']['tags']['label'] = '';
  $handler->display->display_options['fields']['tags']['exclude'] = TRUE;
  $handler->display->display_options['fields']['tags']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['tags']['alter']['text'] = '<h3 class="method-tag-header">[tags]</h3>
<div class="clearfix method_details">
  <div class="method_data title-header">Method</div>
  <div class="method_data description-header">Description</div>
</div>';
  $handler->display->display_options['fields']['tags']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['tags']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Content: HTTP verb */
  $handler->display->display_options['fields']['verb']['id'] = 'verb';
  $handler->display->display_options['fields']['verb']['table'] = 'field_data_field_smart_method_verb';
  $handler->display->display_options['fields']['verb']['field'] = 'field_smart_method_verb';
  $handler->display->display_options['fields']['verb']['label'] = '';
  $handler->display->display_options['fields']['verb']['exclude'] = TRUE;
  $handler->display->display_options['fields']['verb']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['verb']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Global: Custom text */
  $handler->display->display_options['fields']['display']['id'] = 'display';
  $handler->display->display_options['fields']['display']['table'] = 'views';
  $handler->display->display_options['fields']['display']['field'] = 'nothing';
  $handler->display->display_options['fields']['display']['label'] = '';
  $handler->display->display_options['fields']['display']['alter']['text'] = '<div class="method_details clearfix">
  <div class="method_data title">
    <div class="verb-auth"><p data-role="verb" class="[verb]">[verb]</p>[security]</div>
    <div class="title-description">[title]<p title="[base_url][resource_path]" class="resource_path" data-role="resource_path">[base_url][resource_path]</p></div>
  </div>
  <div class="method_data description">[body]</div>
</div>';
  $handler->display->display_options['fields']['display']['element_label_colon'] = FALSE;
  /* Sort criterion: Content: Post date */
  $handler->display->display_options['sorts']['created']['id'] = 'created';
  $handler->display->display_options['sorts']['created']['table'] = 'node';
  $handler->display->display_options['sorts']['created']['field'] = 'created';
  $handler->display->display_options['sorts']['created']['order'] = 'DESC';
  /* Filter criterion: Content: Model (field_smart_method_model) */
  $handler->display->display_options['filters']['model_tid']['id'] = 'model_tid';
  $handler->display->display_options['filters']['model_tid']['table'] = 'field_data_field_smart_method_model';
  $handler->display->display_options['filters']['model_tid']['field'] = 'field_smart_method_model_tid';
  $handler->display->display_options['filters']['model_tid']['value'] = array(
    0 => '67',
  );
  $handler->display->display_options['filters']['model_tid']['group'] = 1;
  $handler->display->display_options['filters']['model_tid']['expose']['operator'] = FALSE;
  $handler->display->display_options['filters']['model_tid']['vocabulary'] = 'smartdocs_models';

  /* Display: Front-page Block */
  $handler = $view->new_display('block', 'Front-page Block', 'frontpage');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'Payment Transfers APIs';
  $handler->display->display_options['display_description'] = 'This block may be placed on the site home page. It lists the 5 most recently-updated published methods in the model.';
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = 5;
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['exclude'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  /* Field: Content: Security schemes */
  $handler->display->display_options['fields']['security']['id'] = 'security';
  $handler->display->display_options['fields']['security']['table'] = 'field_data_field_smart_method_security';
  $handler->display->display_options['fields']['security']['field'] = 'field_smart_method_security';
  $handler->display->display_options['fields']['security']['label'] = '';
  $handler->display->display_options['fields']['security']['exclude'] = TRUE;
  $handler->display->display_options['fields']['security']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['security']['alter']['text'] = '<span title="This method needs authentication." class="icon_lock"></span>';
  $handler->display->display_options['fields']['security']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['security']['delta_limit'] = 1;
  /* Field: Content: Resource path */
  $handler->display->display_options['fields']['resource_path']['id'] = 'resource_path';
  $handler->display->display_options['fields']['resource_path']['table'] = 'field_data_field_smart_method_resource_path';
  $handler->display->display_options['fields']['resource_path']['field'] = 'field_smart_method_resource_path';
  $handler->display->display_options['fields']['resource_path']['label'] = '';
  $handler->display->display_options['fields']['resource_path']['exclude'] = TRUE;
  $handler->display->display_options['fields']['resource_path']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['resource_path']['type'] = 'text_plain';
  /* Field: Content: HTTP verb */
  $handler->display->display_options['fields']['verb']['id'] = 'verb';
  $handler->display->display_options['fields']['verb']['table'] = 'field_data_field_smart_method_verb';
  $handler->display->display_options['fields']['verb']['field'] = 'field_smart_method_verb';
  $handler->display->display_options['fields']['verb']['label'] = '';
  $handler->display->display_options['fields']['verb']['exclude'] = TRUE;
  $handler->display->display_options['fields']['verb']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['verb']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Global: Custom text */
  $handler->display->display_options['fields']['display']['id'] = 'display';
  $handler->display->display_options['fields']['display']['table'] = 'views';
  $handler->display->display_options['fields']['display']['field'] = 'nothing';
  $handler->display->display_options['fields']['display']['label'] = '';
  $handler->display->display_options['fields']['display']['alter']['text'] = '<div class="method_details clearfix">
  <div class="method_data title">
    <div class="verb-auth"><p data-role="verb" class="[verb]">[verb]</p>[security]</div>
    <div class="title-description">[title]<p title="[resource_path]" class="resource_path" data-role="resource_path">[resource_path]</p></div>
  </div>
</div>';
  $handler->display->display_options['fields']['display']['element_label_colon'] = FALSE;

  /* Display: Model index page */
  $handler = $view->new_display('page', 'Model index page', 'modelindex');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'Payment Transfers';
  $handler->display->display_options['display_description'] = 'This display provides the content for the model’s index page. It lists all published methods in the model.';
  $handler->display->display_options['defaults']['header'] = FALSE;
  $handler->display->display_options['path'] = 'taxonomy/term/67';

  /* Display: Method TOC */
  $handler = $view->new_display('block', 'Method TOC', 'methodtoc');
  $handler->display->display_options['display_description'] = 'This block may optionally be placed in a sidebar to provide a table of contents for methods in the Payment Transfers model.';
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['exclude'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  /* Field: Content: Security schemes */
  $handler->display->display_options['fields']['security']['id'] = 'security';
  $handler->display->display_options['fields']['security']['table'] = 'field_data_field_smart_method_security';
  $handler->display->display_options['fields']['security']['field'] = 'field_smart_method_security';
  $handler->display->display_options['fields']['security']['label'] = '';
  $handler->display->display_options['fields']['security']['exclude'] = TRUE;
  $handler->display->display_options['fields']['security']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['security']['alter']['text'] = '<span title="This method needs authentication." class="icon_lock"></span>';
  $handler->display->display_options['fields']['security']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['security']['delta_limit'] = 1;
  /* Field: Content: Resource path */
  $handler->display->display_options['fields']['resource_path']['id'] = 'resource_path';
  $handler->display->display_options['fields']['resource_path']['table'] = 'field_data_field_smart_method_resource_path';
  $handler->display->display_options['fields']['resource_path']['field'] = 'field_smart_method_resource_path';
  $handler->display->display_options['fields']['resource_path']['label'] = '';
  $handler->display->display_options['fields']['resource_path']['exclude'] = TRUE;
  $handler->display->display_options['fields']['resource_path']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['resource_path']['type'] = 'text_plain';
  /* Field: Content: Tags */
  $handler->display->display_options['fields']['tags']['id'] = 'tags';
  $handler->display->display_options['fields']['tags']['table'] = 'field_data_field_smart_method_tags';
  $handler->display->display_options['fields']['tags']['field'] = 'field_smart_method_tags';
  $handler->display->display_options['fields']['tags']['label'] = '';
  $handler->display->display_options['fields']['tags']['exclude'] = TRUE;
  $handler->display->display_options['fields']['tags']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['tags']['alter']['text'] = '<h3 class="method-tag-header">[tags]</h3>';
  $handler->display->display_options['fields']['tags']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['tags']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Content: HTTP verb */
  $handler->display->display_options['fields']['verb']['id'] = 'verb';
  $handler->display->display_options['fields']['verb']['table'] = 'field_data_field_smart_method_verb';
  $handler->display->display_options['fields']['verb']['field'] = 'field_smart_method_verb';
  $handler->display->display_options['fields']['verb']['label'] = '';
  $handler->display->display_options['fields']['verb']['exclude'] = TRUE;
  $handler->display->display_options['fields']['verb']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['verb']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Global: Custom text */
  $handler->display->display_options['fields']['display']['id'] = 'display';
  $handler->display->display_options['fields']['display']['table'] = 'views';
  $handler->display->display_options['fields']['display']['field'] = 'nothing';
  $handler->display->display_options['fields']['display']['label'] = '';
  $handler->display->display_options['fields']['display']['alter']['text'] = '<div class="method_details clearfix">
  <div class="method_data title">
    <div class="verb-auth"><p data-role="verb" class="[verb]">[verb]</p>[security]</div>
    <div class="title-description">[title]<p title="[resource_path]" class="resource_path" data-role="resource_path">[resource_path]</p></div>
  </div>
</div>';
  $handler->display->display_options['fields']['display']['element_label_colon'] = FALSE;
  $export['payment-transfers_methods'] = $view;

  $view = new view();
  $view->name = 'payment_methods';
  $view->description = 'This view lists methods within the Payment model.';
  $view->tag = 'smartdocs';
  $view->base_table = 'node';
  $view->human_name = 'Payment Method Listing';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'none';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['style_options']['grouping'] = array(
    0 => array(
      'field' => 'tags',
      'rendered' => 1,
      'rendered_strip' => 0,
    ),
  );
  $handler->display->display_options['row_plugin'] = 'fields';
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['exclude'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  /* Field: Content: Security schemes */
  $handler->display->display_options['fields']['security']['id'] = 'security';
  $handler->display->display_options['fields']['security']['table'] = 'field_data_field_smart_method_security';
  $handler->display->display_options['fields']['security']['field'] = 'field_smart_method_security';
  $handler->display->display_options['fields']['security']['label'] = '';
  $handler->display->display_options['fields']['security']['exclude'] = TRUE;
  $handler->display->display_options['fields']['security']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['security']['alter']['text'] = '<span title="This method needs authentication." class="icon_lock"></span>';
  $handler->display->display_options['fields']['security']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['security']['delta_limit'] = 1;
  /* Field: Content: Body */
  $handler->display->display_options['fields']['body']['id'] = 'body';
  $handler->display->display_options['fields']['body']['table'] = 'field_data_body';
  $handler->display->display_options['fields']['body']['field'] = 'body';
  $handler->display->display_options['fields']['body']['label'] = '';
  $handler->display->display_options['fields']['body']['exclude'] = TRUE;
  $handler->display->display_options['fields']['body']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['body']['type'] = 'text_plain';
  /* Field: Content: Resource base URL */
  $handler->display->display_options['fields']['base_url']['id'] = 'base_url';
  $handler->display->display_options['fields']['base_url']['table'] = 'field_data_field_smart_method_base_url';
  $handler->display->display_options['fields']['base_url']['field'] = 'field_smart_method_base_url';
  $handler->display->display_options['fields']['base_url']['label'] = '';
  $handler->display->display_options['fields']['base_url']['exclude'] = TRUE;
  $handler->display->display_options['fields']['base_url']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['base_url']['type'] = 'text_plain';
  /* Field: Content: Resource path */
  $handler->display->display_options['fields']['resource_path']['id'] = 'resource_path';
  $handler->display->display_options['fields']['resource_path']['table'] = 'field_data_field_smart_method_resource_path';
  $handler->display->display_options['fields']['resource_path']['field'] = 'field_smart_method_resource_path';
  $handler->display->display_options['fields']['resource_path']['label'] = '';
  $handler->display->display_options['fields']['resource_path']['exclude'] = TRUE;
  $handler->display->display_options['fields']['resource_path']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['resource_path']['type'] = 'text_plain';
  /* Field: Content: Tags */
  $handler->display->display_options['fields']['tags']['id'] = 'tags';
  $handler->display->display_options['fields']['tags']['table'] = 'field_data_field_smart_method_tags';
  $handler->display->display_options['fields']['tags']['field'] = 'field_smart_method_tags';
  $handler->display->display_options['fields']['tags']['label'] = '';
  $handler->display->display_options['fields']['tags']['exclude'] = TRUE;
  $handler->display->display_options['fields']['tags']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['tags']['alter']['text'] = '<h3 class="method-tag-header">[tags]</h3>
<div class="clearfix method_details">
  <div class="method_data title-header">Method</div>
  <div class="method_data description-header">Description</div>
</div>';
  $handler->display->display_options['fields']['tags']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['tags']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Content: HTTP verb */
  $handler->display->display_options['fields']['verb']['id'] = 'verb';
  $handler->display->display_options['fields']['verb']['table'] = 'field_data_field_smart_method_verb';
  $handler->display->display_options['fields']['verb']['field'] = 'field_smart_method_verb';
  $handler->display->display_options['fields']['verb']['label'] = '';
  $handler->display->display_options['fields']['verb']['exclude'] = TRUE;
  $handler->display->display_options['fields']['verb']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['verb']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Global: Custom text */
  $handler->display->display_options['fields']['display']['id'] = 'display';
  $handler->display->display_options['fields']['display']['table'] = 'views';
  $handler->display->display_options['fields']['display']['field'] = 'nothing';
  $handler->display->display_options['fields']['display']['label'] = '';
  $handler->display->display_options['fields']['display']['alter']['text'] = '<div class="method_details clearfix">
  <div class="method_data title">
    <div class="verb-auth"><p data-role="verb" class="[verb]">[verb]</p>[security]</div>
    <div class="title-description">[title]<p title="[base_url][resource_path]" class="resource_path" data-role="resource_path">[base_url][resource_path]</p></div>
  </div>
  <div class="method_data description">[body]</div>
</div>';
  $handler->display->display_options['fields']['display']['element_label_colon'] = FALSE;
  /* Sort criterion: Content: Post date */
  $handler->display->display_options['sorts']['created']['id'] = 'created';
  $handler->display->display_options['sorts']['created']['table'] = 'node';
  $handler->display->display_options['sorts']['created']['field'] = 'created';
  $handler->display->display_options['sorts']['created']['order'] = 'DESC';
  /* Filter criterion: Content: Model (field_smart_method_model) */
  $handler->display->display_options['filters']['model_tid']['id'] = 'model_tid';
  $handler->display->display_options['filters']['model_tid']['table'] = 'field_data_field_smart_method_model';
  $handler->display->display_options['filters']['model_tid']['field'] = 'field_smart_method_model_tid';
  $handler->display->display_options['filters']['model_tid']['value'] = array(
    0 => '33',
  );
  $handler->display->display_options['filters']['model_tid']['group'] = 1;
  $handler->display->display_options['filters']['model_tid']['expose']['operator'] = FALSE;
  $handler->display->display_options['filters']['model_tid']['vocabulary'] = 'smartdocs_models';

  /* Display: Front-page Block */
  $handler = $view->new_display('block', 'Front-page Block', 'frontpage');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'Payment APIs';
  $handler->display->display_options['display_description'] = 'This block may be placed on the site home page. It lists the 5 most recently-updated published methods in the model.';
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = 5;
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['exclude'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  /* Field: Content: Security schemes */
  $handler->display->display_options['fields']['security']['id'] = 'security';
  $handler->display->display_options['fields']['security']['table'] = 'field_data_field_smart_method_security';
  $handler->display->display_options['fields']['security']['field'] = 'field_smart_method_security';
  $handler->display->display_options['fields']['security']['label'] = '';
  $handler->display->display_options['fields']['security']['exclude'] = TRUE;
  $handler->display->display_options['fields']['security']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['security']['alter']['text'] = '<span title="This method needs authentication." class="icon_lock"></span>';
  $handler->display->display_options['fields']['security']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['security']['delta_limit'] = 1;
  /* Field: Content: Resource path */
  $handler->display->display_options['fields']['resource_path']['id'] = 'resource_path';
  $handler->display->display_options['fields']['resource_path']['table'] = 'field_data_field_smart_method_resource_path';
  $handler->display->display_options['fields']['resource_path']['field'] = 'field_smart_method_resource_path';
  $handler->display->display_options['fields']['resource_path']['label'] = '';
  $handler->display->display_options['fields']['resource_path']['exclude'] = TRUE;
  $handler->display->display_options['fields']['resource_path']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['resource_path']['type'] = 'text_plain';
  /* Field: Content: HTTP verb */
  $handler->display->display_options['fields']['verb']['id'] = 'verb';
  $handler->display->display_options['fields']['verb']['table'] = 'field_data_field_smart_method_verb';
  $handler->display->display_options['fields']['verb']['field'] = 'field_smart_method_verb';
  $handler->display->display_options['fields']['verb']['label'] = '';
  $handler->display->display_options['fields']['verb']['exclude'] = TRUE;
  $handler->display->display_options['fields']['verb']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['verb']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Global: Custom text */
  $handler->display->display_options['fields']['display']['id'] = 'display';
  $handler->display->display_options['fields']['display']['table'] = 'views';
  $handler->display->display_options['fields']['display']['field'] = 'nothing';
  $handler->display->display_options['fields']['display']['label'] = '';
  $handler->display->display_options['fields']['display']['alter']['text'] = '<div class="method_details clearfix">
  <div class="method_data title">
    <div class="verb-auth"><p data-role="verb" class="[verb]">[verb]</p>[security]</div>
    <div class="title-description">[title]<p title="[resource_path]" class="resource_path" data-role="resource_path">[resource_path]</p></div>
  </div>
</div>';
  $handler->display->display_options['fields']['display']['element_label_colon'] = FALSE;

  /* Display: Model index page */
  $handler = $view->new_display('page', 'Model index page', 'modelindex');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'Payment';
  $handler->display->display_options['display_description'] = 'This display provides the content for the model’s index page. It lists all published methods in the model.';
  $handler->display->display_options['defaults']['header'] = FALSE;
  $handler->display->display_options['path'] = 'taxonomy/term/33';

  /* Display: Method TOC */
  $handler = $view->new_display('block', 'Method TOC', 'methodtoc');
  $handler->display->display_options['display_description'] = 'This block may optionally be placed in a sidebar to provide a table of contents for methods in the Payment model.';
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['exclude'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  /* Field: Content: Security schemes */
  $handler->display->display_options['fields']['security']['id'] = 'security';
  $handler->display->display_options['fields']['security']['table'] = 'field_data_field_smart_method_security';
  $handler->display->display_options['fields']['security']['field'] = 'field_smart_method_security';
  $handler->display->display_options['fields']['security']['label'] = '';
  $handler->display->display_options['fields']['security']['exclude'] = TRUE;
  $handler->display->display_options['fields']['security']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['security']['alter']['text'] = '<span title="This method needs authentication." class="icon_lock"></span>';
  $handler->display->display_options['fields']['security']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['security']['delta_limit'] = 1;
  /* Field: Content: Resource path */
  $handler->display->display_options['fields']['resource_path']['id'] = 'resource_path';
  $handler->display->display_options['fields']['resource_path']['table'] = 'field_data_field_smart_method_resource_path';
  $handler->display->display_options['fields']['resource_path']['field'] = 'field_smart_method_resource_path';
  $handler->display->display_options['fields']['resource_path']['label'] = '';
  $handler->display->display_options['fields']['resource_path']['exclude'] = TRUE;
  $handler->display->display_options['fields']['resource_path']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['resource_path']['type'] = 'text_plain';
  /* Field: Content: Tags */
  $handler->display->display_options['fields']['tags']['id'] = 'tags';
  $handler->display->display_options['fields']['tags']['table'] = 'field_data_field_smart_method_tags';
  $handler->display->display_options['fields']['tags']['field'] = 'field_smart_method_tags';
  $handler->display->display_options['fields']['tags']['label'] = '';
  $handler->display->display_options['fields']['tags']['exclude'] = TRUE;
  $handler->display->display_options['fields']['tags']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['tags']['alter']['text'] = '<h3 class="method-tag-header">[tags]</h3>';
  $handler->display->display_options['fields']['tags']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['tags']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Content: HTTP verb */
  $handler->display->display_options['fields']['verb']['id'] = 'verb';
  $handler->display->display_options['fields']['verb']['table'] = 'field_data_field_smart_method_verb';
  $handler->display->display_options['fields']['verb']['field'] = 'field_smart_method_verb';
  $handler->display->display_options['fields']['verb']['label'] = '';
  $handler->display->display_options['fields']['verb']['exclude'] = TRUE;
  $handler->display->display_options['fields']['verb']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['verb']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Global: Custom text */
  $handler->display->display_options['fields']['display']['id'] = 'display';
  $handler->display->display_options['fields']['display']['table'] = 'views';
  $handler->display->display_options['fields']['display']['field'] = 'nothing';
  $handler->display->display_options['fields']['display']['label'] = '';
  $handler->display->display_options['fields']['display']['alter']['text'] = '<div class="method_details clearfix">
  <div class="method_data title">
    <div class="verb-auth"><p data-role="verb" class="[verb]">[verb]</p>[security]</div>
    <div class="title-description">[title]<p title="[resource_path]" class="resource_path" data-role="resource_path">[resource_path]</p></div>
  </div>
</div>';
  $handler->display->display_options['fields']['display']['element_label_colon'] = FALSE;
  $export['payment_methods'] = $view;

  $view = new view();
  $view->name = 'petstore_example_methods';
  $view->description = 'This view lists methods within the Pet Store Example API model.';
  $view->tag = 'smartdocs';
  $view->base_table = 'node';
  $view->human_name = 'Pet Store Example API Method Listing';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'none';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['style_options']['grouping'] = array(
    0 => array(
      'field' => 'tags',
      'rendered' => 1,
      'rendered_strip' => 0,
    ),
  );
  $handler->display->display_options['row_plugin'] = 'fields';
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['exclude'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  /* Field: Content: Security schemes */
  $handler->display->display_options['fields']['security']['id'] = 'security';
  $handler->display->display_options['fields']['security']['table'] = 'field_data_field_smart_method_security';
  $handler->display->display_options['fields']['security']['field'] = 'field_smart_method_security';
  $handler->display->display_options['fields']['security']['label'] = '';
  $handler->display->display_options['fields']['security']['exclude'] = TRUE;
  $handler->display->display_options['fields']['security']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['security']['alter']['text'] = '<span title="This method needs authentication." class="icon_lock"></span>';
  $handler->display->display_options['fields']['security']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['security']['delta_limit'] = 1;
  /* Field: Content: Body */
  $handler->display->display_options['fields']['body']['id'] = 'body';
  $handler->display->display_options['fields']['body']['table'] = 'field_data_body';
  $handler->display->display_options['fields']['body']['field'] = 'body';
  $handler->display->display_options['fields']['body']['label'] = '';
  $handler->display->display_options['fields']['body']['exclude'] = TRUE;
  $handler->display->display_options['fields']['body']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['body']['type'] = 'text_plain';
  /* Field: Content: Resource base URL */
  $handler->display->display_options['fields']['base_url']['id'] = 'base_url';
  $handler->display->display_options['fields']['base_url']['table'] = 'field_data_field_smart_method_base_url';
  $handler->display->display_options['fields']['base_url']['field'] = 'field_smart_method_base_url';
  $handler->display->display_options['fields']['base_url']['label'] = '';
  $handler->display->display_options['fields']['base_url']['exclude'] = TRUE;
  $handler->display->display_options['fields']['base_url']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['base_url']['type'] = 'text_plain';
  /* Field: Content: Resource path */
  $handler->display->display_options['fields']['resource_path']['id'] = 'resource_path';
  $handler->display->display_options['fields']['resource_path']['table'] = 'field_data_field_smart_method_resource_path';
  $handler->display->display_options['fields']['resource_path']['field'] = 'field_smart_method_resource_path';
  $handler->display->display_options['fields']['resource_path']['label'] = '';
  $handler->display->display_options['fields']['resource_path']['exclude'] = TRUE;
  $handler->display->display_options['fields']['resource_path']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['resource_path']['type'] = 'text_plain';
  /* Field: Content: Tags */
  $handler->display->display_options['fields']['tags']['id'] = 'tags';
  $handler->display->display_options['fields']['tags']['table'] = 'field_data_field_smart_method_tags';
  $handler->display->display_options['fields']['tags']['field'] = 'field_smart_method_tags';
  $handler->display->display_options['fields']['tags']['label'] = '';
  $handler->display->display_options['fields']['tags']['exclude'] = TRUE;
  $handler->display->display_options['fields']['tags']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['tags']['alter']['text'] = '<h3 class="method-tag-header">[tags]</h3>
<div class="clearfix method_details">
  <div class="method_data title-header">Method</div>
  <div class="method_data description-header">Description</div>
</div>';
  $handler->display->display_options['fields']['tags']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['tags']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Content: HTTP verb */
  $handler->display->display_options['fields']['verb']['id'] = 'verb';
  $handler->display->display_options['fields']['verb']['table'] = 'field_data_field_smart_method_verb';
  $handler->display->display_options['fields']['verb']['field'] = 'field_smart_method_verb';
  $handler->display->display_options['fields']['verb']['label'] = '';
  $handler->display->display_options['fields']['verb']['exclude'] = TRUE;
  $handler->display->display_options['fields']['verb']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['verb']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Global: Custom text */
  $handler->display->display_options['fields']['display']['id'] = 'display';
  $handler->display->display_options['fields']['display']['table'] = 'views';
  $handler->display->display_options['fields']['display']['field'] = 'nothing';
  $handler->display->display_options['fields']['display']['label'] = '';
  $handler->display->display_options['fields']['display']['alter']['text'] = '<div class="method_details clearfix">
  <div class="method_data title">
    <div class="verb-auth"><p data-role="verb" class="[verb]">[verb]</p>[security]</div>
    <div class="title-description">[title]<p title="[base_url][resource_path]" class="resource_path" data-role="resource_path">[base_url][resource_path]</p></div>
  </div>
  <div class="method_data description">[body]</div>
</div>';
  $handler->display->display_options['fields']['display']['element_label_colon'] = FALSE;
  /* Sort criterion: Content: Post date */
  $handler->display->display_options['sorts']['created']['id'] = 'created';
  $handler->display->display_options['sorts']['created']['table'] = 'node';
  $handler->display->display_options['sorts']['created']['field'] = 'created';
  $handler->display->display_options['sorts']['created']['order'] = 'DESC';
  /* Filter criterion: Content: Model (field_smart_method_model) */
  $handler->display->display_options['filters']['model_tid']['id'] = 'model_tid';
  $handler->display->display_options['filters']['model_tid']['table'] = 'field_data_field_smart_method_model';
  $handler->display->display_options['filters']['model_tid']['field'] = 'field_smart_method_model_tid';
  $handler->display->display_options['filters']['model_tid']['value'] = array(
    0 => '22',
  );
  $handler->display->display_options['filters']['model_tid']['group'] = 1;
  $handler->display->display_options['filters']['model_tid']['expose']['operator'] = FALSE;
  $handler->display->display_options['filters']['model_tid']['vocabulary'] = 'smartdocs_models';

  /* Display: Front-page Block */
  $handler = $view->new_display('block', 'Front-page Block', 'frontpage');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'Pet Store Example API APIs';
  $handler->display->display_options['display_description'] = 'This block may be placed on the site home page. It lists the 5 most recently-updated published methods in the model.';
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = 5;
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['exclude'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  /* Field: Content: Security schemes */
  $handler->display->display_options['fields']['security']['id'] = 'security';
  $handler->display->display_options['fields']['security']['table'] = 'field_data_field_smart_method_security';
  $handler->display->display_options['fields']['security']['field'] = 'field_smart_method_security';
  $handler->display->display_options['fields']['security']['label'] = '';
  $handler->display->display_options['fields']['security']['exclude'] = TRUE;
  $handler->display->display_options['fields']['security']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['security']['alter']['text'] = '<span title="This method needs authentication." class="icon_lock"></span>';
  $handler->display->display_options['fields']['security']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['security']['delta_limit'] = 1;
  /* Field: Content: Resource path */
  $handler->display->display_options['fields']['resource_path']['id'] = 'resource_path';
  $handler->display->display_options['fields']['resource_path']['table'] = 'field_data_field_smart_method_resource_path';
  $handler->display->display_options['fields']['resource_path']['field'] = 'field_smart_method_resource_path';
  $handler->display->display_options['fields']['resource_path']['label'] = '';
  $handler->display->display_options['fields']['resource_path']['exclude'] = TRUE;
  $handler->display->display_options['fields']['resource_path']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['resource_path']['type'] = 'text_plain';
  /* Field: Content: HTTP verb */
  $handler->display->display_options['fields']['verb']['id'] = 'verb';
  $handler->display->display_options['fields']['verb']['table'] = 'field_data_field_smart_method_verb';
  $handler->display->display_options['fields']['verb']['field'] = 'field_smart_method_verb';
  $handler->display->display_options['fields']['verb']['label'] = '';
  $handler->display->display_options['fields']['verb']['exclude'] = TRUE;
  $handler->display->display_options['fields']['verb']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['verb']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Global: Custom text */
  $handler->display->display_options['fields']['display']['id'] = 'display';
  $handler->display->display_options['fields']['display']['table'] = 'views';
  $handler->display->display_options['fields']['display']['field'] = 'nothing';
  $handler->display->display_options['fields']['display']['label'] = '';
  $handler->display->display_options['fields']['display']['alter']['text'] = '<div class="method_details clearfix">
  <div class="method_data title">
    <div class="verb-auth"><p data-role="verb" class="[verb]">[verb]</p>[security]</div>
    <div class="title-description">[title]<p title="[resource_path]" class="resource_path" data-role="resource_path">[resource_path]</p></div>
  </div>
</div>';
  $handler->display->display_options['fields']['display']['element_label_colon'] = FALSE;

  /* Display: Model index page */
  $handler = $view->new_display('page', 'Model index page', 'modelindex');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'Pet Store Example API';
  $handler->display->display_options['display_description'] = 'This display provides the content for the model’s index page. It lists all published methods in the model.';
  $handler->display->display_options['defaults']['header'] = FALSE;
  /* Header: Global: Text area */
  $handler->display->display_options['header']['model_description']['id'] = 'model_description';
  $handler->display->display_options['header']['model_description']['table'] = 'views';
  $handler->display->display_options['header']['model_description']['field'] = 'area';
  $handler->display->display_options['header']['model_description']['empty'] = TRUE;
  $handler->display->display_options['header']['model_description']['content'] = 'Manage inventory and users through an example REST API patterned after the classic pet store demo.';
  $handler->display->display_options['header']['model_description']['format'] = 'plain_text';
  $handler->display->display_options['path'] = 'taxonomy/term/22';

  /* Display: Method TOC */
  $handler = $view->new_display('block', 'Method TOC', 'methodtoc');
  $handler->display->display_options['display_description'] = 'This block may optionally be placed in a sidebar to provide a table of contents for methods in the Pet Store Example API model.';
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['exclude'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  /* Field: Content: Security schemes */
  $handler->display->display_options['fields']['security']['id'] = 'security';
  $handler->display->display_options['fields']['security']['table'] = 'field_data_field_smart_method_security';
  $handler->display->display_options['fields']['security']['field'] = 'field_smart_method_security';
  $handler->display->display_options['fields']['security']['label'] = '';
  $handler->display->display_options['fields']['security']['exclude'] = TRUE;
  $handler->display->display_options['fields']['security']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['security']['alter']['text'] = '<span title="This method needs authentication." class="icon_lock"></span>';
  $handler->display->display_options['fields']['security']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['security']['delta_limit'] = 1;
  /* Field: Content: Resource path */
  $handler->display->display_options['fields']['resource_path']['id'] = 'resource_path';
  $handler->display->display_options['fields']['resource_path']['table'] = 'field_data_field_smart_method_resource_path';
  $handler->display->display_options['fields']['resource_path']['field'] = 'field_smart_method_resource_path';
  $handler->display->display_options['fields']['resource_path']['label'] = '';
  $handler->display->display_options['fields']['resource_path']['exclude'] = TRUE;
  $handler->display->display_options['fields']['resource_path']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['resource_path']['type'] = 'text_plain';
  /* Field: Content: Tags */
  $handler->display->display_options['fields']['tags']['id'] = 'tags';
  $handler->display->display_options['fields']['tags']['table'] = 'field_data_field_smart_method_tags';
  $handler->display->display_options['fields']['tags']['field'] = 'field_smart_method_tags';
  $handler->display->display_options['fields']['tags']['label'] = '';
  $handler->display->display_options['fields']['tags']['exclude'] = TRUE;
  $handler->display->display_options['fields']['tags']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['tags']['alter']['text'] = '<h3 class="method-tag-header">[tags]</h3>';
  $handler->display->display_options['fields']['tags']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['tags']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Content: HTTP verb */
  $handler->display->display_options['fields']['verb']['id'] = 'verb';
  $handler->display->display_options['fields']['verb']['table'] = 'field_data_field_smart_method_verb';
  $handler->display->display_options['fields']['verb']['field'] = 'field_smart_method_verb';
  $handler->display->display_options['fields']['verb']['label'] = '';
  $handler->display->display_options['fields']['verb']['exclude'] = TRUE;
  $handler->display->display_options['fields']['verb']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['verb']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Global: Custom text */
  $handler->display->display_options['fields']['display']['id'] = 'display';
  $handler->display->display_options['fields']['display']['table'] = 'views';
  $handler->display->display_options['fields']['display']['field'] = 'nothing';
  $handler->display->display_options['fields']['display']['label'] = '';
  $handler->display->display_options['fields']['display']['alter']['text'] = '<div class="method_details clearfix">
  <div class="method_data title">
    <div class="verb-auth"><p data-role="verb" class="[verb]">[verb]</p>[security]</div>
    <div class="title-description">[title]<p title="[resource_path]" class="resource_path" data-role="resource_path">[resource_path]</p></div>
  </div>
</div>';
  $handler->display->display_options['fields']['display']['element_label_colon'] = FALSE;
  $export['petstore_example_methods'] = $view;

  $view = new view();
  $view->name = 'slideshow';
  $view->description = 'The view for building slideshows';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'Slideshow';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'Slideshow: Home';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'full';
  $handler->display->display_options['pager']['options']['items_per_page'] = '5';
  $handler->display->display_options['style_plugin'] = 'slideshow';
  $handler->display->display_options['style_options']['slideshow_type'] = 'flexslider_views_slideshow';
  $handler->display->display_options['style_options']['slideshow_skin'] = 'default';
  $handler->display->display_options['style_options']['skin_info'] = array(
    'class' => 'default',
    'name' => 'Default',
    'module' => 'views_slideshow',
    'path' => '',
    'stylesheets' => array(),
  );
  $handler->display->display_options['style_options']['widgets']['top']['views_slideshow_pager']['weight'] = '1';
  $handler->display->display_options['style_options']['widgets']['top']['views_slideshow_pager']['type'] = 'views_slideshow_pager_fields';
  $handler->display->display_options['style_options']['widgets']['top']['views_slideshow_pager']['views_slideshow_pager_fields_fields'] = array(
    'body' => 0,
    'field_slides_image' => 0,
    'nothing' => 0,
  );
  $handler->display->display_options['style_options']['widgets']['top']['views_slideshow_controls']['weight'] = '1';
  $handler->display->display_options['style_options']['widgets']['top']['views_slideshow_controls']['type'] = 'views_slideshow_controls_text';
  $handler->display->display_options['style_options']['widgets']['top']['views_slideshow_slide_counter']['weight'] = '1';
  $handler->display->display_options['style_options']['widgets']['bottom']['views_slideshow_pager']['weight'] = '1';
  $handler->display->display_options['style_options']['widgets']['bottom']['views_slideshow_pager']['type'] = 'views_slideshow_pager_fields';
  $handler->display->display_options['style_options']['widgets']['bottom']['views_slideshow_pager']['views_slideshow_pager_fields_fields'] = array(
    'body' => 0,
    'field_slides_image' => 0,
    'nothing' => 0,
  );
  $handler->display->display_options['style_options']['widgets']['bottom']['views_slideshow_controls']['weight'] = '1';
  $handler->display->display_options['style_options']['widgets']['bottom']['views_slideshow_controls']['type'] = 'views_slideshow_controls_text';
  $handler->display->display_options['style_options']['widgets']['bottom']['views_slideshow_slide_counter']['weight'] = '1';
  $handler->display->display_options['row_plugin'] = 'fields';
  /* Field: Content: Body */
  $handler->display->display_options['fields']['body']['id'] = 'body';
  $handler->display->display_options['fields']['body']['table'] = 'field_data_body';
  $handler->display->display_options['fields']['body']['field'] = 'body';
  $handler->display->display_options['fields']['body']['label'] = '';
  $handler->display->display_options['fields']['body']['exclude'] = TRUE;
  $handler->display->display_options['fields']['body']['element_label_colon'] = FALSE;
  /* Field: Content: Image */
  $handler->display->display_options['fields']['field_slides_image']['id'] = 'field_slides_image';
  $handler->display->display_options['fields']['field_slides_image']['table'] = 'field_data_field_slides_image';
  $handler->display->display_options['fields']['field_slides_image']['field'] = 'field_slides_image';
  $handler->display->display_options['fields']['field_slides_image']['label'] = '';
  $handler->display->display_options['fields']['field_slides_image']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_slides_image']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_slides_image']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_slides_image']['settings'] = array(
    'image_style' => '',
    'image_link' => '',
  );
  /* Field: Global: Custom text */
  $handler->display->display_options['fields']['nothing']['id'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['table'] = 'views';
  $handler->display->display_options['fields']['nothing']['field'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['label'] = '';
  $handler->display->display_options['fields']['nothing']['alter']['text'] = '<div class=\'slide-wrapper\'>
<div class=\'slide-item\'>
<div class=\'slide-caption\'>[body]</div>
[field_slides_image]
</div>
</div>';
  $handler->display->display_options['fields']['nothing']['element_label_colon'] = FALSE;
  /* Sort criterion: Content: Post date */
  $handler->display->display_options['sorts']['created']['id'] = 'created';
  $handler->display->display_options['sorts']['created']['table'] = 'node';
  $handler->display->display_options['sorts']['created']['field'] = 'created';
  $handler->display->display_options['sorts']['created']['order'] = 'DESC';
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'slides' => 'slides',
  );

  /* Display: Block: Slideshow Home */
  $handler = $view->new_display('block', 'Block: Slideshow Home', 'block');
  $export['slideshow'] = $view;

  $view = new view();
  $view->name = 'userinfo_methods';
  $view->description = 'This view lists methods within the Userinfo model.';
  $view->tag = 'smartdocs';
  $view->base_table = 'node';
  $view->human_name = 'Userinfo Method Listing';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'none';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['style_options']['grouping'] = array(
    0 => array(
      'field' => 'tags',
      'rendered' => 1,
      'rendered_strip' => 0,
    ),
  );
  $handler->display->display_options['row_plugin'] = 'fields';
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['exclude'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  /* Field: Content: Security schemes */
  $handler->display->display_options['fields']['security']['id'] = 'security';
  $handler->display->display_options['fields']['security']['table'] = 'field_data_field_smart_method_security';
  $handler->display->display_options['fields']['security']['field'] = 'field_smart_method_security';
  $handler->display->display_options['fields']['security']['label'] = '';
  $handler->display->display_options['fields']['security']['exclude'] = TRUE;
  $handler->display->display_options['fields']['security']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['security']['alter']['text'] = '<span title="This method needs authentication." class="icon_lock"></span>';
  $handler->display->display_options['fields']['security']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['security']['delta_limit'] = 1;
  /* Field: Content: Body */
  $handler->display->display_options['fields']['body']['id'] = 'body';
  $handler->display->display_options['fields']['body']['table'] = 'field_data_body';
  $handler->display->display_options['fields']['body']['field'] = 'body';
  $handler->display->display_options['fields']['body']['label'] = '';
  $handler->display->display_options['fields']['body']['exclude'] = TRUE;
  $handler->display->display_options['fields']['body']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['body']['type'] = 'text_plain';
  /* Field: Content: Resource base URL */
  $handler->display->display_options['fields']['base_url']['id'] = 'base_url';
  $handler->display->display_options['fields']['base_url']['table'] = 'field_data_field_smart_method_base_url';
  $handler->display->display_options['fields']['base_url']['field'] = 'field_smart_method_base_url';
  $handler->display->display_options['fields']['base_url']['label'] = '';
  $handler->display->display_options['fields']['base_url']['exclude'] = TRUE;
  $handler->display->display_options['fields']['base_url']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['base_url']['type'] = 'text_plain';
  /* Field: Content: Resource path */
  $handler->display->display_options['fields']['resource_path']['id'] = 'resource_path';
  $handler->display->display_options['fields']['resource_path']['table'] = 'field_data_field_smart_method_resource_path';
  $handler->display->display_options['fields']['resource_path']['field'] = 'field_smart_method_resource_path';
  $handler->display->display_options['fields']['resource_path']['label'] = '';
  $handler->display->display_options['fields']['resource_path']['exclude'] = TRUE;
  $handler->display->display_options['fields']['resource_path']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['resource_path']['type'] = 'text_plain';
  /* Field: Content: Tags */
  $handler->display->display_options['fields']['tags']['id'] = 'tags';
  $handler->display->display_options['fields']['tags']['table'] = 'field_data_field_smart_method_tags';
  $handler->display->display_options['fields']['tags']['field'] = 'field_smart_method_tags';
  $handler->display->display_options['fields']['tags']['label'] = '';
  $handler->display->display_options['fields']['tags']['exclude'] = TRUE;
  $handler->display->display_options['fields']['tags']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['tags']['alter']['text'] = '<h3 class="method-tag-header">[tags]</h3>
<div class="clearfix method_details">
  <div class="method_data title-header">Method</div>
  <div class="method_data description-header">Description</div>
</div>';
  $handler->display->display_options['fields']['tags']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['tags']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Content: HTTP verb */
  $handler->display->display_options['fields']['verb']['id'] = 'verb';
  $handler->display->display_options['fields']['verb']['table'] = 'field_data_field_smart_method_verb';
  $handler->display->display_options['fields']['verb']['field'] = 'field_smart_method_verb';
  $handler->display->display_options['fields']['verb']['label'] = '';
  $handler->display->display_options['fields']['verb']['exclude'] = TRUE;
  $handler->display->display_options['fields']['verb']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['verb']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Global: Custom text */
  $handler->display->display_options['fields']['display']['id'] = 'display';
  $handler->display->display_options['fields']['display']['table'] = 'views';
  $handler->display->display_options['fields']['display']['field'] = 'nothing';
  $handler->display->display_options['fields']['display']['label'] = '';
  $handler->display->display_options['fields']['display']['alter']['text'] = '<div class="method_details clearfix">
  <div class="method_data title">
    <div class="verb-auth"><p data-role="verb" class="[verb]">[verb]</p>[security]</div>
    <div class="title-description">[title]<p title="[base_url][resource_path]" class="resource_path" data-role="resource_path">[base_url][resource_path]</p></div>
  </div>
  <div class="method_data description">[body]</div>
</div>';
  $handler->display->display_options['fields']['display']['element_label_colon'] = FALSE;
  /* Sort criterion: Content: Post date */
  $handler->display->display_options['sorts']['created']['id'] = 'created';
  $handler->display->display_options['sorts']['created']['table'] = 'node';
  $handler->display->display_options['sorts']['created']['field'] = 'created';
  $handler->display->display_options['sorts']['created']['order'] = 'DESC';
  /* Filter criterion: Content: Model (field_smart_method_model) */
  $handler->display->display_options['filters']['model_tid']['id'] = 'model_tid';
  $handler->display->display_options['filters']['model_tid']['table'] = 'field_data_field_smart_method_model';
  $handler->display->display_options['filters']['model_tid']['field'] = 'field_smart_method_model_tid';
  $handler->display->display_options['filters']['model_tid']['value'] = array(
    0 => '74',
  );
  $handler->display->display_options['filters']['model_tid']['group'] = 1;
  $handler->display->display_options['filters']['model_tid']['expose']['operator'] = FALSE;
  $handler->display->display_options['filters']['model_tid']['vocabulary'] = 'smartdocs_models';

  /* Display: Front-page Block */
  $handler = $view->new_display('block', 'Front-page Block', 'frontpage');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'Userinfo APIs';
  $handler->display->display_options['display_description'] = 'This block may be placed on the site home page. It lists the 5 most recently-updated published methods in the model.';
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = 5;
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['exclude'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  /* Field: Content: Security schemes */
  $handler->display->display_options['fields']['security']['id'] = 'security';
  $handler->display->display_options['fields']['security']['table'] = 'field_data_field_smart_method_security';
  $handler->display->display_options['fields']['security']['field'] = 'field_smart_method_security';
  $handler->display->display_options['fields']['security']['label'] = '';
  $handler->display->display_options['fields']['security']['exclude'] = TRUE;
  $handler->display->display_options['fields']['security']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['security']['alter']['text'] = '<span title="This method needs authentication." class="icon_lock"></span>';
  $handler->display->display_options['fields']['security']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['security']['delta_limit'] = 1;
  /* Field: Content: Resource path */
  $handler->display->display_options['fields']['resource_path']['id'] = 'resource_path';
  $handler->display->display_options['fields']['resource_path']['table'] = 'field_data_field_smart_method_resource_path';
  $handler->display->display_options['fields']['resource_path']['field'] = 'field_smart_method_resource_path';
  $handler->display->display_options['fields']['resource_path']['label'] = '';
  $handler->display->display_options['fields']['resource_path']['exclude'] = TRUE;
  $handler->display->display_options['fields']['resource_path']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['resource_path']['type'] = 'text_plain';
  /* Field: Content: HTTP verb */
  $handler->display->display_options['fields']['verb']['id'] = 'verb';
  $handler->display->display_options['fields']['verb']['table'] = 'field_data_field_smart_method_verb';
  $handler->display->display_options['fields']['verb']['field'] = 'field_smart_method_verb';
  $handler->display->display_options['fields']['verb']['label'] = '';
  $handler->display->display_options['fields']['verb']['exclude'] = TRUE;
  $handler->display->display_options['fields']['verb']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['verb']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Global: Custom text */
  $handler->display->display_options['fields']['display']['id'] = 'display';
  $handler->display->display_options['fields']['display']['table'] = 'views';
  $handler->display->display_options['fields']['display']['field'] = 'nothing';
  $handler->display->display_options['fields']['display']['label'] = '';
  $handler->display->display_options['fields']['display']['alter']['text'] = '<div class="method_details clearfix">
  <div class="method_data title">
    <div class="verb-auth"><p data-role="verb" class="[verb]">[verb]</p>[security]</div>
    <div class="title-description">[title]<p title="[resource_path]" class="resource_path" data-role="resource_path">[resource_path]</p></div>
  </div>
</div>';
  $handler->display->display_options['fields']['display']['element_label_colon'] = FALSE;

  /* Display: Model index page */
  $handler = $view->new_display('page', 'Model index page', 'modelindex');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'Userinfo';
  $handler->display->display_options['display_description'] = 'This display provides the content for the model’s index page. It lists all published methods in the model.';
  $handler->display->display_options['defaults']['header'] = FALSE;
  /* Header: Global: Text area */
  $handler->display->display_options['header']['model_description']['id'] = 'model_description';
  $handler->display->display_options['header']['model_description']['table'] = 'views';
  $handler->display->display_options['header']['model_description']['field'] = 'area';
  $handler->display->display_options['header']['model_description']['empty'] = TRUE;
  $handler->display->display_options['header']['model_description']['content'] = 'Get details of logged-in customer, including name, address and contact information. The user is identified from the user Bearer Token.';
  $handler->display->display_options['header']['model_description']['format'] = 'plain_text';
  $handler->display->display_options['path'] = 'taxonomy/term/74';

  /* Display: Method TOC */
  $handler = $view->new_display('block', 'Method TOC', 'methodtoc');
  $handler->display->display_options['display_description'] = 'This block may optionally be placed in a sidebar to provide a table of contents for methods in the Userinfo model.';
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['exclude'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  /* Field: Content: Security schemes */
  $handler->display->display_options['fields']['security']['id'] = 'security';
  $handler->display->display_options['fields']['security']['table'] = 'field_data_field_smart_method_security';
  $handler->display->display_options['fields']['security']['field'] = 'field_smart_method_security';
  $handler->display->display_options['fields']['security']['label'] = '';
  $handler->display->display_options['fields']['security']['exclude'] = TRUE;
  $handler->display->display_options['fields']['security']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['security']['alter']['text'] = '<span title="This method needs authentication." class="icon_lock"></span>';
  $handler->display->display_options['fields']['security']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['security']['delta_limit'] = 1;
  /* Field: Content: Resource path */
  $handler->display->display_options['fields']['resource_path']['id'] = 'resource_path';
  $handler->display->display_options['fields']['resource_path']['table'] = 'field_data_field_smart_method_resource_path';
  $handler->display->display_options['fields']['resource_path']['field'] = 'field_smart_method_resource_path';
  $handler->display->display_options['fields']['resource_path']['label'] = '';
  $handler->display->display_options['fields']['resource_path']['exclude'] = TRUE;
  $handler->display->display_options['fields']['resource_path']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['resource_path']['type'] = 'text_plain';
  /* Field: Content: Tags */
  $handler->display->display_options['fields']['tags']['id'] = 'tags';
  $handler->display->display_options['fields']['tags']['table'] = 'field_data_field_smart_method_tags';
  $handler->display->display_options['fields']['tags']['field'] = 'field_smart_method_tags';
  $handler->display->display_options['fields']['tags']['label'] = '';
  $handler->display->display_options['fields']['tags']['exclude'] = TRUE;
  $handler->display->display_options['fields']['tags']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['tags']['alter']['text'] = '<h3 class="method-tag-header">[tags]</h3>';
  $handler->display->display_options['fields']['tags']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['tags']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Content: HTTP verb */
  $handler->display->display_options['fields']['verb']['id'] = 'verb';
  $handler->display->display_options['fields']['verb']['table'] = 'field_data_field_smart_method_verb';
  $handler->display->display_options['fields']['verb']['field'] = 'field_smart_method_verb';
  $handler->display->display_options['fields']['verb']['label'] = '';
  $handler->display->display_options['fields']['verb']['exclude'] = TRUE;
  $handler->display->display_options['fields']['verb']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['verb']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Global: Custom text */
  $handler->display->display_options['fields']['display']['id'] = 'display';
  $handler->display->display_options['fields']['display']['table'] = 'views';
  $handler->display->display_options['fields']['display']['field'] = 'nothing';
  $handler->display->display_options['fields']['display']['label'] = '';
  $handler->display->display_options['fields']['display']['alter']['text'] = '<div class="method_details clearfix">
  <div class="method_data title">
    <div class="verb-auth"><p data-role="verb" class="[verb]">[verb]</p>[security]</div>
    <div class="title-description">[title]<p title="[resource_path]" class="resource_path" data-role="resource_path">[resource_path]</p></div>
  </div>
</div>';
  $handler->display->display_options['fields']['display']['element_label_colon'] = FALSE;
  $export['userinfo_methods'] = $view;

  $view = new view();
  $view->name = 'weather_example_methods';
  $view->description = 'This view lists methods within the Weather Example API model.';
  $view->tag = 'smartdocs';
  $view->base_table = 'node';
  $view->human_name = 'Weather Example API Method Listing';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'none';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['style_options']['grouping'] = array(
    0 => array(
      'field' => 'tags',
      'rendered' => 1,
      'rendered_strip' => 0,
    ),
  );
  $handler->display->display_options['row_plugin'] = 'fields';
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['exclude'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  /* Field: Content: Security schemes */
  $handler->display->display_options['fields']['security']['id'] = 'security';
  $handler->display->display_options['fields']['security']['table'] = 'field_data_field_smart_method_security';
  $handler->display->display_options['fields']['security']['field'] = 'field_smart_method_security';
  $handler->display->display_options['fields']['security']['label'] = '';
  $handler->display->display_options['fields']['security']['exclude'] = TRUE;
  $handler->display->display_options['fields']['security']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['security']['alter']['text'] = '<span title="This method needs authentication." class="icon_lock"></span>';
  $handler->display->display_options['fields']['security']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['security']['delta_limit'] = 1;
  /* Field: Content: Body */
  $handler->display->display_options['fields']['body']['id'] = 'body';
  $handler->display->display_options['fields']['body']['table'] = 'field_data_body';
  $handler->display->display_options['fields']['body']['field'] = 'body';
  $handler->display->display_options['fields']['body']['label'] = '';
  $handler->display->display_options['fields']['body']['exclude'] = TRUE;
  $handler->display->display_options['fields']['body']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['body']['type'] = 'text_plain';
  /* Field: Content: Resource base URL */
  $handler->display->display_options['fields']['base_url']['id'] = 'base_url';
  $handler->display->display_options['fields']['base_url']['table'] = 'field_data_field_smart_method_base_url';
  $handler->display->display_options['fields']['base_url']['field'] = 'field_smart_method_base_url';
  $handler->display->display_options['fields']['base_url']['label'] = '';
  $handler->display->display_options['fields']['base_url']['exclude'] = TRUE;
  $handler->display->display_options['fields']['base_url']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['base_url']['type'] = 'text_plain';
  /* Field: Content: Resource path */
  $handler->display->display_options['fields']['resource_path']['id'] = 'resource_path';
  $handler->display->display_options['fields']['resource_path']['table'] = 'field_data_field_smart_method_resource_path';
  $handler->display->display_options['fields']['resource_path']['field'] = 'field_smart_method_resource_path';
  $handler->display->display_options['fields']['resource_path']['label'] = '';
  $handler->display->display_options['fields']['resource_path']['exclude'] = TRUE;
  $handler->display->display_options['fields']['resource_path']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['resource_path']['type'] = 'text_plain';
  /* Field: Content: Tags */
  $handler->display->display_options['fields']['tags']['id'] = 'tags';
  $handler->display->display_options['fields']['tags']['table'] = 'field_data_field_smart_method_tags';
  $handler->display->display_options['fields']['tags']['field'] = 'field_smart_method_tags';
  $handler->display->display_options['fields']['tags']['label'] = '';
  $handler->display->display_options['fields']['tags']['exclude'] = TRUE;
  $handler->display->display_options['fields']['tags']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['tags']['alter']['text'] = '<h3 class="method-tag-header">[tags]</h3>
<div class="clearfix method_details">
  <div class="method_data title-header">Method</div>
  <div class="method_data description-header">Description</div>
</div>';
  $handler->display->display_options['fields']['tags']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['tags']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Content: HTTP verb */
  $handler->display->display_options['fields']['verb']['id'] = 'verb';
  $handler->display->display_options['fields']['verb']['table'] = 'field_data_field_smart_method_verb';
  $handler->display->display_options['fields']['verb']['field'] = 'field_smart_method_verb';
  $handler->display->display_options['fields']['verb']['label'] = '';
  $handler->display->display_options['fields']['verb']['exclude'] = TRUE;
  $handler->display->display_options['fields']['verb']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['verb']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Global: Custom text */
  $handler->display->display_options['fields']['display']['id'] = 'display';
  $handler->display->display_options['fields']['display']['table'] = 'views';
  $handler->display->display_options['fields']['display']['field'] = 'nothing';
  $handler->display->display_options['fields']['display']['label'] = '';
  $handler->display->display_options['fields']['display']['alter']['text'] = '<div class="method_details clearfix">
  <div class="method_data title">
    <div class="verb-auth"><p data-role="verb" class="[verb]">[verb]</p>[security]</div>
    <div class="title-description">[title]<p title="[base_url][resource_path]" class="resource_path" data-role="resource_path">[base_url][resource_path]</p></div>
  </div>
  <div class="method_data description">[body]</div>
</div>';
  $handler->display->display_options['fields']['display']['element_label_colon'] = FALSE;
  /* Sort criterion: Content: Post date */
  $handler->display->display_options['sorts']['created']['id'] = 'created';
  $handler->display->display_options['sorts']['created']['table'] = 'node';
  $handler->display->display_options['sorts']['created']['field'] = 'created';
  $handler->display->display_options['sorts']['created']['order'] = 'DESC';
  /* Filter criterion: Content: Model (field_smart_method_model) */
  $handler->display->display_options['filters']['model_tid']['id'] = 'model_tid';
  $handler->display->display_options['filters']['model_tid']['table'] = 'field_data_field_smart_method_model';
  $handler->display->display_options['filters']['model_tid']['field'] = 'field_smart_method_model_tid';
  $handler->display->display_options['filters']['model_tid']['value'] = array(
    0 => '20',
  );
  $handler->display->display_options['filters']['model_tid']['group'] = 1;
  $handler->display->display_options['filters']['model_tid']['expose']['operator'] = FALSE;
  $handler->display->display_options['filters']['model_tid']['vocabulary'] = 'smartdocs_models';

  /* Display: Front-page Block */
  $handler = $view->new_display('block', 'Front-page Block', 'frontpage');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'Weather Example API APIs';
  $handler->display->display_options['display_description'] = 'This block may be placed on the site home page. It lists the 5 most recently-updated published methods in the model.';
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = 5;
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['exclude'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  /* Field: Content: Security schemes */
  $handler->display->display_options['fields']['security']['id'] = 'security';
  $handler->display->display_options['fields']['security']['table'] = 'field_data_field_smart_method_security';
  $handler->display->display_options['fields']['security']['field'] = 'field_smart_method_security';
  $handler->display->display_options['fields']['security']['label'] = '';
  $handler->display->display_options['fields']['security']['exclude'] = TRUE;
  $handler->display->display_options['fields']['security']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['security']['alter']['text'] = '<span title="This method needs authentication." class="icon_lock"></span>';
  $handler->display->display_options['fields']['security']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['security']['delta_limit'] = 1;
  /* Field: Content: Resource path */
  $handler->display->display_options['fields']['resource_path']['id'] = 'resource_path';
  $handler->display->display_options['fields']['resource_path']['table'] = 'field_data_field_smart_method_resource_path';
  $handler->display->display_options['fields']['resource_path']['field'] = 'field_smart_method_resource_path';
  $handler->display->display_options['fields']['resource_path']['label'] = '';
  $handler->display->display_options['fields']['resource_path']['exclude'] = TRUE;
  $handler->display->display_options['fields']['resource_path']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['resource_path']['type'] = 'text_plain';
  /* Field: Content: HTTP verb */
  $handler->display->display_options['fields']['verb']['id'] = 'verb';
  $handler->display->display_options['fields']['verb']['table'] = 'field_data_field_smart_method_verb';
  $handler->display->display_options['fields']['verb']['field'] = 'field_smart_method_verb';
  $handler->display->display_options['fields']['verb']['label'] = '';
  $handler->display->display_options['fields']['verb']['exclude'] = TRUE;
  $handler->display->display_options['fields']['verb']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['verb']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Global: Custom text */
  $handler->display->display_options['fields']['display']['id'] = 'display';
  $handler->display->display_options['fields']['display']['table'] = 'views';
  $handler->display->display_options['fields']['display']['field'] = 'nothing';
  $handler->display->display_options['fields']['display']['label'] = '';
  $handler->display->display_options['fields']['display']['alter']['text'] = '<div class="method_details clearfix">
  <div class="method_data title">
    <div class="verb-auth"><p data-role="verb" class="[verb]">[verb]</p>[security]</div>
    <div class="title-description">[title]<p title="[resource_path]" class="resource_path" data-role="resource_path">[resource_path]</p></div>
  </div>
</div>';
  $handler->display->display_options['fields']['display']['element_label_colon'] = FALSE;

  /* Display: Model index page */
  $handler = $view->new_display('page', 'Model index page', 'modelindex');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'Weather Example API';
  $handler->display->display_options['display_description'] = 'This display provides the content for the model’s index page. It lists all published methods in the model.';
  $handler->display->display_options['defaults']['header'] = FALSE;
  /* Header: Global: Text area */
  $handler->display->display_options['header']['model_description']['id'] = 'model_description';
  $handler->display->display_options['header']['model_description']['table'] = 'views';
  $handler->display->display_options['header']['model_description']['field'] = 'area';
  $handler->display->display_options['header']['model_description']['empty'] = TRUE;
  $handler->display->display_options['header']['model_description']['content'] = 'Get weather reports for any location using the Yahoo Weather API.';
  $handler->display->display_options['header']['model_description']['format'] = 'plain_text';
  $handler->display->display_options['path'] = 'taxonomy/term/20';

  /* Display: Method TOC */
  $handler = $view->new_display('block', 'Method TOC', 'methodtoc');
  $handler->display->display_options['display_description'] = 'This block may optionally be placed in a sidebar to provide a table of contents for methods in the Weather Example API model.';
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['exclude'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  /* Field: Content: Security schemes */
  $handler->display->display_options['fields']['security']['id'] = 'security';
  $handler->display->display_options['fields']['security']['table'] = 'field_data_field_smart_method_security';
  $handler->display->display_options['fields']['security']['field'] = 'field_smart_method_security';
  $handler->display->display_options['fields']['security']['label'] = '';
  $handler->display->display_options['fields']['security']['exclude'] = TRUE;
  $handler->display->display_options['fields']['security']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['security']['alter']['text'] = '<span title="This method needs authentication." class="icon_lock"></span>';
  $handler->display->display_options['fields']['security']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['security']['delta_limit'] = 1;
  /* Field: Content: Resource path */
  $handler->display->display_options['fields']['resource_path']['id'] = 'resource_path';
  $handler->display->display_options['fields']['resource_path']['table'] = 'field_data_field_smart_method_resource_path';
  $handler->display->display_options['fields']['resource_path']['field'] = 'field_smart_method_resource_path';
  $handler->display->display_options['fields']['resource_path']['label'] = '';
  $handler->display->display_options['fields']['resource_path']['exclude'] = TRUE;
  $handler->display->display_options['fields']['resource_path']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['resource_path']['type'] = 'text_plain';
  /* Field: Content: Tags */
  $handler->display->display_options['fields']['tags']['id'] = 'tags';
  $handler->display->display_options['fields']['tags']['table'] = 'field_data_field_smart_method_tags';
  $handler->display->display_options['fields']['tags']['field'] = 'field_smart_method_tags';
  $handler->display->display_options['fields']['tags']['label'] = '';
  $handler->display->display_options['fields']['tags']['exclude'] = TRUE;
  $handler->display->display_options['fields']['tags']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['tags']['alter']['text'] = '<h3 class="method-tag-header">[tags]</h3>';
  $handler->display->display_options['fields']['tags']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['tags']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Content: HTTP verb */
  $handler->display->display_options['fields']['verb']['id'] = 'verb';
  $handler->display->display_options['fields']['verb']['table'] = 'field_data_field_smart_method_verb';
  $handler->display->display_options['fields']['verb']['field'] = 'field_smart_method_verb';
  $handler->display->display_options['fields']['verb']['label'] = '';
  $handler->display->display_options['fields']['verb']['exclude'] = TRUE;
  $handler->display->display_options['fields']['verb']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['verb']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Global: Custom text */
  $handler->display->display_options['fields']['display']['id'] = 'display';
  $handler->display->display_options['fields']['display']['table'] = 'views';
  $handler->display->display_options['fields']['display']['field'] = 'nothing';
  $handler->display->display_options['fields']['display']['label'] = '';
  $handler->display->display_options['fields']['display']['alter']['text'] = '<div class="method_details clearfix">
  <div class="method_data title">
    <div class="verb-auth"><p data-role="verb" class="[verb]">[verb]</p>[security]</div>
    <div class="title-description">[title]<p title="[resource_path]" class="resource_path" data-role="resource_path">[resource_path]</p></div>
  </div>
</div>';
  $handler->display->display_options['fields']['display']['element_label_colon'] = FALSE;
  $export['weather_example_methods'] = $view;

  return $export;
}
