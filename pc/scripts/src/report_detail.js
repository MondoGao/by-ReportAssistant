var reportPreview = require('../../tpl/report_content.html');

var searchUrl = window.location.search,
    search = '';
if (searchUrl.indexOf('?') !== -1) {
    search = decodeURIComponent(searchUrl.substr(1));
}

$('#search-input').on('keypress', function (e) {
    var keycode = e.which,
        $this = $(e.currentTarget);
    if (keycode === 13) {
        if (!!$this.val()) {
            window.open('report_search.html?search=' + encodeURIComponent($this.val()));
        }
    }
});

$('.search-submit').on('click', function () {
    var $this = $('#search-input');
    if (!!$this.val()) {
        window.open('report_search.html?search=' + encodeURIComponent($this.val()));
    }
});

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
        if(!data.result.preview) {
            return;
        }
        $('#report-preview-file').attr('src', data.result.preview);
        // $('#report-preview-file').attr('src', 'test2.html');
        $('#report-preview-file').on('load', function () {
            var ifr = document.getElementById('report-preview-file'),
                ifrDoc = ifr.contentDocument || ifr.contentWindow.document,
                ifrHead = ifrDoc.getElementsByTagName('head')[0],
                ifrStyle = document.createElement('style');
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
            var containerW = $(ifr).width(),
                ifrPW = ifrP[0].offsetWidth;
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

