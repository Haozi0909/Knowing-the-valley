/**
 * 课件分类
 * Created by �� on 2017/10/21.
 */
define([
    "jquery",
    "text!tpls/categoryListTpl.html",
    "art",
    "category/add",
    "category/edit"
],function($,categoryListTpl,art,categoryAdd,categoryEdit){


    return function(){

        //ajax请求数据
        $.ajax({
            url:"/api/category",
            type:"get",
            success:function(res){

                if(res.code!=200) throw new Error(res.msg);

                //编译模板
                var categoryList = art.render(categoryListTpl,res);

                //DOM对象转换为JQ对象，进行事件委托
                var $categoryListTpl = $(categoryList);

                //添加分类
                $categoryListTpl.on("click",".btn-add",function(){
                    categoryAdd();

                })
                 //添加编辑
                 .on('click',".btn-edit",function(){
                        //获取分类ID
                    var cg_id = $(this).parent().attr("cg_id");
                    categoryEdit(cg_id);


                })

                //把编译好的模板渲染到页面main上
                $('.main').html($categoryListTpl);


            }

        })

    }

})