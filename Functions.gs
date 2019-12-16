function addCA(team, caName, caDSName) {
  //Created by Kennen Lawrence
  //Version 1.0
  var ss            = SpreadsheetApp.getActiveSpreadsheet();
  var ui            = SpreadsheetApp.getUi();
  var master        = ss.getSheetByName("Master");
  var lChart        = ss.getSheetByName("LoadingChart");
  var teamRows      = driver("teamRows");
  var teams         = driver("teams");
  var finalTeamSize = driver("finalTeamSize");
  var check         = false;
  var teams         = driver('teams');
  var firstCARow    = driver('firstCARow');
  var wasLastTeam   = false;
  var range, forms, values, types, current, replace, first;
  
  if (!team) {
    team = ui.prompt('CA Team', 'Please type the team of the new Client Advisor in the box below.'
                     , ui.ButtonSet.OK_CANCEL);
    
    if (team.getSelectedButton() === ui.Button.CANCEL) return;
  }
  
  while (!check) {
    for (var i = 0; i < teams.length && !check; i++) {
      if (team.getResponseText().toLowerCase() === teams[i].toLowerCase()) {
        check = true;
        team  = [driver('firstCARow')].concat(driver('teamRows'));
        
        if (i + 1 < teams.length) {
          team = team[i+1] - 1;
        } else { 
          team = team[i] + finalTeamSize - 1;
          wasLastTeam = true;
        }
      }
    }
    
    if (!check) {
      ui.alert('Error', 'You have entered an invalid team name. The teams currently are: ' 
               + teams.toString().split(',').join(', '), ui.ButtonSet.OK);
      team = ui.prompt('CA Team', 'Please type the team of the new Client Advisor in the box below.'
                       , ui.ButtonSet.OK_CANCEL);
      
      if (team.getSelectedButton() === ui.Button.CANCEL) return;
    }
  }
  
  if (!caName) {
    caName = ui.prompt('CA Name', 'Please type the name of the new Client Advisor, as it will appear'
                       + ' on Sales Activity Daily, in the box below.', ui.ButtonSet.OK_CANCEL);
    
    if (caName.getSelectedButton() === ui.Button.CANCEL) return;
  }
  
  if (!caDSName) {
    caDSName = ui.prompt('CA Name', 'Please type the name of the new Client Advisor, as it appears'
                         + ' in Dealersocket, in the box below.', ui.ButtonSet.OK_CANCEL);
    
    if (caDSName.getSelectedButton() === ui.Button.CANCEL) return;
  }
  
  caName   = caName.getResponseText();
  caDSName = caDSName.getResponseText();
  types    = driver('types') + 1; // Plus one to include "Totals"
  current  = team;
  
  for (i = 0; i < types; i++) {
    range  = master.getRange(current, 1, 1, master.getLastColumn());
    forms  = range.getFormulas();
    values = range.getValues();
    
    if (i == 0) {
      replace    = forms[0][5].replace('=F','').split('+');
      replace[0] = parseInt(replace[0]);
      replace[1] = parseInt(replace[1].replace('F',''));
    }
    
    for (var j = 0; j < values[0].length; j++) {
      if (forms[0][j] != '' && forms[0][j] != null && forms[0][j] != undefined) {
        if (i == 0) {
          for (var k = 0; k < replace.length; k++) {
            forms[0][j] = forms[0][j].replace(replace[k],(replace[k] + 1 + k));
          }
        }
        
        values[0][j] = forms[0][j];
      }
    }
    
    if (i !== 0) { 
      forms[0][0] = parseInt(forms[0][0].replace('=A', ''), 10);
      forms[0][0]--;
      values[0][0] = '=A' + forms[0][0];
    }
    
    master.insertRowBefore(current);
    
    if (i !== 0) range.setValues(values);
    
    current++;
    
    if (i == 0) {
      first = values;
      master.getRange(current, 1).setValue(caName);
    }
    
    current += teamRows[teamRows.length-1] + finalTeamSize;
  }
  
  master.getRange(team, 1, 1, master.getLastColumn()).setValues(first);
  
  caName  = caDSName;
  types   = driver('types');
  current = team - driver('difference');
  
  for (i = 0; i < types; i++) {
    range  = lChart.getRange(current, 1, 1, lChart.getLastColumn());
    forms  = range.getFormulas();
    values = range.getValues();
    
    for (var j = 0; j < values[0].length; j++) {
      if (forms[0][j] !== '' && forms[0][j] !== null && forms[0][j] !== undefined) {
        values[0][j] = forms[0][j];
      }
    }
    
    if (i != 0) {
      forms[0][0] = parseInt(forms[0][0].replace('=A',''));
      forms[0][0]--;
      values[0][0] = '=A' + forms[0][0];
    }
    
    lChart.insertRowBefore(current);
    range.setValues(values);
    current++;
    
    if (i == 0) lChart.getRange(current, 1).setValue(caName);
    
    current += teamRows[teamRows.length-1] - driver('difference') + finalTeamSize;
  }
  
  if (!wasLastTeam) {
    check = false;
    team++;
    
    for (i = 0; i < teamRows.length; i++) {
      if (check || teamRows[i] === team) {
        check = true;
        teamRows[i]++;
      }
    }
    
    teamRows = teamRows.toString();
    set('teamRows', teamRows);
  } else {
    set('finalTeamSize', driver('finalTeamSize') + 1);
  }
  
  ss.toast('"' + caName + '" was added successfully!', 'Complete');
}

