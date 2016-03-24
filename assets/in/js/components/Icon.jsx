var React        = require('react');

//Icon
module.exports = React.createClass({
  displayName: 'Icon',
  getInitialState: function() {
    return {
    };
  },
  getDefaultProps: function() {
    return {
      glyph: 'star',
    };
  },
  fullName: function (href) {
    return ['#', href, '_icon-' + this.props.glyph].join('');
  },

  render: function() {
    var glyph = this.props.glyph;
    var wrapperClasses = [
      '_icon',
      '_icon-' + glyph
    ];

    if (this.props.classes) {
      wrapperClasses.push(this.props.classes)
    }

    return (
      <svg className={wrapperClasses.join(' ')}>
        <use xlinkHref={this.fullName()} />
      </svg>
    )
  }
});
