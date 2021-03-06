var reportDownload = require('../../tpl/report-download-info.tpl');
var reportPreview = require('../../tpl/report-preview.tpl');
var reportThumb = require('../../tpl/report-preview-thumb.tpl');
var reportMiss = require('../../tpl/report-preview-miss.tpl');
var Reminder = require('./reminder');

var reminder = new Reminder();
reminder.init();

var searchUrl = window.location.search,
    search = '';
if (searchUrl.indexOf('?') !== -1) {
    search = decodeURIComponent(searchUrl.substr(1));
}

var funToggleBodyScroll = function () {
    if(document.body.scrollHeight > document.body.clientHeight) {
        document.body.className = "scrollable";
    }
}
funToggleBodyScroll();

$('.download-btn').on('tap', function () {
    $('.report-download').addClass('show-download-info');
    funToggleBodyScroll();
});

if (search !== '') {
    var document_id = search.split('=')[1];
    $.ajax({
        url: '/document_detail/' + document_id + '/mobi',
        type: 'GET'
    }).done(function (data) {
        var str = '我在"报告菌"上找到了' + data.result.document_name + ',这下不用担心了';
        $('title').text(str);

        // data.result.preview = "http://localhost:3000/mobi/810dec29-aa0c-4b8a-b2b8-4ad7bdcedd98.html";

        $('.report-container').append(reportThumb(data));
        $('.report-download').append(reportDownload(data.result));
        if (!data.result.preview) {
            $('.report-preview-container').append(reportMiss());
            $('.report-type-info').hide();
            $('.loading-icon').addClass('hide');
        } else {
            $('.report-preview-container').append(reportPreview(data.result));
            $('#ifr-container').on('load', function () {
                var ifr = document.getElementById('ifr-container'),
                    ifrDoc = ifr.contentDocument || ifr.contentWindow.document,
                    ifrHead = ifrDoc.getElementsByTagName('head')[0],
                    ifrStyle = document.createElement('style');
                var container = ifrDoc.getElementById('page-container'),
                    pf = ifrDoc.getElementById('pf1');
                var scale = container.offsetWidth / pf.offsetWidth;

                // var u = navigator.userAgent;
                // var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
                // var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
                //
                // var scaleTxt = "body{margin: 0;}div[id^='pf']{-webkit-transform: scaleX(" + scale + ");transform:scaleX(" + scale + ");";
                // if (isAndroid) {
                //     scaleTxt += "-webkit-transform-origin: 0 0;transform-origin: 0 0";
                // }
                // scaleTxt += "}";

                var scaleTxt = "div[id^='pf']{width:" + container.offsetWidth + "px;height:" + pf.offsetHeight * scale + "px}.pc{-webkit-transform: scale(" + scale + ");transform:scale(" + scale + ");}"

                var touchTxt = "#page-container{-webkit-overflow-scrolling: touch;}";
                ifrStyle.setAttribute('type', 'text/css');
                ifrHead.appendChild(ifrStyle);
                ifrStyle.innerHTML = scaleTxt + ' ' + touchTxt;

                function toggleBtn(fun) {
                    $('.report-type-info').forEach(function(el) {
                        el.classList[fun]('hide');
                    });
                }
                $(container).on('scroll',(function() {
                    var _scrollTop = 0;
                    var deltaTop;
                    return function(e) {
                        deltaTop = e.target.scrollTop - _scrollTop;
                        _scrollTop = e.target.scrollTop;
                        // console.log(deltaTop);
                        if(deltaTop > 4) {
                            toggleBtn('add');
                        } else if(deltaTop < 0) {
                            toggleBtn('remove');
                        }
                    };
                })());

                $(ifr).off('load');
                $('.loading-icon').addClass('hide');
                funToggleBodyScroll();
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
