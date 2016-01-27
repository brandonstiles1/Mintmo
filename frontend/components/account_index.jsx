var React = require('react'),
    History = require('react-router').History;

var AccountStore = require('../stores/account'),
    ApiUtil  = require('../util/api_util'),
    AccountTypeIndex = require('./account_type_index');

var AccountIndex = React.createClass({
  mixins: [History],


  getInitialState: function () {
    return { accounts: AccountStore.all(), expanded: {} };
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

  totalAccountTypeBalance: function (accountType) {
    var sum = 0;

    this.state.accounts[accountType].forEach(function(account) {
      sum += parseFloat(account.balance_n);
    });

    return sum;
  },

  toggleExpand: function (type) {
    if (this.state.expanded[type] === undefined) {
      this.state.expanded[type] = false;
    } else {
      this.state.expanded[type] = !this.state.expanded[type];
    }

    this.onChange();
  },

  render: function () {
    var that = this;
    var accounts = this.state.accounts;
    var accountTypes = [];
    var accountBalances = {};

    Object.keys(accounts).forEach(function(accountType) {
      if ( accounts[accountType].length > 0 ) {
        accountTypes.push(accountType);
        accountBalances[accountType] = that.totalAccountTypeBalance(accountType);
      }
    });

    var mappedAccounts = accountTypes.map(function(type){
      var typeClass = (accountBalances[type] > 0) ? "account-type-headers group" : "account-type-headers-neg group";
      var expandedAccounts;
      if (that.state.expanded[type] === undefined || that.state.expanded[type]) {
        expandedAccounts = (
          <ul >
            <AccountTypeIndex accounts={accounts[type]}/>
          </ul>);
      }


      return (
        <div key={type} className="account-types">
          <div onClick={that.toggleExpand.bind(null, type)} className={typeClass}>
            <h3 >{type}</h3>
            <h4 >${accountBalances[type]}</h4>
          </div>
          {expandedAccounts}
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
