/**
 * Created by DYH98 on 2017/7/23.
 */

define(["jquery","template","bootstrap"],function($,template){
  $(function(){
    //获取讲师列表
    $.ajax({
      url:"/api/teacher",
      success:function(data){
        if(data.code == 200){
          var html = template("teacher-list-tpl",data);
          $("#panel-list").html(html);
        }
      }
    });

    //点击查看，弹出模态框
    $("#panel-list").on("click",".btn-checkinfo",function(){
      var tc_id = $(this).parent().parent().data("id");
      $.ajax({
        url:"/api/teacher/view",
        data:{
          tc_id: tc_id
        },
        success:function(data){
          var html = template("module-tpl",data.result);
          $("#teacherModal .panel-body").html(html);
          //渲染模态框
          $("#teacherModal").modal("show");
        }

      })
    });


    //点击注销
    $("#panel-list").on("click",".btn-toggle-status",function(){
      var tc_id = $(this).parent().parent().data("id");
      var tc_status = $(this).data("status");
      var that = this;
      $.ajax({
        url:"/api/teacher/handle",
        type:"post",
        data:{
          tc_id:tc_id,
          tc_status: tc_status
        },
        success:function(data){
          if(data.code == 200){
            console.log(data);
            //tc_status == "0" 表示当前讲师是启用的
            //tc_status == "1" 表示当前讲师是注销的
            if(data.result.tc_status == "0"){
              $(that).text("注 销").removeClass("btn-success").addClass("btn-warning");
            }else{
              $(that).text("启 用").removeClass("btn-warning").addClass("btn-success");
            }
            $(that).data("status",data.result.tc_status);
          }
        }
      })
    });


  });
});
