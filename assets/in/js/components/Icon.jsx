var React        = require('react');

//Icon
module.exports = React.createClass({
  displayName: 'Icon',
  getInitialState: function() {
    var glyph = this.props.glyph;
    var wrapperClasses = this.props.classes || [];
    wrapperClasses.push('_icon', '_icon-' + glyph);
    return {
      glyph: glyph || 'star',
      wrapperClasses: wrapperClasses,
    };
  },
  fullName: function (href) {
    var hash = (href)
      ? '#'
      : '';
    return hash + '_icon-' + this.state.glyph;
  },

  render: function() {
    return (
      <svg className={this.state.wrapperClasses.join(' ')}>
        <use xlinkHref={this.fullName()} />
      </svg>
    )
  }
});
