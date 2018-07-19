var staffs = function () {
    var dt_staffList;
    // var startTimeValue;
    // var endTimeValue;
    return {
        init: function () {
            staffs.runDataTables();
        },
        // getSearchCondition: function () {
        // var searchParam = {
        // 'search_LIKE_orderSN': $('#orderSN').val(),
        // 'search_EQ_boxCode': $('#selectedBoxName').val(),
        // 'search_LIKE_userName': $('#userName').val(),
        // 'search_LIKE_tradeNumber': $('#tradeNumber').val(),
        // 'search_EQ_orderStatus': $('#selectedOrderStatus').val(),
        // 'search_GTE_createTime': startTimeValue,
        // 'search_LTE_createTime': endTimeValue

        // };
        // return searchParam;
        // },
        runDataTables: function () {
            // var customParams = function (params) {
            //     var searchParam = staffs.getSearchCondition();
            //     $.extend(params, searchParam);
            //     params['draw'] = params.draw;
            //     var columns = params.columns;
            //     var staff = params.staff;
            //     if (staff != null && columns != null) {
            //         for (var i = 0; i < staff.length; i++) {
            //             var index = staff[i].column;
            //             var key = columns[index].data;
            //             staff[i].column = key;
            //         }
            //         params['staff'] = JSON.stringify(order);
            //     }
            //     return params;
            // };

            dt_staffList = $("#dt_StaffList").DataTable({
                //"paging": true,
                // "iDisplayLength": 5, //默认每页数量
                //"bPaginate": true, //翻页功能
                //"bLengthChange": true, //改变每页显示数据数量
                //"bFilter": true, //过滤功能
                //"bSort": true, //排序功能
                //"bInfo": true, //页脚信息
                // "bAutoWidth": true, //自动宽度
                // "bRetrieve": true,
                //"serverSide" : true,//服务器端进行分页处理的意思
                //"bPaginate": true,
                //   //"bProcessing": true
                "sDom": 't<"bottom"flp><"clear">',
                //   "processing": true,
                //  "serverSide": true,
                //   "destroy": true,
                //   "retrieve":true,
                "ajax": {
                    "url": '/user/all',
                    "type": "POST",
                    // "data":{"message":"DM12345"},
                    "dataSrc": function (data) {
                        return data;
                    },
                    "error": function (e) {
                        console.log(e.status + "  :status");
                        if (e.status == 401 || e.status == 500 || e.status == 404) {
                        }
                    }
                },
                "columns": [
                    {"data": "id"},
                    {"data": "code"},
                    {"data": "loginName"},
                    {"data": "name"},
                    {"data":"salt"},
                    {"data": "password"},
                    {"data": "email"},
                ],
                "columnDefs": [
                    {
                        "render": function ( data, type, row ) {
                            return "<input type='radio' name='onDutyToId'  value='" + data + "'>";
                        },
                        "targets": 0 //指定渲染列：第一列(渲染第一列为单选框，data自动匹配为  {"data":"id"}中数据）
                    },
                ],
                "oLanguage" : { // 国际化配置
                    "sProcessing" : "正在获取数据，请稍后...",
                    "sLengthMenu" : "显示 _MENU_ 条",
                    "sZeroRecords" : "没有找到数据",
                    "sInfo" : "从 _START_ 到  _END_ 条记录 总记录数为 _TOTAL_ 条",
                    "sInfoEmpty" : "记录数为0",
                    "sInfoFiltered" : "(全部记录数 _MAX_ 条)",
                    "sInfoPostFix" : "",
                    "sSearch" : "查询",
                    "sUrl" : "",
                    "oPaginate" : {
                        "sFirst" : "第一页",
                        "sPrevious" : "上一页",
                        "sNext" : "下一页",
                        "sLast" : "最后一页"
                    }

                },
                getAjaxPagingOptions : function(settings) {
                    var options = {
                        ajax : {
                            url : settings.ajaxUrl,
                            type : "post"
                        },
                        serverSide : true,
                        destroy : true,
                        processing : true,
                        ordering : true,
                        searching : false,
                        paging : true,
                        pagingType : "full_numbers",
                        lengthMenu : [5, 10, 15, 20 ],
                        pageLength :5,
                        order : settings.order,// [index,'asc|desc']
                        // language : DataTablePaging.language.zh_cn,
                        columns : settings.colums,
                        columnDefs : settings.columsdefs,
                    };
                },
            });
        }
    };

}();

