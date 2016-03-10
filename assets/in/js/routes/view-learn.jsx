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
    if (!this.props.params.hasOwnProperty('animal')) {
      this.context.router.push('/learn/' + AnimalStore.getRand().animal);
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
    var map = ( this.props.params.animal )
      ? AnimalStore.get(this.props.params.animal)
      : AnimalStore.getRand();

    var animal = map.animal || '';
    var nouns = map.nouns || [];
    var noun = nouns[ Math.floor( Math.random() * nouns.length )];

    // IllustrationStore.get and getRand will either pass a relative url or false
    var pic = (this.props.params.hasOwnProperty('pic'))
      ? IllustrationStore.get(this.props.params.pic)
      : IllustrationStore.getRand(this.props.params.pic);

    var $pic = (pic)
      ? (
          <img
            className="factoid--img"
            src={pic}
            alt={'A ' + noun + ' of ' + animal}
            title={'A group of ' + animal + 'is called a ' + noun}
          />
        )
      : '';

    var classes = [
      'view--factoid',
      'factoid',
      (pic) ? 'factoid-has_pic': '',
    ];


    return (
      <div className={classes.join(' ')}>
        <p>A group of <strong>{animal}</strong> is called a <strong>{noun}</strong>.</p>
      </div>
    );
  },

  renderNextLink: function() {
    var animal = AnimalStore.getRand().animal;
    var pic = ( IllustrationStore.getRand(animal) )
      ? '/' + IllustrationStore.getRand(animal)
      : '';
    return(
      <div className="view--cta_wrapper">
        <Link
          to={'/learn/' + animal + pic}
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
