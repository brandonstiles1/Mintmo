var UserActions = require('../actions/user_actions'),
    CurrentUserActions = require('../actions/current_user_actions');

var UsersApiUtil = {
  fetchUsers: function () {
    $.ajax({
      url: '/api/users',
      type: 'GET',
      dataType: 'json',
      success: function (users) {
        UserActions.receiveUsers(users);
      }
    });
  },

  fetchUser: function (id) {
    $.ajax({
      url: '/api/users/' + id,
      type: 'GET',
      dataType: 'json',
      success: function (user) {
        UserActions.receiveUser(user);
      }
    });
  },

  createUser: function (attrs, callback) {
    $.ajax({
      url: '/api/users',
      type: 'POST',
      dataType: 'json',
      data: attrs,
      success: function (user) {
        UserActions.receiveUser(user);
        CurrentUserActions.receiveCurrentUser(user);
        callback && callback();
      }
    });
  },

  updateUser: function (user, callback) {
    $.ajax({
      url: '/api/users/' + user.id,
      type: 'patch',
      processData: false,
      contentType: false,
      dataType: 'json',
      data: user,
      success: function (user) {
        UserActions.receiveUserUpdate(user);
        callback && callback();
      }
    });
  }
};


module.exports = UsersApiUtil;
