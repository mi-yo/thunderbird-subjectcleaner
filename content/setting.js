if("undefined" == typeof(SubjectCleanerSetting)){
  var SubjectCleanerSetting = {
    AddDialogDto : function(isEdit, confirmOK, removalString, removalList){
      this.isEdit = isEdit;
      this.confirmOK = confirmOK;
      this.removalString = removalString;
      this.removalList = removalList;
    },

    selectedItem : null,

    startup : function(){
      document.getElementById("add").addEventListener("command", SubjectCleanerSetting.add, true);
      document.getElementById("edit").addEventListener("command", SubjectCleanerSetting.edit, true);
      document.getElementById("delete").addEventListener("command", SubjectCleanerSetting.delete, true);
      document.getElementById("test").addEventListener("command", SubjectCleanerSetting.test, true);
      document.getElementById("default").addEventListener("command", SubjectCleanerSetting.default, true);

      SubjectCleanerSetting.fill(
        SubjectCleanerPrefUtil.getRemovalList(),
        (!SubjectCleanerPrefUtil.isIgnoreCase()).toString(),
        SubjectCleanerPrefUtil.isRegExp().toString(),
        SubjectCleanerPrefUtil.isAuto().toString());
    },

    setSelectedItem : function(item){
      SubjectCleanerSetting.selectedItem = item;
    },

    getRemovalList : function(){
      var removalList = new Array();
      var nodes = document.getElementById("removalList").childNodes;
      for(var i=0; i<nodes.length; i++){
        if(nodes[i].nodeName === "listitem"){
          removalList.push(nodes[i].label);
        }
      }
      return removalList;
    },

    add : function(event){
      var addDialogDto = new SubjectCleanerSetting.AddDialogDto(false, false, null, document.getElementById("removalList"));
      window.openDialog("chrome://subjectcleaner/content/settingadd.xul",
        "SubjectCleanerSettingDialog", "chrome,modal,titlebar,centerscreen", addDialogDto);

      if(addDialogDto.confirmOK){
        var removalString = addDialogDto.removalString;
        if(removalString.length > 0){
          var removalList = document.getElementById("removalList");
          var listitem = document.createElement("listitem");
          listitem.setAttribute("label", removalString);
          listitem.setAttribute("id", Math.random());
          removalList.appendChild(listitem);
          var newSelectedIndex = removalList.itemCount-1;
          removalList.ensureIndexIsVisible(newSelectedIndex);
          removalList.selectedIndex = newSelectedIndex;
        }
      }
    },

    edit : function(event){
      var addDialogDto = new SubjectCleanerSetting.AddDialogDto(true, false, SubjectCleanerSetting.selectedItem.label, document.getElementById("removalList"));
      window.openDialog("chrome://subjectcleaner/content/settingadd.xul",
        "SubjectCleanerSettingDialog", "chrome,modal,titlebar,centerscreen", addDialogDto);

      if(addDialogDto.confirmOK){
        var removalString = addDialogDto.removalString;
        if(removalString.length > 0){
          SubjectCleanerSetting.selectedItem.setAttribute("label", removalString);
        }
      }
    },

    delete : function(event){
      var removalList = document.getElementById("removalList");
      var prevIndex = removalList.selectedIndex;
      removalList.removeChild(SubjectCleanerSetting.selectedItem);
      removalList.selectedIndex = (prevIndex > 0) ? prevIndex-1 : 0;
    },

    test : function(event){
      var testBox = document.getElementById("testBox");
      if(testBox.value === null || testBox.value.length === 0){
        return;
      }
      var removalList = SubjectCleanerSetting.getRemovalList();
      var isIgnoreCase = !(document.getElementById("isCaseSensitive").checked);
      var isRegExp = document.getElementById("isRegExp").checked;
      var cleanResult = SubjectCleanerClean.clean(testBox.value, removalList, isIgnoreCase, isRegExp);
      if(testBox.value !== cleanResult){
        testBox.value = cleanResult;
      }
      testBox.focus();
    },

    default : function(event){
      SubjectCleanerSetting.fill(
        ["\\[\\w+:\\d+\\](\\s|)", "\\sRe:+"],
        "false",
        "true",
        "true");
    },

    fill : function(removalList, isCaseSensitive, isRegExp, isAuto){
      var viewRemovalList = document.getElementById("removalList");
      if(removalList != null && removalList.length != 0){
        while (viewRemovalList.firstChild) {
          viewRemovalList.removeChild(viewRemovalList.firstChild);
        }

        for(var i=0; i<removalList.length; i++){
          var listitem = document.createElement("listitem");
          listitem.setAttribute("label", removalList[i]);
          listitem.setAttribute("id", Math.random());
          viewRemovalList.appendChild(listitem);
        }
      }
      viewRemovalList.selectedIndex = 0;

      document.getElementById("isCaseSensitive").setAttribute("checked", isCaseSensitive);
      document.getElementById("isRegExp").setAttribute("checked", isRegExp);
      document.getElementById("isAuto").setAttribute("checked", isAuto);
    },

    doOK : function(){
      SubjectCleanerPrefUtil.setRemovalList(SubjectCleanerSetting.getRemovalList());
      SubjectCleanerPrefUtil.setIgnoreCase(!(document.getElementById("isCaseSensitive").checked));
      SubjectCleanerPrefUtil.setRegExp(document.getElementById("isRegExp").checked);
      SubjectCleanerPrefUtil.setAuto(document.getElementById("isAuto").checked);
      return true;
    },

    doCancel : function(){
      return true;
    }
  }
}
