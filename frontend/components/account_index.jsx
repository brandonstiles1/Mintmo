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
    var sum = 0;

    this.state.accounts[account_type].forEach(function(account) {
      sum += parseFloat(account.balance_n);
    });

    return sum;
  },

  render: function () {
    var that = this;
    var accounts = this.state.accounts;
    var account_types = [];
    var accountBalances = {};

    Object.keys(accounts).forEach(function(account_type) {
      if ( accounts[account_type].length > 0 ) {
        account_types.push(account_type);
        accountBalances[account_type] = that.totalAccountTypeBalance(account_type);
      }
    });

    var mappedAccounts = account_types.map(function(type){
      var typeClass = (accountBalances[type] > 0) ? "account-type-headers group" : "account-type-headers-neg group";
      return (
        <div key={type} className="account-types">
          <div className={typeClass}>
            <h3 >{type}</h3>
            <h4 >${accountBalances[type]}</h4>
          </div>

          <ul >
           {accounts[type].map(function(account, index){
            var currentAccount = account;

             return <li className="account-type-account group" key={index}  >
                      <p1 onClick={that.handleClick.bind(null, currentAccount)} >{account.name.slice(0, 18)}...</p1>
                      <p2 >{account.balance}</p2>
                    </li>;
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
