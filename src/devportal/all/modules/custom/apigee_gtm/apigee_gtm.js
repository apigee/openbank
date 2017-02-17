/**
 * @file Contains the code to add the Google tag manager script to the administration pages.
 * 
 * @author sdamodaran
 */

(function($){
    $(document).ready(function(){
        var iframe_code = '<iframe src="//www.googletagmanager.com/ns.html?id=GTM-N52333" height="0" width="0" style="display:none;visibility:hidden"></iframe>';
        $('body').prepend(iframe_code);
        $('body').prepend("<script>(function(win, doc){win.dataLayer=win.dataLayer||[]; var f = doc.getElementsByTagName('script')[0]; var j = doc.createElement('script'); j.async = true; j.src = '//www.googletagmanager.com/gtm.js?id=GTM-N52333'; f.parentNode.insertBefore(j, f);})(window, document);</script>");
    });
})(jQuery);
