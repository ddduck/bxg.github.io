/**
 * Created by DYH98 on 2017/7/21.
 */

define(["jquery","cookie","form"],function($){
  $(function() {
    //获取表单，注册表单提交事件
    $("form").submit(function(){
      $(this).ajaxSubmit({
        url:"/api/login",
        type:"post",
        success:function(data){
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
    });
})