function removeCA(team, caName) {
  //Created by Kennen Lawrence
  //Version 1.0
  var ss            = SpreadsheetApp.getActiveSpreadsheet();
  var ui            = SpreadsheetApp.getUi();
  var master        = ss.getSheetByName('Master');
  var lChart        = ss.getSheetByName('LoadingChart');
  var teamRows      = driver('teamRows');
  var teams         = driver('teams');
  var finalTeamSize = driver('finalTeamSize');
  var check         = false;
  var teams         = driver('teams');
  var firstCARow    = driver('firstCARow');
  var wasLastTeam   = false;
  var types, current, teamCAs, teamSize, teamStart;
  
  if (!team) {
    team = ui.prompt('CA Team', 'Please type the team of the Client Advisor you wish to delete in the box below.'
                     , ui.ButtonSet.OK_CANCEL);
    
    if (team.getSelectedButton() === ui.Button.CANCEL) return;
  }
  
  while (!check) {
    for (var i = 0; i < teams.length && !check; i++) {
      if (team.getResponseText().toLowerCase() === teams[i].toLowerCase()) {
        check     = true;
        teamStart = [firstCARow - 1].concat(teamRows);
        
        if (i + 1 < teams.length) {
          teamSize  = teamStart[i + 1] - 1 - teamStart[i];
          teamStart = teamStart[i] + 1;
        } else {
          teamSize    = finalTeamSize;
          teamStart   = teamStart[i] + 1;
          wasLastTeam = true;
        }
      }
    }
    
    if (!check) {
      ui.alert('Error', 'You have entered an invalid team name. The teams currently are: '
               + teams.toString().split(',').join(', '), ui.ButtonSet.OK);
      team = ui.prompt('CA Team', 'Please type the team of the Client Advisor you wish to delete in the box below.'
                       , ui.ButtonSet.OK_CANCEL);
      
      if (team.getSelectedButton() === ui.Button.CANCEL) return;
    }
  }
  
  check   = false;
  teamCAs = master.getRange(teamStart, 1, teamSize).getDisplayValues();
  
  if (!caName) {
    caName = ui.prompt('CA Name', 'Please type the name of the Client Advisor you wish to delete,\nas appear(s/ed)'
                       + ' on Sales Activity Daily, in the box below.', ui.ButtonSet.OK_CANCEL);
    
    if (caName.getSelectedButton() === ui.Button.CANCEL) return;
  }
  
  while (!check) {
    for (i = 0; i < teamCAs.length; i++) {
      if (caName.getResponseText().toLowerCase() === teamCAs[i][0].toLowerCase()) {
        check = true;
        team  = teamStart + i;
      }
    }
    
    if (!check) {
      ui.alert('Error', '"' + caName.getResponseText() + '" was not found in team ' + team.getResponseText()
      + '. Please type a different CA Name.', ui.ButtonSet.OK);
      
      caName = ui.prompt('CA Name', 'Please type the name of the Client Advisor you wish to delete,\nas appear(s/ed)'
                         + ' on Sales Activity Daily, in the box below.', ui.ButtonSet.OK_CANCEL);
      
      if (caName.getSelectedButton() === ui.Button.CANCEL) return;
    }
  }
  
  caName  = caName.getResponseText();
  types   = driver('types') + 1; // Plus one to include "Totals"
  current = team;
  
  for (i = 0; i < types; i++) {
    master.deleteRow(current);
    current += teamRows[teamRows.length - 1] + finalTeamSize - 1;
  }
  
  types   = driver('types');
  current = team - driver('difference');
  
  for (i = 0; i < types; i++) {
    lChart.deleteRow(current);
    current += teamRows[teamRows.length - 1] - driver('difference') + finalTeamSize - 1;
  }
  
  if (!wasLastTeam) {
    check = false;
    team  = teamStart + teamSize;
    
    for (i = 0; i < teamRows.length; i++) {
      if (check || teamRows[i] === team) {
        check = true;
        teamRows[i]--;
      }
    }
    
    teamRows = teamRows.toString();
    set('teamRows', teamRows);
  } else {
    set('finalTeamSize', driver('finalTeamSize') - 1);
  }
  
  ss.toast('"' + caName + '" was deleted successfully!', 'Complete');
}

function driverUpdateCheck(driverVal, type) {
  Logger.log('Passed Value: ' + driverVal);
  Logger.log('Before Set:');
  Logger.log(get(type));
  
  set(type, driverVal);
  
  Logger.log('After Set:');
  Logger.log(get(type));
}

function moveCA() {
  var ui = SpreadsheetApp.getUi();
  var initalTeam = ui.prompt('CA Team', 'Please type the initial team of the Client Advisor you wish to move in the box below.'
                       , ui.ButtonSet.OK_CANCEL);
  
  if (initalTeam.getSelectedButton() === ui.Button.CANCEL) return;
  
  var finalTeam = ui.prompt('CA Team', 'Please type the initial team of the Client Advisor you wish to move in the box below.'
                       , ui.ButtonSet.OK_CANCEL);
  
  if (finalTeam.getSelectedButton() === ui.Button.CANCEL) return;
  
  var caName = ui.prompt('CA Display Name', 'Please type the name of the Client Advisor you wish to move,\nas you would like'
                         + ' it to be desplayed, in the box below.', ui.ButtonSet.OK_CANCEL);
  
  if (caName.getSelectedButton() == ui.Button.CANCEL) return;
  
  var caDSName = ui.prompt('CA DealerSocket Name', 'Please type the name of Client Advisor as it appears'
                       + ' in Dealersocket, in the box below.', ui.ButtonSet.OK_CANCEL);
  
  if (caDSName.getSelectedButton() === ui.Button.CANCEL) return;
  
  removeCA(initalTeam, caName);
  
  addCA(finalTeam, caName, caDSName);
}
