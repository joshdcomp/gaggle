var React = require('react');
var ReactRouter = require("react-router");

var ViewLookup = React.createClass({
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
      <div className="container-view_">
        Lookup
      </div>
    );
  },

  //---------------------------------------------------
  // Consumer-defined functions
  //--

});
module.exports = ViewLookup;
