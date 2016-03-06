var React = require('react');
var ReactRouter = require("react-router");

var ViewLearn = React.createClass({
  displayName: 'ViewLearn',
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
      <div className="view_container view_container-learn">
        <div className="view_container--content">
          Learn
        </div>
      </div>
    );
  },

  //---------------------------------------------------
  // Consumer-defined functions
  //--

});
module.exports = ViewLearn;
