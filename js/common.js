$(function() {

	// INIT

	swiper_slider();
	faq();


	//

	function swiper_slider() {

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


	aa();

	function aa() {

		var swiper = new Swiper('.swiper-list.swiper-container', {
			slidesPerView: 3,
			spaceBetween: 30
			/* pagination: {
				el: '.swiper-pagination',
				clickable: true,
			}, */
		});

	}

	// 
	
	function faq() {
		$(".faq dl dt a").on("click", function() {
			if ( $(this).parent().next().css("display") == "none" ) {
				$(".faq dl dt a").removeClass('on');
				$(".faq dl dd").slideUp(150);
				$(this).addClass('on');
				$(this).parent().next().slideDown(150);
			} else {
				$(".faq dl dt a").removeClass('on');
				$(this).parent().next().slideUp(150);
			}
		});
	}

});