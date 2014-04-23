if("undefined" == typeof(SubjectCleanerSettingAdd)){
  var SubjectCleanerSettingAdd = {
    BUNDLE : Components.classes["@mozilla.org/intl/stringbundle;1"].getService(Components.interfaces.nsIStringBundleService).createBundle("chrome://subjectcleaner/locale/subjectcleaner.properties"),
    PROMPTS : Components.classes["@mozilla.org/embedcomp/prompt-service;1"].getService(Components.interfaces.nsIPromptService),

    addDialogDto : null,

    startup : function(){
      SubjectCleanerSettingAdd.addDialogDto = window.arguments[0];
      if(SubjectCleanerSettingAdd.addDialogDto.removalString !== null){
        document.getElementById("textbox").value = SubjectCleanerSettingAdd.addDialogDto.removalString;
      }
    },

    doOK : function(){
      try{
        var isEdit = SubjectCleanerSettingAdd.addDialogDto.isEdit;
        var inputValue = document.getElementById("textbox").value;

        var isOverlap = false;

        if(inputValue !== null && inputValue.length !== 0){
          var nodes = SubjectCleanerSettingAdd.addDialogDto.removalList.childNodes;
          for(var i=0; i<nodes.length; i++){
            if(nodes[i].nodeName === "listitem"){
              if(nodes[i].label === inputValue){
                if(isEdit !== null && !isEdit){
                  isOverlap = true;
                  break;
                }else if(inputValue !== SubjectCleanerSettingAdd.addDialogDto.removalString){
                  isOverlap = true;
                  break;
                }
              }
            }
          }
        }

        if(isOverlap){
          SubjectCleanerSettingAdd.showAlertDialog();
          return false;
        }

        SubjectCleanerSettingAdd.addDialogDto.removalString = inputValue;
        SubjectCleanerSettingAdd.addDialogDto.confirmOK = true;
        return true;
      }catch(e){
        dump(e+"\n");
        return false;
      }
    },

    doCancel : function(){
      SubjectCleanerSettingAdd.addDialogDto.confirmOK = false;
      return true;
    },

    showAlertDialog : function(){
      var title = SubjectCleanerSettingAdd.BUNDLE.GetStringFromName("setting.error.title");
      var msg = SubjectCleanerSettingAdd.BUNDLE.GetStringFromName("setting.error.add");
      SubjectCleanerSettingAdd.PROMPTS.alert(window, title, msg);
      document.getElementById("textbox").select();
    }
  }
}
