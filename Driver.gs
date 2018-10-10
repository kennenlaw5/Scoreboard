function driver(input){
  switch(input){
    case "teamRows":
      var teamRows = [11,18,26,34,42];
      return teamRows;
      break;
    case "finalTeamSize":
      var finalTeamSize = 4;
      return finalTeamSize;
      break;
    case "firstCARow":
      var firstCARow = 6;
      return firstCARow;
      break;
    case "teams":
      var teams = ["jeff","ben","robb","seth","dean"];
      return teams;
    default:
      Logger.log(input+" was invalid.");
      break;
  }
}
