/**
 * Created by DYH98 on 2017/7/21.
 */
require.config({
  baseUrl:"/views/assets",
  paths:{
    jquery:"jquery/jquery.min",
    cookie:"jquery-cookie/jquery.cookie",
    template:"artTemplate/template-web",
    form:"jquery-form/jquery.form",
    bootstrap:"bootstrap/js/bootstrap.min"
  },
  shim:{
    bootstrap:{
      deps:["jquery"]
    }
  }
});