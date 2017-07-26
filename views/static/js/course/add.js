/**
 * Created by DYH98 on 2017/7/26.
 */
define(["jquery"],function($){
    //获取用户输入的课程名称
  var cs_name = $("[name=cs_name]").val();
  $("#add-btn").on("click",function(){
    $.ajax({
      url:"/api/course/create",
      data:{
        cs_name:"cs_name"
      },
      success:function(data){
        if(data.code==200){
          //console.log(data);
          location.href = "/course/step1?id=" + data.result.cs_id;
        }
      }
    });
    return false;
  })

})