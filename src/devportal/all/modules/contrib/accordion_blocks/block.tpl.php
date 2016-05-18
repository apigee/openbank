<div id="block-<?php print $block->module . '-' . $block->delta; ?>" <?php print $attributes; ?>>
  <?php if (!empty($block->subject)): ?>
    <h2 <?php print $title_attributes; ?>><a href="#"><?php print $block->subject ?></a></h2>
  <?php endif;?>
  <div <?php print $content_attributes; ?>><?php print $content ?></div>
</div>

