var React = require('react');
var ReactRouter = require("react-router");
var Link = ReactRouter.Link;
var AnimalStore = require("../stores/AnimalStore.js");
var IllustrationStore = require('../stores/IllustrationStore.js');
var NounStore = require('../stores/NounStore.js');

var ViewLearn = React.createClass({
  displayName: 'ViewLearn',
  //---------------------------------------------------
  // React Lifecycle/Defaults
  //--
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState: function() {
    return {};
  },

  // getDefaultProps: function() {
  //   return {

  //   };
  // },

  componentWillMount: function() {
    // When we're on the index view there won't be any animal param,
    // so we get one and transition there if need be
    var animal = this.props.params.animal || AnimalStore.getRand();
    var noun = this.props.params.noun || AnimalStore.getRand(animal);

    var nouns = AnimalStore.get(this.props.params.animal);

    var route = [
      '/learn',
      animal,
      noun
    ];

    // Only put a pic in the route if it exists
    console.log(animal, noun);
    if ( !this.props.params.pic && IllustrationStore.hasPic(animal, noun) || IllustrationStore.hasPic(animal, noun) ) {
      route.push( IllustrationStore.getRand(animal, noun) );
      this.context.router.push(route.join('/'));
      return false;
    }

    if (!this.props.params.animal) {
      this.context.router.push(route.join('/'));
      return false;
    }

    if (!nouns || nouns.indexOf(this.props.params.noun) < 0) {
      this.context.router.push(['/submit', animal, noun].join('/'))
      return false;
    }
  },

  // componentDidMount: function() {

  // },

  // componentWillUnmount: function() {

  // },
  //---------------------------------------------------
  // Render Functions
  //--
  render: function() {
    return (
      <div className="view view-learn">
        <div className="view--content">
          <h2 className="view--title">Did you know...</h2>

          {this.renderFactoid()}

          {this.renderNextLink()}
        </div>
      </div>
    );
  },

  renderFactoid: function() {
    var classes = [
      'view--factoid',
      'factoid',
    ];
    var $pic = '';
    console.log(this.props.params.pic, IllustrationStore.get(this.props.params.pic));
    if ( this.props.params.pic && IllustrationStore.get(this.props.params.pic) ) {
      /**
       * Expected object for a pic from the illustration store:
       * {
       *   "src": "/assets/out/geese-gaggle-1.svg",
       *   "alt": "",
       *   "title": "",
       *   "artist": {
       *     "name": "Gabe Cooper",
       *     "site": "http://www.gabecooper.com/",
       *     "instagram": "https://www.instagram.com/gabeorlacooper/"
       *   }
       * }
       */
      var pic = IllustrationStore.get(this.props.params.pic);

      var alt = (pic.hasOwnProperty('alt'))
        ? pic.alt
        : ['A ', this.props.params.noun, ' of ', this.props.params.animal, ' by ', pic.artist.name];

      var title = (pic.hasOwnProperty('title'))
        ? pic.title
        : ['A ', this.props.params.noun, ' of ', this.props.params.animal, ' by ', pic.artist.name];

      $pic = (
        <img
          className="factoid--img"
          src={pic.src}
          alt={alt}
          title={title}
        />
      );
      console.log($pic);
      classes.push('factoid-has_pic')
    }

    return (
      <div className={classes.join(' ')}>
        <p className="factoid--fact">A group of <strong>{this.props.params.animal}</strong> is called {this.aAn(this.props.params.noun||'')} <strong>{this.props.params.noun}</strong>.</p>
        {$pic}
      </div>
    );
  },

  // Returns appropriate a or an for a word
  // @TODO implement logic for H and Y
  aAn: function(word) {
    return (['a', 'e', 'i', 'o', 'u'].indexOf( word.charAt(0) ) < 0) ? 'a' : 'an';
  },

  renderNextLink: function() {
    var animal = AnimalStore.getRand();
    var noun = AnimalStore.getRand(animal);

    var route = [
      '/learn',
      animal,
      noun
    ];

    // Only put a pic in the route if it exists
    if ( !this.props.params.pic && IllustrationStore.hasPic(animal, noun) ) {
      route.push( IllustrationStore.getRand(animal, noun) );
    }

    return(
      <div className="view--cta_wrapper">
        <Link
          to={route.join('/')}
          className="button button-learn"
        >Another!</Link>
      </div>
    );
  },
  //---------------------------------------------------
  // Consumer-defined functions
  //--

});
module.exports = ViewLearn;
