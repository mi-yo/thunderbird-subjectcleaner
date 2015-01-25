if("undefined" == typeof(SubjectCleanerPrefUtil)){
  var SubjectCleanerPrefUtil = {
    PREF_DEFAULT : Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getDefaultBranch("extensions.subjectcleaner."),
    PREF_USER : Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("extensions.subjectcleaner."),

    PREF_KEY_REMOVALLIST : "removalList",
    PREF_KEY_AUTOREMOVE : "autoRemove",
    PREF_KEY_AUTOFOCUS : "autoFocus",

    getDefaultRemovalList : function(){
      try{
        return JSON.parse(SubjectCleanerPrefUtil.PREF_DEFAULT.getComplexValue(SubjectCleanerPrefUtil.PREF_KEY_REMOVALLIST, Components.interfaces.nsISupportsString).data);
      }catch(e){
        return null;
      }
    },
    getRemovalList : function(){
      try{
        return JSON.parse(SubjectCleanerPrefUtil.PREF_USER.getComplexValue(SubjectCleanerPrefUtil.PREF_KEY_REMOVALLIST, Components.interfaces.nsISupportsString).data);
      }catch(e){
        return null;
      }
    },
    setRemovalList : function(removalList){
      var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
      str.data = JSON.stringify(removalList);
      SubjectCleanerPrefUtil.PREF_USER.setComplexValue(SubjectCleanerPrefUtil.PREF_KEY_REMOVALLIST, Components.interfaces.nsISupportsString, str);
    },

    isDefaultAutoRemove : function(){
      return SubjectCleanerPrefUtil.PREF_DEFAULT.getBoolPref(SubjectCleanerPrefUtil.PREF_KEY_AUTOREMOVE);
    },
    isAutoRemove : function(){
      return SubjectCleanerPrefUtil.PREF_USER.getBoolPref(SubjectCleanerPrefUtil.PREF_KEY_AUTOREMOVE);
    },
    setAutoRemove : function(autoRemove){
      SubjectCleanerPrefUtil.PREF_USER.setBoolPref(SubjectCleanerPrefUtil.PREF_KEY_AUTOREMOVE, autoRemove);
    },

    isDefaultAutoFocus : function(){
      return SubjectCleanerPrefUtil.PREF_DEFAULT.getBoolPref(SubjectCleanerPrefUtil.PREF_KEY_AUTOFOCUS);
    },
    isAutoFocus : function(){
      return SubjectCleanerPrefUtil.PREF_USER.getBoolPref(SubjectCleanerPrefUtil.PREF_KEY_AUTOFOCUS);
    },
    setAutoFocus : function(autoFocus){
      SubjectCleanerPrefUtil.PREF_USER.setBoolPref(SubjectCleanerPrefUtil.PREF_KEY_AUTOFOCUS, autoFocus);
    }
  }
};
