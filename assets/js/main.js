jQuery.noConflict();

(function($) {
	$(function() {

		var tm = TweenMax;
		var body = $('body');

		$('.menuHandle').click(function() {
				tm.to($('.menu'), 1, { right:0 });
				$('.blk').fadeIn(500);
				body.addClass('menuOpen')
		});

		$('.closeMenu').click(function() {
				tm.to($('.menu'), 0.6, { right:-($('.menu').outerWidth()) });
				$('.blk').delay(400).fadeOut(500);
				body.removeClass('menuOpen')
		});

		

	});
})(jQuery);

var $ = jQuery.noConflict();
