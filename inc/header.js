// get parameter

var getParameter = function(param) { 
	
	var returnValue
	var url = location.href
	var parameters = (url.slice(url.indexOf('?') + 1, url.length)).split('&')
	
	for (var i = 0; i < parameters.length; i++) { 
		
		var varName = parameters[i].split('=')[0]
		
		if (varName.toUpperCase() == param.toUpperCase()) { 
			
			returnValue = parameters[i].split('=')[1]
			return decodeURIComponent(returnValue)
		
		} 
	} 

};

//

if (getParameter('page') == 'home') {

	str = ''
	str += '<div id="header" class="fix">'
	str += '	<a href="javascript:history.go(-1);">'
	str += '		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414z" fill="rgba(231,76,60,1)"/></svg>'
	str += '		<span>뒤로가기</span>'
	str += '	</a>'
	str += '</div>'

} else {

	str = ''
	str += '<div id="header" class="fix">'
	str += '	<a href="./././view.html?id=' + getParameter('id') + '">'
	str += '		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414z" fill="rgba(231,76,60,1)"/></svg>'
	str += '		<span>뒤로가기</span>'
	str += '	</a>'
	str += '</div>'

}

document.write(str)

/* str = ''
str += '<div id="header" class="fix">'
str += '	<a href="javascript:history.go(-1);">'
str += '		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414z" fill="rgba(231,76,60,1)"/></svg>'
str += '		<span>뒤로가기</span>'
str += '	</a>'
str += '</div>'

document.write(str) */