$(function() {

	// INIT
	
	local();

	swiper_list();
	swiper_view();


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
			spaceBetween: 12
			/* pagination: {
				el: '.swiper-pagination',
				clickable: true,
			}, */
		});

	}

	//

	function swiper_view() {

		var $slider = $('.swiper-wrapper');

		if( !$slider.length ) return;

		// Timer

		var time = 4000;
		var transition_time = 1200;
		var time_with_trans = (time+transition_time)/1000;
		var timer;
		var tween = null;

		// Slider init

		if($('.swiper-slide').length > 1){

			var main_visual_swiper = new Swiper('.swiper-view.swiper-container', {
				parallax: true,
				loop : true,
				speed : transition_time,
				pagination: {
					el: '.visual_slideshow_pagination',
					clickable: true,
					renderBullet: function (index, className) {
						return '<span class="' + className + '"><b></b></span>';
					},
				},
				navigation: {
					nextEl: '.slideshow_next',
					prevEl: '.slideshow_prev'
				},
				on : {
					paginationRender: function () {

						var $bullets = $('.swiper-container .swiper-pagination-bullet b');
						var $target = $('.swiper-container .swiper-pagination-bullet b').eq(this.realIndex);

						time_with_trans = (time+transition_time)/1000;

						// Play progress

						TweenMax.killTweensOf($bullets);

						TweenMax.to($bullets, 0, {scaleX:0});
						tween = TweenMax.to($target, time_with_trans, {scaleX:1, ease:Linear.easeNone, onComplete: function() {
							  main_visual_swiper.slideNext();
							}
						});

					},
					transitionStart : function(){

						var $bullets = $('.swiper-container .swiper-pagination-bullet b');
						var $target = $('.swiper-container .swiper-pagination-bullet b').eq(this.realIndex);

						time_with_trans = (time+transition_time)/1000;

						// Play progress

						TweenMax.killTweensOf($bullets);

						TweenMax.to($bullets, 0, {scaleX:0});
						tween = TweenMax.to($target, time_with_trans, {scaleX:1, ease:Linear.easeNone, onComplete: function() {
							  main_visual_swiper.slideNext();
							}
						});

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

});