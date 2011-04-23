  (function ($) {
    /**
     * jQuery Partial Loading Plugin.
     *
     * @author Yuya Takeyama
     */
    $.fn.partialLoad = function (options) {
      if (!('replaceState' in history)) {
        return this;
      }
 
      var elements = this;
 
      var settings = $.extend({
        targets: [],
        complete: function () {},
      }, options);
 
      if (typeof options.targets === 'string') {
        options.targets = [options.targets];
      }
 
      var swapContent = function (response, target) {
        $(target).fadeOut('fast', function () {
          $(this).html($(response).find(target)[0].innerHTML);
        }).fadeIn('fast');
      };
 
      var loadPage = function (url, targets) {
        $.ajax({
          url: url,
          success: function (response) {
            for (var i in targets) {
              var target = targets[i];
              swapContent(response, target);
            }
 
            history.replaceState({url: url}, "title", url);
          },
          complete: options.complete,
        });
      };
 
      elements.each(function () {
        var url = $(this).attr('href');
 
        $(this).click(function (event) {
          event.preventDefault();
          loadPage(url, options.targets);
        });
      });
 
      return this;
    };
  })(jQuery);
