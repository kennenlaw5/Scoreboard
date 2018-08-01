function onOpen(){
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Utilities').addSubMenu(ui.createMenu('Help').addItem('By Phone','menuItem1').addItem('By Email','menuItem2')).addItem('Generate Sheet','duplicate').addToUi();
  var message = 'The spreadsheet has loaded successfully! Have a great day!';
  var title = 'Complete!';
  SpreadsheetApp.getActiveSpreadsheet().toast(message, title);
}
function menuItem1() {
  SpreadsheetApp.getUi().alert('Call or text (720) 317-5427');
}
function menuItem2() {
  //Created By Kennen Larence
  var ui = SpreadsheetApp.getUi();
  var input = ui.prompt('Email Sheet Creator','Describe the issue you\'re having in the box below, then press "Ok" to submit your issue via email:',ui.ButtonSet.OK_CANCEL);
  if (input.getSelectedButton() == ui.Button.OK) {
    MailApp.sendEmail('kennen.lawrence@schomp.com','HELP Sales Daily_March',input.getResponseText(),{name:getName()});
  } else if (input.getSelectedButton() == ui.Button.CANCEL) {
    Logger.log('User cancelled');
  }
}
function onEdit(e){
  var ss=SpreadsheetApp.getActiveSpreadsheet();
  var ui=SpreadsheetApp.getUi();
  var cols=[2,3,6,7,10,11,13,16,17,19,22,24];
  var sheets=ss.getSheets();
  for(var i=0;i<4;i++){
    if(e.source.getSheetName()==sheets[i]){return;}
  }
  for(var i=0;i<cols.length;i++){
    if(e.range.getColumn()==cols[i] && e.value.split(" ") !=undefined && e.value.split(" ").length>1){
      ui.alert("Error", 'This value is not allowed. For adding text, please right click the cell and select "Insert Note".', ui.ButtonSet.OK);
      e.range.setValue(e.oldValue);
    }
  }
}
function getName(){
  //Created By Kennen Lawrence
  //Version 1.0
  var email = Session.getActiveUser().getEmail();
  var name;var first;var last;
  name = email.split("@schomp.com");
  name=name[0];
  name=name.split(".");
  first=name[0];
  last=name[1];
  first= first[0].toUpperCase() + first.substring(1);
  last=last[0].toUpperCase() + last.substring(1);
  name=first+" "+last;
  Logger.log(name);
  return name;
}