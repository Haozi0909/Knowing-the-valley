/**
 * 编辑讲师
 * Created by 浩 on 2017/10/19.
 */
define([
    "jquery",
    "text!tpls/teacherEditTpl.html",
    "art"
], function ($, teacherEditTpl, art) {

    return function (id) {
        // 用ajax请求数据,然后把数据渲染到页面上
        $.ajax({
            url: "/api/teacher/edit",
            type: "get",
            data: {
                tc_id: id
            },
            success: function (res) {
                if (res.code !== 200) throw new Error(res.msg);

                var teacherEdit = art.render(teacherEditTpl, res.result);
                var $teacherEdit = $(teacherEdit);

                $teacherEdit.on("hidden.bs.modal",function(){
                    //移除模态框容器
                    $teacherEdit.remove();

                }).on("submit", "form", function (e) {

                    //阻止默认刷新表单
                    e.preventDefault();

                    //获取表单资料
                    var formData = $(this).serialize();

                    //ajax请求提交数据
                    $.ajax({
                        url: "/api/teacher/update",
                        type: "post",
                        data: formData,
                        success: function (res) {
                            if (res.code!=200) throw new Error(res.msg);

                            //隐藏模态框
                            $teacherEdit.modal("hide");

                            //默认点击刷新讲师列表
                            $(".list-group a[v=teacher]").trigger("click");

                        }
                    })
                    //把修改的数据渲染在页面上
                }).appendTo("body").modal();


            }
        })

    }
})