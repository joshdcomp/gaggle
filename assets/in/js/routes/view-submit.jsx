var React = require('react');
var ReactRouter = require("react-router");

var ViewSubmit = React.createClass({
  displayName: 'Submit',
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

  // componentWillMount: function() {
  // },

  //---------------------------------------------------
  // Render Functions
  //--
  render: function() {
    var $idea = (this.props.params.animal && this.props.params.noun)
      ? (<p>Unfortunately a group of {this.props.params.animal} of {this.props.params.noun} doesn't exist (yet!).</p>)
      : '';
    return (
      <div className="view view-submit">
        <div className="view--content">
          <p>We're really so happy you're interested in Gaggle and want to contribute ideas.</p>
          {$idea}
          <p>Please email me at josh@joshdcompton.com with noun ideas or images</p>
        </div>
      </div>
    );
  },

  //---------------------------------------------------
  // Consumer-defined functions
  //--

});
module.exports = ViewSubmit;
