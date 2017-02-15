<?php
/**
 * @file
 * all_component_features.context.inc
 */

/**
 * Implements hook_context_default_contexts().
 */
function all_component_features_context_default_contexts() {
  $export = array();

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'custom_blog';
  $context->description = 'This is the customized context for the blogs page';
  $context->tag = '';
  $context->conditions = array(
    'path' => array(
      'values' => array(
        'blogs' => 'blogs',
        'blogs/*' => 'blogs/*',
      ),
    ),
  );
  $context->reactions = array(
    'block' => array(
      'blocks' => array(
        'views-blog-latest' => array(
          'module' => 'views',
          'delta' => 'blog-latest',
          'region' => 'sidebar_second',
          'weight' => '-10',
        ),
        'views-blog-popular' => array(
          'module' => 'views',
          'delta' => 'blog-popular',
          'region' => 'sidebar_second',
          'weight' => '-9',
        ),
      ),
    ),
  );
  $context->condition_mode = 0;

  // Translatables
  // Included for use with string extractors like potx.
  t('This is the customized context for the blogs page');
  $export['custom_blog'] = $context;

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'custom_home';
  $context->description = 'This the custom context for the home page';
  $context->tag = '';
  $context->conditions = array(
    'path' => array(
      'values' => array(
        'home' => 'home',
      ),
    ),
  );
  $context->reactions = array(
    'block' => array(
      'blocks' => array(
        'block-home_page_blocks' => array(
          'module' => 'block',
          'delta' => 'home_page_blocks',
          'region' => 'content',
          'weight' => '-10',
        ),
        'block-api_catalogue' => array(
          'module' => 'block',
          'delta' => 'api_catalogue',
          'region' => 'content',
          'weight' => '-9',
        ),
        'block-reference_apps' => array(
          'module' => 'block',
          'delta' => 'reference_apps',
          'region' => 'content',
          'weight' => '-8',
        ),
        'block-7' => array(
          'module' => 'block',
          'delta' => '7',
          'region' => 'content',
          'weight' => '-8',
        ),
        'views-slideshow-block' => array(
          'module' => 'views',
          'delta' => 'slideshow-block',
          'region' => 'homepage_header',
          'weight' => '-10',
        ),
      ),
    ),
  );
  $context->condition_mode = 0;

  // Translatables
  // Included for use with string extractors like potx.
  t('This the custom context for the home page');
  $export['custom_home'] = $context;

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'custom_sitewide';
  $context->description = 'This is the custom sitewide context';
  $context->tag = '';
  $context->conditions = array(
    'sitewide' => array(
      'values' => array(
        1 => 1,
      ),
    ),
  );
  $context->reactions = array(
    'block' => array(
      'blocks' => array(
        'openbank_blocks-openbank_copyright' => array(
          'module' => 'openbank_blocks',
          'delta' => 'openbank_copyright',
          'region' => 'footer',
          'weight' => '-10',
        ),
        'openbank_blocks-openbank_social_bottom' => array(
          'module' => 'openbank_blocks',
          'delta' => 'openbank_social_bottom',
          'region' => 'footer',
          'weight' => '-9',
        ),
      ),
    ),
  );
  $context->condition_mode = 0;

  // Translatables
  // Included for use with string extractors like potx.
  t('This is the custom sitewide context');
  $export['custom_sitewide'] = $context;

  return $export;
}
