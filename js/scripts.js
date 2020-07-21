$(function() {

	// INIT
	
	local();

	// area search

	function local() {

		var $body = $('body'),
			$close_btn = $('#popup_close'),
			$popup = $('#popup'),
			open = true;

		// open

		$(document).on('click', '.local a', function(e) {

			e.preventDefault();

			if (open) {

				$body.addClass('_open');
				open = false;

				TweenLite.fromTo($popup, .5, { y: '-100%' }, { y: '0%', ease: Power4.easeOut });
				TweenLite.fromTo($close_btn, .2, { autoAlpha: 0 }, { autoAlpha: 1, ease: Power0.easeNone, delay: .1 });

				//

				$('.filters a').on('click', function() {

					var toFilter = $(this).data('filters');
					
					if (toFilter == '전체') {
						
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

						if (filters == toFilter) {
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

					open = true;
				}
			});

		}

	}

});


// 데이터 생성

function list_view(data, folder, insert) {

	// 위부터 4개 Output Hold
	
	if (insert == 'latest') {
		
		data.splice( -8, 4);

	}

	var insert = document.getElementById(insert),
		output = '',
		path = $('body').hasClass('home') ? '' : '../../',
		uniq = {

			'info'     : 'm',
			'beauty'   : 'm_1',
			'cafe'     : 'm_2',
			'hospital' : 'm_3',
			'hotel'    : 'm_4',
			'funeral'  : 'm_5'

		};

	console.time();

	// 데이터로 항목 만들기

	data.forEach(function(item, index) {

		changeQueue.enqueue({
		
			execute: function() {

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

				insert.innerHTML = output;

				// alert( getParameter('id') );

				$(document).scrollTop($('#' + getParameter('id')).offset().top - 60);
				
			}
		
		});

	});

	requestIdleCallback(processChanges);

	// 반복적으로 큐를 체크하여 ?개씩 실행

	/* setInterval(function() {

		for (var i = 0; i < 1 && !changeQueue.isEmpty(); i++) {
			var c = changeQueue.dequeue();

			if (c) {
				requestAnimationFrame(c.execute);
			}

			if (changeQueue.isEmpty()) {
				 console.timeEnd();
			}
		}

	}, 0); */

	function processChanges(deadline) {

		while (deadline.timeRemaining() > 0 && !changeQueue.isEmpty()) {
			var c = changeQueue.dequeue();

			if (c) {
				requestAnimationFrame(c.execute);
			}
		}

		if (!changeQueue.isEmpty()) {
			requestIdleCallback(processChanges);
		} else {
			console.timeEnd();
		}

	}

}

// random output

$.fn.randomize = function(selector) {

    var $elems = selector ? $(this).find(selector) : $(this).children(),
        $parents = $elems.parent();
 
    $parents.each(function() {
        $(this).children(selector).sort(function() {
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