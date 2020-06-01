$(function() {

	// INIT
	
	local();

	// swiper_list();
	// scroll_move();

	swiper_view();
	youtube();


	// area search

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

				TweenLite.fromTo($popup, .5, {y: '-100%'}, {y: '0%', ease: Power4.easeOut});
				TweenLite.fromTo($close_btn, .2, {autoAlpha: 0}, {autoAlpha: 1, ease: Power0.easeNone,delay: .1});

				//

				$('.filters a').on('click', function() {

					var toFilter = $(this).data('filters');
					
					if ( toFilter == '전체' ) {
						
						$('.local a span').text(toFilter);
						$('.lst_filter li').removeClass('sort').removeClass('on').removeClass('off');
						
						close_action();
						
						return;
					
					} else {

						$('.local a span').text(toFilter);
						$('.lst_filter li').removeClass('on');
						
					}

					$('.lst_filter li').each(function(i, elem) {

						var filters = $(this).data('filters');
						$('.lst_filter li').addClass('sort').addClass('off');

						if ( filters == toFilter ) {
							$(this).addClass('on');
						}

					});
					
					close_action();

				});

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

			TweenLite.to($popup, .4, {
				y: '-100%',
				ease: Power4.easeOut,
				onComplete: function() {
					$body.removeClass('_open');

					_open = true;
				}
			});

		}

	}


	// category roll

	function swiper_list() {

		var swiper = new Swiper('.swiper-list.swiper-container', {
			slidesPerView: 4,
			spaceBetween: 12,
			watchSlidesProgress: true,
            watchSlidesVisibility: true,
			grabCursor: true
		});

	}


	// position move

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


	// slider

	function swiper_view() {

		var $slider = $('.swiper-wrapper');

		if ( !$slider.length ) return;

		// Timer

		var time = 4000,
			transition_time = 1200,
			time_with_trans = (time + transition_time) / 1000,
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


	// youtube

	function youtube() {

		$( 'iframe[src^="https://www.youtube.com/"], iframe[src^="https://www.facebook.com/"], iframe[src^="https://goo.gl/"]' ).wrap( '<div class="youtubeWrap"></div>' );

	}

});


//

function list_view(data, folder, insert) {

	// 위부터 4개 Output Hold
	
	if ( insert == 'latest' ) {
		
		data.splice( -8, 4 );

	}

	var output = '',
		path = $('body').hasClass('home') ? '' : '../../',
		uniq = {

			'info'     : 'm',
			'beauty'   : 'm_1',
			'cafe'     : 'm_2',
			'hospital' : 'm_3',
			'hotel'    : 'm_4',
			'funeral'  : 'm_5'

		};

	data.forEach(function(item, index) {

		if (item.area) {
			output += '	<li id=' + item.num + ' data-filters=' + item.area + '>';
		} else {
			output += '	<li id=' + item.num + ' data-filters=' + item.ani + '>';
		}

		output += '		<a href="' + path + 'html/' + folder + '/' + item.num + '.html?id=' + item.num + '">';
		output += '			<div class="thumb">';
		output += '				<span style="background-image:url(' + path + 'img/thumb/' + folder + '/' + uniq[folder] + '_' + item.num + '.jpg)"></span>';
		output += '			</div>';
		output += '			<div class="cont">';
		output += '				<p class="tit">' + item.tit + '</p>';

		if (item.add) {
			output += '			<p class="txt">' + item.area + ' ' + item.add + '</p>';
		}

		output += '			</div>';
		output += '		</a>';
		output += '	</li>';

	});

	// document.getElementById(insert).innerHTML += output;
	$("#"+insert).append(output);

}


//

