/**
 * Created by DYH98 on 2017/7/23.
 */
define([],function(){
  return {
    //此方法用来将用户传入的url地址的所有参数键值对转换成对象
    getQuery:function(){
      //location.search："?id= 838;"
      var queryString = location.search.slice(1);//"id=838"字符串
      var kvArr = queryString.split("&");//["id=838"]数组
      var obj = {};
      kvArr.forEach(function(v,i){
        //key = value;
        var kvPair = v.split("=");
        obj[kvPair[0]] = kvPair[1];
      });
      return obj;
    },
    getQueryByKey:function(key){
      return this.getQuery()[key];
    }
  }
})

