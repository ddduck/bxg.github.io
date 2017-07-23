/**
 * Created by DYH98 on 2017/7/23.
 */
define(["jquery","template","utils","form"],function($,template,utils){
  //首先获取页面url中地址参数id
  var id = utils.getQueryByKey("id");

  //如果没有id就表示是添加页面，如果有id就表示是编辑页面

  if(!id){
    //添加讲师信息
    var obj = {
      title:"讲师添加",
      btnText:"添加",
      url:"/api/teacher/add"
    }
    var html = template("add-tpl",obj);
    $(".body.teacher").html(html);
  }else{
    //编辑讲师信息功能
    $.ajax({
      url:"/api/teacher/edit",
      data:{
        tc_id:id
      },
      success:function(data){
        if(data.code == 200){
          data.result.title = "讲师编辑";
          data.result.btnText = "保存";
          data.result.url = "/api/teacher/update";
          var html = template("add-tpl",data.result);
          $(".body.teacher").html(html);
        }
      }
    })
  }

  //注册表单提交事件
  $(".body.teacher").on("submit","form",function(){
    $(this).ajaxSubmit({
      success:function(data){
        console.log(data);
        if(data.code == 200){
          location.href = "/teacher/list";
        }
      }
    });
    return false;
  })

});