// This is definitely not the end result, defininitely not flex,
// but the store doesn't change so...
var _Illustrations = require('./data/illustrations.json');
var IllustrationStore = {
  'collection': _Illustrations,
};

// `noun` is optional. If noun is defined and exists, send that, else
// send the whole thing. If id is passed and there's a match in the
// array, send that. Else, return null
IllustrationStore.get = function(animal, noun, key) {
  console.log(this.collection, animal, noun);
  if (!animal || !noun) return false;

  var result = false;

  if ( IllustrationStore.collection.hasOwnProperty(animal)
       && IllustrationStore.collection[animal].hasOwnProperty(noun)
  ) {
    // IllustrationStore[animal][noun] should be an array,
    // so no need to check hasOwnProperty
    result = IllustrationStore[animal][noun][key] || false;
  }

  return result;
};

//Definitely needs some work
IllustrationStore.getRand = function(animal, noun) {
  if (!animal || !noun) return false;

  var result = null;
  var pics = IllustrationStore[animal][noun];

  return pics[ Math.floor(Math.random() * pics.length) ];
};

IllustrationStore.hasPic = function(animal, noun) {
  console.log(this.collection);
  if (!animal || !noun) return false;

  return IllustrationStore.hasOwnProperty(animal)
      && IllustrationStore.animal.hasOwnProperty(noun)
      && IllustrationStore.animal.noun.length > 0;
};

module.exports = IllustrationStore;
