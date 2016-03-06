var React = require('react');
var ReactRouter = require("react-router");

var ViewSubmit = React.createClass({
  displayName: 'Submit',
  //---------------------------------------------------
  // React Lifecycle/Defaults
  //--
  mixins: [ ReactRouter.Navigation ],//you'll want this, trust me
  // getInitialState: function() {
  //   return {

  //   };
  // },

  // getDefaultProps: function() {
  //   return {

  //   };
  // },

  // componentWillMount: function() {

  // },

  // componentDidMount: function() {

  // },

  // componentWillUnmount: function() {

  // },
  //---------------------------------------------------
  // Render Functions
  //--
  render: function() {
    return (
      <div className="view_container view_container-submit">
        <div className="view_container--content">
          Submit
        </div>
      </div>
    );
  },

  //---------------------------------------------------
  // Consumer-defined functions
  //--

});
module.exports = ViewSubmit;
