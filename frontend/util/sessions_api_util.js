var CurrentUserActions = require("./../actions/current_user_actions"),
    UserActions = require("./../actions/user_actions");

var SessionsApiUtil = {

  login: function (credentials, success) {
    $.ajax({
      url: '/api/session',
      type: 'POST',
      dataType: 'json',
      data: credentials.user,
      success: function (currentUser) {
        CurrentUserActions.receiveCurrentUser(currentUser);
        UserActions.receiveUser(currentUser);
        success && success();
      }

    });
  },

  logout: function (callback) {
    $.ajax({
      url: '/api/session',
      type: 'delete',
      dataType: 'json',
      success: function () {
        CurrentUserActions.removeCurrentUser();
        callback && callback();
      },
      error: function (data) {

      }
    });
  },

  fetchCurrentUser: function (cb) {
    $.ajax({
      url: '/api/session',
      type: 'GET',
      dataType: 'json',
      success: function (currentUser) {
        UserActions.receiveUser(currentUser);
        CurrentUserActions.receiveCurrentUser(currentUser);
        cb && cb(currentUser);
      }
    });
  }


};

module.exports = SessionsApiUtil;
