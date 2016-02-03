var React = require('react');

var Footer = React.createClass({


  render: function () {
    return (
      <footer className="footer">
        <ul className="footer-links group">
          <li><a href="https://github.com/stevendikowitz">About Mintmo</a></li>
          <li><a href="https://github.com/stevendikowitz">Terms of Use</a></li>
          <li><a href="https://github.com/stevendikowitz">Privacy</a></li>
          <li><a href="https://github.com/stevendikowitz">Steven Dikowitz</a></li>
        </ul>
      </footer>
    );
  }
});


module.exports = Footer;
