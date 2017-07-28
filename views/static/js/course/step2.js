/**
 * Created by DYH98 on 2017/7/27.
 */
define(["jquery","utils","template","uploadify","jcrop","form"],function($,utils,template){
  //获取地址栏的id
  var id = utils.getQueryByKey("id");


  //全局对象
  var jcrop_api;


  $.ajax({
    url:"/api/course/picture",
    data:{cs_id:id},
    success:function(data){
      if(data.code == 200){
        var html = template("step2-tpl",data.result);
        $(".steps").html(html);

        //上传图片插件
        $("#upload-btn").uploadify({
          swf:"/views/assets/uploadify/uploadify.swf",
          uploader:"/api/uploader/cover",
          formData:{cs_id:id},

          fileObjName:"cs_cover_original",
          itemTemplate:"<p></p>",
          buttonText:"选择图片",
          buttonClass:"btn btn-success btn-sm",
          width:70,
          onUploadSuccess:function(file,data){
            if(data.code == 200){
              data = JSON.parse(data);
              $(".preview>img").attr("src",data.result.path);
              //启用裁切图片按钮
              $("#jcrop-btn").prop("disabled",false);
            }


            //将jcrop插件移除
            jcrop_api && jcrop_api.destroy();
            $("#jcrop-btn").text("裁切图片");

          }

        });

        //调整上传图片按钮的样式
        $("#upload-btn").css("line-height","1.5");
        //注册裁切事件
        $(".preview").on("cropmove cropend",function(e,s,c){
          $("[name=x]").val(c.x);
          $("[name=y]").val(c.y);
          $("[name=w]").val(c.w);
          $("[name=h]").val(c.h);
        })

      }
    }

  });


  //裁切图片
  $(".steps").on("click","#jcrop-btn",function(){
    if($(this).text() == "裁切图片") {
      $(".preview>img").Jcrop({
        aspectRatio: 2,
        boxWidth: 400,
        setSelect: [0, 0, 400, 400]
      },function(){
        jcrop_api = this;
        //this.initComponent("Thumbnailer", {container: ".thumb", top: 0, width: 240, height: 120})
      });

        $(this).text("保存图片");
    }else{
      //如果按钮不是裁切图片文字，就是先保存功能
      $("form").ajaxSubmit({
        data:{
          cs_id:id
        },
        success:function(data){
          if(data.code == 200){
            location.href = "/course/step3?id=" + data.result.cs_id;
          }
        }
      })
    }
  })
})