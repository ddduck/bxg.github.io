
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
    });




    //侧边栏交互效果的实现
    $(".navs>ul>li>ul").parent().click(function(){
      //显示二级菜单
      $(this).children("ul").toggle();
    });
    //点击的li高亮
    //获取当前页面的地址
    var path = location.pathname;
    if(path == "/"){
      path = "/dashboard/index";
    }
    //获取和地址相匹配的菜单
    var activeLi = $(".navs a[href='" + path + "']");
    //给当前地址对应的菜单项加上active样式
    activeLi.addClass("active");
    //判断当前菜单项是否是一个人二级菜单项，如果是，就打开二级菜单
    var activeUl = activeLi.parent().parent();
    if(activeUl.siblings("a").length == 1){
      activeUl.slideDown();
    }


  });

});







