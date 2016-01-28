var Store = require('flux/utils').Store;

var AppDispatcher = require('../dispatcher/dispatcher'),
    TransactionConstants = require('../constants/transaction');

var _transactions = [];
var TransactionStore = new Store(AppDispatcher);

TransactionStore.all = function () {
  return _transactions.slice();
};

var resetTransactions = function (transactions) {
  _transactions = transactions.slice();
};

var find = function (id) {
  for (var i = 0; i < _transactions.length; i++) {
    if (_transactions[i].id === parseInt(id) ) {
      return _transactions[i];
    }
  }
};


TransactionStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case TransactionConstants.TRANSACTIONS_RECEIVED:
      resetTransactions(payload.transactions);
      TransactionStore.__emitChange();
      break;
  }
};


module.exports = TransactionStore;
