/**
 * �˳���¼����
 * Created by �� on 2017/10/21.
 */
define(["jquery"],function($){


    return function(){

        //���˳���ť�󶨵���¼�

        $(".link-logout").on('click',function(e){
            //a��ǩ����ת����ת�󣬺���Ĺ��ܿ��ܾͻ�ʵ�ֲ��ˣ�����Ҫ����ֹa��ת
            e.preventDefault();

            //���߷������Ѿ�������˳�
            $.ajax({
                url:"/api/logout",
                type:"post",
                success:function(res){
                    if(res.code!=200) throw new Error(res.msg);

                    //�Ƴ�cookie

                    //��ת����¼ҳ��
                    location.href = "login.html";
                }
            })

        })

    }
})