var Store = require('flux/utils').Store;

var AppDispatcher = require('../dispatcher/dispatcher'),
    AccountConstants = require('../constants/account');


var _accounts = {};

var _accountSetup = function () {
  AccountConstants.ACCOUNT_TYPES.forEach(function(type){
    _accounts[type] = [];
  });
};

_accountSetup();


var resetAccounts = function (accounts) {
  _accountSetup();
  accounts.forEach(function(account) {
    _accounts[account.account_type].push(account);
  });
};

var addAccount = function (account) {
  _accounts[account.account_type].push(account);
};

var AccountStore = new Store(AppDispatcher);

AccountStore.all = function () {
  var accountsArray = [];
  Object.keys(_accounts).forEach(function(account_type) {
    _accounts[account_type].forEach(function(account) {
      accountsArray.push(account);
    });
  });

  return accountsArray;
};

AccountStore.__onDispatch = function (payload) {

  switch(payload.actionType) {
    case AccountConstants.ACCOUNTS_RECEIVED:
      resetAccounts(payload.accounts);
      AccountStore.__emitChange();
      break;
    case AccountConstants.ACCOUNT_RECEIVED:
      addAccount(payload.account);
      AccountStore.__emitChange();
      break;
  }
};





module.exports = AccountStore;
