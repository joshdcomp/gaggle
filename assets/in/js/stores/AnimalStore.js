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

  if ( animal && AnimalStore.collection[animal] ) {
    console.log(AnimalStore.collection[animal]);
    result = {
      'animal': animal,
      'nouns': AnimalStore.collection[animal]
    };
  }
  else {
    result = AnimalStore.collection;
  }
  return result;
};

AnimalStore.getRand = function() {
  //get the key for the animal
  var animalKeys = Object.keys(AnimalStore.collection);
  var pointer = Math.floor(Math.random() * animalKeys.length);
  var animal = animalKeys[pointer];

  //get the term we'll display this time
  var nouns = AnimalStore.collection[animal];

  return {
    'animal': animal,
    'nouns': nouns,
  };
};

module.exports = AnimalStore;
