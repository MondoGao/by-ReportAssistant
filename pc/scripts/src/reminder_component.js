require('../../components/reminder/reminder.css');
var reminderTpl = require('../../components/reminder/reminder.tpl');

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