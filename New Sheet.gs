function duplicate() {
  //Created By Kennen Lawrence
  //Version 1.3
  var ss=SpreadsheetApp.getActiveSpreadsheet();
  var ui = SpreadsheetApp.getUi();
  var template=ss.getSheetByName('Master');
  var primary=ss.getSheetByName("LoadingChart");
  var target;var rows=[];var j=0;var final=[];
  var numRows=primary.getLastRow()-2;var teamRows=[11,17,24,31,38];
  var range=primary.getRange(3,2,numRows,10).getValues();
  var rangefill=[];var check=false;var date;
  var curYear=primary.getRange(1,1).getDisplayValue();
  var input;var input2;
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
  target.getRange(6,6,numRows,19).setValues(rows);
  
  //Intentionally error out the Loading Chart to clean it up by deleting names from the reports
  ss.getSheetByName("Fresh Up").getRange('A:A').setValue('Needs Updated!');
  ss.getSheetByName("Phone Up").getRange('A:A').setValue('Needs Updated!');
  ss.getSheetByName("Internet Up").getRange('A:A').setValue('Needs Updated!');
}