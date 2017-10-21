/**
 * �༭��ʦ
 * Created by �� on 2017/10/19.
 */
define([
    "jquery",
    "text!tpls/teacherEditTpl.html",
    "art"
], function ($, teacherEditTpl, art) {

    return function (id) {
        // ��ajax��������,Ȼ���������Ⱦ��ҳ����
        $.ajax({
            url: "/api/teacher/edit",
            type: "get",
            data: {
                tc_id: id
            },
            success: function (res) {
                if (res.code !== 200) throw new Error(res.msg);

                var teacherEdit = art.render(teacherEditTpl, res.result);
                var $teacherEdit = $(teacherEdit);

                $teacherEdit.on("hidden.bs.modal",function(){
                    //�Ƴ�ģ̬������
                    $teacherEdit.remove();

                }).on("submit", "form", function (e) {

                    //��ֹĬ��ˢ�±�
                    e.preventDefault();

                    //��ȡ������
                    var formData = $(this).serialize();

                    //ajax�����ύ����
                    $.ajax({
                        url: "/api/teacher/update",
                        type: "post",
                        data: formData,
                        success: function (res) {
                            if (res.code!=200) throw new Error(res.msg);

                            //����ģ̬��
                            $teacherEdit.modal("hide");

                            //Ĭ�ϵ��ˢ�½�ʦ�б�
                            $(".list-group a[v=teacher]").trigger("click");

                        }
                    })
                    //���޸ĵ�������Ⱦ��ҳ����
                }).appendTo("body").modal();


            }
        })

    }
})