<?php
/**
 * @file
 * fhir_custom.features.fe_block_boxes.inc
 */

/**
 * Implements hook_default_fe_block_boxes().
 */
function fhir_custom_default_fe_block_boxes() {
  $export = array();

  $fe_block_boxes = new stdClass();
  $fe_block_boxes->info = 'Clean Code';
  $fe_block_boxes->format = 'full_html';
  $fe_block_boxes->machine_name = 'clean_code';
  $fe_block_boxes->body = '<div class="fhir-shortcodes-box box-circle box-center">
<a href="/fhir-patient-api/apis/get" target="_blank">
<div class="box-icon"><i class="fa fa-inbox"></i></div>

<h3 class="box-title">FHIR APIs &amp; SANDBOX</h3>

<div class="box-content">Explore FHIR APIs documentation and test your APIs 

</div>
</a>
</div>
';

  $export['clean_code'] = $fe_block_boxes;

  $fe_block_boxes = new stdClass();
  $fe_block_boxes->info = 'Copyright';
  $fe_block_boxes->format = 'full_html';
  $fe_block_boxes->machine_name = 'copyright';
  $fe_block_boxes->body = '<div class="row">
<div class="col-sm-6">
<div class="powered-by">
<div class="footer-left">Powered by</div>

<div class="apigee-footer-logo">&nbsp;</div>
</div>

<div class="powered-by">
<div class="footer-left">In Partnership with</div>

<div class="persistent-footer-logo">&nbsp;</div>
</div>
</div>

<div class="col-sm-6 copyrights-text">© 2015 Apigee Corp. All Rights Reserved.</div>
</div>
';

  $export['copyright'] = $fe_block_boxes;

  $fe_block_boxes = new stdClass();
  $fe_block_boxes->info = 'GETTING STARTED';
  $fe_block_boxes->format = 'full_html';
  $fe_block_boxes->machine_name = 'getting_started';
  $fe_block_boxes->body = '<div class="fhir-shortcodes-box box-circle box-center">
<a href="getting-started">
<div class="box-icon"><i class="fa fa-hand-o-up"></i></div>

<h3 class="box-title">GETTING STARTED</h3>

<div class="box-content">Get started with Digital Health API to create or enhance mobile apps

<p>&nbsp;</p>
</div>
</a>
</div>
';

  $export['getting_started'] = $fe_block_boxes;

  $fe_block_boxes = new stdClass();
  $fe_block_boxes->info = 'Key Features';
  $fe_block_boxes->format = 'full_html';
  $fe_block_boxes->machine_name = 'key_features';
  $fe_block_boxes->body = '<div class="fhir-shortcodes-box box-circle box-center">
<a href="app-gallery">
<div class="box-icon"><i class="fa fa-th"></i></div>

<h3 class="box-title">APP GALLERY</h3>

<div class="box-content">Browse the gallery for the possibilities</div>
</a>
</div>
';

  $export['key_features'] = $fe_block_boxes;

  $fe_block_boxes = new stdClass();
  $fe_block_boxes->info = 'Socials Bottom';
  $fe_block_boxes->format = 'full_html';
  $fe_block_boxes->machine_name = 'socials_bottom';
  $fe_block_boxes->body = '<div class="pull-right ">
<ul>
	<li><a class="facebook" href="https://www.facebook.com/apigee"><i class="fa fa-facebook">&nbsp;&nbsp;</i></a></li>
	<li><a class="twitter" href="https://twitter.com/apigee"><i class="fa fa-twitter">&nbsp;</i></a></li>
	<li><a class="linkedin" href="https://www.linkedin.com/company/apigee"><i class="fa fa-linkedin">&nbsp;</i></a></li>
	<li><a class="dribbble" href="#"><i class="fa fa-dribbble">&nbsp;</i></a></li>
	<li><a class="gplus" href="https://plus.google.com/+ApigeeCorp/posts"><i class="fa fa-google-plus">&nbsp;</i></a></li>
	<li><a class="youtube" href="https://www.youtube.com/user/apigee"><i class="fa fa-youtube">&nbsp;</i></a></li>
	<li><a class="rss" href="http://apigee.com/about/blog/blog.xml"><i class="fa fa-rss">&nbsp;</i></a></li>
</ul>
</div>
';

  $export['socials_bottom'] = $fe_block_boxes;

  return $export;
}
