/**
 * Created by DYH98 on 2017/7/23.
 */
define(["jquery","template","utils","validate","form","datepicker","datepickerCN"],function($,template,utils){
  //首先获取页面url中地址参数id
  var id = utils.getQueryByKey("id");

  //判断，如果没有id就表示是添加页面，如果有id就表示是编辑页面
  if(!id){
    //添加讲师信息
    var obj = {
      title:"讲师添加",
      btnText:"添加",
      url:"/api/teacher/add"
    }
    var html = template("add-tpl",obj);
    $(".body.teacher").html(html);
    //配置日期选择插件
    $("input[name=tc_join_date]").datepicker({
      language:"zh-CN",
      format:"yyyy-mm-dd"
    });
    validForm();
  }else{
    //编辑讲师信息功能
    $.ajax({
      url:"/api/teacher/edit",
      data:{
        tc_id:id
      },
      success:function(data){
        if(data.code == 200){
          //给data.result配置一些属性
          data.result.title = "讲师编辑";
          data.result.btnText = "保存";
          data.result.url = "/api/teacher/update";
          var html = template("add-tpl",data.result);
          $(".body.teacher").html(html);
          //配置日期选择插件
          $("input[name=tc_join_date]").datepicker({
            //语言
            language:"zh-CN",
            //格式
            format:"yyyy-mm-dd"
          });
        }
        validForm();
      }
    });

  }


  //校验表单函数
  function validForm(){
    $("form").validate({
      onKeyup:true,
      onBlur:true,
      onChange:true,
      sendForm:false,
      description: {
        name: {
          required: "请输入姓名",
          valid: "姓名填写正确",
        },
        pass:{
          required:"请输入密码",
          pattern:"密码为6~18位数",
        }
      },
      eachValidField:function(){
        this.parent().parent().addClass("has-success").removeClass("has-error");
      },
      eachInvalidField:function(){
        this.parent().parent().addClass("has-error").removeClass("has-success");
      },
      valid:function(){
        //console.log(this);
        //在表单整体校验成功之后进行表单提交
        $(this).ajaxSubmit({
          success:function(data){
            //console.log(data);
            if(data.code == 200){
              location.href = "/teacher/list";
            }
          }
        });
        },
    });
  }
});