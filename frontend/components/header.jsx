var React = require('react'),
    History = require('react-router').History;

var CurrentUserStore = require('../stores/current_user_store'),
    SessionsApiUtil = require('../util/sessions_api_util');

var Header = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return { currentUser: CurrentUserStore.currentUser()};
  },

  componentDidMount: function () {
    this.storeListener = CurrentUserStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.storeListener.remove();
  },

  _onChange: function () {
    this.setState({currentUser: CurrentUserStore.currentUser()});
  },

  handleOverviewClick: function () {
    this.props.overviewClick();
  },

  handleTransactionsClick: function () {
    this.props.transactionsClick();
  },

  logout: function () {
    SessionsApiUtil.logout(function () {
      this.history.pushState(null, "/login", {});
    }.bind(this));
  },

  render: function() {
    var overviewClass = "overview",
        transactionClass = "transaction";
    if (this.props.overviewClicked) {
      overviewClass = "content-header-list-selected";
    } else {
      transactionClass = "content-header-list-selected";
    }

    if (CurrentUserStore.isLoggedIn()) {
      return (
        <div>
          <header className="root-header">
            <nav className="root-header-nav group">

              <ul className="root-header-list group">
                <li>
                  <a href="#">Hi {this.state.currentUser.email}</a>
                </li>
                <li><a href="#">Accounts</a></li>
                <li><form onSubmit={this.logout}>
                  <button>Log Out</button></form></li>
              </ul>

            </nav>
          </header>
          <header className="content-header">
            <nav className="content-header-nav group">

              <h1 className="content-header-logo">
                <a href="#"><img className="mintmo-logo" src="http://i.imgur.com/lTEkRfz.png" alt="" /></a>
              </h1>

              <ul className="content-header-list group">
                <li className={overviewClass}><a onClick={this.handleOverviewClick} href="#">Overview</a></li>
                <li className={transactionClass}><a onClick={this.handleTransactionsClick} href="#">Transactions</a></li>
              </ul>

            </nav>
          </header>
        </div>
      );
    } else {
      return (
        <div>
        </div>
      );
    }

  },

});

module.exports = Header;
