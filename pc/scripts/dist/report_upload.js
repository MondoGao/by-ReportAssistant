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
/***/ function(module, exports) {

	var UPLOADFILES = {
	    errorInfo: {
	        inputNotEmpty: '输入不能为空'
	    },
	    formkey: {
	        filename: 'name',
	        courcename: 'docClass',
	        'academy-select': 'institute',
	        'grade-select': 'grade',
	        nickname: 'uploader',
	        'file-short-info': 'desc'
	    },
	    mimeList: ['doc', 'docx', 'ppt', 'pptx', 'pdf', 'zip', 'rar'],
	    form: {}
	};

	//跳转到搜索页
	function linkTosearch(searchInput) {
	    if (!!searchInput) {
	        window.open('report_search.html?search=' + encodeURIComponent(searchInput), 'search_window');
	    }
	}

	//输入item错误提示
	function inputErrorHandle(e) {
	    var parent = $(e.target).parent(),
	        error = $(e.target).next(),
	        input = $(e.target).val();
	    if ($(e.target).attr('id') !== 'file-short-info' && input === '') {
	        error.text(UPLOADFILES.errorInfo.inputNotEmpty);
	        parent.addClass('show-error-info');
	    }
	}

	function inputErrorDeal(parent, form) {
	    var error = parent.find('p'),
	        inputItem = parent.find('.input-content'),
	        id = inputItem.attr('id'),
	        input = (inputItem.hasClass('current-selected')) ? inputItem.attr('value') : inputItem.val();
	    if (id !== 'file-short-info' && input === '') {
	        error.text(UPLOADFILES.errorInfo.inputNotEmpty);
	        parent.addClass('show-error-info');
	        return true;
	    } else {
	        form[UPLOADFILES.formkey[id]] = input;
	        return false;
	    }
	}

	//输入item错误提示重置
	function inputErrorReset(e) {
	    var parent = $(e.target).parent();
	    if (parent.hasClass('show-error-info')) {
	        parent.removeClass('show-error-info');
	    }
	}

	//生成formData表单
	function createformData(formdata) {
	    var form = new FormData();
	    for (var i in formdata) {
	        form.append(i, formdata[i]);
	    }
	    return form;
	}

	//上传文件操作
	function uploadReport(e) {
	    var file = e.target.files[0],
	        filename = file.name,
	        mimetype = filename.toLowerCase().substr(filename.lastIndexOf('.') + 1);
	    if ($.inArray(mimetype, UPLOADFILES.mimeList) === -1) {
	        alert('不支持该文件类型，请上传合适格式文件');
	    } else {
	        UPLOADFILES.form.file = file;
	        UPLOADFILES.form.postfix = mimetype;
	        $('.add-file-container').removeClass('show');
	        $('.upload-file-form').addClass('show');
	        $('.progress-point').eq(0).removeClass('progress-point-show');
	        $('.progress-point').eq(1).addClass('progress-point-show');
	    }
	}

	//展开自定义下拉框
	function toggleSelect(e) {
	    var selectOptions = $(e.currentTarget).next(),
	        parent = $(e.currentTarget).parent().parent();
	    if (parent.hasClass('show-error-info')) {
	        parent.removeClass('show-error-info');
	    }
	    if (selectOptions.hasClass('hide')) {
	        selectOptions.removeClass('hide');
	    } else {
	        selectOptions.addClass('hide');
	    }
	}

	//进度上传处理
	function progressHandle(e) {
	    if(e.lengthComputable) {
	        var percent = e.loaded / e.total * 100;
	        console.log(percent);
	        $('.progress-bar').text(percent.toFixed(2) + '%');
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

	$('.upload-file').on('click', function () {
	    window.location.reload();
	});

	$('#continue-upload').on('click', function () {
	    window.location.reload();
	});

	$('#upload-file-input').on('change', uploadReport);

	$('.select-options').mCustomScrollbar({
	    axis: "y",
	    theme: "minimal-dark",
	    scrollbarPosition: 'inside'
	});

	$('#academy-select').on('click', toggleSelect);

	$('#grade-select').on('click', toggleSelect);

	$('#academy-select').next().on('click', 'li', function (e) {
	    var choose = $(this).text(),
	        currentInput = $('#academy-select');
	    currentInput.attr('value', choose).children('span').text(choose);
	    currentInput.next().addClass('hide');
	});

	$('#grade-select').next().on('click', 'li', function (e) {
	    var choose = $(this).text(),
	        currentInput = $('#grade-select');
	    currentInput.attr('value', choose).children('span').text(choose);
	    currentInput.next().addClass('hide');
	});

	$('#filename').on('focus', inputErrorReset).on('blur', inputErrorHandle);

	$('#courcename').on('focus', inputErrorReset).on('blur', inputErrorHandle);

	$('#nickname').on('focus', inputErrorReset).on('blur', inputErrorHandle);

	$('#file-short-info').on('focus', inputErrorReset).on('blur', inputErrorHandle);

	$('.upload-file-button').on('click', function (e) {
	    var $this = $(e.target),
	        errorList = $('.file-input-item'),
	        errorFlag = 0;
	    if (parseInt($this.attr('uploading'))) {
	        return;
	    }
	    $this.attr('uploading', 1).addClass('uploading');
	    errorList.each(function () {
	        if ($(this).hasClass('show-error-info')) {
	            errorFlag = 1;
	        } else if (inputErrorDeal($(this), UPLOADFILES.form)) {
	            errorFlag = 1;
	        }
	    });
	    if (errorFlag) {
	        $this.attr('uploading', 0).removeClass('uploading');
	    } else {
	        var formData = createformData(UPLOADFILES.form);
	        $('.loading-container').removeClass('hide');
	        $('.container').addClass('container-fade');
	        $.ajax({
	            url: '/upload',
	            type: 'POST',
	            data: formData,
	            processData: false,
	            contentType: false,
	            xhr: function () {
	                var xhr = $.ajaxSettings.xhr();
	                if (xhr.upload) {
	                    xhr.upload.addEventListener('progress', progressHandle, false);
	                    return xhr;
	                }
	            }
	        }).done(function (data) {
	            $('#preview-upload').attr({
	                href: 'report_detail.html?id=' + data.result,
	                target: 'preview_window'
	            });
	            $('.loading-container').addClass('hide');
	            $('.container').removeClass('container-fade');
	            $('.upload-file-form').removeClass('show');
	            $('.upload-success-container').addClass('show');
	            $('.progress-point').eq(1).removeClass('progress-point-show');
	            $('.progress-point').eq(2).addClass('progress-point-show');
	        }).fail(function () {
	            alert('上传失败，请重试');
	            $this.attr('uploading', 0).removeClass('uploading');
	            $('#upload-file-input').remove();
	            $('.upload-file-component').append('<input type="file" id="upload-file-input">');
	            $('#upload-file-input').on('change', uploadReport);
	            $('.loading-container').addClass('hide');
	            $('.container').removeClass('container-fade');
	            $('.upload-file-form').removeClass('show');
	            $('.add-file-container').addClass('show');
	            $('.progress-point').eq(1).removeClass('progress-point-show');
	            $('.progress-point').eq(0).addClass('progress-point-show');
	        });
	    }
	});

/***/ }
/******/ ]);