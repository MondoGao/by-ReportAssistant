var searchResult = require('../../tpl/search-result.tpl');
var loadMore = require('../../tpl/load-more.tpl');
var endLine = require('../../tpl/end-line.tpl');
var notFound = require('../../tpl/not-found-report.tpl');
var Reminder = require('./reminder');

var pageBegin = 0;
var itemCount = 10;
var mainFlag = 1;
var searchInfo = '';

function loadMoreReport() {
    var $this = $('.load-more-report');
    if (parseInt($this.attr('disabled')) === 1) {
        return;
    } else {
        $this.attr('disabled', 1);
        $this.text('努力加载中...');
        // setTimeout(function () {
        //     $this.remove();
        //     $('.result-item-container').append(searchResult(test_data));
        //     $('.result-item-container').append(loadMore());
        //     $('.load-more-report').on('click', loadMoreReport);
        // }, 500);
        if (mainFlag === 1) {
            $.ajax({
                url: '/main_page',
                type: 'POST',
                data: {
                    begin: pageBegin,
                    count: itemCount
                }
            }).done(function (data) {
                $this.remove();
                if (data.result.length === 0) {
                    $('.result-item-container').append(endLine());
                } else if (data.result.length < itemCount) {
                    $('.result-item-container').append(searchResult(data));
                    jumpDetail(false);
                    $('.result-item-container').append(endLine());
                } else {
                    pageBegin += itemCount;
                    $('.result-item-container').append(searchResult(data));
                    jumpDetail(false);
                    $('.result-item-container').append(loadMore());
                    $('.result-container').attr('disabled', 0);
                    // $('.load-more-report').on('click', loadMoreReport);
                }
            }).fail(function () {
                $('.loading-icon').addClass('hide');
                reminder.show('加载失败，请重试');
                $this.attr('disabled', 0);
                $('.result-container').attr('disabled', 0);
                // $this.text('点击加载更多报告');
            });
        } else {
            $.ajax({
                url: '/search',
                type: 'POST',
                data: {
                    keyword: searchInfo,
                    begin: pageBegin,
                    count: itemCount
                }
            }).done(function (data) {
                $this.remove();
                if (data.result.length === 0) {
                    $('.result-item-container').append(endLine());
                } else if (data.result.length < itemCount) {
                    $('.result-item-container').append(searchResult(data));
                    jumpDetail(false);
                    $('.result-item-container').append(endLine());
                } else {
                    pageBegin += itemCount;
                    $('.result-item-container').append(searchResult(data));
                    jumpDetail(false);
                    $('.result-item-container').append(loadMore());
                    $('.result-container').attr('disabled', 0);
                    // $('.load-more-report').on('click', loadMoreReport);
                }
            }).fail(function () {
                $('.loading-icon').addClass('hide');
                reminder.show('加载失败，请重试');
                $this.attr('disabled', 0);
                $('.result-container').attr('disabled', 0);
                // $this.text('点击加载更多报告');
            });
        }
    }
}

function jumpDetail(flag) {
    if (flag) {
        $('.result-item').on('tap', function (e) {
            var inputElem = $(e.currentTarget).children('input'),
                document_id = $(inputElem).val();
            var url = "./report_detail.html?";
            document_id = encodeURIComponent(document_id);
            url = url + 'document_id=' + document_id;
            window.location.href = url;
        });
    } else {
        $('.result-item').off('tap').on('tap', function (e) {
            var inputElem = $(e.currentTarget).children('input'),
                document_id = $(inputElem).val();
            var url = "./report_detail.html?";
            document_id = encodeURIComponent(document_id);
            url = url + 'document_id=' + document_id;
            window.location.href = url;
        });
    }
}

var attachFastClick = Origami.fastclick;
attachFastClick(document.body);
$('#search-input').on('focus', function () {
    $('.search').addClass('show-cancel-btn');
    // $('.mask-layer').removeClass('hide');
});

var reminder = new Reminder();
reminder.init();

$('#search-input').on('blur', function () {
    $('.search').removeClass('show-cancel-btn');
});

$('#search-input').on('keyup', function (e) {
    if (e.keyCode === 13) {
        // $('.result-item-container').empty();
        // $('.load-more-container').remove();
        // $('.loading-icon').removeClass('hide');
        // setTimeout(function () {
        //     $('.result-item-container').append(searchResult(test_data));
        //     $('.result-item-container').append(loadMore());
        //     $('.load-more-report').on('click', loadMoreReport);
        //     $('.loading-icon').addClass('hide');
        // }, 500);
        var searchContent = $(e.target).val();
        if (!searchContent) {
            return;
        }
        searchInfo = searchContent;
        $('.loading-icon').removeClass('hide');
        var pageBeginbak = pageBegin,
            mainFlagbak = mainFlag;
        pageBegin = 0;
        mainFlag = 0;
        $.ajax({
            url: '/search',
            type: 'POST',
            data: {
                keyword: searchContent,
                begin: pageBegin,
                count: itemCount
            }
        }).done(function (data) {
            $('.loading-icon').addClass('hide');
            $('.result-item-container').empty();
            if (data.result.length === 0) {
                // $('.result-item-container').append(endLine());
                $('.result-item-container').append(notFound());
            } else if (data.result.length < itemCount) {
                $('.result-item-container').append(searchResult(data));
                jumpDetail(true);
                $('.result-item-container').append(endLine());
            } else {
                pageBegin += itemCount;
                $('.result-item-container').append(searchResult(data));
                jumpDetail(true);
                $('.result-item-container').append(loadMore());
                $('.result-container').attr('disabled', 0);
                // $('.load-more-report').on('click', loadMoreReport);
            }
        }).fail(function () {
            $('.loading-icon').addClass('hide');
            reminder.show('网络连接错误，请重试');
            pageBegin = pageBeginbak;
            mainFlag = mainFlagbak;
        });
    }
});

$('.cancel-btn').on('click', function (e) {
    e.preventDefault();
    $('#search-input').val('').blur();
    $('.search').removeClass('show-cancel-btn');
});

// $('.result-item-container').append(searchResult(test_data));
// $('.result-item-container').append(loadMore());

$.ajax({
    url: '/main_page',
    type: 'POST',
    data: {
        begin: pageBegin,
        count: itemCount
    }
}).done(function (data) {
    $('.loading-icon').addClass('hide');
    if (data.result.length === 0) {
        // $('.result-item-container').append(endLine());
        $('.not-found-report').removeClass('hide');
    } else if (data.result.length < itemCount) {
        $('.result-item-container').append(searchResult(data));
        jumpDetail(true);
        $('.result-item-container').append(endLine());
    } else {
        pageBegin += itemCount;
        $('.result-item-container').append(searchResult(data));
        jumpDetail(true);
        $('.result-item-container').append(loadMore());
        $('.result-container').attr('disabled', 0);
        // $('.load-more-report').on('click', loadMoreReport);
    }
}).fail(function (xhr, errorType, error) {
    $('.loading-icon').addClass('hide');
    reminder.show('网络连接错误，请重试');
});

$('.result-container').on('scroll', function (e) {
    if (parseInt($(e.target).attr('disabled')) === 1) {
        return;
    }
    var $this = $('.result-item-container'),
        containerH = $(e.currentTarget).height(),
        itemsH = $this.height(),
        itemsOffsetH = Math.abs($this.position().top);
    var diffH = 150;
    if (itemsH - itemsOffsetH - containerH < diffH) {
        $(e.target).attr('disabled', 1);
        loadMoreReport();
        console.log(1);
    }
});

// jumpDetail();

// $('.load-more-report').on('click', loadMoreReport);
