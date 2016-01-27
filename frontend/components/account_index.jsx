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

  totalAccountTypeBalance: function (account_type) {

  },

  render: function () {
    var that = this;
    var accounts = this.state.accounts;
    var account_types = [];

    Object.keys(accounts).forEach(function(account_type) {
      if ( accounts[account_type].length > 0 ) {
        account_types.push(account_type);
      }
    });

    var mappedAccounts = account_types.map(function(type){
      return (
        <div key={type} className="account-types">
          <h3>{type}</h3>
          <ul>
           {accounts[type].map(function(account){
             return <li className="account-type-account" onClick={that.handleClick.bind(null, account)} key={account.id}>{account.name}: {account.balance}</li>;
            })}
          </ul>
        </div>
      );
    });

    return (
      <div className="accounts">
        {mappedAccounts}
      </div>
    );
  }

});


module.exports = AccountIndex;
