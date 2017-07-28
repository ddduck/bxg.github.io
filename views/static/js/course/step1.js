/**
 * Created by DYH98 on 2017/7/27.
 */
define(["jquery","template","utils","form"],function($,template,utils){
  //获取当前页面的id
  var id = utils.getQueryByKey("id");
  $.ajax({
    url:"/api/course/basic",
    data:{
      cs_id:id
    },
    success:function(data){
      //console.log(data);
      if(data.code == 200){
        var html = template("step1-tpl",data);
        $(".steps").html(html);


        //表单提交
        $("form").submit(function(){
          $(this).ajaxSubmit({
            url:"/api/course/update/basic",
            type:"post",
            data:{
              cs_id:id,
            },
            success:function(data){
              if(data.code == 200){
                console.log(data);
                //跳转到下一个页面
                location.href = "/course/step2?id=" + data.result.cs_id;
              }
            }

          })
          return false;
        })
      }
    }

  });



});