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

	var reportDownload = __webpack_require__(12);
	var reportPreview = __webpack_require__(13);
	var reportThumb = __webpack_require__(14);
	var reportMiss = __webpack_require__(15);
	var Reminder = __webpack_require__(6);

	// var test_data = {
	//     document_id: 2123,
	//     document_name: 'C课设 报告&代码',
	//     uploader: '小宝上传',
	//     institude: '13级计算机学院',
	//     class: 'C课程设计',
	//     downloads: 123,
	//     comment: 'hello',
	//     type: 'doc',
	//     preview: ['images/report-preview.png', 'images/report-preview.png', 'images/report-preview.png']
	// };
	//
	// var test_data2 = {
	//     result: {
	//         document_name: 'C课设 报告&代码',
	//         uploader: '小宝上传',
	//         institude: '13级计算机学院',
	//         class: 'C课程设计',
	//         downloads: 123,
	//         comment: 'hello',
	//         type: 'doc',
	//         preview: ['images/report-preview.png', 'images/report-preview.png', 'images/report-preview.png']
	//     }
	// };

	// setTimeout(function () {
	    // $('.report-container').append(reportThumb(test_data2));
	    // $('.report-preview-container').append(reportPreview(test_data));
	    // $('.report-download').append(reportDownload(test_data));
	    // $('.loading-icon').addClass('hide');
	// }, 1000);

	var reminder = new Reminder();
	reminder.init();

	var searchUrl = window.location.search,
	    search = '';
	if (searchUrl.indexOf('?') !== -1) {
	    search = decodeURIComponent(searchUrl.substr(1));
	}

	$('.download-btn').on('tap', function () {
	    var document_id = search.split('=')[1];
	    var url = '/download/' + document_id;
	    $('.report-download').addClass('show-download-info');
	    $.ajax({
	        url: url,
	        type: 'GET'
	    });
	});

	if (search !== '') {
	    var document_id = search.split('=')[1];
	    $.ajax({
	        url: '/document_detail/' + document_id + '/mobi',
	        type: 'GET'
	    }).done(function (data) {
	        var str = '我在"报告菌"上找到了' + data.result.document_name + ',这下不用担心了';

	        // data.result.preview = "http://localhost:3000/mobi/6633.html";

	        $('title').text(str);
	        $('.report-container').append(reportThumb(data));
	        // if (data.result.preview.length === 0) {
	        //     $('.report-preview-container').append(reportMiss());
	        // } else {
	        //     $('.report-preview-container').append(reportPreview(data.result));
	        // }
	        if (!data.result.preview) {
	            $('.report-preview-container').append(reportMiss());
	            $('.report-download').append(reportDownload(data.result));
	            $('.report-type-info').hide();
	            $('.loading-icon').addClass('hide');
	        } else {
	            $('.report-preview-container').append(reportPreview(data.result));
	            $('.report-download').append(reportDownload(data.result));
	            $('#ifr-container').on('load', function () {
	                var ifr = document.getElementById('ifr-container'),
	                    ifrDoc = ifr.contentDocument || ifr.contentWindow.document,
	                    ifrHead = ifrDoc.getElementsByTagName('head')[0],
	                    ifrStyle = document.createElement('style');
	                var container = ifrDoc.getElementById('page-container'),
	                    pf = ifrDoc.getElementById('pf1');
	                var scale = container.offsetWidth / pf.offsetWidth;

	                var u = navigator.userAgent;
	                var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
	                var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

	                var scaleTxt = "div[id^='pf']{-webkit-transform: scaleX(" + scale + ");transform:scaleX(" + scale + ");";
	                if (isAndroid) {
	                    scaleTxt += "-webkit-transform-origin: 0 0;transform-origin: 0 0";
	                }
	                scaleTxt += "}";
	                var touchTxt = "#page-container{-webkit-overflow-scrolling: touch;}";
	                ifrStyle.setAttribute('type', 'text/css');
	                ifrHead.appendChild(ifrStyle);
	                ifrStyle.innerHTML = scaleTxt + ' ' + touchTxt;

	                function toggleBtn(fun) {
	                    $('.report-type-info').forEach(function(el) {
	                        el.classList[fun]('hide');
	                    });
	                }
	                $('#ifr-container').contents().find('#page-container').on('scroll',(function() {
	                    var _scrollTop = 0;
	                    var deltaTop;
	                    return function(e) {
	                        deltaTop = e.target.scrollTop - _scrollTop;
	                        _scrollTop = e.target.scrollTop;
	                        // console.log(deltaTop);
	                        if(deltaTop > 0) {
	                            toggleBtn('add');
	                        } else {
	                            toggleBtn('remove');
	                        }
	                    };
	                })());

	                $(ifr).off('load');
	                $('.loading-icon').addClass('hide');
	            });
	        }
	    }).fail(function () {
	        // $('.loading-icon').addClass('hide');
	        reminder.show('网络连接错误，请重试');
	    });
	}


	$('#btn-fullscreen').on('touchstart', function() {
	    $('.report-preview-container').toggleClass('fullscreen');
	});

	// $('#ifr-container').on('load', function () {
	//     var ifr = document.getElementById('ifr-container'),
	//         ifrDoc = ifr.contentDocument || ifr.contentWindow.document,
	//         ifrHead = ifrDoc.getElementsByTagName('head')[0],
	//         ifrStyle = document.createElement('style');
	//     var container = ifrDoc.getElementById('page-container'),
	//         pf = ifrDoc.getElementById('pf1');
	//     var scale = container.offsetWidth / pf.offsetWidth;
	//     var text = "div[id^='pf']{-webkit-transform: scaleX(" + scale + ");transform:scaleX(" + scale + ");-webkit-transform-origin: 0 100%;transform-origin: 0 100%}";
	//     ifrStyle.setAttribute('type', 'text/css');
	//     ifrHead.appendChild(ifrStyle);
	//     ifrStyle.innerHTML = text;
	//     $(ifr).off('load');
	// });


