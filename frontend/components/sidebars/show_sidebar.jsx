var React = require('react');

var AccountTypeIndex = require('../account_type_index'),
    ComponentActions = require('../../actions/component_actions');

var AccountShowSidebar = React.createClass({

  handleAccountTypeClick: function (type) {

  },

  handleAccountClick: function () {
    this.props.accountClick();
  },


  render: function () {
    var that = this,
        accounts = this.props.accounts,
        accountTypes = ComponentActions.getAccountTypes(accounts),
        accountsArr = ComponentActions.getAccountsArr(accounts),
        mappedAccountTypes = this.getMappedAccountTypes(accountTypes),
        transactionMappedAccounts = this.getTransactionMappedAccounts(accountsArr);


    return (
      <section className="root-content-sidebar-show">
        <h1>Type</h1>
        {mappedAccountTypes}
        <h1>Accounts</h1>
        <a href="#/">
          <h3 className="account-types-show-type">All Accounts</h3>
        </a>
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
      return (
        <a key={index} href={"#/accounts/" + account.id}>
          <h3
            onClick={that.handleAccountClick.bind(null, account)}
            className="account-types-show-type">{account.name}</h3>
        </a>
      );
    });

    return transactionMappedAccounts;
  }


 });

module.exports = AccountShowSidebar;
