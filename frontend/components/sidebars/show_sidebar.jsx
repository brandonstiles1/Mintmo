var React = require('react'),
    History = require('react-router').History;

var AccountTypeIndex = require('../account_type_index'),
    ComponentActions = require('../../actions/component_actions');

var AccountShowSidebar = React.createClass({
  mixins: [History],

  handleAccountTypeClick: function (type) {

  },

  handleAllAccountsClick: function () {
    if (this.props.allAccountsClick) {
      this.props.allAccountsClick();
    } else {
      this.history.pushState(null, '/', {});
    }
  },

  handleAccountClick: function (account) {
    this.history.pushState(null, 'accounts/' + account.id, {});
  },


  render: function () {
    var that = this,
        accounts = this.props.accounts,
        accountTypes = ComponentActions.getAccountTypes(accounts),
        accountsArr = ComponentActions.getAccountsArr(accounts),
        allAccountsClass = "account-types-show-type",
        mappedAccountTypes = this.getMappedAccountTypes(accountTypes),
        transactionMappedAccounts = this.getTransactionMappedAccounts(accountsArr);

    if (this.props.showAllAccounts) {
      allAccountsClass = "account-types-show-type selected-account";
    }

    return (
      <section className="root-content-sidebar-show">
        <h1>Type</h1>
        {mappedAccountTypes}
        <h1>Accounts</h1>

        <h3 onClick={this.handleAllAccountsClick} className={allAccountsClass}>All Accounts</h3>

        {transactionMappedAccounts}
      </section>
    );
  },

  getMappedAccountTypes: function (accountTypes) {
    var that = this;
    var mappedAccountTypes = accountTypes.map(function(type){
      return (
        <h3
          onClick={that.handleAccountTypeClick.bind(null, type)}
          key={type}
          className="account-types-show-type">{type}</h3>
      );
    });

    return mappedAccountTypes;
  },

  getTransactionMappedAccounts: function (accountsArr) {
    var that = this;
    var transactionMappedAccounts = accountsArr.map(function(account, index){
      var accountClass = "account-types-show-type";
      var accountId = parseInt(that.props.accountId);

      if (account.id === accountId) {
        accountClass = "account-types-show-type selected-account";
      }
      return (
        <a key={index} href={"#/accounts/" + account.id}>
          <h3
            onClick={that.handleAccountClick.bind(null, account)}
            className={accountClass}>{account.name}</h3>
        </a>
      );
    });

    return transactionMappedAccounts;
  }


 });

module.exports = AccountShowSidebar;
