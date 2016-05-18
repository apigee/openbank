<?php
/**
 * @file
 * flexslider_example.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function flexslider_example_views_default_views() {
  $export = array();

  $view = new view();
  $view->name = 'flexslider_views_example';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'FlexSlider Views Example';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'FlexSlider Views Example';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '4';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['style_plugin'] = 'flexslider';
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['row_options']['hide_empty'] = TRUE;
  $handler->display->display_options['row_options']['default_field_elements'] = FALSE;
  /* Field: Content: FlexSlider Example Image */
  $handler->display->display_options['fields']['field_flexslider_example_image']['id'] = 'field_flexslider_example_image';
  $handler->display->display_options['fields']['field_flexslider_example_image']['table'] = 'field_data_field_flexslider_example_image';
  $handler->display->display_options['fields']['field_flexslider_example_image']['field'] = 'field_flexslider_example_image';
  $handler->display->display_options['fields']['field_flexslider_example_image']['label'] = '';
  $handler->display->display_options['fields']['field_flexslider_example_image']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_flexslider_example_image']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_flexslider_example_image']['settings'] = array(
    'image_style' => 'flexslider_full',
    'image_link' => '',
  );
  $handler->display->display_options['fields']['field_flexslider_example_image']['group_rows'] = FALSE;
  $handler->display->display_options['fields']['field_flexslider_example_image']['delta_offset'] = '0';
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
    'flexslider_example' => 'flexslider_example',
  );

  /* Display: Basic Slider */
  $handler = $view->new_display('page', 'Basic Slider', 'page');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'Basic Slider';
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'flexslider';
  $handler->display->display_options['style_options']['captionfield'] = 'title';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['row_options']['hide_empty'] = TRUE;
  $handler->display->display_options['row_options']['default_field_elements'] = FALSE;
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: FlexSlider Example Image */
  $handler->display->display_options['fields']['field_flexslider_example_image']['id'] = 'field_flexslider_example_image';
  $handler->display->display_options['fields']['field_flexslider_example_image']['table'] = 'field_data_field_flexslider_example_image';
  $handler->display->display_options['fields']['field_flexslider_example_image']['field'] = 'field_flexslider_example_image';
  $handler->display->display_options['fields']['field_flexslider_example_image']['label'] = '';
  $handler->display->display_options['fields']['field_flexslider_example_image']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_flexslider_example_image']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_flexslider_example_image']['settings'] = array(
    'image_style' => 'flexslider_full',
    'image_link' => '',
  );
  $handler->display->display_options['fields']['field_flexslider_example_image']['group_rows'] = FALSE;
  $handler->display->display_options['fields']['field_flexslider_example_image']['delta_offset'] = '0';
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['element_type'] = 'p';
  $handler->display->display_options['fields']['title']['element_class'] = 'flex-caption';
  $handler->display->display_options['fields']['title']['element_label_type'] = '0';
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['title']['element_wrapper_type'] = '0';
  $handler->display->display_options['fields']['title']['element_default_classes'] = FALSE;
  $handler->display->display_options['path'] = 'flexslider-views-example';
  $handler->display->display_options['menu']['type'] = 'normal';
  $handler->display->display_options['menu']['title'] = 'Basic Slider (Views)';
  $handler->display->display_options['menu']['weight'] = '0';
  $handler->display->display_options['menu']['name'] = 'menu-flexslider-example';
  $handler->display->display_options['menu']['context'] = 0;

  /* Display: Slide with thumbnail controls */
  $handler = $view->new_display('page', 'Slide with thumbnail controls', 'page_1');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'slider w/thumbnail controlnav pattern';
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'flexslider';
  $handler->display->display_options['style_options']['optionset'] = 'flexslider_default_slider_thumbnail_controlnav';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['row_options']['hide_empty'] = TRUE;
  $handler->display->display_options['row_options']['default_field_elements'] = FALSE;
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: FlexSlider Example Image */
  $handler->display->display_options['fields']['field_flexslider_example_image']['id'] = 'field_flexslider_example_image';
  $handler->display->display_options['fields']['field_flexslider_example_image']['table'] = 'field_data_field_flexslider_example_image';
  $handler->display->display_options['fields']['field_flexslider_example_image']['field'] = 'field_flexslider_example_image';
  $handler->display->display_options['fields']['field_flexslider_example_image']['label'] = '';
  $handler->display->display_options['fields']['field_flexslider_example_image']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_flexslider_example_image']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_flexslider_example_image']['settings'] = array(
    'image_style' => 'flexslider_full',
    'image_link' => '',
  );
  $handler->display->display_options['fields']['field_flexslider_example_image']['group_rows'] = FALSE;
  $handler->display->display_options['fields']['field_flexslider_example_image']['delta_offset'] = '0';
  $handler->display->display_options['path'] = 'flexslider-views-example-with-thumbnail-controls';
  $handler->display->display_options['menu']['type'] = 'normal';
  $handler->display->display_options['menu']['title'] = 'slider w/thumbnail controlnav pattern (Views)';
  $handler->display->display_options['menu']['weight'] = '0';
  $handler->display->display_options['menu']['name'] = 'menu-flexslider-example';
  $handler->display->display_options['menu']['context'] = 0;

  /* Display: Slide with thumbnail slider */
  $handler = $view->new_display('page', 'Slide with thumbnail slider', 'page_2');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'Slider w/thumbnail slider';
  $handler->display->display_options['display_description'] = 'Slider controlled by another instance of FlexSlider';
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'flexslider';
  $handler->display->display_options['style_options']['optionset'] = 'flexslider_default_slider_w_thumbnail_slider';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['row_options']['default_field_elements'] = FALSE;
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['path'] = 'flexslider-views-example-with-thumbnail-slider';
  $handler->display->display_options['menu']['type'] = 'normal';
  $handler->display->display_options['menu']['title'] = 'slider w/thumbnail slider (Views)';
  $handler->display->display_options['menu']['weight'] = '0';
  $handler->display->display_options['menu']['name'] = 'menu-flexslider-example';
  $handler->display->display_options['menu']['context'] = 0;

  /* Display: Thumbnail Controls */
  $handler = $view->new_display('block', 'Thumbnail Controls', 'block_1');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['display_description'] = 'Controls another FlexSlider instance';
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'flexslider';
  $handler->display->display_options['style_options']['optionset'] = 'flexslider_default_thumbnail_slider';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['row_options']['hide_empty'] = TRUE;
  $handler->display->display_options['row_options']['default_field_elements'] = FALSE;
  $handler->display->display_options['defaults']['row_options'] = FALSE;

  /* Display: Basic Carousel */
  $handler = $view->new_display('page', 'Basic Carousel', 'page_3');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'Basic Carousel';
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '10';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'flexslider';
  $handler->display->display_options['style_options']['optionset'] = 'flexslider_default_basic_carousel';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['row_options']['default_field_elements'] = FALSE;
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['path'] = 'flexslider-views-example-basic-carousel';
  $handler->display->display_options['menu']['type'] = 'normal';
  $handler->display->display_options['menu']['title'] = 'basic carousel (Views)';
  $handler->display->display_options['menu']['weight'] = '0';
  $handler->display->display_options['menu']['name'] = 'menu-flexslider-example';
  $handler->display->display_options['menu']['context'] = 0;

  /* Display: Carousel with min and max ranges */
  $handler = $view->new_display('page', 'Carousel with min and max ranges', 'page_4');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'carousel with min and max ranges';
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '10';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'flexslider';
  $handler->display->display_options['style_options']['optionset'] = 'flexslider_carousel_with_min_and_max_ranges';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['row_options']['default_field_elements'] = FALSE;
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['path'] = 'flexslider-views-example-carousel-min-max';
  $handler->display->display_options['menu']['type'] = 'normal';
  $handler->display->display_options['menu']['title'] = 'carousel with min and max ranges (Views)';
  $handler->display->display_options['menu']['weight'] = '0';
  $handler->display->display_options['menu']['name'] = 'menu-flexslider-example';
  $handler->display->display_options['menu']['context'] = 0;

  /* Display: Basic Slider with Thumbnail Caption */
  $handler = $view->new_display('page', 'Basic Slider with Thumbnail Caption', 'page_5');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'Basic Slider with Thumbnail captions';
  $handler->display->display_options['display_description'] = 'To use thumbnail captions, use the "caption field" option in the style settings.';
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'flexslider';
  $handler->display->display_options['style_options']['optionset'] = 'flexslider_default_thumbnail_captions';
  $handler->display->display_options['style_options']['captionfield'] = 'title';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['row_options']['hide_empty'] = TRUE;
  $handler->display->display_options['row_options']['default_field_elements'] = FALSE;
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: FlexSlider Example Image */
  $handler->display->display_options['fields']['field_flexslider_example_image']['id'] = 'field_flexslider_example_image';
  $handler->display->display_options['fields']['field_flexslider_example_image']['table'] = 'field_data_field_flexslider_example_image';
  $handler->display->display_options['fields']['field_flexslider_example_image']['field'] = 'field_flexslider_example_image';
  $handler->display->display_options['fields']['field_flexslider_example_image']['label'] = '';
  $handler->display->display_options['fields']['field_flexslider_example_image']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_flexslider_example_image']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_flexslider_example_image']['settings'] = array(
    'image_style' => 'flexslider_full',
    'image_link' => '',
  );
  $handler->display->display_options['fields']['field_flexslider_example_image']['group_rows'] = FALSE;
  $handler->display->display_options['fields']['field_flexslider_example_image']['delta_offset'] = '0';
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['exclude'] = TRUE;
  $handler->display->display_options['fields']['title']['element_type'] = '0';
  $handler->display->display_options['fields']['title']['element_label_type'] = '0';
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['title']['element_wrapper_type'] = '0';
  $handler->display->display_options['fields']['title']['element_default_classes'] = FALSE;
  $handler->display->display_options['fields']['title']['link_to_node'] = FALSE;
  $handler->display->display_options['path'] = 'flexslider-views-example-thumbnail-captions';
  $handler->display->display_options['menu']['type'] = 'normal';
  $handler->display->display_options['menu']['title'] = 'Thumbnail Captions (Views)';
  $handler->display->display_options['menu']['description'] = 'Basic slider with thumbnail captions';
  $handler->display->display_options['menu']['weight'] = '0';
  $handler->display->display_options['menu']['name'] = 'menu-flexslider-example';
  $handler->display->display_options['menu']['context'] = 0;
  $translatables['flexslider_views_example'] = array(
    t('Master'),
    t('FlexSlider Views Example'),
    t('more'),
    t('Apply'),
    t('Reset'),
    t('Sort by'),
    t('Asc'),
    t('Desc'),
    t('Basic Slider'),
    t('Slide with thumbnail controls'),
    t('slider w/thumbnail controlnav pattern'),
    t('Slide with thumbnail slider'),
    t('Slider w/thumbnail slider'),
    t('Slider controlled by another instance of FlexSlider'),
    t('Thumbnail Controls'),
    t('Controls another FlexSlider instance'),
    t('Basic Carousel'),
    t('Carousel with min and max ranges'),
    t('carousel with min and max ranges'),
    t('Basic Slider with Thumbnail Caption'),
    t('Basic Slider with Thumbnail captions'),
    t('To use thumbnail captions, use the "caption field" option in the style settings.'),
  );
  $export['flexslider_views_example'] = $view;

  return $export;
}
