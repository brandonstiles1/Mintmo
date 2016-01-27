var React = require('react'),
    History = require('react-router').History;

var AccountStore = require('../stores/bench'),
    ApiUtil  = require('../util/api_util');

var AccountIndex = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return { accounts: AccountStore.all() };
  },

  componentDidMount: function () {
    this.storeListener = AccountStore.addListener(this.onChange);
  },

  onChange: function () {
    this.setState({accounts: AccountStore.all()});
  },

  componentWillUnmount: function () {
    this.storeListener.remove();
  },

  handleClick: function (account) {
    this.history.pushState(null, '/accounts/' + account.id, {});
  },

  render: function () {
    var that = this;
    var mappedAccounts = this.state.accounts.map(function(account, index) {
      return <li
        onClick={that.handleClick.bind(null, account)}
        key={index}>{account.name}: {account.balance}</li>;
    });

    return (
      <ul className="accounts">
        {mappedAccounts}
      </ul>
    );
  }

});


module.exports = AccountIndex;
