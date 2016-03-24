// This is definitely not the end result, defininitely not flex,
// but the store doesn't change so...
var _Nouns = require('./data/nouns.json');
var NounStore = {
  'collection': _Nouns,
};

// `noun` is optional. If noun is defined and exists, send that, else
// send the whole thing. If id is passed and there's a match in the
// array, send that. Else, return null
NounStore.get = function(noun) {
  var result = null;

  if ( noun && NounStore.hasOwnProperty(noun) ) {
    result = NounStore[noun];
  }
  else {
    result = NounStore.collection;
  }
  return result;
};

NounStore.getRand = function(animal) {
  //get the key for the animal
  var nounsKeys = Object.keys(NounStore.collection);
  var pointer = Math.floor(Math.random() * nounsKeys.length);
  var noun = nounsKeys[pointer];

  //get the term we'll display this time
  var animals = NounStore.collection[noun];

  return {
    'noun': noun,
    'animals': animals,
  };
};

module.exports = NounStore;
