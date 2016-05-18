<?php
/**
 * @file
 * flexslider_example.context.inc
 */

/**
 * Implements hook_context_default_contexts().
 */
function flexslider_example_context_default_contexts() {
  $export = array();

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'flexslider_example_thumbnail';
  $context->description = 'Add thumbnail block to thumbnail slideshow';
  $context->tag = 'FlexSlider Example';
  $context->conditions = array(
    'views' => array(
      'values' => array(
        'flexslider_views_example:page_2' => 'flexslider_views_example:page_2',
      ),
    ),
  );
  $context->reactions = array(
    'block' => array(
      'blocks' => array(
        'views-0070a91ad114185c9bacdc9eb0b88ce2' => array(
          'module' => 'views',
          'delta' => '0070a91ad114185c9bacdc9eb0b88ce2',
          'region' => 'content',
          'weight' => '-10',
        ),
      ),
    ),
  );
  $context->condition_mode = 0;

  // Translatables
  // Included for use with string extractors like potx.
  t('Add thumbnail block to thumbnail slideshow');
  t('FlexSlider Example');
  $export['flexslider_example_thumbnail'] = $context;

  return $export;
}
