var ApiActions = require('../actions/api'),
    AccountConstants = require('../constants/account'),
    InstitutionConstants = require('../constants/institution');

var ApiUtil = {
  fetchAccounts: function () {
    $.ajax({
     type: "get",
     url: "/api/accounts",
     dataType: "json",
     success: function (accounts) {
       APiActions.receiveAllAccounts(accounts);
     }
   });

  },

  fetchInstitutions: function () {
    $.ajax({
     type: "get",
     url: "/api/institutions",
     dataType: "json",
     success: function (institutions) {
       APiActions.receiveAllInstitutions(institutions);
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
