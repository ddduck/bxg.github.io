/**
 * Created by DYH98 on 2017/7/21.
 */

define(["jquery","cookie"],function($){
  $(function() {
    //获取表单，注册表单提交事件
    $("form").submit(function(){
      //获取用户名和密码
      var name = $("[name = tc_name]").val();
      var pass = $("[name = tc_pass]").val();
      //发送ajax请求获取数据
      $.ajax({
        url:"/api/login",
        type:"post",
        data:{
          tc_name:name,
          tc_pass:pass
        },
        success:function(data){
          console.log(data);
          if(data.code == 200){
            //存储用户名和头像
            //JSON.stringify()把json对象转换成json格式的字符串
            $.cookie("userInfo",JSON.stringify(data.result),{path:"/"});
            //跳转页面
            location.href = "/";
          }
        }
      })

      //阻止表单默认事件
      return false;
    });

  })
})