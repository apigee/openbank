/**
 * All accordion menu init and logic is here.
 */
 (function($) {
   Drupal.behaviors.accordion_menu = {
    attach: function(context, settings) {
      // Rewrote the old way to the new way.
      if (settings.accordion_menu) {
        // For each accordion menu instance.
        for (i in settings.accordion_menu) {
          var activeOriginal = settings.accordion_menu[i].active;
          var deltas = i.match(/\d+/g);

          if (deltas == null) continue;

          var delta = deltas[0];
          var headerOriginal = settings.accordion_menu[i].header;
          var $menuInstance = $('.accordion-menu-' + delta, context);

          // We override headers so only 1st level headers will transform to accordion.
          settings.accordion_menu[i].header = headerOriginal + '.item-depth-1';
          $menuInstance.accordion(settings.accordion_menu[i]);

          // For each accordion menu level of the instance.
          for (var level = 1; level < settings.accordion_menu[i].menuDepth; level++) {
            settings.accordion_menu[i].header = headerOriginal + '.item-depth-' + (level + 1);
            if (activeOriginal === false) {
              settings.accordion_menu[i].active = -1;
              $('.accordion-content-depth-' + level, $menuInstance).accordion(settings.accordion_menu[i]);
              continue;
            }

            var mlid = 0;
            if (settings.accordion_menu_active_trail[i][level + 1]) {
              mlid = settings.accordion_menu_active_trail[i][level + 1];
            }

            if (mlid == 0) {
              settings.accordion_menu[i].active = -1;
              $('.accordion-content-depth-' + level, $menuInstance).accordion(settings.accordion_menu[i]);
              continue;
            };

            $('.accordion-content-depth-' + level, $menuInstance).each(function(index,e) {
              settings.accordion_menu[i].active = $(e).find(settings.accordion_menu[i].header).index($('.menu-mlid-' + mlid, $(e)));
              $(e).accordion(settings.accordion_menu[i]);
            })
          }

          // Unbind the accordion effect for "empty" headers.
          $('.accordion-header.no-children', $menuInstance)
            .unbind('.accordion')
            .children('.ui-icon')
            .removeClass(settings.accordion_menu[i].icons.header)
            .addClass(settings.accordion_menu[i].icons.empty);
        }
      }
    },

    detach: function(context, settings) {

    }
  };
}(jQuery));
