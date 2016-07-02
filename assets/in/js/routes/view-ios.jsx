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
          <h2 className="view--title">iOS App!</h2>
          <p>
            Take pictures and make your own collective nouns with the&nbsp;
            <Link
              to={Constants.iosLink}
            >ios app</Link></p>
        </div>
      </div>
    );
  },

  //---------------------------------------------------
  // Consumer-defined functions
  //--

});

module.exports = ViewIOS;
