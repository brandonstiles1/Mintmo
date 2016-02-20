var React = require('react');

var Footer = React.createClass({


  render: function () {
    return (
      <footer className="footer">
        <ul className="footer-links group">
          <li><a href="https://github.com/stevendikowitz/Mintmo">About Mintmo</a></li>
          <li><a href="https://github.com/stevendikowitz/Mintmo">Terms of Use</a></li>
          <li><a href="https://github.com/stevendikowitz/Mintmo">Privacy</a></li>
          <li><a href="https://github.com/stevendikowitz/Mintmo">Steven Dikowitz</a></li>
        </ul>
      </footer>
    );
  }
});


module.exports = Footer;