/***/ },
/* 1 */,
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
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(7);
	var reminderTpl = __webpack_require__(11);

	function Reminder() {

	}

	function _bind($confirmBtn, $this) {
	    $confirmBtn.on('tap', function (e) {
	        $this.reminder.addClass('reminder-container-hide');
	        $this.defer.resolve();
	    });
	}

	Reminder.prototype.init = function (content) {
	    content = content || '';
	    $('body').append(reminderTpl({content: content}));
	    _bind($('#confirm-reminder'), this);
	    this.reminder = $('.reminder-container');
	    this.reminderContent = $('.reminder-content');
	};

	Reminder.prototype.show = function (content) {
	    this.defer = $.Deferred();
	    this.reminder.removeClass('reminder-container-hide');
	    this.reminderContent.text(content);
	    return this.defer.promise();
	};

	module.exports = Reminder;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(8);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js?minimize&-autoprefixer!./reminder.css", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js?minimize&-autoprefixer!./reminder.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(9)();
	// imports


	// module
	exports.push([module.id, ".reminder-container{position:absolute;top:45%;left:50%;-moz-transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%);-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);width:60%;background-color:#999;color:#fff;border-radius:15px;z-index:4}.reminder-content{font-size:16px;text-align:center;line-height:1.2;padding:.4rem}[data-dpr=\"2\"] .reminder-content{font-size:32px}[data-dpr=\"3\"] .reminder-content{font-size:48px}.reminder-control{border-top:.01333rem solid #fff}.reminder-control a{display:block;padding:.2rem 0;text-align:center;color:#fff}.reminder-container-hide{display:none}", ""]);

	// exports


/***/ },
/* 9 */
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
/* 10 */
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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(2);
	module.exports=template('mobile/tpl/modules/reminder/reminder',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,content=$data.content,$out='';$out+='<section class="reminder-container reminder-container-hide"> <p class="reminder-content">';
	$out+=$escape(content);
	$out+='</p> <div class="reminder-control"> <a href="javascript:;" id="confirm-reminder">确定</a> </div> </section>';
	return new String($out);
	});

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(2);
	module.exports=template('mobile/tpl/report-download-info',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,code=$data.code,$out='';$out+='<div class="report-download-container hide"> <p>请你在“iKnow华科”公众号回复该编号以获取下载链接，文档仅供参考。</p> <p class="report-download-id"> <span>';
	$out+=$escape(code);
	$out+='</span> </p> </div> ';
	return new String($out);
	});

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(2);
	module.exports=template('mobile/tpl/report-preview',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,type=$data.type,$each=$utils.$each,preview=$data.preview,$value=$data.$value,$index=$data.$index,$escape=$utils.$escape,$out='';if(type === 'doc' || type === 'docx'){
	$out+=' <div id="btn-type-info" class="report-type-info">Word文档预览</div> ';
	}else if(type === 'ppt' || type === 'pptx'){
	$out+=' <div id="btn-type-info" class="report-type-info">Ppt文档预览</div> ';
	}else if(type === 'pdf'){
	$out+=' <div id="btn-type-info" class="report-type-info">Pdf文档预览</div> ';
	}
	$out+='  <!--';
	$each(preview,function($value,$index){
	$out+='--> <!--<img src="';
	$out+=$escape($value);
	$out+='">--> <!--';
	});
	$out+='-->  <div class="report-preview"> <iframe src="';
	$out+=$escape(preview);
	$out+='" id="ifr-container"></iframe> </div> ';
	return new String($out);
	});

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(2);
	module.exports=template('mobile/tpl/report-preview-thumb',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,result=$data.result,$escape=$utils.$escape,$out='';if(result.type === 'doc' || result.type === 'docx'){
	$out+=' <img src="images/word.png"> ';
	}else if(result.type === 'ppt' || result.type === 'pptx'){
	$out+=' <img src="images/ppt.png"> ';
	}else if(result.type === 'pdf'){
	$out+=' <img src="images/pdf.png"> ';
	}else if(result.type === 'zip'){
	$out+=' <img src="images/zip.png"> ';
	}else if(result.type === 'rar'){
	$out+=' <img src="images/zip.png"> ';
	}
	$out+=' <div class="report-info-container"> <p class="report-name">';
	$out+=$escape(result.document_name);
	$out+='</p> <p class="report-thumb">';
	$out+=$escape(result.grade);
	$out+=' ';
	$out+=$escape(result.institute);
	$out+=' ';
	$out+=$escape(result.class);
	$out+=' ';
	$out+=$escape(result.uploader);
	$out+='</p> <p class="report-download-info"> 已有<span class="report-download-number">';
	$out+=$escape(result.downloads);
	$out+='</span>人下载 </p> </div>';
	return new String($out);
	});

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(2);
	module.exports=template('mobile/tpl/report-preview-miss','<div class="report-preview report-preview-miss"> <img src="images/report-preview-miss.png"> </div>');

/***/ }
/******/ ]);