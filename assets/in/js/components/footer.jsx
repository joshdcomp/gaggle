/**
 * REACT!!
 */
var React = require('react');

/**
 * Compontents
 */
var ReactRouter = require("react-router");
var Link = ReactRouter.Link;
var IndexLink = ReactRouter.IndexLink;

/**
 * Modules
 */


/**
 * The Module Actual
 */
var Footer = React.createClass({
  displayName: 'Footer',
  getInitialState: function() {
    return {
    }
  },
  componentDidMount: function() {
  },

  render: function() {
    var classes = [
      'footer',
      (this.props.className)
    ];
    return (
      <footer
        className={classes.join(' ')}
      >
        <p className="footer--legal">Copyright (c) {new Date().getFullYear()} Josh Compton. All Rights Reserved.</p>
      </footer>
    )
  }
});
module.exports = Footer;