function lst_view(folder, insert) {

	$.ajax({
		dataType: 'json',
		url: '../../data/' + folder + '.json'
		}).done(function(data) {

		var output = '',
			path = $('body').hasClass('home') ? '' : '../../',
			uniq = {

				'info'     : 'm',
				'beauty'   : 'm_1',
				'cafe'     : 'm_2',
				'hospital' : 'm_3',
				'hotel'    : 'm_4',
				'funeral'  : 'm_5'

			};

			for (var i = 0; i < data.info.length; i++) {

				output += ' <li data-filters=' + data.info[i].area + '>';
				output += '		<a href=' + path + 'html/' + folder + '/' + data.info[i].num + '.html>';
				output += '			<div class="thumb">';
				output += '				<span style="background-image:url(' + path + 'img/thumb/' + folder + '/' + uniq[folder] + '_' + data.info[i].num + '.jpg)"></span>';
				output += '			</div>';
				output += '			<div class="cont">';
				output += '				<p class="tit">' + data.info[i].tit + '</p>';

				if (data.info[i].add) {

					output += '			<p class="txt">' + data.info[i].area + ' ' + data.info[i].add + '</p>';
				
				}

				output += '			</div>';
				output += '		</a>';
				output += '	</li>';

			}

			$('#' + insert).html(output);

			}).fail(function(jqXHR, textStatus, errorThrown) {

				console.log("fail: ", jqXHR);

			}).always(function(data, textStatus, jqXHR) {

				console.log("always: ", data);

			});

}


// title

function h_title(data) {

	var output = '';

	data.forEach(function(item, index) {

		output += '<h2>' + item.tit + '</h2>';
		output += '<p>' + item.add + '</p>';

	});

	document.getElementById('h_wrap').innerHTML += output;

}


// slider setting

function swiper_slide(sort, uniq, sum) {

	// 빈 문자열 변수를 선언하여 해당 문자열에만 추가하는 것이 좋은 방법

	var output = '';

	for (var i = 1; i <= sum; i++) {

		output += '	<div class="swiper-slide">';
		output += '		<div class="thumb">';
		output += '			<span style="background-image:url(../../img/' + sort + '/' + uniq + '_' + i + '.jpg)"></span>';
		output += '		</div>';
		output += '	</div>';

	}

	$('#swiper-wrap').append(output);

}


// price

function list_price(data) {

	if ( data == '' ) {
		return;
	}

	var out = '',
		output = '';

	out += ' <strong>[가격정보]</strong>';
	out += ' <ul id="lst_price">';
	out += ' </ul>';

	document.getElementById('price').innerHTML += out;

	data.forEach(function(item, index) {

		output += '	<li>' + item.lst + '</li>';

	});

	document.getElementById('lst_price').innerHTML += output;

}


// clock

function list_clock(data) {

	if ( data == '' ) {
		return;
	}

	var out = '',
		output = '';

	out += ' <strong>[이용시간]</strong>';
	out += ' <ul id="lst_clock">';
	out += ' </ul>';

	document.getElementById('clock').innerHTML += out;

	data.forEach(function(item, index) {

		output += '	<li>' + item.lst + '</li>';

	});

	document.getElementById('lst_clock').innerHTML += output;

}


// info

function list_info(data) {

	var output = '';

	// $.each(data, function(index, item) {
	data.forEach(function(item, index) {

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

	});

	// document.getElementById('info').innerHTML += output;
	$('#info').append(output);

}


// random output

$.fn.randomize = function(selector) {

    var $elems = selector ? $(this).find(selector) : $(this).children(),
        $parents = $elems.parent();
 
    $parents.each(function() {
        $(this).children(selector).sort(function(){
            return Math.round(Math.random()) - 0.5;
        }).detach().appendTo(this);
    });
 
    return this;

}; 


// get parameter

var getParameter = function(param) { 
	
	var returnValue, 
		url = location.href,
		parameters = (url.slice(url.indexOf('?') + 1, url.length)).split('&'); 
	
	for (var i = 0; i < parameters.length; i++) { 
		
		var varName = parameters[i].split('=')[0]; 
		
		if (varName.toUpperCase() == param.toUpperCase()) { 
			
			returnValue = parameters[i].split('=')[1]; 
			return decodeURIComponent(returnValue); 
		
		} 
	} 

};