/**
 * 入口文件
 * Created by �� on 2017/10/17.
 */
require.config({
    //配置基础路径
    baseUrl: "js",
    paths: {
        //配置一些常用的第三方模块路径（路径不需要有后缀，有了后缀就报错）
        jquery: "lib/jquery-2.1.4",
        bootstrap: "../assets/bootstrap/js/bootstrap",
        //arttemplate模板引擎
        art:"lib/template-web",
        //requirejs官方提供的加载html文件的插件
        text:"lib/text",

        //配置一些模板文件的路径（tpls文件夹是存放模板文件的）
        tpls: "../tpls",

        //配置日期控件的2个文件路径
        datetime:"../assets/bootstrap-datetimepicker/js/bootstrap-datetimepicker",
        datetimeLang:"../assets/bootstrap-datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN"

    },

    //配置模块依赖
    shim: {
        //bootstrap将会在jquery整个文件夹读取完毕之后再去执行
        bootstrap: {
            deps: ["jquery"]
        },

        //语言包依赖于日期主包
        datetimeLang:{
            deps:["datetime"]
        }
    }

});

//入口模块
require([
    "jquery",
    "teacher/list",
    "bootstrap",
    "datetime",
    "datetimeLang"
], function ($,teacherList) {

    //获取用户登录信息
    var userMessage = sessionStorage.getItem("userInfo");

    //如果获取不到数据，默认没有登录过，就跳转到登录页面登录才能访问
    if(!userMessage)  return location.href="login.html";

    var userInfo=JSON.parse(userMessage);

    //console.log(userInfo);

    //将数据放到页面中
    $('.leftTop img').attr("src",userInfo.tc_avatar);
    $('.leftTop .text-username').text(userInfo.tc_name);

    //1.实现菜单切换
    $('.list-group').on('click', 'a', function () {

        //根据点击到菜单的内容决定要加载什么内容
        //在页面先给菜单设置一个特有的属性并赋值，然后再在这里获取该属性的值
        var value = $(this).attr("v");

        switch (value) {
            case "teacher":
                teacherList();
                break;

            case "course":
                $(".main").html("课程管理");
                break;

            case "addcourse":
                $(".main").html("添加课程");
                break;

            case "category":
                $(".main").html("课程分类");
                break;

            case "chart":
                $(".main").html("图表统计");
                break;
        }

        //改变按钮的背景颜色
        $(this).addClass('active').siblings().removeClass("active");

    });

    //设置默认点击到固定的一个菜单内容
    $('.list-group a[v=teacher]').trigger('click');

});