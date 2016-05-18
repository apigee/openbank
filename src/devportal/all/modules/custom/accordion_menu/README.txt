
CONTENTS OF THIS FILE
---------------------

 * Author
 * Description
 * Installation
 * Dependencies
 * Configuration
 * Styling

AUTHOR
------
Jim Berry ("solotandem", http://drupal.org/user/240748)

DESCRIPTION
-----------
This module will display a Drupal menu using a jQuery UI accordion effect. The
top-level menu items are referred to as header items. The accordion effect is
invoked when the triggering event occurs on a header item. The triggering event
may be a mouse down, mouse click, or mouse over. The submenu expands to display
the menu items beneath the header. A subsequent triggering event on the same
header item collapses the menu beneath it.

INSTALLATION
------------
To use this module, install it in a modules directory. See
http://drupal.org/node/895232 for further information.

DEPENDENCIES
------------
Due to a core bug fixed in Drupal 7.12, the Menu Block module is a dependency
for this module prior to the 7.x-1.1 release.

CONFIGURATION
-------------
By default, the module will declare two menu blocks. To set a different number
of available menu blocks, visit the module configuration page at
admin/config/user-interface/accordion_menu.

Each menu block may be configured from the block administration page at
admin/structure/block. Settings are exposed for:
- menu source: the menu to display as an accordion
- script scope: the script location in the page source (see drupal_add_js())
- header link: whether the header HTML output is a link
- header: the HTML tag used on the header items
- animate: the animation effect used to expand the submenu
- event: the triggering event
- collapsible: allow an expanded menu to collapse
- all of the other published jQuery UI accordion options

If a header item is output as a link, then there may be a conflict between the
event triggering a redirect to the menu link and that enabling the accordion
effect. To avoid a clash of the JS behind the accordion effect and a mouse click
on a header menu link, it is recommended to leave the default setting which
outputs the header as a non-link item.

STYLING
-------
Classes

Several classes are added to the HTML elements surrounding the menu, headers,
and submenu content.

wrapper
  The <div> wrapped around the menu tree has classes for several of the
  configurable options of the block: accordion-menu-[block delta]
  accordion-menu-name-[menu name] accordion-menu-source-[menu source]

header
  The header elements (default tag is <h3>) of the menu tree have classes:
  accordion-header-[item number] first last has-children no-children active
  active-trail odd even menu-mlid-[menu link ID]

header "link"
  The <span> or <a> element of a header item has classes: accordion-link
  active-trail

submenu item
  The <li> item has the standard classes added by the menu system.

submenu link
  The <a> item has whatever classes are added to the menu item, including those
  available from the Menu Atributes module.

The number and type of style sheet attributes needed to produce a desired visual
effect will depend on the jQuery UI version as that script has changed how it
modifies the HTML and the CSS classes it uses.

Templates

By default, the wrapper <div> for the block is generated using the
accordion-menu-wrapper.tpl.php template. This may be overridden by creating a
template file based on the theme hook suggestions for that template:
- accordion-menu-wrapper--[block delta].tpl.php
- accordion-menu-wrapper--[menu name].tpl.php

For example, a file called accordion-menu-wrapper--menu-foo.tpl.php can be used
to override the <div> for the custom menu "menu-foo" blocks. Add this file to
your theme.

Theme functions

Accordion Menu uses Drupal core's menu theme functions for the submenu items.
However, it provides theme hook suggestions for the header that can be used to
override this theme function:
- [theme]_accordion_menu_header__[block delta]()
- [theme]_accordion_menu_header__[menu name]()

For example, if you created a bartik_accordion_menu_header__1() function, it
would override theme_accordion_menu_header() to display the menu block with
delta of 1.
