var AppDispatcher = require('../dispatcher/dispatcher'),
    AccountConstants = require('../constants/account');
    InstitutionConstants = require('../constants/account');

var ApiActions = {
  receiveAccount: function (account){
    AppDispatcher.dispatch({
      actionType: AccountConstants.ACCOUNT_RECEIVED,
      account: account
    });
  },

  receiveAllAccounts: function (accounts) {
    AppDispatcher.dispatch({
      actionType: AccountConstants.ACCOUNTS_RECEIVED,
      accounts: accounts
    });
  },

  receiveAllInstitutions: function (institutions) {
    AppDispatcher.dispatch({
      actionType: InstitutionConstants.INSTITUTIONS_RECEIVED,
      institutions: institutions
    });
  }

};

module.exports = ApiActions;
