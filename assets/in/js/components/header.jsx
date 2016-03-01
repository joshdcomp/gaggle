var React = require('react');

// Components
var ReactRouter = require("react-router");
var Link = ReactRouter.Link;
var IndexLink = ReactRouter.IndexLink;

module.exports = React.createClass({
  getInitialState: function() {
    return {
    }
  },
  componentDidMount: function() {
  },

  render: function() {
    var classes = [
      'header',
      this.headerState(),
    ];
    return (
      <header
        className={classes.join(' ')}
      >
        <div className="logo">
            logo
        </div>
      </header>
    )
  }
});
