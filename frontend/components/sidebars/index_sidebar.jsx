var React = require('react');

var AccountTypeIndex = require('../account_type_index'),
    ComponentActions = require('../../actions/component_actions');

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
        accountTypes = ComponentActions.getAccountTypes(accounts),
        accountBalances = ComponentActions.getAccountBalances(accounts),
        accountsArr = ComponentActions.getAccountsArr(accounts),
        mappedAccountTypes = this.getMappedAccountTypes(accountTypes, accountBalances, accounts);

    return (
      <section className="root-content-sidebar">
        <h1>Accounts</h1>
        {mappedAccountTypes}
      </section>
    );
  },

  getMappedAccountTypes: function (accountTypes, accountBalances, accounts) {
    var that = this;
    var mappedAccountTypes = accountTypes.map(function(type){
      var balanceClass = ComponentActions.getAccountBalanceClass(accountBalances[type]);
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

    return mappedAccountTypes;
  },

});


module.exports = IndexSidebar;
