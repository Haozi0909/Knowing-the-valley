/**
 * 添加分类模块
 * Created by �� on 2017/10/21.
 */
define([
    "jquery",
    "text!tpls/categoryAddTpl.html",
    "art"

], function ($,categoryAddTpl, art) {


    return function () {

        $.ajax({
            url: "api/category/top",
            type: "get",
            success: function (res) {
                if (res.code!=200) throw new Error(res.msg);

                //将顶级分类的数据提前预置到数据中（我在模板写了）
                //res.result.unshift({cg_id:0,cg_name:"顶级分类"})；

                //把数据编译到模板
                var categoryAdd = art.render(categoryAddTpl, res);
                //console.log(categoryAdd);
                var $categoryAdd = $(categoryAdd).on('hidden.ba.modal', function () {
                    //移除模态框容器，这个方法是在模态框隐藏之后执行的
                    $categoryAdd.remove();

                })
                    //给表单绑定submit事件，并阻止提交默认行为
                    .on("submit", "form", function (e) {
                        e.preventDefault();
                        //获取表单数据
                        var fromData = $(this).serialize();

                        //ajax请求
                        $.ajax({
                            url:"/api/category/add",
                            type:"post",
                            data:fromData,
                            success:function(res){
                                if(res.code!=200) throw new Error(res.msg);
                                //隐藏模态框
                                $categoryAdd.modal("hide");

                                //模拟点击课程分类按钮-->从而实现刷新分类列表
                                $(".list-group a[v=category]").trigger("click");
                            }
                        })

                    })
                     .appendTo('body').modal();//以模态框的形显示出来

            }
        })


    }
})
