str = ''
str += '<div class="local">'
str += '	<a href="javascript:">'
str += '		전체'
str += '		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12"><path fill="none" d="M0 0h24v24H0z"/><path d="M13 16.172l5.364-5.364 1.414 1.414L12 20l-7.778-7.778 1.414-1.414L11 16.172V4h2v12.172z"/></svg>'
str += '	</a>'
str += '</div>'
str += '<div id="popup" class="popup">'
str += '	<div class="popup_inner">'
str += '		<div class="keyword">'
str += '			<ul class="filters">'
str += '				<li><a href="javascript:" data-filters="서울">#서울</a></li>'
str += '				<li><a href="javascript:" data-filters="경기">#경기</a></li>'
str += '				<li><a href="javascript:" data-filters="인천">#인천</a></li>'
str += '				<li><a href="javascript:" data-filters="부산">#부산</a></li>'
str += '			</ul>'
str += '		</div>'
str += '	</div>'
str += '	<button id="popup_close" class="popup_close">'
str += '		<span>닫기</span>'
str += '	</button>'
str += '</div>'

document.write( str );