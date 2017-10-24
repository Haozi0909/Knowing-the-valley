/**
 * 课程图片模块
 * Created by �� on 2017/10/23.
 */
define([
    "jquery",
    "text!tpls/courseImageTpl.html",
    "art"
], function ($, courseImageTpl, art) {

    return function (id) {
        //ajax发送请求
        $.ajax({
            url: "/api/course/picture",
            type: "get",
            data: {
                cs_id: id
            },
            success: function (res) {
                if (res.code != 200) throw Error(res.msg);
                var courseImage = art.render(courseImageTpl, res.result);
                var $courseImage = $(courseImage);

                //把编译出来的模板添加到页面指定位置上
                $(".main").html($courseImage);

                //把模板添加到页面上之后，再渲染控件按钮
                //注意：上传文件的file标签必须通过id来获取
                $courseImage.find("#fileImage").uploadify({

                    //指定要传递到服务器中的额外参数
                    formData: {
                        cs_id: id
                    },

                    //服务器接收文件流的name名称
                    fileObjName: "cs_cover_original",

                    //指向本地的swf文件
                    swf: '../assets/uploadify/uploadify.swf',

                    //处理请求的服务器地址
                    uploader: '/api/uploader/cover',

                    //文件上传成功
                    onUploadSuccess: function () {
                        //刷新课程列表
                        $(".list-group a[v=course]").trigger("click");

                    }


                })


            }
        })


    }
})