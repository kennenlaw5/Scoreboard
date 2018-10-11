function duplicate() {
  //Created By Kennen Lawrence
  //Version 2.0
  var teamRows = driver("teamRows");
  var finalTeamSize = driver("finalTeamSize");
  var firstCARow = driver("firstCARow");
  var types = 2; //Number of types. Currently just New and Used which = 2
  var ss=SpreadsheetApp.getActiveSpreadsheet();
  var ui = SpreadsheetApp.getUi();
  var template=ss.getSheetByName('Master');
  var primary=ss.getSheetByName("LoadingChart");
  var sheets = ss.getSheets();
  var target, date, startRow;
  var rows = [];
  var rows2 = [];
  var j=0;
  var m=0;
  var final=[];
  var numRows = (primary.getLastRow()-4)/2;
  var range = primary.getRange(3,2,numRows,10).getValues();
  var range2 = primary.getRange(numRows+5,2,numRows,10).getValues();
  var rangeFill=[];
  var rangeFill2=[];
  var check=false;
  var curYear=primary.getRange(1,1).getDisplayValue();
  var input;var input2;
  var row = teamRows[teamRows.length-1] + finalTeamSize;
  for (var i = 0; i < teamRows.length; i++) {
    rangeFill[i] = template.getRange(parseInt(teamRows[i])+row,6,1,19).getFormulas();
  }
  for (i = 0; i < teamRows.length; i++) {
    rangeFill2[i] = template.getRange(parseInt(teamRows[i])+row+row,6,1,19).getFormulas();
  }
  var forms=[];
  for (i = 0; i < numRows; i++) {
    row = teamRows[teamRows.length-1] + finalTeamSize + firstCARow;
    check=false;
    for(var k = 0; k < teamRows.length; k++) {
      if (parseInt(i) == parseInt(teamRows[k])-firstCARow) { check=true; }
    }
    for (var l = 0; l < types; l++) {
      if (l == 1) { row += row-firstCARow; }
      if (check == false) {
        forms[0] = "=IFERROR(G" + (row+i) + "/F" + (row+i) + ',"N/A")';
        forms[1] = "=IFERROR(K" + (row+i) + "/J" + (row+i) + ',"N/A")';
        forms[2] = "=IFERROR(M" + (row+i) + "/J" + (row+i) + ',"N/A")';
        forms[3] = "=IFERROR(Q" + (row+i) + "/P" + (row+i) + ',"N/A")';
        forms[4] = "=IFERROR(S" + (row+i) + "/P" + (row+i) + ',"N/A")';
        forms[5] = "=IFERROR(V" + (row+i) + "/J" + (row+i) + ',"N/A")';
        if (l == 0) {
          rows[i] = [range[i][0], range[i][1], forms[0], "", range[i][2], range[i][4], forms[1],
                     range[i][5], forms[2], "", range[i][6], range[i][8], forms[3], range[i][9],
                     forms[4], "", range[i][3], forms[5], range[i][7]];
        } else if (l == 1) {
          rows2[i] = [range2[i][0], range2[i][1], forms[0], "", range2[i][2], range2[i][4], forms[1],
                     range2[i][5], forms[2], "", range2[i][6], range2[i][8], forms[3], range2[i][9],
                     forms[4], "", range2[i][3], forms[5], range2[i][7]];
        }
        
      }else if(check==true){
        if (l == 0) { rows[i]=rangeFill[j][0]; j++; }
        if (l == 1) { rows2[i]=rangeFill2[m][0]; m++; }
      }
    }
  }
  check=false;
  while(!check){
    input = ui.prompt('Enter Scoreboard Date','Enter the name of the sheet to be created in the format "MM/DD/YY":',ui.ButtonSet.OK_CANCEL);
    if (input.getSelectedButton() == ui.Button.OK) {
      date=input.getResponseText();
      date=date.replace("-","/");
      date=date.replace("-","/");
      if(date.indexOf('/')==-1||date.split('/').length!=3){ui.alert('Error!', 'The date must be divided by a "/". Please follow the format "MM/DD/YY"',ui.ButtonSet.OK);}
      else{
        date=date.split('/');
        if(date[0].length!=2||parseInt(date[0])<1||parseInt(date[0])>12){
          ui.alert('Error!', 'The month must have a preceding 0 (if it is less than 10) and be a valid month (between 1 and 12). Please follow the format "MM/DD/YY"',ui.ButtonSet.OK);
        }else if(date[1].length!=2||parseInt(date[1])<1||parseInt(date[1])>31){
          ui.alert('Error!', 'The day must have a preceding 0 (if it is less than 10) and be a valid day (between 1 and 31). Please follow the format "MM/DD/YY"',ui.ButtonSet.OK);
        }else if(date[2].length!=2){
          ui.alert('Error!', 'The year must be the last two values of the year only. Please follow the format "MM/DD/YY"',ui.ButtonSet.OK);
        }else if(parseInt(date[2])!=parseInt(curYear.substring(2))){
          input2=ui.alert('Year Confirmation', 'The year you entered ('+date[2]+') is not the current year ('+curYear.substring(2)+'). Is is the year you meant to enter?', ui.ButtonSet.YES_NO_CANCEL);
          if(input2==ui.Button.YES){check=true;ss.toast('Check', 'true', 3);return;}else if(input2==ui.Button.CANCEL){ss.toast('New scoreboard sheet was not generated.', 'Cancelled');return;}
        }else{check=true;}
      }
    }else{ss.toast('New scoreboard sheet was not generated.', 'Cancelled');return;}
  }
  
  template.copyTo(ss).setName(input.getResponseText());
  target=ss.getSheetByName(input.getResponseText());
  ss.setActiveSheet(target);
  startRow = teamRows[teamRows.length-1] + finalTeamSize + firstCARow;
  Logger.log("New start: "+startRow);
  target.getRange(startRow,6,numRows,19).setValues(rows);
  startRow += teamRows[teamRows.length-1] + finalTeamSize;
  target.getRange(startRow,6,numRows,19).setValues(rows2);
  for (i = 0; i < sheets.length; i++) {
    if (sheets[i].getSheetName() == primary.getSheetName()) { j = i + 2; }
  }
  ss.moveActiveSheet(j);
  
  
  //Intentionally error out the Loading Chart to clean it up by deleting names from the reports
  ss.getSheetByName("New Fresh").getRange('A:A').setValue('Needs Updated!');
  ss.getSheetByName("New Phone").getRange('A:A').setValue('Needs Updated!');
  ss.getSheetByName("New Internet").getRange('A:A').setValue('Needs Updated!');
  ss.getSheetByName("Used Fresh").getRange('A:A').setValue('Needs Updated!');
  ss.getSheetByName("Used Phone").getRange('A:A').setValue('Needs Updated!');
  ss.getSheetByName("Used Internet").getRange('A:A').setValue('Needs Updated!');
  hideSheets();
}
