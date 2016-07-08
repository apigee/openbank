<?php

/**
 * @file
 * Main accordion block template
 *
 * Variables available:
 * - $content: An array of block content with block content and block title
 */
?>
<div class="accordion_blocks_container">
  <?php foreach ($content as $block_key => $block) : ?>
  <?php if ($block->content != NULL): ?>
    <h2><a href="#">
    <?php if($block->title) : ?>
      <?php print check_plain($block->title); ?>
    <?php endif; ?>
    </a></h2>
    <div>
      <?php print render($block->content);?>
    </div>
  <?php endif;?>
  <?php endforeach; ?>
</div>
