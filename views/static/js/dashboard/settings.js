/**
 * Created by DYH98 on 2017/7/24.
 */
define(["jquery", "ckeditor", "template", "datepicker", "datepickerCN", "region", "uploadify","form"], function ($, CKEDITOR, template) {
  //发送ajax请求
  $.ajax({
    url: "/api/teacher/profile",
    success: function (data) {
      if (data.code == 200) {
        var html = template("settings-tpl", data.result);
        $(".settings").html(html);


        //富文本编辑器插件
        CKEDITOR.replace("tc_introduce", {
          toolbarGroups: [
            {name: 'clipboard', groups: ['clipboard', 'undo']},
            {name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing']},
            {name: 'links', groups: ['links']},
            {name: 'insert', groups: ['insert']},
            {name: 'forms', groups: ['forms']},
            {name: 'tools', groups: ['tools']},
            {name: 'document', groups: ['mode', 'document', 'doctools']},
            {name: 'others', groups: ['others']},
            '/',
          ]
        });

        //日期插件
        $("input[name=tc_birthday]").datepicker({
          format: "yyyy-mm-dd",
          language: "zh-CN"
        });
        $("input[name=tc_join_date]").datepicker({
          format: "yyyy-mm-dd",
          language: "zh-CN"
        });

        //省市级三级联动插件
        $(".form-group").region({
          url: "/views/assets/jquery-region/region.json"
        });

        //上传头像插件
        $("#upfile").uploadify({
          swf: "/views/assets/uploadify/uploadify.swf",
          uploader: "/api/uploader/avatar",
          fileObjName: "tc_avatar",
          onUploadSuccess: function (file, data) {
            data = JSON.parse(data);
            if (data.code == 200) {
              $(".preview img").attr("src", data.result.path);
            }
          },
          itemTemplate: "<p></p>",
          width: 120,
          height: 120,
          buttonText: "",
          multi: false,
          fileTypeExts: "*.jpg;*.gif;*.png;*.jpeg",
        });


        $("form").submit(function () {
          //手动将富文本框的内容更新到textarea中
          CKEDITOR.instances["tc_introduce"].updateElement();
          //表单提交事件
          $(this).ajaxSubmit({
            url: "/api/teacher/modify",
            type: "post",
            data: {
              tc_id: data.result.tc_id
            },
            success: function (data) {
              console.log(data);
              if (data.code == 200) {
                alert("资料更新成功");
              }
            }
          })

          return false;
        })

      }
    }
  })


});