<?php
/**
 * @file
 * all_component_features.features.fe_block_boxes.inc
 */

/**
 * Implements hook_default_fe_block_boxes().
 */
function all_component_features_default_fe_block_boxes() {
  $export = array();

  $fe_block_boxes = new stdClass();
  $fe_block_boxes->info = 'API CATALOGUE desc';
  $fe_block_boxes->format = 'full_html';
  $fe_block_boxes->machine_name = 'api_catalogue';
  $fe_block_boxes->body = '<div class="row">
<h2 class="rtecenter">&nbsp;</h2>

<h2 class="rtecenter">API CATALOGUE</h2>

<p>&nbsp;</p>

<div class="psd2 col-lg-6">
<h4 class="rtecenter">PSD2</h4>

<p>&nbsp;</p>

<div class="col-xs-12 col-sm-3 col-md-3 col-lg-6 ">
<div class="dexp-shortcodes-box  box-none box-top-left">
<div class="box-icon">
<p><div class="media media-element-container media-default">
<div id="file-87" class="file file-image file-image-png">
<h2 class="element-invisible"><a href="/file/87">account_information.png</a></h2>
<div class="content">
    <img alt="Account Information" style="width: 100px; height: 100px;" class="media-element file-default img-responsive" typeof="foaf:Image" src="https://openbank.apigee.com/sites/default/files/Icons_210x210px_AISP_0.png" width="875" height="875"></div>
</div>
</div></p>
</div>

<h3 class="box-title"><span style="color: rgb(0, 159, 208);">Account information</span></h3>

<ul>
	<li class="box-content">Authentication and authorization</li>
	<li class="box-content">Account balance data</li>
	<li class="box-content">Transaction history data</li>
</ul>
</div>
</div>

<div class="col-xs-12 col-sm-3 col-md-3 col-lg-6 ">
<div class="dexp-shortcodes-box  box-none box-top-left">
<div class="box-icon">
<p><div class="media media-element-container media-default">
<div id="file-88" class="file file-image file-image-png">
<h2 class="element-invisible"><a href="/file/88">payment_initiation.png</a></h2>
<div class="content">
    <img alt="Payment Information" style="width: 100px; height: 100px;" class="media-element file-default img-responsive" typeof="foaf:Image" src="https://openbank.apigee.com/sites/default/files/Icons_210x210px_PISP.png" width="875" height="875"></div>
</div>
</div></p>
</div>

<h3 class="box-title"><span style="color: rgb(0, 159, 208);">Payment initiation</span></h3>

<ul>
	<li class="box-content">Authentication &amp; authorization</li>
	<li class="box-content">Transfer initiation</li>
	<li class="box-content">Sufficient funds check</li>
</ul>
</div>
</div>
</div>

<div class="openbank col-lg-6">
<h4 class="rtecenter">Open Banking</h4>

<p>&nbsp;</p>

<div class="col-xs-12 col-sm-3 col-md-3 col-lg-6 ">
<div class="dexp-shortcodes-box  box-none box-top-left">
<div class="box-icon">
<p><div class="media media-element-container media-default">
<div id="file-89" class="file file-image file-image-png">
<h2 class="element-invisible"><a href="/file/89">open_data.png</a></h2>
<div class="content">
    <img alt="Open Data" style="width: 100px; height: 100px;" class="media-element file-default img-responsive" typeof="foaf:Image" src="https://openbank.apigee.com/sites/default/files/Icons_210x210px_Open%20Data.png" width="875" height="875"></div>
</div>
</div></p>
</div>

<h3 class="box-title"><span style="color: rgb(0, 159, 208);">Open data</span></h3>

<ul>
	<li class="box-content">ATM/branch locator</li>
	<li class="box-content">Loan information</li>
	<li class="box-content">Mortgage information</li>
	<li class="box-content">Current account information</li>
</ul>
</div>
</div>

<div class="col-xs-12 col-sm-3 col-md-3 col-lg-6 ">
<div class="dexp-shortcodes-box  box-none box-top-left">
<div class="box-icon">
<p><div class="media media-element-container media-default">
<div id="file-90" class="file file-image file-image-png">
<h2 class="element-invisible"><a href="/file/90">customer_transaction_data.png</a></h2>
<div class="content">
    <img alt="Customer Transaction Data" style="width: 100px; height: 100px;" class="media-element file-default img-responsive" typeof="foaf:Image" src="https://openbank.apigee.com/sites/default/files/Icons_210x210px_Customer%20Transaction%20Data.png" width="875" height="875"></div>
</div>
</div></p>
</div>

<h3 class="box-title"><span style="color: rgb(0, 159, 208);">Customer transaction data</span></h3>

<ul>
	<li class="box-content">Authentication &amp; authorization</li>
	<li class="box-content">Account balance</li>
	<li class="box-content">Transaction history</li>
	<li class="box-content">Payment information</li>
</ul>
</div>
</div>
</div>
</div>

<p class="rtecenter">&nbsp;</p>

<p class="rtecenter"><a class="btn box-none box-top-left rtecenter" href="/api-catalogue">Explore APIs </a></p>

<p class="rtecenter">&nbsp;</p>
';

  $export['api_catalogue'] = $fe_block_boxes;

  $fe_block_boxes = new stdClass();
  $fe_block_boxes->info = 'Develop Your App';
  $fe_block_boxes->format = 'full_html';
  $fe_block_boxes->machine_name = 'developer_app';
  $fe_block_boxes->body = '<div class="row">
<h2 class="rtecenter">&nbsp;</h2>

<h2 class="rtecenter">DEVELOP YOUR APP</h2>

<div class="col-xs-12 col-sm-3 col-md-3 col-lg-4 ">
<div class="dexp-shortcodes-box  box-none box-top-left">
<h3 class="box-title"><span style="color: rgb(0, 159, 208);">Register.</span></h3>

<div class="box-content">Sign up to the Portal in less than five minutes.</div>
</div>
</div>

<div class="col-xs-12 col-sm-3 col-md-3 col-lg-4 ">
<div class="dexp-shortcodes-box  box-none box-top-left">
<h3 class="box-title"><span style="color: rgb(0, 159, 208);">Develop.</span></h3>

<div class="box-content">Pick the relavant API for your app.</div>
</div>
</div>

<div class="col-xs-12 col-sm-3 col-md-3 col-lg-4 ">
<div class="dexp-shortcodes-box  box-none box-top-left">
<h3 class="box-title"><span style="color: rgb(0, 159, 208);">Test.</span></h3>

<div class="box-content">Play around with it and try to break it.</div>
</div>
</div>
</div>

<p class="rtecenter">&nbsp;</p>

<p class="rtecenter"><a class="btn box-none box-top-left rtecenter" href="/user/register">Add a New App</a></p>

<p class="rtecenter">&nbsp;</p>

<p class="rtecenter">&nbsp;</p>
';

  $export['developer_app'] = $fe_block_boxes;

  $fe_block_boxes = new stdClass();
  $fe_block_boxes->info = 'Reference Apps.';
  $fe_block_boxes->format = 'full_html';
  $fe_block_boxes->machine_name = 'reference_apps';
  $fe_block_boxes->body = '<div class="row">
<h2 class="rtecenter">&nbsp;</h2>
<h2 class="rtecenter">REFERENCE APPS</h2>
<div class="col-xs-12 col-sm-3 col-md-3 col-lg-4 ">
<div class="dexp-shortcodes-box  box-none box-top-left">
<div class="box-icon">
<h3 class="rtecenter">&nbsp;</h3>
<h4 class="rtecenter">PISP</h4>
<p>&nbsp;</p>
<p></p><div class="media media-element-container media-default"><div id="file-97" class="file file-image file-image-png">

        <h2 class="element-invisible"><a href="/file/97">pispapp.jpg</a></h2>
    
  
  <div class="content">
    <img height="287" width="311" style="width: 176px; height: 312px; box-shadow: rgb(136, 136, 136) 5px 5px 5px; border: 1px solid black;" class="media-element file-default img-responsive" typeof="foaf:Image" src="/sites/default/files/openbank/pispapp.jpg" alt="">  </div>

  
</div>
</div><p></p>
</div>
<h3 class="box-title">&nbsp;</h3>
<h3 class="box-title"><span style="color: rgb(0, 159, 208);">BigZ online shopping app</span></h3>
<div class="box-content">Buy a new product without cash or a credit or debit card.</div>
</div>
</div>
<div class="col-xs-12 col-sm-3 col-md-3 col-lg-4 ">
<div class="dexp-shortcodes-box  box-none box-top-left">
<div class="box-icon">
<h3 class="rtecenter">&nbsp;</h3>
<h4 class="rtecenter">AISP</h4>
<p>&nbsp;</p>
<p></p><div class="media media-element-container media-default"><div id="file-98" class="file file-image file-image-png">

        <h2 class="element-invisible"><a href="/file/98">aispapp.jpg</a></h2>
    
  
  <div class="content">
    <img height="313" width="347" style="width: 176px; height: 312px; box-shadow: rgb(136, 136, 136) 5px 5px 5px; border: 1px solid black;" class="media-element file-default img-responsive" typeof="foaf:Image" src="/sites/default/files/openbank/aispapp.jpg" alt="">  </div>

  
</div>
</div><p></p>
</div>
<h3 class="box-title">&nbsp;</h3>
<h3 class="box-title"><span style="color: rgb(0, 159, 208);">PepperMint Account aggregation app</span></h3>
<div class="box-content">Detailed visibility of your funds, across all accounts, all in one place.</div>
</div>
</div>
<div class="col-xs-12 col-sm-3 col-md-3 col-lg-4 ">
<div class="dexp-shortcodes-box  box-none box-top-left">
<div class="box-icon">
<h3 class="rtecenter">&nbsp;</h3>
<h4 class="rtecenter">Others</h4>
<p>&nbsp;</p>
<p></p><div class="media media-element-container media-default"><div id="file-99" class="file file-image file-image-png">

        <h2 class="element-invisible"><a href="/file/99">Othersapp.png</a></h2>
    
  
  <div class="content">
    <img height="361" width="417" style="width: 360px; height: 312px; box-shadow: rgb(136, 136, 136) 5px 5px 5px; border: 1px solid black;" class="media-element file-default img-responsive" typeof="foaf:Image" src="/sites/default/files/openbank/Othersapp.png" alt="">  </div>

  
</div>
</div><p></p>
</div>
<h3 class="box-title">&nbsp;</h3>
<h3 class="box-title"><span style="color: rgb(0, 159, 208);">Coming soon</span></h3>
<div class="box-content">Apps illustrating open data use cases.</div>
</div>
</div>
</div>';

  $export['reference_apps'] = $fe_block_boxes;

  return $export;
}
