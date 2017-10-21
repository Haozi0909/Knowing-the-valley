/**
 * ��ʦģ��
 * Created by �� on 2017/10/18.
 */

define(["jquery",
    "text!tpls/teacherListTpl.html",
    "art",
    "teacher/show",
    "teacher/add",
    "teacher/edit",
    "teacher/status"
], function ($, teacherListTpl, art, teacherShow, teacherAdd, teacherEdit,teacherStatus) {

    return function () {

        //完成渲染讲师列表的功能？
        //-->把整个页面拼接出来？
        //  -->也就是把页面结构+页面数据整合在一起
        //      -->1、页面结构：模板引擎
        //      -->2、数据：ajax请求

        $(".main").html(teacherListTpl);

        $.ajax({
            url: "/api/teacher",
            type: "get",
            success: function (res) {
                //如果请求失败就输出res.msg并return
                if (res.code != 200) return console.log(res.msg);

                //请求成功，就执行一下代码，用一个变量来接收返回值
                var result = res.result;

                //获取真实内容，把数据编译到模板中，
                var html = art.render(teacherListTpl, {r: result});

                //console.log(html);

                //把内容编译到页面上
                //$(".main").html(html);

                //把模板转换成JQ对象，然后再绑定点击事件，避免类名冲突
                var $panel = $(html);
                $panel.on("click", ".btn-show", function () {

                    //在这里点击的时候，就可以获取到tc_id
                    var tc_id = $(this).parent().attr('tc_id');
                    //把ID作为实参传给形参
                    teacherShow(tc_id);

                })
                    //添加讲师
                    .on("click", ".btn-add", function () {
                        //alert("你点击了");

                        //给添加讲师绑定点击事件
                        teacherAdd();

                    })
                    //编辑讲师
                    .on("click", ".btn-edit", function () {
                        //alert("你点击了编辑讲师");

                        var tc_id = $(this).parent().attr('tc_id');
                        //console.log(tc_id);
                        teacherEdit(tc_id);

                    })
                    //禁用启用
                    .on("click",".btn-status",function(){
                        //用诶变量保存一下当前的按钮，也就是当前的this
                        var $btn = $(this);

                        //获取 tc_id
                        var tc_id = $(this).parent().attr("tc_id");
                        //获取 tc_status
                        var tc_status = $(this).parent().attr("tc_status");

                        teacherStatus(tc_id,tc_status,function(status){
                            //这个形参status就接受了callback的实参

                            //把修改页面数据的过程放在这个位置

                            //要修改的其实用户最初点击注销-启用按钮所在的那一行数据

                            //1、修改状态列文本
                            $btn.parent().siblings(".zt_status").text(status==0?"启用":"注销");

                            //2、修改按钮文本
                            $btn.text(status==0?"注销":"启用");

                            //c、每次点击，也要把返回来的值给 tc_status 属性设置上，要不然只有第一次有变化
                            $btn.parent().attr("tc_status",status);

                        });


                    });

                $(".main").html($panel);

            }
        });
    }
})
