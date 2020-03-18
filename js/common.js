$(function() {

	// INIT
	
	local();

	// swiper_list();
	swiper_view();
	scroll_move();

	list_random();

	youtube();


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

		if ( !$slider.length ) return;

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

	//

	function list_random() {

		var len = $('ul.randam > li').length;

		$(window).on('load', function() {

			$('ul.randam').each(function() {
				var ul = $(this),
					liArr = ul.children('li');

				liArr.sort(function() {
					var temp = parseInt(Math.random()*len),
						temp1 = parseInt(Math.random()*len);
					return temp1-temp;
				}).appendTo(ul);
			});

		});

	}

	// youtube

	function youtube() {

		$( 'iframe[src^="https://www.youtube.com/"], iframe[src^="https://www.facebook.com/"], iframe[src^="https://goo.gl/"]' ).wrap( '<div class="youtubeWrap"></div>' );

	}

});

//

function list_view(data, folder, insert) {
	
	$.each(data, function(index, item) {

		var output = '',
			path = $('body').hasClass('home') ? '' : '../../';

		output += '	<li>';
		output += '		<a href="' + path + 'html/' + folder + '/' + item.num + '.html">';
		output += '			<div class="thumb">';
		output += '				<span style="background-image:url(' + path + 'img/thumb/' + folder + '/m_1_' + item.num + '.jpg)"></span>';
		output += '			</div>';
		output += '			<div class="cont">';
		output += '				<p class="tit">' + item.tit + '</p>';
		output += '				<p class="txt">' + item.add + '</p>';
		output += '			</div>';
		output += '		</a>';
		output += '	</li>';

		document.getElementById(insert).innerHTML += output;

	});

}

//

function map_set(lat, lng) {

	// alert( $(location).attr('pathname') );

	/* var lat = "37.5121388",
		lng = "127.044182"; */

	var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
		mapOption = { 
			center: new kakao.maps.LatLng(lat, lng), // 지도의 중심좌표
			level: 6 // 지도의 확대 레벨
		};

	// 지도를 생성합니다
	var map = new kakao.maps.Map(mapContainer, mapOption); 

	// 마커가 표시될 위치입니다 
	var markerPosition = new kakao.maps.LatLng(lat, lng); 

	// 마커를 생성합니다
	var marker = new kakao.maps.Marker({
		position: markerPosition
	});

	// 마커가 지도 위에 표시되도록 설정합니다
	marker.setMap(map);

}

//

function list_info(data) {

	$.each(data, function(index, item) {

		var output = '';

		output += '	<li>';
		output += '		<div class="t_b">';
		output += '			<div class="t_c">주소</div>';
		output += '			<div class="t_c">' + item.add + '</div>';
		output += '		</div>';
		output += '	</li>';
		output += '	<li>';
		output += '		<div class="t_b">';
		output += '			<div class="t_c">문의</div>';
		output += '			<div class="t_c">' + item.tel + '</div>';
		output += '		</div>';
		output += '	</li>';
		
		if (item.ome) {
			
			output += '	<li>';
			output += '		<div class="t_b">';
			output += '			<div class="t_c">홈페이지</div>';
			output += '			<div class="t_c">' + item.ome + '</div>';
			output += '		</div>';
			output += '	</li>';

		}

		document.getElementById('info').innerHTML += output;

	});

}