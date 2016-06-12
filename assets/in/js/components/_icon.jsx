var React = require('react');

//Icon
var Icon = React.createClass({
  displayName: 'Icon',
  getInitialState: function() {
    return {
    };
  },

  getDefaultProps: function() {
    return {
      glyph: 'star',
      className: '',
    };
  },

  fullName: function (href) {
    return ['#', href, '_icon-' + this.props.glyph].join('');
  },

  render: function() {
    var glyph = this.props.glyph;
    var wrapperClasses = [
      '_icon',
      '_icon-' + glyph,
      this.props.className
    ];

    return (
      <svg className={wrapperClasses.join(' ')}>
        <use xlinkHref={this.fullName()} />
      </svg>
    )
  }
});
module.exports = Icon;
