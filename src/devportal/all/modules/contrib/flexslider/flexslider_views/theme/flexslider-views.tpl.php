<?php

/**
 * @file
 * Stub template file to call the main FlexSlider theme
 *
 * We can't set the Views display to use the other theme directly since it
 * agressively changes settings of the core theme function if we do.
 * So we have to have this stub theme instead.
 *
 * @author Mathew Winstone <mwinstone@coldfrontlabs.ca>
 */

print theme('flexslider', array('items' => $items, 'settings' => $settings));
