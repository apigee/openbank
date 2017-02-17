<?php
/**
 * @file
 * all_component_features.features.fe_block_settings.inc
 */

/**
 * Implements hook_default_fe_block_settings().
 */
function all_component_features_default_fe_block_settings() {
  $export = array();

  $export['version'] = '2.0';

  $export['accordion_menu-1'] = array(
    'cache' => -1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 1,
    'module' => 'accordion_menu',
    'node_types' => array(
      0 => 'page',
      1 => 'smart_method',
    ),
    'pages' => '<front>
blog/*
forum
forums/*
user/*
app-gallery-0',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => 'sidebar_first',
        'status' => 1,
        'theme' => 'dBank',
        'weight' => -44,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['accordion_menu-2'] = array(
    'cache' => -1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 2,
    'module' => 'accordion_menu',
    'node_types' => array(
      0 => 'page',
      1 => 'smart_method',
    ),
    'pages' => '<front>
blog/*
forum
forums/*
user/*',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 1,
        'theme' => 'dbank',
        'weight' => -42,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['accordion_menu-3'] = array(
    'cache' => -1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 3,
    'module' => 'accordion_menu',
    'node_types' => array(
      0 => 'page',
      1 => 'smart_method',
    ),
    'pages' => '<front>
blog/*
forum
forums/*',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => '',
        'weight' => -41,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['accordion_menu-4'] = array(
    'cache' => -1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 4,
    'module' => 'accordion_menu',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => '',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['accordion_menu-5'] = array(
    'cache' => -1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 5,
    'module' => 'accordion_menu',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => '',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['apigee_company-switch_company'] = array(
    'cache' => -1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 'switch_company',
    'module' => 'apigee_company',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['block-api_catalogue'] = array(
    'cache' => -1,
    'css_class' => 'home-dbank-block',
    'custom' => 0,
    'machine_name' => 'api_catalogue',
    'module' => 'block',
    'node_types' => array(),
    'pages' => '<front>',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '<none>',
    'visibility' => 1,
  );

  $export['block-developer_app'] = array(
    'cache' => -1,
    'css_class' => 'home-dbank-block',
    'custom' => 0,
    'machine_name' => 'developer_app',
    'module' => 'block',
    'node_types' => array(),
    'pages' => '<none>',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '<none>',
    'visibility' => 1,
  );

  $export['block-reference_apps'] = array(
    'cache' => -1,
    'css_class' => 'home-dbank-block',
    'custom' => 0,
    'machine_name' => 'reference_apps',
    'module' => 'block',
    'node_types' => array(),
    'pages' => '<front>',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => 'content',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '<none>',
    'visibility' => 1,
  );

  $export['comment-recent'] = array(
    'cache' => 1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 'recent',
    'module' => 'comment',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['context_ui-editor'] = array(
    'cache' => 1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 'editor',
    'module' => 'context_ui',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['devconnect_content_creation_menu-devconnect_content_creation_menu'] = array(
    'cache' => -1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 'devconnect_content_creation_menu',
    'module' => 'devconnect_content_creation_menu',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['devconnect_default_structure-develop-with-these'] = array(
    'cache' => 1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 'develop-with-these',
    'module' => 'devconnect_default_structure',
    'node_types' => array(),
    'pages' => 'admin/*',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['devconnect_default_structure-footer'] = array(
    'cache' => 1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 'footer',
    'module' => 'devconnect_default_structure',
    'node_types' => array(),
    'pages' => 'admin/*',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['devconnect_homepage-homepage_header'] = array(
    'cache' => 1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 'homepage_header',
    'module' => 'devconnect_homepage',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['faq-faq_categories'] = array(
    'cache' => 1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 'faq_categories',
    'module' => 'faq',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['forum-active'] = array(
    'cache' => -2,
    'css_class' => '',
    'custom' => 0,
    'delta' => 'active',
    'module' => 'forum',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['forum-new'] = array(
    'cache' => -2,
    'css_class' => '',
    'custom' => 0,
    'delta' => 'new',
    'module' => 'forum',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['logintoboggan-logintoboggan_logged_in'] = array(
    'cache' => -1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 'logintoboggan_logged_in',
    'module' => 'logintoboggan',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['menu-menu-api-reference'] = array(
    'cache' => -1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 'menu-api-reference',
    'module' => 'menu',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['menu-menu-apis'] = array(
    'cache' => -1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 'menu-apis',
    'module' => 'menu',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['menu-menu-overview'] = array(
    'cache' => -1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 'menu-overview',
    'module' => 'menu',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['node-recent'] = array(
    'cache' => 1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 'recent',
    'module' => 'node',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['node-syndicate'] = array(
    'cache' => -1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 'syndicate',
    'module' => 'node',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['openbank_blocks-openbank_apis_sandox'] = array(
    'cache' => 1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 'openbank_apis_sandox',
    'module' => 'openbank_blocks',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['openbank_blocks-openbank_app_gallery'] = array(
    'cache' => 1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 'openbank_app_gallery',
    'module' => 'openbank_blocks',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['openbank_blocks-openbank_copyright'] = array(
    'cache' => 1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 'openbank_copyright',
    'module' => 'openbank_blocks',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['openbank_blocks-openbank_get_started'] = array(
    'cache' => 1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 'openbank_get_started',
    'module' => 'openbank_blocks',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['openbank_blocks-openbank_logo_caption'] = array(
    'cache' => 1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 'openbank_logo_caption',
    'module' => 'openbank_blocks',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['openbank_blocks-openbank_social_bottom'] = array(
    'cache' => 1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 'openbank_social_bottom',
    'module' => 'openbank_blocks',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['quicktabs-api_documentation'] = array(
    'cache' => -1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 'api_documentation',
    'module' => 'quicktabs',
    'node_types' => array(
      0 => 'page',
      1 => 'smart_method',
    ),
    'pages' => '<front>
blog/*
forum
forums/*
app-gallery-0',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => 'sidebar_first',
        'status' => 1,
        'theme' => 'dbank',
        'weight' => -43,
      ),
    ),
    'title' => 'API Explorer',
    'visibility' => 0,
  );

  $export['search-form'] = array(
    'cache' => -1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 'form',
    'module' => 'search',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['system-help'] = array(
    'cache' => -1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 'help',
    'module' => 'system',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 5,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 5,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 5,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['system-main'] = array(
    'cache' => -1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 'main',
    'module' => 'system',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => 'content',
        'status' => 1,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => 'content',
        'status' => 1,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => 'content',
        'status' => 1,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['system-main-menu'] = array(
    'cache' => -1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 'main-menu',
    'module' => 'system',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['system-management'] = array(
    'cache' => -1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 'management',
    'module' => 'system',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['system-navigation'] = array(
    'cache' => -1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 'navigation',
    'module' => 'system',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['system-powered-by'] = array(
    'cache' => -1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 'powered-by',
    'module' => 'system',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 10,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 10,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 10,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['system-user-menu'] = array(
    'cache' => -1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 'user-menu',
    'module' => 'system',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['user-login'] = array(
    'cache' => -1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 'login',
    'module' => 'user',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['user-new'] = array(
    'cache' => 1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 'new',
    'module' => 'user',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['user-online'] = array(
    'cache' => -1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 'online',
    'module' => 'user',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['views-3773b6b9eba064cad9304be49df730be'] = array(
    'cache' => -1,
    'css_class' => '',
    'custom' => 0,
    'delta' => '3773b6b9eba064cad9304be49df730be',
    'module' => 'views',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['views-43e16a42f6244e1db8d540a6685dbfcf'] = array(
    'cache' => -1,
    'css_class' => '',
    'custom' => 0,
    'delta' => '43e16a42f6244e1db8d540a6685dbfcf',
    'module' => 'views',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['views-514ee385ac87316b40fc9934008d1f15'] = array(
    'cache' => -1,
    'css_class' => '',
    'custom' => 0,
    'delta' => '514ee385ac87316b40fc9934008d1f15',
    'module' => 'views',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['views-691f070fffb188ff6a1f5574a0bfd5fc'] = array(
    'cache' => -1,
    'css_class' => '',
    'custom' => 0,
    'delta' => '691f070fffb188ff6a1f5574a0bfd5fc',
    'module' => 'views',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['views-8bc4d6474a7f8dd3ddaf8df6e59e70a7'] = array(
    'cache' => -1,
    'css_class' => '',
    'custom' => 0,
    'delta' => '8bc4d6474a7f8dd3ddaf8df6e59e70a7',
    'module' => 'views',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['views-95049d1d27fb724011cdcf59ec252c72'] = array(
    'cache' => -1,
    'css_class' => '',
    'custom' => 0,
    'delta' => '95049d1d27fb724011cdcf59ec252c72',
    'module' => 'views',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['views-accounts_methods-frontpage'] = array(
    'cache' => -1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 'accounts_methods-frontpage',
    'module' => 'views',
    'node_types' => array(),
    'pages' => 'api-catalogue',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 1,
  );

  $export['views-accounts_methods-methodtoc'] = array(
    'cache' => -1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 'accounts_methods-methodtoc',
    'module' => 'views',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['views-apis_methods-frontpage'] = array(
    'cache' => -1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 'apis_methods-frontpage',
    'module' => 'views',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['views-apis_methods-methodtoc'] = array(
    'cache' => -1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 'apis_methods-methodtoc',
    'module' => 'views',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['views-b4c6b34fef04ce9722f5133d5dd7d798'] = array(
    'cache' => -1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 'b4c6b34fef04ce9722f5133d5dd7d798',
    'module' => 'views',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['views-b5e825e80393c5ccffe9ce29c44a7d61'] = array(
    'cache' => -1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 'b5e825e80393c5ccffe9ce29c44a7d61',
    'module' => 'views',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['views-blog-block_3'] = array(
    'cache' => -1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 'blog-block_3',
    'module' => 'views',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['views-blog-block_4'] = array(
    'cache' => -1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 'blog-block_4',
    'module' => 'views',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['views-blog-block_5'] = array(
    'cache' => -1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 'blog-block_5',
    'module' => 'views',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['views-blog-block_archives'] = array(
    'cache' => -1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 'blog-block_archives',
    'module' => 'views',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['views-blog-block_timeline'] = array(
    'cache' => -1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 'blog-block_timeline',
    'module' => 'views',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['views-blog-latest'] = array(
    'cache' => -1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 'blog-latest',
    'module' => 'views',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['views-blog-popular'] = array(
    'cache' => -1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 'blog-popular',
    'module' => 'views',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['views-devconnect_blog-block_1'] = array(
    'cache' => -1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 'devconnect_blog-block_1',
    'module' => 'views',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['views-faq-faq_random'] = array(
    'cache' => -1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 'faq-faq_random',
    'module' => 'views',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['views-faq-faq_recent'] = array(
    'cache' => -1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 'faq-faq_recent',
    'module' => 'views',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['views-home_featured_forum_posts-block'] = array(
    'cache' => -1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 'home_featured_forum_posts-block',
    'module' => 'views',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['views-hot_topics-block'] = array(
    'cache' => -1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 'hot_topics-block',
    'module' => 'views',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['views-oauth_methods-frontpage'] = array(
    'cache' => -1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 'oauth_methods-frontpage',
    'module' => 'views',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['views-oauth_methods-methodtoc'] = array(
    'cache' => -1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 'oauth_methods-methodtoc',
    'module' => 'views',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['views-open-data_methods-frontpage'] = array(
    'cache' => -1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 'open-data_methods-frontpage',
    'module' => 'views',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['views-open-data_methods-methodtoc'] = array(
    'cache' => -1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 'open-data_methods-methodtoc',
    'module' => 'views',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['views-payment_methods-frontpage'] = array(
    'cache' => -1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 'payment_methods-frontpage',
    'module' => 'views',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['views-payment_methods-methodtoc'] = array(
    'cache' => -1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 'payment_methods-methodtoc',
    'module' => 'views',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['views-slideshow-block'] = array(
    'cache' => -1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 'slideshow-block',
    'module' => 'views',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '<none>',
    'visibility' => 0,
  );

  $export['views-smartdocs_methods-frontpage'] = array(
    'cache' => -1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 'smartdocs_methods-frontpage',
    'module' => 'views',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['views-smartdocs_methods-methodtoc'] = array(
    'cache' => -1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 'smartdocs_methods-methodtoc',
    'module' => 'views',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['views-smartdocs_methods-modelindex'] = array(
    'cache' => -1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 'smartdocs_methods-modelindex',
    'module' => 'views',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['views-userinfo_methods-frontpage'] = array(
    'cache' => -1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 'userinfo_methods-frontpage',
    'module' => 'views',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  $export['views-userinfo_methods-methodtoc'] = array(
    'cache' => -1,
    'css_class' => '',
    'custom' => 0,
    'delta' => 'userinfo_methods-methodtoc',
    'module' => 'views',
    'node_types' => array(),
    'pages' => '',
    'roles' => array(),
    'themes' => array(
      'adminimal' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'adminimal',
        'weight' => 0,
      ),
      'apigee_responsive' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'apigee_responsive',
        'weight' => 0,
      ),
      'dbank' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'dbank',
        'weight' => 0,
      ),
    ),
    'title' => '',
    'visibility' => 0,
  );

  return $export;
}
