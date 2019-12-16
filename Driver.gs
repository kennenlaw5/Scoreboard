function driver(input) {
  switch(input) {
      
    case 'teamRows':
      var rows = get(input).split(',');
      for (var i in rows) rows[i] = parseInt(rows[i]);
      return rows;
      
    case 'finalTeamSize':
      return parseInt(get(input));
      
    case 'firstCARow':
      return 6;
      
    case 'teams':
      return ['Jeff', 'Ben', 'BW', 'Ace', 'Matt'];
      
    case 'types':
      return 2;
      
    case 'numCols':
      return 21;
      
    case 'difference':
      //Difference in rows between the first team on master and the first team on LoadingChart
      return 3;
      
    default:
      throw input + ' is an invalid option for driver().';
  }
}

function get (property) {
  return PropertiesService.getScriptProperties().getProperty(property);
}

function set (property, value) {
  if (typeof property !== 'string') throw 'set(property) can only be of type "string"';
  
  if (typeof value !== 'string' && typeof value !== 'number') throw 'set(value) can only be of type "string" or "number"';
  
  PropertiesService.getScriptProperties().setProperty(property, value);
}

function test() {
  set('finalTeamSize', 7);
  set('teamRows','12,19,26,32');
}