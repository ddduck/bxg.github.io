/**
 * Created by DYH98 on 2017/7/26.
 */
define(["jquery"],function($){
  $("#add-btn").click(function(){

    //获取用户输入的课程名称
    var cs_name = $("[name=cs_name]").val();

    $.ajax({
      url:"/api/course/create",
      type:"post",
      data:{
        cs_name:cs_name
      },
      success:function(data){
        if(data.code==200){
          console.log(data);
          location.href = "/course/step1?id=" + data.result.cs_id;
        }
      }
    });
    return false;
  })

})