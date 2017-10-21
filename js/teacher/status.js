/**
 * ��������
 * Created by �� on 2017/10/20.
 */
define(["jquery"],function($){

    return function(id,status,callback){

        $.ajax({
            url:"/api/teacher/handle",
            type:"post",
            data:{
                tc_id:id,
                tc_status:status
            },
            success:function(res){
                if(res.code!=200) throw new Error(res.msg);

                //��һ���������շ�������ֵ��Ȼ��Ҫ�����ֵ����list�ļ�ȥ����
                var status = res.result.tc_status;

                //�����µ�״ֵ̬������ҳ����
                //-->���չ��ܵĻ��֣�status.js�ļ���ְ���Ѿ������ˣ����������������������Ӧ�ý���list.js��ȥʵ�� (��һְ��ԭ��)

                //-->��ʵ����Ҫ��status������ݴ��ݵ�list.js�ļ���

                callback(status);
            }
        })
    }
})