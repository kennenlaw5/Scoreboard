function driver(input) {
  switch(input) {
    case 'teamRows':
      var rows = get(input).split(',');
      for (var i in rows) { rows[i] = parseInt(rows[i]); }
      return rows;
      break;
    case 'finalTeamSize':
      return parseInt(get(input));
      break;
    case 'firstCARow':
      var firstCARow = 6;
      return firstCARow;
      break;
    case 'teams':
      var teams = ['Merrie', 'Ben', 'Robb' ,'Josh', 'Liz', 'Portfolio'];
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

function get (property) {
  return PropertiesService.getScriptProperties().getProperty(property);
}

function set (property, value) {
  if (typeof property != 'string') { throw 'set(property) can only be of type "string"'; }
  if (typeof value != 'string' && typeof value != 'number') { throw 'set(value) can only be of type "string" or "number"'; }
  PropertiesService.getScriptProperties().setProperty(property, value);
}

function test() {
//  set('finalTeamSize', 3);
  set('teamRows','13,20,27,31,39');
}