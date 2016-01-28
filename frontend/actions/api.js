var AppDispatcher = require('../dispatcher/dispatcher'),
    AccountConstants = require('../constants/account'),
    InstitutionConstants = require('../constants/account'),
    TransactionConstants = require('../constants/transaction');

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

  receiveAllTransactions: function (transactions) {
    AppDispatcher.dispatch({
      actionType: TransactionConstants.TRANSACTIONS_RECEIVED,
      transactions: transactions
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
