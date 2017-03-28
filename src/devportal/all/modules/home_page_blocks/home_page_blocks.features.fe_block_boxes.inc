<?php
/**
 * @file
 * home_page_blocks.features.fe_block_boxes.inc
 */

/**
 * Implements hook_default_fe_block_boxes().
 */
function home_page_blocks_default_fe_block_boxes() {
  $export = array();

  $fe_block_boxes = new stdClass();
  $fe_block_boxes->info = 'Home Page blocks';
  $fe_block_boxes->format = 'full_html';
  $fe_block_boxes->machine_name = 'home_page_blocks';
  

  $fe_block_boxes->body = '<div class="row">
<h2 class="rtecenter">DEVELOP. TEST. DEPLOY.</h2>

<div class="col-xs-12 col-sm-3 col-md-3 col-lg-3">
<div class="dexp-shortcodes-box box-none box-top-left">
<div class="box-icon">
<p>&nbsp;</p>

<div class="media media-element-container media-default">
<div class="file file-image file-image-png" id="file-144">
<h2 class="element-invisible"><a href="/file/144">getting-started.png</a></h2>

<div class="content"><img alt="" class="media-element file-default img-responsive" height="120" src="/sites/default/files/openbank/getting-started.png" typeof="foaf:Image" width="160" /></div>
</div>
</div>
</div>

<h3 class="box-title"><a href="/overview"><span style="color: rgb(0, 159, 208);">Getting started</span></a></h3>

<div class="box-content">Learn about the banking APIs and understand how to create apps.</div>
</div>
</div>

<div class="col-xs-12 col-sm-3 col-md-3 col-lg-3">
<div class="dexp-shortcodes-box box-none box-top-left">
<div class="box-icon">
<p>&nbsp;</p>

<div class="media media-element-container media-default">
<div class="file file-image file-image-png" id="file-141">
<h2 class="element-invisible"><a href="/file/141">apicatalogue.png</a></h2>

<div class="content"><img alt="" class="media-element file-default img-responsive" height="120" src="/sites/default/files/openbank/apicatalogue.png" typeof="foaf:Image" width="160" /></div>
</div>
</div>
</div>

<h3 class="box-title"><a href="/api-catalogue"><span style="color: rgb(0, 159, 208);">API catalogue</span></a></h3>

<div class="box-content">Explore OpenBank&#39;s PSD2 and Open Banking APIs to build and test your app.</div>
</div>
</div>

<div class="col-xs-12 col-sm-3 col-md-3 col-lg-3">
<div class="dexp-shortcodes-box box-none box-top-left">
<div class="box-icon">
<p>&nbsp;</p>

<div class="media media-element-container media-default">
<div class="file file-image file-image-png" id="file-143">
<h2 class="element-invisible"><a href="/file/143">community.png</a></h2>

<div class="content"><img alt="" class="media-element file-default img-responsive" height="120" src="/sites/default/files/openbank/community.png" typeof="foaf:Image" width="160" /></div>
</div>
</div>
</div>

<h3 class="box-title"><a href="/blogs"><span style="color: rgb(0, 159, 208);">Developer community</span></a></h3>

<div class="box-content">Learn, share, and collaborate with other developers through forums and blogs.</div>
</div>
</div>

<div class="col-xs-12 col-sm-3 col-md-3 col-lg-3">
<div class="dexp-shortcodes-box box-none box-top-left">
<div class="box-icon">
<p>&nbsp;</p>

<div class="media media-element-container media-default">
<div class="file file-image file-image-png" id="file-142">
<h2 class="element-invisible"><a href="/file/142">appgallery.png</a></h2>

<div class="content"><img alt="" class="media-element file-default img-responsive" height="120" src="/sites/default/files/openbank/appgallery.png" typeof="foaf:Image" width="160" /></div>
</div>
</div>
</div>

<h3 class="box-title"><a href="/app-gallery-0"><span style="color: rgb(0, 159, 208);">Reference apps</span></a></h3>

<div class="box-content">Experiment with our reference apps, and see OpenBank&#39;s APIs come to life.</div>
</div>
</div>
</div>

<p class="rtecenter">&nbsp;</p>
<!--<p class="rtecenter"><a class="btn box-none box-top-left rtecenter" href="/overview">Get started </a></p>-->

<p class="rtecenter">&nbsp;</p>
';

  $export['home_page_blocks'] = $fe_block_boxes;

  return $export;
}
