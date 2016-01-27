var React = require('react'),
    History = require('react-router').History;

var AccountStore = require('../stores/account'),
    ApiUtil  = require('../util/api_util');

var AccountIndex = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return { accounts: AccountStore.all() };
  },

  componentDidMount: function () {
    ApiUtil.fetchAccounts();
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
    var accounts = this.state.accounts;
    var mappedAccounts = Object.keys(accounts).forEach(function(account_type) {
      return (
        <div>
          <h3>{account_type}</h3>
          <ul className="types">
            {accounts[account_type].forEach(function(account) {
              return <li
                onClick={that.handleClick.bind(null, account)}
                key={account.id}>{account.name}: {account.balance}</li>;})
            }
          </ul>
      </div>);
    });

    debugger

    // this.state.accounts.map(function(account, index) {
    //   return <li
    //     onClick={that.handleClick.bind(null, account)}
    //     key={index}>{account.name}: {account.balance}</li>;
    // });

    return (
      <div className="accounts">
        {mappedAccounts}
      </div>
    );
  }

});


module.exports = AccountIndex;
