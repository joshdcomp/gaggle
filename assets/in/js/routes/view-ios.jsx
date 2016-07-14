var React = require("react");
var ReactRouter = require("react-router");
var Link = ReactRouter.Link;
var Constants = require("../constants.jsx");

var ViewIOS = React.createClass({
  displayName: 'ViewIOS',
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
    return (
      <div className="view view-ios_splash">
        <div className="view--content">
          <div className="scaffold scaffold--one_half">
            <h2>More about the iOS app:</h2>
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

module.exports = ViewIOS;
