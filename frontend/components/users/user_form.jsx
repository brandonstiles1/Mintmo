var React = require('react');
var History = require('react-router').History;
var UsersStore = require('../../stores/users_store');
var UsersApiUtil = require('../../util/users_api_util');

var UserForm = React.createClass({
  mixins: [History],

  submit: function (e) {
    e.preventDefault();

    var credentials = $(e.currentTarget).serializeJSON();

    UsersApiUtil.createUser(credentials, function () {
      this.history.pushState({}, "/");
    }.bind(this));
  },

  render: function() {

    return (
      <div>
        <header className="header">
          <nav className="header-nav group">

            <h1 className="header-logo">
              <a href="/"><img className="mintmo-logo" src={window.Mintmo.imageUrls.mintmoLogo} alt="" /></a>
            </h1>

            <ul className="header-list group">
              <li>
                <a href="#/users/new" className="header-list-bold">Sign up</a>
              </li>
              <li><a href="#/login">Log in</a></li>
            </ul>

          </nav>
        </header>
        <main className="content group">
          <section className="content-main">

            <h1 className="main-header">See all your finances in one place & create a budget</h1>

            <form className="form group" onSubmit={ this.submit }>

              <fieldset className="form-fieldset">

                <div className="input">
                  <label>Your Email</label>
                  <input id="form-email" type="text" name="user[email]" />
                </div>

                <div className="input">
                  <label>Password</label>
                  <input id="form-password" type="password" name="user[password]" />
                </div>

                <div className="submit">
                  <button>SIGN UP</button>
                  <a href="/auth/facebook">Sign up with facebook</a>
                </div>
              </fieldset>
            </form>
          </section>
          <section className="content-sidebar">

            <h1 className="sidebar-header">
              Why you'll love it
            </h1>

            <ul className="sidebar-list">
              <li>See all your accounts in one place</li>
              <li>Set a budget and pay down your debt</li>
              <li>Find the best ways to grow your money</li>
              <li>Stay safe and secure</li>
            </ul>
          </section>
        </main>
      </div>
    );
  },

});

module.exports = UserForm;
