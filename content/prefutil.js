if("undefined" == typeof(SubjectCleanerPrefUtil)){
  var SubjectCleanerPrefUtil = {
    PREF : Components.classes['@mozilla.org/preferences;1'].getService(Components.interfaces.nsIPrefBranch),

    REMOVAL_LIST_KEY : "subjectcleaner.removalList",
    REMOVAL_LIST_LENGTHS_KEY : "subjectcleaner.removalListLengths",
    IS_IGNORE_CASE_KEY : "subjectcleaner.isIgnoreCase",
    IS_REGEXP_KEY : "subjectcleaner.isRegExp",
    IS_AUTO_KEY : "subjectcleaner.isAuto",

    getRemovalList : function(){
      var removalListStr = SubjectCleanerPrefUtil.getPref(SubjectCleanerPrefUtil.REMOVAL_LIST_KEY);
      var removalListLengthsStr = SubjectCleanerPrefUtil.getPref(SubjectCleanerPrefUtil.REMOVAL_LIST_LENGTHS_KEY);
      var removalList = new Array();
      if(removalListLengthsStr != null && removalListLengthsStr.length != 0){
        var removalListLengths = removalListLengthsStr.split(",");
        var startIndex = 0;
        for(var i=0; i<removalListLengths.length; i++){
          var removalListLength = parseInt(removalListLengths[i]);
          var removalString = removalListStr.substring(startIndex, startIndex + removalListLength);
          removalList.push(removalString);
          startIndex += removalListLength + 1;
        }
      }else{
        // restore ver.1.0.1 setting
        if(removalListStr != null && removalListStr.length != 0){
          return removalListStr.split(",");
        }
      }
      return removalList;
    },
    setRemovalList : function(removalList){
      var removalListLengths = new Array();
      for(var i=0; i<removalList.length; i++){
        removalListLengths.push(removalList[i].length);
      }
      nsPreferences.setUnicharPref(SubjectCleanerPrefUtil.REMOVAL_LIST_KEY, removalList.join(","));
      nsPreferences.setUnicharPref(SubjectCleanerPrefUtil.REMOVAL_LIST_LENGTHS_KEY, removalListLengths.join(","));
    },

    isIgnoreCase : function(){
      return SubjectCleanerPrefUtil.getPref(SubjectCleanerPrefUtil.IS_IGNORE_CASE_KEY);
    },
    setIgnoreCase : function(isIgnoreCase){
      nsPreferences.setBoolPref(SubjectCleanerPrefUtil.IS_IGNORE_CASE_KEY, isIgnoreCase);
    },

    isRegExp : function(){
      return SubjectCleanerPrefUtil.getPref(SubjectCleanerPrefUtil.IS_REGEXP_KEY);
    },
    setRegExp : function(isRegExp){
      nsPreferences.setBoolPref(SubjectCleanerPrefUtil.IS_REGEXP_KEY, isRegExp);
    },

    isAuto : function(){
      return SubjectCleanerPrefUtil.getPref(SubjectCleanerPrefUtil.IS_AUTO_KEY);
    },
    setAuto : function(isAuto){
      nsPreferences.setBoolPref(SubjectCleanerPrefUtil.IS_AUTO_KEY, isAuto);
    },

    getPref : function(prefString){
      try{
        const nsIPrefBranch = Components.interfaces.nsIPrefBranch;
        var value = "";
        var type = SubjectCleanerPrefUtil.PREF.getPrefType(prefString);
        switch(type){
        case nsIPrefBranch.PREF_STRING:
          value = nsPreferences.copyUnicharPref(prefString, "");
          break;
        case nsIPrefBranch.PREF_INT:
          value = nsPreferences.getIntPref(prefString, 0);
          break;
        case nsIPrefBranch.PREF_BOOL:
          value = nsPreferences.getBoolPref(prefString, false);
          break;
        default:
          break;
        }
        return value;

      }catch(e){
        return "";
      }
    }
  }
};
