var parseNodePath;

(function ($) {

  /**
   * Behavior that adjusts top menu (with variable depth).
   */
  Drupal.behaviors.apigeeTopMenu = {
    attach: function(context, settings) {
      $('#main-menu > li').each(function(index, el) {
        var $element = $(el);
        if ($('ul li ul', $element).length > 0) {
          // Calculate width on first hover (because display is none).
          $element.one('hover', function(evObj) {
            var totalWidth = 0,
            $hoveredLi = $(this);
            $('ul li ul', $hoveredLi).each(function(index, element) {
              totalWidth += $(element).outerWidth();
            });
            $hoveredLi.children('ul').width(totalWidth);
          });

          // A fix if the page loads slowly and the user already hovered li
          if ($element.is(':hover')) {
            $element.trigger('mouseover');
          }

          // Float menu's
          $element.addClass('menu-float');
        }
      });
    }
  }

  /**
   * Fix Accordion Menu Click Issue
   */
  Drupal.behaviors.accordionNav = {
    attach: function(context, settings) {
      $('.block-accordion-menu h3 a').click(function (e) {
        var link = $(this).attr('href');
        window.location = link;
        e.preventDefault();
      });
    }
  }

  /**
   * Legacy code
   */
  Drupal.behaviors.oldCode = {
    attach: function(context, settings) {
      // Scroll to top of accordion content after accordion header is clicked
      $('.region-main-content .ui-accordion').bind('accordionchange', function(event, ui) {
        if(!ui.newHeader.length) {
          return;
        }
        ui.newHeader // jQuery object, activated header
        ui.oldHeader // jQuery object, previous header
        ui.newContent // jQuery object, activated content
        ui.oldContent // jQuery object, previous content
        $('html, body').animate({
          scrollTop: $(ui.newHeader).offset().top - 90
          }, 300);
      });

      // Remove scrollbar when not necessary
      if ($('.breadcrumb')[0]) {
        $('html').height($('html').height()-55);
      };

      $('.block-accordion-menu,.accordion-menu-wrapper').show();

      // Set parent menu item to active
      $('.accordion-menu-source-menu-left-menu ul.menu ul.menu').hide();
      $('.accordion-menu-source-menu-left-menu ul.menu li.expanded').css('list-style-image', 'url(../../misc/menu-leaf.png)');
      $('.accordion-menu-source-menu-left-menu ul.menu ul.menu .active').parents('li').children('a').addClass('active');


      var currentHost = window.location.protocol + "//" + window.location.host;
      $('ul.sf-main-menu a[href^="'+currentHost+'"]').addClass('active-trail').parent().addClass('active-trail');
    }
  }
})(jQuery);
