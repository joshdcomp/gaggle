// This is definitely not the end result, defininitely not flex,
// but the store doesn't change so...
var _Illustrations = require('./data/illustrations.json');
var IllustrationStore = {
  'collection': _Illustrations,
};

// `noun` is optional. If noun is defined and exists, send that, else
// send the whole thing. If id is passed and there's a match in the
// array, send that. Else, return null
IllustrationStore.get = function(noun) {
  var result = null;

  if ( noun && IllustrationStore.hasOwnProperty(noun) ) {
    result = IllustrationStore[noun];
  }
  else {
    result = IllustrationStore.collection;
  }
  return result;
};

//Definitely needs some work
IllustrationStore.getRand = function(noun) {
  var result = null;

  if ( noun && IllustrationStore.hasOwnProperty(noun) ) {
    result = IllustrationStore.collection;
  }
  else {
    console.log(IllustrationStore[noun]);
    result = IllustrationStore[noun];
  }
  return result;
};

module.exports = IllustrationStore;
