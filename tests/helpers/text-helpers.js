export function findMapText(selector, context) {
  var match = find(selector, context);
  var map = new Array(match.length);
  for (var i=0, l=map.length; i<l; i++) {
    map[i] = $(match[i]).text().trim();
  }
  return map;
}

export function findText(selector, context) {
  return find(selector, context).text().trim();
}

export function textEqual(selector, expectedText, msg){
  equal(findText(selector), expectedText, msg || '');
}

export function arrayEqual(selector, expectedArray, msg){
  deepEqual(findMapText(selector), expectedArray, msg || '');
}

