/**
 * Created by DYH98 on 2017/7/28.
 */
define(["jquery","template"],function($,template){
  $.ajax({
    url:"/api/course",
    success:function(data){
      if(data.code == 200){
        console.log(data);
        var html = template("list-tpl",data);
        $(".courses").html(html);
      }
    }
  })

})