/**
 * Created by DYH98 on 2017/7/27.
 */
define(["jquery","template","utils","bootstrap","form"],function($,template,utils){
  var id = utils.getQueryByKey("id");
  $.ajax({
    url:"/api/course/lesson",
    data:{cs_id:id},
    success:function(data){
      if(data.code == 200) {
        var html = template("step3-tpl", data.result);
        $(".steps").html(html);
      }
    }
  });

  //点击编辑按钮，编辑课程
  $(".steps").on("click","#edit-btn",function(){
    //获取当前课时内容
    var ctId = $(this).parent().data("id");
    //发送ajax请求
    $.ajax({
      url:"/api/course/chapter/edit",
      data:{ct_id:ctId},
      success:function(data){
        if(data.code == 200){
          data.result.title="编辑课时",
          data.result.buttonText = "保 存",
          data.result.url = "/api/course/chapter/modify";
          renderModal(data.result);
        }
      }

    })

  })


  //点击添加课时  ，弹出模态框
  $(".steps").on("click","#add-btn",function(){
    var obj = {
      title:"添加课时",
      buttonText:"添 加",
      url:"/api/course/chapter/add"
    }
    renderModal(obj);
  });


  //给保存按钮注册点击事件
  $(".modal-content").on("click","#sava-btn",function(){
    $("form").ajaxSubmit({
      data:{
        ct_cs_id:id
      },
      success:function(data){
        if(data.code == 200){
          $("#chapterModal").modal("hide");
          $.ajax({
            url:"/api/course/lesson",
            data:{cs_id:id},
            success:function(data){
              $("#count").text("课时：" + data.result.lessons.length);
              var html = template("lessons-tpl",data.result);
              $(".lessons").html(html);
            }
          })
        }

      }
    })
  })





  //渲染模态框
  function renderModal(data){
    var html = template("modal-tpl",data);
    $(".modal-content").html(html);
    $("#chapterModal").modal("show");
  }
})