/**
 *��¼�˲�
 * Created by �� on 2017/10/21.
 */
define(["jquery"],function($){


    return function(){

        //��ȡ�û���¼��Ϣ
        var userMessage = $.cookie("userInfo");    //sessionStorage.getItem("userInfo");

        //�����ȡ�������ݣ�Ĭ��û�е�¼��������ת����¼ҳ���¼���ܷ���
        if(!userMessage)  return location.href="login.html";

        var userInfo=JSON.parse(userMessage);

        //console.log(userInfo);

        //�����ݷŵ�ҳ����
        $('.leftTop img').attr("src",userInfo.tc_avatar);
        $('.leftTop .text-username').text(userInfo.tc_name);

    }
})
