$(function() {

	// INIT
	
	local();

	// swiper_list();
	swiper_view();
	scroll_move();

	//

	function local() {

		var $body = $('body'),
			$close_btn = $('#popup_close'),
			$popup = $('#popup'),
			_open = true;

		// open

		$(document).on('click', '.local a', function(e) {

			e.preventDefault();

			if ( _open ) {

				$body.addClass('_open');
				_open = false;

				new TweenLite.fromTo($popup, .5, {y: '-100%'}, {y: '0%', ease: Power4.easeOut});
				new TweenLite.fromTo($close_btn, .2, {autoAlpha: 0}, {autoAlpha: 1, ease: Power0.easeNone,delay: .1});

			} else {

				close_action();

			}

		});

	   // close

		$close_btn.on('click', function(e) {

			e.preventDefault();
			close_action();

		});

		// search close action

		function close_action() {

			new TweenLite.to($popup, .4, {
				y: '-100%',
				ease: Power4.easeOut,
				onComplete: function() {
					$body.removeClass('_open');

					_open = true;
				}
			});

		}

	}

	//

	function swiper_list() {

		var swiper = new Swiper('.swiper-list.swiper-container', {
			slidesPerView: 4,
			spaceBetween: 12,
			watchSlidesProgress: true,
            watchSlidesVisibility: true,
			grabCursor: true
		});

	}

	//

	function swiper_view() {

		var $slider = $('.swiper-wrapper');

		if( !$slider.length ) return;

		// Timer

		var time = 4000,
			transition_time = 1200,
			time_with_trans = (time+transition_time)/1000,
			timer,
			tween = null;

		// Slider init

		if ( $('.swiper-slide').length > 1 ) {

			var main_visual_swiper = new Swiper('.swiper-view.swiper-container', {
				parallax: true,
				loop : true,
				speed : transition_time,
				navigation: {
					nextEl: '.slideshow_next',
					prevEl: '.slideshow_prev'
				},
				pagination: {
					el: '.swiper-pagination',
					type: 'custom',
					renderCustom: function (swiper, current, total) {
						  return '<span>' + current + '/' + total + '</span>';
					  }
				}

			}); // END main_visual_swiper

		}

		// Play pause toggle

		$('.slideshow_play_toggle').on('click',function() {

			$(this).toggleClass('paused');

			if ( tween.isActive() ) {
				tween.pause();
			} else {
				tween.resume();
			}

		});

	}

	// 

	function scroll_move() {

		$('.cate a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function(event) {

			if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

				if (target.length) {

					event.preventDefault();

					var win_w = $(window).width(),
						scroll_top = 40;

					$('html, body').animate({
						scrollTop: target.offset().top - scroll_top
					}, 500, function() {});

				}

			}

		});

	}

});