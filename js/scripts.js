// 데이터 생성

var data = [];

for (var i = 0; i < 100; i++) {

	data.push('아이템' + i);

}

// 데이터로 항목 만들기

for (let i = 0; i < data.length; i++) {

	changeQueue.enqueue({
	
		execute: function() {
			const elem = createItem(data[i]);
			document.getElementById('list').appendChild(elem);
		}
	
	});

}

// 반복적으로 큐를 체크하여 30개씩 실행

setInterval(function() {

	for (var i = 0; i < 30 && !changeQueue.isEmpty(); i++) {

		var c = changeQueue.dequeue();

		if (c) {
			requestAnimationFrame(c.execute);
		}

		if (changeQueue.isEmpty()) {}

	}

}, 0);

//

function createItem(d) {

	var elem = document.createElement('li');

	elem.textContent = d;
	elem.classList.add('item');

	return elem;

}