/**
 *登录核查
 * Created by 浩 on 2017/10/21.
 */
define(["jquery"],function($){


    return function(){

        //获取用户登录信息
        var userMessage = $.cookie("userInfo");    //sessionStorage.getItem("userInfo");

        //如果获取不到数据，默认没有登录过，就跳转到登录页面登录才能访问
        if(!userMessage)  return location.href="login.html";

        var userInfo=JSON.parse(userMessage);

        //console.log(userInfo);

        //将数据放到页面中
        $('.leftTop img').attr("src",userInfo.tc_avatar);
        $('.leftTop .text-username').text(userInfo.tc_name);

    }
})
