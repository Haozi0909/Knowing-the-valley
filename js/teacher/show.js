/**查看讲师模块
 * Created by �� on 2017/10/18.
 */
define([
    "jquery",
    "text!tpls/teacherShowTpl.html",
    "art"
], function ($,teacherShowTpl,art) {

    return function (id) {
        //console.log(id);
        //console.log(teacherShowTpl);
        $.ajax({
            url:"/api/teacher/view",
            type:"get",
            data:{
                tc_id:id
            },
            success:function(res){
                if(res.code!=200) throw new Error(res.msg);

                //获取成功，就把数据编译到模板中去，需要依赖 art 来编译
                var html=art.render(teacherShowTpl,res.result);
                console.log(html);

                //console.log(html);
                //把模板添加到页面上
                var $html = $(html).on("hidden.bs.model",function(){
                    //备注：bootstrap中给模态框绑定hidden.bs.modal事件，该事件会在模态框隐藏之后触发
                    //触发后删除模态框
                    $html.remove();
                }).appendTo("body").modal();



            }

        })
    }
})