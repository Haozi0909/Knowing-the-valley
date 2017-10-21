/**
 * 添加讲师模块
 * Created by �� on 2017/10/18.
 */
define([
    "jquery",
    "text!tpls/teacherAddTpl.html"
    ],function($,teacherAddTpl){

    return function(){
        //事件委托
        var $html = $(teacherAddTpl);

        $html.on("hidden.bs.modal",function(){


            //移除模态框容器
            $html.remove();


        })
           //在模态框弹出之后添加日期控件,所有要绑定 shown.bs.modal 方法 是在模态框弹出之后执行
            .on("show.bs.modal",function(){

                $html.find(".date-join").datetimepicker({

                    format: 'yyyy-mm-dd',
                    daysOfWeekDisabled:[0,6],
                    autoclose:true,
                    //最小能看到的视图：
                    minView:"month",

                    //是否显示"今天"按钮
                    todayBtn:true,

                    //指定选择器的语言；要想指定语言必须首先导入相应的语言包
                    language:"zh-CN"

                })

            })
            //绑定submit方法，
            .on("submit","form",function(e){

            //阻止表单提交默认行为
            e.preventDefault();

            //获取表单数据(serialize()获取到的是表单中name的属性)
            var formData = $(this).serialize();
            console.log(formData);

            //用ajax请求数据
            $.ajax({
                url:"/api/teacher/add",
                type:"post",
                data:formData,
                success:function(res){
                    //判断请求
                    if(res.code!=200) throw new Error(res.msg);

                    //提交后关闭模态框
                    $html.modal("hide");

                    //提交后默认刷新讲师列表
                    $(".list-group a[v=teacher]").trigger("click");


                }

            })

        }).appendTo("body").modal();


    }
})