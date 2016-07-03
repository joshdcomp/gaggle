var React = require('react');
var ReactRouter = require("react-router");
var Link = ReactRouter.Link;
var AnimalStore = require("../stores/AnimalStore.js");
var IllustrationStore = require('../stores/IllustrationStore.js');
var NounStore = require('../stores/NounStore.js');
var KeyMaster = require("keymaster");
var Icon = require('../components/_icon.jsx');

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
    if (!this.props.params.animal) {
      this.context.router.push('/learn/geese/gaggle');
      return false;
    }

    var animal = this.props.params.animal;
    var noun = this.props.params.noun || AnimalStore.getRand(animal);

    var nouns = AnimalStore.get(this.props.params.animal);

    var route = [
      '/learn',
      animal,
      noun
    ];

    // Only put a pic in the route if it exists
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

  componentDidMount: function() {
    KeyMaster('space', this.handleKeyUp);
  },

  componentWillUnmount: function() {
    KeyMaster.unbind('space', this.handleKeyUp);
  },
  //---------------------------------------------------
  // Render Functions
  //--
  render: function() {
    return (
      <div className="view view-learn" onKeyUp={this.handleKeyUp}>
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

    if ( this.props.params.pic || IllustrationStore.get(this.props.params.animal, this.props.params.noun) ) {
      $pic = this.renderIllustration();
      classes.push('factoid-has_pic')
    }

    return (
      <div className={classes.join(' ')}>
        <p className="factoid--fact">
          A group of <strong>{this.props.params.animal}</strong> is called {this.aAn(this.props.params.noun||'')} <strong>{this.props.params.noun}</strong>.
        </p>
        {$pic}
      </div>
    );
  },

  renderNextLink: function() {
    return(
      <div className="view--cta_wrapper">
        <Link
          to={this.getNextRoute()}
          className="button button-learn"
        >Another!</Link>
      </div>
    );
  },

  renderIllustration: function () {
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
    var pic = IllustrationStore.get(this.props.params.animal, this.props.params.noun),
        $pic = '';
    console.log(pic);

    var alt = (pic.hasOwnProperty('alt'))
      ? pic.alt
      : ['A ', this.props.params.noun, ' of ', this.props.params.animal, ' by ', pic.artist.name];

    var title = (pic.hasOwnProperty('title'))
      ? pic.title
      : ['A ', this.props.params.noun, ' of ', this.props.params.animal, ' by ', pic.artist.name];

    var $ig = (pic.artist.hasOwnProperty('instagram')),
        $fb = (pic.artist.hasOwnProperty('facebook')),
        $tw = (pic.artist.hasOwnProperty('twitter'));

    if ($ig) {
      $ig = (
        <li className="factoid--illustration_credits_social_item">
          <Link to={pic.artist.instagram}>
            <Icon
              glyph="social-instagram"
              className="factoid--illustration_credits_social_icon"
            />
          </Link>
        </li>
      );
    }

    if ($fb) {
      $fb = (
        <li className="factoid--illustration_credits_social_item">
          <Link to={pic.artist.facebook}>
            <Icon
              glyph="social-facebook"
              className="factoid--illustration_credits_social_icon"
            />
          </Link>
        </li>
      );
    }

    if ($tw) {
      $tw = (
        <li className="factoid--illustration_credits_social_item">
          <Link to={pic.artist.twitter}>
            <Icon
              glyph="social-twitter"
              className="factoid--illustration_credits_social_icon"
            />
          </Link>
        </li>
      );
    }

    $pic = (
      <div
        className="factoid--illustration"
      >
        <img
          className="factoid--img"
          src={pic.src}
          alt={alt}
          title={title}
        />
        <div className="factoid--illustration_credits">
          <p>By: <Link to={pic.artist.site}>{pic.artist.name}</Link></p>
          <ul className="factoid--illustration_credits_social_list">
            {$fb}
            {$tw}
            {$ig}
          </ul>
        </div>
      </div>
    );

    return $pic;
  },
  //---------------------------------------------------
  // Consumer-defined functions
  //--
  getNextRoute: function() {
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

    return route.join('/');
  },
  // Returns appropriate a or an for a word
  // @TODO implement logic for H and Y
  aAn: function(word) {
    return (['a', 'e', 'i', 'o', 'u'].indexOf( word.charAt(0) ) < 0) ? 'a' : 'an';
  },

  handleKeyUp: function(e, props) {
    if (props.key === 'space') {
      e.preventDefault();
      this.context.router.push( this.getNextRoute() );
    }
  },
});
module.exports = ViewLearn;
