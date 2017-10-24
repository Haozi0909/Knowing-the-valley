/**
 * 课程管理
 * Created by �� on 2017/10/22.
 */
define([
    "jquery",
    "text!tpls/courseListTpl.html",
    "art",
    "course/image"
],function($,courseListTpl,art,courseImage){

    return function(){

        $.ajax({
            url:"/api/course",
            type:"get",
            success:function(res){
                if(res.code!=200) throw new Error(res.msg);
                var courseList = art.render(courseListTpl,res);
                var $courseList = $(courseList);
                $courseList.on("click","a",function(){
                    //获取ID
                    var id = $(this).parents(".media").attr("cs_id");
                    courseImage(id);

                })

                $('.main').html($courseList);
            }
        })

    }

})
