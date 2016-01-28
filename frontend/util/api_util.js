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
