/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var reportPreview = __webpack_require__(1);

	var searchUrl = window.location.search,
	    search = '';
	if (searchUrl.indexOf('?') !== -1) {
	    search = decodeURIComponent(searchUrl.substr(1));
	}

	if (search !== '') {
	    var document_id = search.split('=')[1];
	    $.ajax({
	        url: '/document_detail/' + document_id + '/html',
	        type: 'GET'
	    }).done(function (data) {
	        $('#report-container').append(reportPreview(data));
	        $("#report-ifr-container").mCustomScrollbar({
	            axis: "y",
	            theme: "minimal-dark",
	            scrollbarPosition: 'inside'
	        });
	        // $('#report-preview-file').attr('src', data.result.preview);
	        $('#report-preview-file').attr('src', data.result.preview);
	        $('#report-preview-file').on('load', function () {
	            var ifr = document.getElementById('report-preview-file'),
	                ifrDoc = ifr.contentDocument || ifr.contentWindow.document,
	                ifrHead = ifrDoc.getElementsByTagName('head')[0],
	                ifrStyle = document.createElement('style');
	            var ifrP = ifrDoc.getElementsByClassName('pf');
	            var ifrH = 0;
	            for (var i = 0; i < ifrP.length; i++) {
	                ifrH += ifrP[i].offsetHeight;
	            }
	            $(ifr).css({
	                height: ifrH + 200 + 'px'
	            });
	            var containerW = $('.report-preview').width() - 1,
	                ifrPW = ifrP[0].offsetWidth;
	            console.log(containerW, ifrPW);
	            var scale = containerW / ifrPW;
	            var scaleTxt = "div[id^='pf']{-webkit-transform: scaleX(" + scale + ");transform:scaleX(" + scale + ");-webkit-transform-origin: 0 100%;transform-origin: 0 100%}";
	            var touchTxt = "#page-container{-webkit-overflow-scrolling: touch;}";
	            ifrStyle.setAttribute('type', 'text/css');
	            ifrHead.appendChild(ifrStyle);
	            ifrStyle.innerHTML = scaleTxt + ' ' + touchTxt;
	            $('.pc', ifrDoc).addClass('opened');
	            $('.loading').addClass('hide');
	            $('.container').removeClass('fade');
	        });
	    }).fail(function () {

	    });
	}



/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(2);
	module.exports=template('pc/tpl/report_content',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,result=$data.result,$escape=$utils.$escape,$each=$utils.$each,$value=$data.$value,$index=$data.$index,$out='';$out+='<div class="report-preview"> <div class="report-thumb-container clearfix"> ';
	if(result.type === 'doc' || result.type === 'docx'){
	$out+=' <img src="images/word.png"> ';
	}else if(result.type === 'ppt' || result.type === 'pptx'){
	$out+=' <img src="images/ppt.png"> ';
	}else if(result.type === 'zip' || result.type === 'rar'){
	$out+=' <img src="images/zip.png"> ';
	}else if(result.type === 'pdf'){
	$out+=' <img src="images/pdf.png"> ';
	}
	$out+=' <div> <h2>';
	$out+=$escape(result.document_name);
	$out+='</h2> <p class="report-thumb-info">';
	$out+=$escape(result.grade);
	$out+=' ';
	$out+=$escape(result.institute);
	$out+=' ';
	$out+=$escape(result.class);
	$out+='</p> <p class="download-count">已有';
	$out+=$escape(result.downloads);
	$out+='人下载</p> </div> </div> ';
	if(!result.preview){
	$out+=' ';
	}else{
	$out+=' <div class="report-ifr-container" id="report-ifr-container"> <!--<iframe src="';
	$out+=$escape(result.preview);
	$out+='" id="report-preview-file" scrolling="no" frameborder="0"></iframe>--> <iframe id="report-preview-file"></iframe> </div> ';
	}
	$out+=' <div class="report-download-bar"> <a href="';
	$out+=$escape(result.downloadUrl);
	$out+='" class="report-download-button"> <span>下载</span> </a> </div> </div> <div class="report-related"> <h2>相关文档推荐</h2> <ul class="report-related-list"> ';
	$each(result.related,function($value,$index){
	$out+=' <li> ';
	if($value.type === 'doc' || $value.type === 'docx'){
	$out+=' <img src="images/word.png"> ';
	}else if($value.type === 'ppt' || $value.type === 'pptx'){
	$out+=' <img src="images/ppt.png"> ';
	}else if($value.type === 'zip' || $value.type === 'rar'){
	$out+=' <img src="images/zip.png"> ';
	}else if($value.type === 'pdf'){
	$out+=' <img src="images/pdf.png"> ';
	}
	$out+=' <div> <h3>';
	$out+=$escape($value.document_name);
	$out+='</h3> <p>';
	$out+=$escape($value.institute);
	$out+='</p> </div> </li> ';
	});
	$out+=' </ul> </div>';
	return new String($out);
	});

/***/ },
/* 2 */
/***/ function(module, exports) {

	/*TMODJS:{}*/
	!function () {
		function a(a, b) {
			return (/string|function/.test(typeof b) ? h : g)(a, b)
		}

		function b(a, c) {
			return "string" != typeof a && (c = typeof a, "number" === c ? a += "" : a = "function" === c ? b(a.call(a)) : ""), a
		}

		function c(a) {
			return l[a]
		}

		function d(a) {
			return b(a).replace(/&(?![\w#]+;)|[<>"']/g, c)
		}

		function e(a, b) {
			if (m(a))for (var c = 0, d = a.length; d > c; c++)b.call(a, a[c], c, a); else for (c in a)b.call(a, a[c], c)
		}

		function f(a, b) {
			var c = /(\/)[^\/]+\1\.\.\1/, d = ("./" + a).replace(/[^\/]+$/, ""), e = d + b;
			for (e = e.replace(/\/\.\//g, "/"); e.match(c);)e = e.replace(c, "/");
			return e
		}

		function g(b, c) {
			var d = a.get(b) || i({filename: b, name: "Render Error", message: "Template not found"});
			return c ? d(c) : d
		}

		function h(a, b) {
			if ("string" == typeof b) {
				var c = b;
				b = function () {
					return new k(c)
				}
			}
			var d = j[a] = function (c) {
				try {
					return new b(c, a) + ""
				} catch (d) {
					return i(d)()
				}
			};
			return d.prototype = b.prototype = n, d.toString = function () {
				return b + ""
			}, d
		}

		function i(a) {
			var b = "{Template Error}", c = a.stack || "";
			if (c)c = c.split("\n").slice(0, 2).join("\n"); else for (var d in a)c += "<" + d + ">\n" + a[d] + "\n\n";
			return function () {
				return "object" == typeof console && console.error(b + "\n\n" + c), b
			}
		}

		var j = a.cache = {}, k = this.String, l = {
			"<": "&#60;",
			">": "&#62;",
			'"': "&#34;",
			"'": "&#39;",
			"&": "&#38;"
		}, m = Array.isArray || function (a) {
				return "[object Array]" === {}.toString.call(a)
			}, n = a.utils = {
			$helpers: {}, $include: function (a, b, c) {
				return a = f(c, a), g(a, b)
			}, $string: b, $escape: d, $each: e
		}, o = a.helpers = n.$helpers;
		a.get = function (a) {
			return j[a.replace(/^\.\//, "")]
		}, a.helper = function (a, b) {
			o[a] = b
		}, module.exports = a
	}();

/***/ }
/******/ ]);