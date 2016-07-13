var React = require('react');
var ReactRouter = require("react-router");
var Link = ReactRouter.Link;
var AnimalStore = require("../stores/AnimalStore.js");
var IllustrationStore = require('../stores/IllustrationStore.js');
var NounStore = require('../stores/NounStore.js');
var KeyMaster = require("keymaster");
var Icon = require('../components/_icon.jsx');
var Constants = require("../constants.jsx");

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

          <div className="view--share_wrapper">
            <p className="view--share_intro">Share on:</p>
            <ul className="view--share_list">
              <li className="view--share_item">
                <a
                  href={window.location.href}
                  onClick={this.handleTWShare}
                  className="view--share_link"
                >
                  <Icon
                    glyph="social-twitter"
                    className="factoid--illustration_credits_social_icon view--share_icon"
                  />
                </a>
              </li>
              <li className="view--share_item">
                <a
                  href={window.location.href}
                  onClick={this.handleFBShare}
                  className="view--share_link"
                >
                  <Icon
                    glyph="social-facebook"
                    className="factoid--illustration_credits_social_icon view--share_icon"
                  />
                </a>
              </li>
            </ul>
          </div>

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
          <a href={pic.artist.instagram}>
            <Icon
              glyph="social-instagram"
              className="factoid--illustration_credits_social_icon"
            />
          </a>
        </li>
      );
    }

    if ($fb) {
      $fb = (
        <li className="factoid--illustration_credits_social_item">
          <a href={pic.artist.facebook}>
            <Icon
              glyph="social-facebook"
              className="factoid--illustration_credits_social_icon"
            />
          </a>
        </li>
      );
    }

    if ($tw) {
      $tw = (
        <li className="factoid--illustration_credits_social_item">
          <a href={pic.artist.twitter}>
            <Icon
              glyph="social-twitter"
              className="factoid--illustration_credits_social_icon"
            />
          </a>
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
          <p>By: <a href={pic.artist.site}>{pic.artist.name}</a></p>
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
    if (props && props.key === 'space') {
      e.preventDefault();
      this.context.router.push( this.getNextRoute() );
    }
  },

  handleFBShare: function (e) {
    e.preventDefault();
    var text = [
      'A group of',
      this.props.params.animal,
      'is called',
      this.aAn(this.props.params.noun||''),
      this.props.params.noun,
      '😂😂'
    ].join(' ');
    var fb_link = ['http://www.facebook.com/sharer.php?s=100&',
      'p[title]=', encodeURIComponent(Constants.tagline),
      '&p[summary]=', encodeURIComponent(text),
      '&p[url]=', encodeURIComponent(e.currentTarget.href)
    ].join('')

    //Trigger a new window with the Facebook dialogue
    window.open(
      fb_link,
      'facebookwindow',
      'height=300, width=550, top='+(window.innerHeight/2 - 225) +', left='+window.innerWidth/2 +', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0'
    );
  },

  handleTWShare: function (e) {
    e.preventDefault();

    var loc = e.currentTarget.href;
    //Get the title of the link (which is our tweet...clever huh?)
    var text = [
      'A group of',
      this.props.params.animal,
      'is called',
      this.aAn(this.props.params.noun||''),
      this.props.params.noun,
      '😂😂',
      Constants.hashTag,
      loc
    ].join(' ');

    var tweet  = encodeURIComponent(text);
    var twitter_link = 'http://twitter.com/share?url=' + tweet + '&text=' + tweet;
    //Trigger a new window with the Twitter dialog, in the middle of the page
    window.open(
      twitter_link,
      'twitterwindow',
      'height=300, width=550, top='+(window.innerHeight/2 - 225) +', left='+window.innerWidth/2 +', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0'
    );
  },
});
module.exports = ViewLearn;
