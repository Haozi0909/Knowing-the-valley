/**
 * 课程分类==》编辑模块
 * Created by �� on 2017/10/22.
 */
define([
    "jquery",
    "text!tpls/categoryEditTpl.html",
    "art"
], function ($, categoryEditTpl, art) {

    return function (id) {

        $.ajax({
            url: "/api/category/edit",
            type: "get",
            data: {cg_id: id},
            success: function (res) {
                if (res.code != 200) throw new Error(res.msg);

                //把顶级分类数据预置到数组中
                res.result.top.unshift({cg_id: 0, cg_name: "顶级分类"});

                //编译模板
                var categoryEdit = art.render(categoryEditTpl, res.result);

                var $categoryEdit = $(categoryEdit);
                $categoryEdit.on("hidden.bs.modal", function () {
                    $categoryEdit.remove();
                })
                    //绑定submit事件，阻止提交表单默认刷新行为
                    .on('submit', "form", function (e) {
                        e.preventDefault();
                        //获取表单数据
                        var formData = $(this).serialize();

                        //通过ajax把数据提交到服务器
                        $.ajax({
                            url: "/api/category/modify",
                            type: "post",
                            data: formData,
                            success: function (res) {
                                if (res.code != 200) throw new Error(res.msg);

                                //关闭模态框
                                $categoryEdit.modal("hide");

                                //提交后默认点数课程分类按钮==》相当于是刷新
                                $(".list-group a[v=category]").trigger("click");
                            }
                        })


                    }).appendTo("body").modal();
            }
        })

    }
})