$(function () {
    $("#change").click(function(){
        var val = $('input:radio[name="onDutyToId"]:checked').val();
        if(val==null){
            alert("什么都没有选中");
            return false;
        }
        else {
            $.ajax({
                url : "/user/print",
                type : "post",
                data : {"id":val},
                dataType : "json",
                success: function(data){
                    $('#id').val(data.id);
                    $('#code').val(data.code);
                    $('#loginName').val(data.loginName);
                    $('#name').val( data.name);
                    $('#salt').val(data.salt);
                    $('#password').val(data.password);
                    $('#email').val(data.email);

                },
                error: function () {
                    alert("error");
                }
            });

            var doc=document;
            var Back=doc.getElementById('black'),
                DialogBox=doc.getElementById('change_dialogBox'),
                DialogClose=DialogBox.getElementsByClassName('dialog_close')[0];
            //显示遮罩层
            Back.style.display='block';
            //显示弹出窗口
            DialogBox.style.display='block';
            DialogClose.onclick=function () {
                //隐藏遮罩层
                Back.style.display='none';
                //显示弹出窗口
                DialogBox.style.display='none';
            }
            Back.onclick=function () {
                //隐藏遮罩层
                Back.style.display='none';
                //显示弹出窗口
                DialogBox.style.display='none';
            }
        }
    })
});


function modify(){
    var id = $("#id").val();
    var code = $("#code").val();
    var loginName = $("#loginName").val();
    var name = $("#name").val();
    var salt = $("#salt").val();
    var password = $("#password").val();
    var email = $("#email").val();
    $.ajax({
        type : "get",
        url : "/user/updateUser",
        data :{"id": id,"code": code,"loginName":loginName,"name":name,"salt":salt,"password":password,"email":email},
        async: false,
        success : function (data) {
            alert("修改成功");
            window.parent.location.reload();
            parent.layer.closeAll('dialogBox');
        },
        error : function () {
            alert("修改失败");
        }
    });
}

$(function () {
    $("#delete").click(function(){
        var val = $('input:radio[name="onDutyToId"]:checked').val();
        if(val == null){
            alert ("请选中要删除的用户");
        }
        else{
            $.ajax({
                url : "/user/deleteOne",
                type : "post",
                data : {"id":val},
                success : function () {
                    alert ("删除成功");
                    window.parent.location.reload();
                },
                error : function () {
                    alert ("删除失败");
                }
            });
        }
    });
});

$(function(){
    $("#create").click(function () {
        var doc=document;
        var Back=doc.getElementById('black'),
            DialogBox=doc.getElementById('new_dialogBox'),
            DialogClose=DialogBox.getElementsByClassName('dialog_close')[0];
        //显示遮罩层
        Back.style.display='block';
        //显示弹出窗口
        DialogBox.style.display='block';
        DialogClose.onclick=function () {
            //隐藏遮罩层
            Back.style.display='none';
            //显示弹出窗口
            DialogBox.style.display='none';
        }
        Back.onclick=function () {
            //隐藏遮罩层
            Back.style.display='none';
            //显示弹出窗口
            DialogBox.style.display='none';
        }
    })
});

function insertUser() {
    var code = $("#new_code").val();
    var loginName = $("#new_loginName").val();
    var name = $("#new_name").val();
    var salt = $("#new_salt").val();
    var password = $("#new_password").val();
    var email = $("#new_email").val();
    $.ajax({
        url : "/user/insertUser",
        type :"post",
        data : {
            "code" : code,
            "loginName" : loginName,
            "name" : name,
            "salt" : salt,
            "password" : password,
            "email" : email,
        },
        success : function () {
          alert ("创建新用户成功");
        },
        error : function () {
            alert ("创建新用户失败");
        }
    });
}

