var React = require('react');

var AccountTypeIndex = require('../account_type_index');

var AccountShowSidebar = React.createClass({

  handleAccountTypeClick: function (type) {

  },

  handleAccountClick: function () {
    this.props.accountClick();
  },


  render: function () {
    var that = this,
        accounts = this.props.accounts,
        accountTypes = [],
        accountsArr = [];

    Object.keys(accounts).forEach(function(accountType) {
      if ( accounts[accountType].length > 0 ) {
        accountTypes.push(accountType);

        accounts[accountType].forEach(function(account){
          accountsArr.push(account);
        });
      }
    });

    var mappedAccountTypes = accountTypes.map(function(type){
      return (
        <h3
          onClick={that.handleAccountTypeClick.bind(null, type)}
          key={type}
          className="account-types-show-type">{type}</h3>
      );
    });

    var trasactionMappedAccounts = accountsArr.map(function(account, index){
      return (
        <a key={index} href={"#/accounts/" + account.id}>
          <h3
            onClick={that.handleAccountClick.bind(null, account)}
            className="account-types-show-type">{account.name}</h3>
        </a>
      );
    });

    return (
      <section className="root-content-sidebar-show">
        <h1>Type</h1>
        {mappedAccountTypes}
        <h1>Accounts</h1>
        <a href="#/">
          <h3 className="account-types-show-type">All Accounts</h3>
        </a>
        {trasactionMappedAccounts}
      </section>
    );
  }


 });

module.exports = AccountShowSidebar;
