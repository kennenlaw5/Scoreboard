function driver(input){
  switch(input){
    case 'teamRows':
      var teamRows = [10, 17, 23, 30, 38];
      return teamRows;
      break;
    case 'finalTeamSize':
      var finalTeamSize = 4;
      return finalTeamSize;
      break;
    case 'firstCARow':
      var firstCARow = 6;
      return firstCARow;
      break;
    case 'teams':
      var teams = ['Jeff', 'Ben', 'Robb' ,'Anna', 'Seth', 'Dean'];
      return teams;
      break;
    case 'types':
      var types = 2;
      return types;
      break;
    case 'difference':
      //Difference in rows between the first team on master and the first team on LoadingChart
      var diff = 3;
      return diff;
      break;
    default:
      Logger.log(input + ' was invalid.');
      break;
  }
}
