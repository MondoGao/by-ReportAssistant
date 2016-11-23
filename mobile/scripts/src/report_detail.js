var reportDownload = require('../../tpl/report-download-info.tpl');
var reportPreview = require('../../tpl/report-preview.tpl');
var reportThumb = require('../../tpl/report-preview-thumb.tpl');
var reportMiss = require('../../tpl/report-preview-miss.tpl');
var Reminder = require('./reminder');

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
        // console.log(data.result);

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
                var scaleTxt = "div[id^='pf']{-webkit-transform: scaleX(" + scale + ");transform:scaleX(" + scale + ")}";
                // var scaleTxt = "div[id^='pf']{-webkit-transform: scaleX(" + scale + ");transform:scaleX(" + scale + ");-webkit-transform-origin: 0 100%;transform-origin: 0 100%}";
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
