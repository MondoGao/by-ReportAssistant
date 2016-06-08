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
	var Reminder = __webpack_require__(3);
	var reminder = new Reminder();

	var PREVIEW = {
	    reminderInfo: {
	        fileDownloadFail: '该文档无法下载，请下载其他文档',
	        isDownloadFile: '确认下载该文档？'
	    }
	};

	var searchUrl = window.location.search,
	    search = '';
	var docWidth = 833;
	if (searchUrl.indexOf('?') !== -1) {
	    search = decodeURIComponent(searchUrl.substr(1));
	}

	function linkTosearch(searchInput) {
	    if (!!searchInput) {
	        window.open('report_search.html?search=' + encodeURIComponent(searchInput), 'search_window');
	    }
	}

	$('#search-input').on('keypress', function (e) {
	    if (e.which === 13) {
	        linkTosearch($(e.currentTarget).val());
	    }
	});

	$('.search-submit').on('click', function () {
	    linkTosearch($('#search-input').val());
	});

	if (search !== '') {
	    var document_id = search.split('=')[1];
	    $.ajax({
	        url: '/document_detail/' + document_id + '/html',
	        type: 'GET'
	    }).done(function (data) {
	        $('#report-container').append(reportPreview(data));
	        $('.report-download-button').on('click', function () {
	            (reminder.show(PREVIEW.reminderInfo.isDownloadFile)).done(function () {
	                $.ajax({
	                    url: $('#downloadLink').val(),
	                    type: 'GET'
	                }).done(function (data) {
	                    if (data.code === -1) {
	                        reminder.show(PREVIEW.reminderInfo.fileDownloadFail);
	                    } else {
	                        $("body").append("<iframe src='" + $('#downloadLink').val() + "' style='display: none;' ></iframe>");
	                    }
	                }).fail(function () {
	                    reminder.show(PREVIEW.reminderInfo.fileDownloadFail);
	                });
	            })
	        });
	        if (!data.result.preview) {
	            $('.loading-container').addClass('hide');
	            $('.container').removeClass('fade');
	            return;
	        }
	        $("#report-ifr-container").mCustomScrollbar({
	            axis: "y",
	            theme: "minimal-dark",
	            scrollbarPosition: 'inside'
	        });
	        $('#report-preview-file').attr('src', data.result.preview);
	        // $('#report-preview-file').attr('src', 'test2.html');
	        $('#report-preview-file').on('load', function () {
	            var ifr = document.getElementById('report-preview-file'),
	                ifrDoc = ifr.contentDocument || ifr.contentWindow.document,
	                ifrHead = ifrDoc.getElementsByTagName('head')[0],
	                ifrStyle = ifrDoc.createElement('style');
	            var ifrP = ifrDoc.getElementsByClassName('pf');
	            var ifrH = 0,
	                ifrMargin = parseInt($('.pf', ifrDoc).css('margin-top'));
	            for (var i = 0; i < ifrP.length; i++) {
	                ifrH += $(ifrP[i], ifrDoc).outerHeight();
	                ifrH += ifrMargin;
	            }
	            ifrH += ifrMargin;
	            $(ifr).css({
	                height: ifrH + 25 + 'px'
	            });
	            var containerW = ifrDoc.getElementById('page-container').offsetWidth,
	                ifrPW = ifrP[0].offsetWidth;
	            // console.log(containerW, ifrPW);
	            if (containerW > docWidth && ifrP <= 833) {
	                $('.pc', ifrDoc).addClass('opened');
	                $('.loading-container').addClass('hide');
	                $('.container').removeClass('fade');
	                return;
	            }
	            var scale = containerW / ifrPW;
	            var scaleTxt = "div[id^='pf']{-webkit-transform: scaleX(" + scale + ");transform:scaleX(" + scale + ");-webkit-transform-origin: 0 100%;transform-origin: 0 100%}";
	            var touchTxt = "#page-container{-webkit-overflow-scrolling: touch;}";
	            ifrStyle.setAttribute('type', 'text/css');
	            ifrHead.appendChild(ifrStyle);
	            ifrStyle.innerHTML = scaleTxt + ' ' + touchTxt;
	            $('.pc', ifrDoc).addClass('opened');
	            $('.loading-container').addClass('hide');
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
	$out+=' <div class="report-miss-container"> <img src="images/report-preview-miss.png"> </div> ';
	}else{
	$out+=' <div class="report-ifr-container" id="report-ifr-container"> <!--<iframe src="';
	$out+=$escape(result.preview);
	$out+='" id="report-preview-file" scrolling="no" frameborder="0"></iframe>--> <iframe id="report-preview-file"></iframe> </div> ';
	}
	$out+=' <div class="report-download-bar"> <input type="hidden" value="';
	$out+=$escape(result.downloadUrl);
	$out+='" id="downloadLink"> <a href="javascript:;" class="report-download-button"> <span>下载</span> </a> </div> </div> <div class="report-related"> <h2>相关文档推荐</h2> <ul class="report-related-list"> ';
	$each(result.related,function($value,$index){
	$out+=' <li> <a href="report_detail.html?id=';
	$out+=$escape($value.document_id);
	$out+='" title="';
	$out+=$escape($value.class);
	$out+=' ';
	$out+=$escape($value.document_name);
	$out+='"> ';
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
	$out+='</p> </div> </a> </li> ';
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

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(4);
	var reminderTpl = __webpack_require__(8);

	function Reminder() {

	}

	Reminder.prototype.show = function (content, flag) {
	    var defer = $.Deferred();
	    flag = flag || 0;
	    $('body').append(reminderTpl({
	        content: content,
	        flag: flag
	    }));
	    $('#reminder-close').on('click', function (e) {
	        $(e.currentTarget).off('click');
	        $('.reminder-box').remove();
	        defer.reject();
	    });
	    if (flag) {
	        $('#reminder-cancel').on('click', function (e) {
	            $(e.currentTarget).off('click');
	            $('.reminder-box').remove();
	            defer.reject();
	        });
	    }
	    $('#reminder-confirm').on('click', function (e) {
	        $(e.currentTarget).off('click');
	        $('.reminder-box').remove();
	        defer.resolve();
	    });
	    return defer.promise();
	};

	module.exports = Reminder;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(5);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(7)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js?minimize&-autoprefixer!./reminder.css", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js?minimize&-autoprefixer!./reminder.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(6)();
	// imports


	// module
	exports.push([module.id, ".reminder-box{position:fixed;top:0;left:0;width:100%;height:100%;background-color:rgba(0,0,0,.5);z-index:5}.reminder-container{position:absolute;width:400px;top:45%;left:50%;-webkit-transform:translate(-50%,-50%);-moz-transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%);-o-transform:translate(-50%,-50%);transform:translate(-50%,-50%);padding:20px 10px 25px;border:1px solid #ccc;background-color:#fff;font-size:15px;color:#282828}.reminder-container>a{position:absolute;top:0;right:0}.reminder-container>a:before{content:'\\E901';display:block;font-family:icomoon;font-size:18px;color:#a0a0a0;padding:10px}.reminder-container>p{width:75%;margin:0 auto;padding:40px 0 25px;line-height:1.5;font-size:16px;text-align:center}.reminder-button-list{padding:15px 0;text-align:center;font-size:0}.reminder-button-list>a{display:inline-block;padding:10px 25px;background-color:#ee344a;font-size:15px;color:#fff}.reminder-button-list>a:nth-child(2){margin-left:35px}", ""]);

	// exports


/***/ },
/* 6 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(2);
	module.exports=template('pc/components/reminder/reminder',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,content=$data.content,flag=$data.flag,$out='';$out+='<div class="reminder-box"> <div class="reminder-container"> <a href="javascript:;" id="reminder-close"></a> <p class="reminder-info">';
	$out+=$escape(content);
	$out+='</p> <div class="reminder-button-list"> <a href="javascript:;" id="reminder-confirm">确认</a> ';
	if(flag){
	$out+=' <a href="javascript:;" id="reminder-cancel">取消</a> ';
	}
	$out+=' </div> </div> </div>';
	return new String($out);
	});

/***/ }
/******/ ]);