var React = require('react');

var AccountTypeIndex = require('../account_type_index');

var IndexSidebar = React.createClass({
  getInitialState: function () {
    return { expanded: {} };
  },

  toggleExpand: function (type) {

    if (this.state.expanded[type] === undefined) {
      this.state.expanded[type] = false;
    } else {
      this.state.expanded[type] = !this.state.expanded[type];
    }

    this.forceUpdate();
  },

  totalAccountTypeBalance: function (accountType) {
    var sum = 0;

    this.props.accounts[accountType].forEach(function(account) {
      sum += parseFloat(account.balance_n);
    });

    return sum;
  },

  render: function () {
    var that = this,
        accounts = this.props.accounts,
        accountTypes = [],
        accountBalances = {},
        accountsArr = [];

    Object.keys(accounts).forEach(function(accountType) {
      if ( accounts[accountType].length > 0 ) {
        accountTypes.push(accountType);
        accountBalances[accountType] = that.totalAccountTypeBalance(accountType);
        accounts[accountType].forEach(function(account){
          accountsArr.push(account);
        });
      }
    });

    var mappedAccounts = accountTypes.map(function(type){
      var balanceClass = (accountBalances[type] > 0) ? "account-balance" : "account-balance-neg group";
      var expandedAccounts;
      if (that.state.expanded[type] === undefined || that.state.expanded[type]) {
        expandedAccounts = (
            <AccountTypeIndex
              accountClick={that.props.accountClick}
              transactionsClick={that.props.transactionsClick}
              accounts={accounts[type]}/>
        );
      }

      return (
          <div key={type} className="account-balance-headers group" >
            <div onClick={that.toggleExpand.bind(null, type)} className="type-background group">
              <h3   >{type}</h3>
              <h4 className={balanceClass} >${accountBalances[type]}</h4>
            </div>
          {expandedAccounts}
        </div>
      );
    });

    return (
      <section className="root-content-sidebar">
        <h1>Accounts</h1>
        {mappedAccounts}
      </section>
    );
  }
  
});


module.exports = IndexSidebar;
