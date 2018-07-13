/*
 *
 *  * Copyright (c) 2018. For DMSoft Group.
 *
 */

var menuBar = function () {
    var links = {
        // '#indexManagementMenu': '/index',
        // '#advertisementManagementMenu': '/views/profit/profitShow',
        '#staffManagementMenu': '/staff/list ',
        '#changePasswordMenu': '/views/changePassword'
    };
    return {
        init: function (parentId, id) {
            $(".collapse").collapse();
            for (var key in links) {
                $(key).on('click', function (key) {
                    window.location.href = links["#" + key.currentTarget.id]
                });
                $(key + " a").attr('href', links[key]);
            }
            $(parentId + " a").css('font-weight', 'bold');
            $(parentId + " a").css('color', '#222222');
            $(parentId).css('background-color', '#ffc814');
            if (id) {
                $(id + " a").css('font-weight', 'bold');
                $(id + " a").css('color', '#222222');
            }
        }
    }
};
function importCsv(){
    var formData = new FormData();
    var name = $("#upfile").val();
    formData.append("file",$("#upfile")[0].files[0]);
    formData.append("name",name);
    $.ajax({
        url :"/index",
        type : 'POST',
        async : false ,
        data : "json",
        processData : false,
        beforeSend:function () {
            console.log("正在进行，亲稍等");
        }

    });
}
