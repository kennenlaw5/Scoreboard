function duplicate() {
  //Created By Kennen Lawrence
  //Version 1.3
  var ss=SpreadsheetApp.getActiveSpreadsheet();
  var ui = SpreadsheetApp.getUi();
  var template=ss.getSheetByName('Master');
  var primary=ss.getSheetByName("LoadingChart");
  var target;var rows=[];var j=0;var final=[];
  var numRows=primary.getLastRow()-2;var teamRows=[13,20,27,35,42];
  var range=primary.getRange(3,2,numRows,10).getValues();
  var rangefill=[];var check=false;
  for(var i=0;i<teamRows.length;i++){
    rangefill[i]=template.getRange(parseInt(teamRows[i]),6,1,19).getFormulas();
  }
  var row=6;var forms=[];
  for(var i=0;i<numRows;i++){
    check=false;
    for(var k=0;k<teamRows.length;k++){
      if(parseInt(i)==parseInt(teamRows[k])-6){check=true;}
    }
    if(check==false){
      forms[0]="=IFERROR(G"+row+"/F"+row+',"N/A")';
      forms[1]="=IFERROR(K"+row+"/J"+row+',"N/A")';
      forms[2]="=IFERROR(M"+row+"/J"+row+',"N/A")';
      forms[3]="=IFERROR(Q"+row+"/P"+row+',"N/A")';
      forms[4]="=IFERROR(S"+row+"/P"+row+',"N/A")';
      forms[5]="=IFERROR(V"+row+"/J"+row+',"N/A")';
      rows[i]=[range[i][0],range[i][1],forms[0],"",range[i][2],range[i][4],forms[1],range[i][5],forms[2],"",range[i][6],range[i][8],forms[3],range[i][9],forms[4],"",range[i][3],forms[5],range[i][7]];
    }else if(check==true){
      rows[i]=rangefill[j][0];
      j+=1;
    }
    row+=1;
  }
  var input = ui.prompt('Enter Scoreboard Date','Enter the name of the sheet to be created:',ui.ButtonSet.OK_CANCEL);
  Logger.log(input.getResponseText());
  if (input.getSelectedButton() == ui.Button.OK) {
    template.copyTo(ss).setName(input.getResponseText());
    target=ss.getSheetByName(input.getResponseText());
    ss.setActiveSheet(target);
    target.getRange(6,6,numRows,19).setValues(rows);
    
    //Intentionally error out the Loading Chart to clean it up by deleting names from the reports
    ss.getSheetByName("Fresh Up").getRange('A:A').setValue('Needs Updated!');
    ss.getSheetByName("Phone Up").getRange('A:A').setValue('Needs Updated!');
    ss.getSheetByName("Internet Up").getRange('A:A').setValue('Needs Updated!');
  } else if (input.getSelectedButton() == ui.Button.CANCEL) {
    Logger.log('User cancelled');
  }
}