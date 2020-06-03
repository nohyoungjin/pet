var changeQueue = (function() {

	var list = [];
		index = 0;

	return {

		enqueue: function(c) {
			list.push(c);
		},

		dequeue: function() {
			var o = list[index];
			index++;

			return o;
		},

		isEmpty: function() {
			return list.length - index === 0;
		}

	}

})();