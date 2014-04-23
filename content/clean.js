if("undefined" == typeof(SubjectCleanerClean)){
  var SubjectCleanerClean = {
    clean : function(src, removalList, isIgnoreCase, isRegExp){
      var dst = src;
      if(src === null || removalList === null || removalList.length === 0 || isIgnoreCase === null || isRegExp === null){
        return dst;
      }

      var flags = "g";
      if(isIgnoreCase){
        flags += "i";
      }

      for(var i=0; i<removalList.length; i++){
        if(isRegExp){
          var r = new RegExp(removalList[i], flags);
          dst = dst.replace(r, '');
        }else{
          dst = dst.replace(removalList[i], '', flags);
        }
      }

      return dst;
    }
  }
};
