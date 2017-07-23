/**
 * Created by DYH98 on 2017/7/22.
 */
define(["jquery"],function($){
  //点击退出按钮退出到login页面
  $(function(){
    $("#fa-sign-out").on("click",function(){
      $.ajax({
        url:"/api/logout",
        type:"post",
        success:function(data){
          if(data.code ==200){
            location.href = "/dashboard/login";
          }
        }
      })
    })
  });
});