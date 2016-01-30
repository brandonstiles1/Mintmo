var ApiActions = require('../actions/api');

var ApiUtil = {
  fetchAccounts: function () {
    $.ajax({
     type: "get",
     url: "/api/accounts",
     dataType: "json",
     success: function (accounts) {
       ApiActions.receiveAllAccounts(accounts);
     }
   });

  },

  fetchAccount: function (id) {
    $.ajax({
     type: "get",
     url: "/api/accounts/" + id,
     dataType: "json",
     success: function (account) {
       ApiActions.retrieveAccount(account);
     }
   });

  },

  fetchTransactions: function () {
    $.ajax({
     type: "get",
     url: "/api/transactions",
     dataType: "json",
     success: function (transactions) {
       ApiActions.receiveAllTransactions(transactions);
     }
   });

  },


  updateTransaction: function (transaction) {
    $.ajax({
     type: "patch",
     url: "/api/transactions/" + transaction.id,
     dataType: "json",
     data: {transaction: transaction},
     success: function () {
       ApiActions.receiveTransaction(transaction);
     },
     error: function (data) {

     }
   });

  },


  fetchInstitutions: function () {
    $.ajax({
     type: "get",
     url: "/api/institutions",
     dataType: "json",
     success: function (institutions) {
       ApiActions.receiveAllInstitutions(institutions);
     }
   });
  },

  createAccount: function (account) {
    $.ajax({
      type: "post",
      url: "/api/accounts",
      dataType: "json",
      success: function (benches) {
        ApiActions.receiveAccount(account);
      }
    });
  }

};

module.exports = ApiUtil;
