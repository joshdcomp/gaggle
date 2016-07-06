var React = require("react");
var ReactRouter = require("react-router");
var Link = ReactRouter.Link;
var KeyMaster = require("keymaster");
var Constants = require("../constants.jsx");

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
    return (
      <div className="view view-welcome">
        <div className="view--content">
          <h2 className="view--title">Welcome!</h2>
          <p>Gaggle is a fun way to learn about collective nouns.</p>

          <h3>Get the iOS app!</h3>
          <p>
            Take pictures and make your own collective nouns with the&nbsp;
            <a
              href={Constants.iosLink}
            >iOs app</a>
          </p>
        </div>
      </div>
    );
  },

  //---------------------------------------------------
  // Consumer-defined functions
  //--

});
module.exports = ViewWelcome;
