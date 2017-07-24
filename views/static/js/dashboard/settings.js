/**
 * Created by DYH98 on 2017/7/24.
 */
define(["ckeditor"],function(){
  CKEDITOR.replace("editor", {
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

})