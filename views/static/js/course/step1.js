/**
 * Created by DYH98 on 2017/7/27.
 */
define(["jquery","template","utils","ckeditor","form"],function($,template,utils,CKEDITOR){
  //获取当前页面的id
  var id = utils.getQueryByKey("id");
  $.ajax({
    url:"/api/course/basic",
    data:{
      cs_id:id
    },
    success:function(data){
      console.log(data);
      if(data.code == 200){
        var html = template("step1-tpl",data.result);
        $(".steps").html(html);


        //富文本编辑器
        CKEDITOR.replace("cs_brief", {
          toolbarGroups : [
          { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
          { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
          { name: 'links', groups: [ 'links' ] },
          { name: 'insert', groups: [ 'insert' ] },
          { name: 'forms', groups: [ 'forms' ] },
          { name: 'tools', groups: [ 'tools' ] },
          { name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
          { name: 'others', groups: [ 'others' ] },
          '/',
        ]
      });


        //表单提交
        $("form").submit(function(){
          CKEDITOR.instances["cs_brief"].updateElement();
          $(this).ajaxSubmit({
            url:"/api/course/update/basic",
            type:"post",
            data:{
              cs_id:id,
            },
            success:function(data){
              if(data.code == 200){
                console.log(data);
                //跳转到下一个页面
                location.href = "/course/step2?id=" + data.result.cs_id;
              }
            }

          })
          return false;
        })
      }
    }

  });



});