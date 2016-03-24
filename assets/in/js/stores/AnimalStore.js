// This is definitely not the end result, defininitely not flex,
// but the store doesn't change so...
var _Animals = require('./data/animals.json');
var AnimalStore = {
  'collection': _Animals,
};

// `id` is optional. If the id is anything other than a number, send
// the whole thing. If id is passed and there's a match in the array,
// send that. Else, return null
AnimalStore.get = function(animal) {
  var result = null;

  if ( animal ) {
    result = AnimalStore.collection[animal];
  }
  else {
    result = AnimalStore.collection;
  }
  return result;
};

AnimalStore.getRand = function(animal) {
  if (animal) {
    var nouns = AnimalStore.collection[animal];
    return nouns[Math.floor(Math.random() * nouns.length)];
  }
  else {
    var animalKeys = Object.keys(AnimalStore.collection);
    var pointer = Math.floor(Math.random() * animalKeys.length);
    return animalKeys[pointer];
  }
};

module.exports = AnimalStore;
