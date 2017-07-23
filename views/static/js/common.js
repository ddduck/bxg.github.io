
define(["jquery","template","cookie"],function($,template) {
  $(function () {
    //判断用户当前在页面,如果不在登陆页面才执行下面的代码
    if (location.pathname != "/dashboard/login") {
      //判断用户是否登录
      if (!$.cookie("PHPSESSID")) {
        location.href = "/dashboard/login";
        //return;
      }
      //获取cookie中头像和名称
      //JSON.parse将字符串转换成json对象
      var userInfo = JSON.parse($.cookie("userInfo"));
      var html = template("profile-tpl", userInfo);
      $("#profile").html(html);
    }



    //点击退出按钮退出到login页面
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







