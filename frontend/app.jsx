var React = require('react'),
    SessionsApiUtil = require('./util/sessions_api_util'),
    CurrentUserStore = require("./stores/current_user_store"),
    Header = require('./components/header');

var App = React.createClass({

  componentDidMount: function () {
    CurrentUserStore.addListener(this.forceUpdate.bind(this));
    SessionsApiUtil.fetchCurrentUser();
  },

  render: function() {
    if (!CurrentUserStore.userHasBeenFetched()) {
      return <p>PLEASE WAIT</p>;
    }


    return (
      <div>

        { this.props.children }
      </div>
    );
  },

});

module.exports = App;
