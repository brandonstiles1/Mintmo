var React = require('react');

module.exports = {

  getOverviewClass: function (clicked) {
    if (clicked) {
      return "content-header-list-selected";
    } else {
      return "overview";
    }
  },

  getTransactionClass: function (clicked) {
    if (clicked) {
      return "content-header-list-selected";
    } else {
      return "transaction";
    }
  },

  getAccountTypes: function (accounts) {
    var accountTypes = [];

    Object.keys(accounts).forEach(function(accountType) {
      if ( accounts[accountType].length > 0 ) {
        accountTypes.push(accountType);
      }
    });

    return accountTypes;
  },

  totalAccountTypeBalance: function (accounts, accountType) {
    var sum = 0;
    accounts[accountType].forEach(function(account) {
      sum += parseFloat(account.balance_n);
    });

    return sum;
  },

  getAccountBalances: function (accounts) {
    var accountBalances = {};
    var that = this;
    Object.keys(accounts).forEach(function(accountType) {
      if ( accounts[accountType].length > 0 ) {
        accountBalances[accountType] = that.totalAccountTypeBalance(accounts, accountType);
      }
    });

    return accountBalances;
  },

  getAccountsArr: function (accounts) {
    var accountsArr = [];

    Object.keys(accounts).forEach(function(accountType) {
      if ( accounts[accountType].length > 0 ) {
        accounts[accountType].forEach(function(account){
          accountsArr.push(account);
        });
      }
    });

    return accountsArr;
  },

  formatDate: function (datetime) {
    var date = new Date(datetime);

    return (
      [date.getMonth()+1,
       date.getDate(),
       date.getFullYear()].join('/')
    );
  }

};
