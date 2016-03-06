var React = require('react');
var ReactRouter = require("react-router");

var ViewLookup = React.createClass({
  displayName: 'Lookup',
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
      <div className="view_container view_container-lookup">
        <div className="view_container--content">
          Lookup
        </div>
      </div>
    );
  },

  //---------------------------------------------------
  // Consumer-defined functions
  //--

});
module.exports = ViewLookup;
