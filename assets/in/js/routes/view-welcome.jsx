var React = require("react");
var ReactRouter = require("react-router");
var Link = ReactRouter.Link;
var KeyMaster = require("keymaster");
var Constants = require("../constants.jsx");
var IllustrationStore = require('../stores/IllustrationStore.js');

var ViewWelcome = React.createClass({
  displayName: 'ViewWelcome',
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
  },

  // componentDidMount: function() {},

  componentWillUnmount: function() {
  },
  //---------------------------------------------------
  // Render Functions
  //--
  render: function() {
    var pic = IllustrationStore.get('geese', 'gaggle');
    var alt = (pic.hasOwnProperty('alt'))
      ? pic.alt
      : ['A ', this.props.params.noun, ' of ', this.props.params.animal, ' by ', pic.artist.name];

    var title = (pic.hasOwnProperty('title'))
      ? pic.title
      : ['A ', this.props.params.noun, ' of ', this.props.params.animal, ' by ', pic.artist.name];

    return (
      <div className="view view-welcome">
        <div className="view--content">
          <div className="scaffold scaffold--one_half">
            <h2 className="view--title">Welcome!</h2>
            <dfn className="definition">
              <strong className="definition--term">Gaggle [gag-uh l]</strong> : <em className="definition--taxonomy">n.</em> a fun way to learn about collective nouns
            </dfn>

            <p>Collective nouns are special names for groups of animals. For example: <Link to="/learn/geese/gaggle">A group of geese is called a gaggle.</Link></p>

            <p><a href={Constants.blogPost}>Read more about how Gaggle was made</a></p>

            <h3>What can you do here?</h3>

            <ul className="yes_list">
              <li>
                <Link to="/learn"><strong className="bg_color--learn">Learn</strong></Link> random collective nouns
              </li>
              <li>
                <Link to="/lookup"><strong className="bg_color--lookup">Lookup</strong></Link> what animals can be called
              </li>
              <li>
                <Link to="/submit"><strong className="bg_color--submit">Submit</strong></Link> your own ideas
              </li>

              <li>
                <a href={Constants.ios.link}><strong className="bg_color--ios">Install the iOS app!</strong></a>
              </li>
            </ul>
          </div>

          <div className="scaffold scaffold--one_half padding-top-large">
            <img
              className="factoid--img"
              src={pic.src}
              alt={alt}
              title={title}
            />
          </div>

          <div className="scaffold scaffold--one_half">
            <h3>More about the iOS app:</h3>
              <ul className="yes_list">
                {Constants.ios.features.map(function (feature, i) {
                  return (<li key={i}>{feature}</li>);
                }.bind(this))}
              </ul>
            <p>
              Take pictures and make your own collective nouns with the&nbsp;
              <a
                href={Constants.ios.link}
              >iOs app</a>
            </p>
          </div>
          <div className="scaffold scaffold--one_half">
            <img
              className="factoid--img"
              src={Constants.ios.pic.src}
              alt={Constants.ios.pic.alt}
              title={Constants.ios.pic.title}
            />
          </div>
        </div>
      </div>
    );
  },

  //---------------------------------------------------
  // Consumer-defined functions
  //--

});
module.exports = ViewWelcome;
