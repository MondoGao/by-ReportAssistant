var reportPreview = require('../../tpl/report_content.html');

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
            $.ajax({
                url: $('#downloadLink').val(),
                type: 'GET'
            }).done(function (data) {
                if (data.code === -1) {
                    alert('该文档无法下载，请下载其他文档');
                } else {
                    $("body").append("<iframe src='" + $('#downloadLink').val() +"' style='display: none;' ></iframe>");
                }
            }).fail(function () {
                alert('该文档无法下载，请下载其他文档');
            });
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
            if(containerW > docWidth) {
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

