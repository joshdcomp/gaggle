function Animal(){
    var factoid = $('.factoid');
    this.printLoc = factoid.find('.fact');
    this.animalNameLoc = factoid.find('.animal--name');;
    this.animalCollectiveLoc = factoid.find('.animal--collective');

}

Animal.prototype.printRand = function(){
    //get the key for the animal
    animalsOnly = Object.keys(this.animals);
    var pointer = Math.floor(Math.random() * animalsOnly.length);
    var animal = animalsOnly[pointer];

    //get the term we'll display this time
    var collective = this.animals[animal];
        collectiveInd = Math.floor(Math.random() * collective.length);
    var term = collective[collectiveInd];
    //print our stuff
    this.animalNameLoc.text(animal);
    this.animalCollectiveLoc.text(term);

}

Animal.prototype.init = function(animals){
    this.animals = $.parseJSON(animals);
    this.printRand();

    //there's a much better way of doing this, but not now
    var self = this;
    $('.factoid-button-do_get_next').on('click', function(){
        self.printRand();
    });

}

$(document).ready(function(){
    var animal = new Animal();

    $.ajax({
        url: 'http://joshdcompton.com/collective-nouns/nouns_api/',
    })
    .done(function( data ){
        var returned = $.parseJSON(data);

        if( returned.success ){
            var animals = returned.animals;
            animal.init( animals );
        }
        else{
            throw new Error('Didn\'t return successful');
        }

    });
});
