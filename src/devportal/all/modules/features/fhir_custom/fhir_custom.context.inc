<?php
/**
 * @file
 * fhir_custom.context.inc
 */

/**
 * Implements hook_context_default_contexts().
 */
function fhir_custom_context_default_contexts() {
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
        'fhir_blocks-fhir_get_started' => array(
          'module' => 'fhir_blocks',
          'delta' => 'fhir_get_started',
          'region' => 'content',
          'weight' => '-7',
        ),
        'fhir_blocks-fhir_apis_sandox' => array(
          'module' => 'fhir_blocks',
          'delta' => 'fhir_apis_sandox',
          'region' => 'content',
          'weight' => '-6',
        ),
        'fhir_blocks-fhir_app_gallery' => array(
          'module' => 'fhir_blocks',
          'delta' => 'fhir_app_gallery',
          'region' => 'content',
          'weight' => '-5',
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
        'fhir_blocks-fhir_copyright' => array(
          'module' => 'fhir_blocks',
          'delta' => 'fhir_copyright',
          'region' => 'footer',
          'weight' => '-10',
        ),
        'fhir_blocks-fhir_social_bottom' => array(
          'module' => 'fhir_blocks',
          'delta' => 'fhir_social_bottom',
          'region' => 'footer',
          'weight' => '-9',
        ),
        'fhir_blocks-fhir_logo_caption' => array(
          'module' => 'fhir_blocks',
          'delta' => 'fhir_logo_caption',
          'region' => 'logo_right',
          'weight' => '-10',
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
