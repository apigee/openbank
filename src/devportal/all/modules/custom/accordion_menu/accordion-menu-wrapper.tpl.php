<?php
/**
 * @file
 * Displays an accordion menu block.
 *
 * Available variables:
 * - $content: The renderable array containing the menu.
 * - $classes: A string containing the CSS classes for the DIV tag. Includes:
 *     accordion-menu-DELTA, accordion-menu-name-NAME, and
 *     accordion-menu-source-SOURCE.
 * - $classes_array: An array containing each of the CSS classes.
 *
 * The following variables are provided for contextual information.
 * - $delta: (string) The accordion menu block delta.
 * - $config: (array) The block configuration settings. Includes:
 *     delta, menu_name, and menu_source.
 *
 * @see template_preprocess_accordion_menu_wrapper()
 *
 * @ingroup themeable
 */
?>
<div class="<?php print $classes; ?>">
  <?php print render($content); ?>
</div>
