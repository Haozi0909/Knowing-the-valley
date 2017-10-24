/**
 * 退出登录功能
 * Created by 浩 on 2017/10/21.
 */
define(["jquery"],function($){


    return function(){

        //给退出按钮绑定点击事件

        $(".link-logout").on('click',function(e){
            //a标签会跳转，跳转后，后面的功能可能就会实现不了，所以要先阻止a跳转
            e.preventDefault();

            //告诉服务器已经点击了退出
            $.ajax({
                url:"/api/logout",
                type:"post",
                success:function(res){
                    if(res.code!=200) throw new Error(res.msg);

                    //移出cookie

                    //跳转到登录页面
                    location.href = "login.html";
                }
            })

        })

    }
})