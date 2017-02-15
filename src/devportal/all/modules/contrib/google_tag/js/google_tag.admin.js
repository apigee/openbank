/**
 * @file
 * Behaviors and utility functions for administrative pages.
 *
 * @author Jim Berry ("solotandem", http://drupal.org/user/240748)
 */

(function ($) {

/**
 * Provides summary information for the vertical tabs.
 */
Drupal.behaviors.gtmInsertionSettings = {
  attach: function (context) {
    if (typeof jQuery.fn.drupalSetSummary == 'undefined') {
      // This behavior only applies if drupalSetSummary is defined.
      return;
    }

    $('fieldset#edit-paths', context).drupalSetSummary(function (context) {
      var $radio = $('input[name="google_tag_path_toggle"]:checked', context);
      if ($radio.val() == 0) {
        if (!$('textarea[name="google_tag_path_list"]', context).val()) {
          return Drupal.t('All paths');
        }
        else {
          return Drupal.t('All paths except listed paths');
        }
      }
      else {
        if (!$('textarea[name="google_tag_path_list"]', context).val()) {
          return Drupal.t('No paths');
        }
        else {
          return Drupal.t('Only listed paths');
        }
      }
    });

    $('fieldset#edit-roles', context).drupalSetSummary(function (context) {
      var vals = [];
      $('input[type="checkbox"]:checked', context).each(function () {
        vals.push($.trim($(this).next('label').text()));
      });
      var $radio = $('input[name="google_tag_role_toggle"]:checked', context);
      if ($radio.val() == 0) {
        if (!vals.length) {
          return Drupal.t('All roles');
        }
        else {
          return Drupal.t('All roles except selected roles');
        }
      }
      else {
        if (!vals.length) {
          return Drupal.t('No roles');
        }
        else {
          return Drupal.t('Only selected roles');
        }
      }
    });

    $('fieldset#edit-statuses', context).drupalSetSummary(function (context) {
      var $checkbox = $('input[name="google_tag_status_toggle"]:checked', context);
      if ($checkbox.is(':checked')) {
        if (!$('textarea[name="google_tag_status_list"]', context).val()) {
          return Drupal.t('No statuses');
        }
        else {
          return Drupal.t('Listed statuses');
        }
      }
      else {
        return Drupal.t('No statuses');
      }
    });
  }
};

})(jQuery);
