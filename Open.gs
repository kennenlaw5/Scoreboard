function onOpen(){
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Utilities').addSubMenu(ui.createMenu('Help').addItem('By Phone','menuItem1').addItem('By Email','menuItem2')).addItem('Generate Sheet','duplicate')
  .addItem('New Month', 'newMonth').addToUi();
  var message = 'The spreadsheet has loaded successfully! Have a great day!';
  var title = 'Complete!';
  SpreadsheetApp.getActiveSpreadsheet().toast(message, title);
}
function menuItem1() {
  SpreadsheetApp.getUi().alert('Call or text (720) 317-5427');
}
function menuItem2() {
  //Created By Kennen Lawrence
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
  var ignoreRows = [1,2,3,4,47,48,49,50,93,94,95,96];
  var ignoreSheets = ["Master","LoadingChart","New Fresh","Used Fresh","New Phone","Used Phone","New Internet","Used Internet"];
  var activeSheet = ss.getActiveSheet().getSheetName();
  var sheets=ss.getSheets();
  for(var i=0;i<4;i++){
    if(e.source.getSheetName()==sheets[i]){return;}
  }
  if(ignoreRows.indexOf(e.range.getRow()) == -1 && cols.indexOf(e.range.getColumn()) != -1 && ignoreSheets.indexOf(activeSheet) == -1 && isNaN(parseInt(e.value))){
    ui.alert("Error", 'This value is not allowed. For adding text, please right click the cell and select "Insert Note".', ui.ButtonSet.OK);
    e.range.setValue(e.oldValue);
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

function newMonth() {
  var ui = SpreadsheetApp.getUi();
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets();
  var current, spliced, date, next, nextSplice;
  var check = false;
  while (!check) {
    check = true;
    date = ui.prompt('Enter Previous Month', 'Please type in the previous month in the box below:', ui.ButtonSet.OK_CANCEL);
    if (date.getSelectedButton() == ui.Button.CANCEL) { ss.toast('No sheets hidden. New Month function cancelled.', 'Cancelled'); return; }
    date = date.getResponseText();
    if (!isNaN(parseInt(date, 10))) {
      if (parseInt(date, 10) > 12 || parseInt(date, 10) < 1) {
        ui.alert('Error!', 'The month must be a valid month (between 1 and 12).',ui.ButtonSet.OK);
        check = false;
      }
    } else {
      check = false;
      ui.alert('ERROR', 'Please enter a valid number. "'+ date +'" Can\'t be parsed to an integer.', ui.ButtonSet.OK);
    }
  }
  Logger.log(date);
  Logger.log(parseInt(date, 10))
  for (var i = 0; i < sheets.length && check; i++) {
    if (i+1 < sheets.length) {
      current = sheets[i].getSheetName();
      spliced = current.split("/");
      next = sheets[i+1].getSheetName();
      nextSplice = next.split("/");
      if (!ss.getSheetByName(current).isSheetHidden()) {
        if (!isNaN(parseInt(spliced[0], 10)) && parseInt(spliced[0], 10) == parseInt(date, 10)) {
          if (!isNaN(parseInt(nextSplice[0], 10)) && parseInt(nextSplice[0], 10) == parseInt(date, 10)) {
            ss.getSheetByName(current).hideSheet();
          } else {
            check = true;
            Logger.log("LAST OF MONTH: " + current);
          }
        }
        else { Logger.log(current + " failed Validation"); }
      }
    }
  }
}