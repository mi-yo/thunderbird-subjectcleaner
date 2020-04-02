function log(aText){
  var console = Components.classes["@mozilla.org/consoleservice;1"].getService(Components.interfaces.nsIConsoleService);
  console.logStringMessage(aText);
}

if("undefined" == typeof(SubjectCleanerSettingAdd)){
  var SubjectCleanerSettingAdd = {
    addDialogDto : null,

    startup : function(){
    log("startup");
      SubjectCleanerSettingAdd.addDialogDto = window.arguments[0];
      document.getElementById("removalString").value = SubjectCleanerSettingAdd.addDialogDto.removal.removalString;
      document.getElementById("caseSensitive").checked = SubjectCleanerSettingAdd.addDialogDto.removal.caseSensitive;
      document.getElementById("regexp").checked = SubjectCleanerSettingAdd.addDialogDto.removal.regexp;
      
       document.addEventListener("dialogaccept", function(event) {
    let ret = SubjectCleanerSettingAdd.doOK();
    if (ret == -1) { //onAccept()がエラーを返したときに、ダイアログを閉じない場合
        event.preventDefault();
    }
});
       document.addEventListener("dialogcancel", function(event) {
    let ret = SubjectCleanerSettingAdd.doCancel();
    if (ret == -1) { //onAccept()がエラーを返したときに、ダイアログを閉じない場合
        event.preventDefault();
    }
});
    },

    doOK : function(){
    log("doOK");
      try{
        var removal = {};
        removal.removalString = document.getElementById("removalString").value;
        removal.caseSensitive = document.getElementById("caseSensitive").checked;
        removal.regexp = document.getElementById("regexp").checked;
        SubjectCleanerSettingAdd.addDialogDto.removal = removal;
        SubjectCleanerSettingAdd.addDialogDto.confirmOK = true;
        return true;
      }catch(e){
        dump(e+"\n");
        return false;
      }
    },

    doCancel : function(){
    log("doCancel");
      SubjectCleanerSettingAdd.addDialogDto.confirmOK = false;
      return true;
    }
  }
}
