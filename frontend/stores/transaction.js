var Store = require('flux/utils').Store;

var AppDispatcher = require('../dispatcher/dispatcher'),
    TransactionConstants = require('../constants/transaction');

var _transactions = [];
var _transactionsIdx = {};
var TransactionStore = new Store(AppDispatcher);

TransactionStore.all = function () {
  return _transactions.slice();
};

var resetTransactions = function (transactions) {
  _transactions = transactions.slice();
  transactions.forEach(function(transaction) {
    _transactionsIdx[transaction.id] = transaction;
  });
};

var find = function (id) {
  return _transactionsIdx[id];
  // for (var i = 0; i < _transactions.length; i++) {
  //   if (_transactions[i].id === parseInt(id) ) {
  //     return _transactions[i];
  //   }
  // }
};

var addTransaction = function (transaction) {
  _transactionsIdx[transaction.id] = transaction;

  var idx = -1;

  for (var i = 0; i < _transactions.length; i++) {
    if (_transactions[i].id === transaction.id) {
      idx = i;
    }
  }

  if (idx === -1) {
    _transactions.push(transaction);
  } else {
    _transactions[idx] = transaction;
  }

};


TransactionStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case TransactionConstants.TRANSACTIONS_RECEIVED:
      resetTransactions(payload.transactions);
      TransactionStore.__emitChange();
      break;
    case TransactionConstants.TRANSACTION_RECEIVED:
      addTransaction(payload.transaction);
      TransactionStore.__emitChange();
      break;
  }
};


module.exports = TransactionStore;
