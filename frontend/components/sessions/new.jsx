var React = require('react');
var History = require('react-router').History;
var SessionsApiUtil = require('./../../util/sessions_api_util');

var SessionForm = React.createClass({
  mixins: [History],

  submit: function (e) {
    e.preventDefault();

    var credentials = $(e.currentTarget).serializeJSON();
    SessionsApiUtil.login(credentials, function () {
      this.history.pushState({}, "/");
    }.bind(this));
  },


  render: function() {
    return (
      <div>
        <header className="header">
          <nav className="header-nav group">

            <h1 className="header-logo">
              <a href="/"><img className="mintmo-logo" src="http://i.imgur.com/lTEkRfz.png" alt="" /></a>
            </h1>

            <ul className="header-list group">
              <li><a href="#/users/new" >Sign up</a></li>
              <li><a href="#/login" className="header-list-bold">Log in</a></li>
            </ul>

          </nav>
        </header>

        <main className="content group">
          <section className="content-main">

            <h1 className="main-header">Log in to Mintmo</h1>

        <form className="form group" onSubmit={ this.submit }>

          <fieldset className="form-fieldset">

            <div className="input">
              <label>Email
                <input id="form-email" type="text" name="user[email]" />
              </label>
            </div>

            <div className="input">
              <label >Password
                <input id="form-password" type="password" name="user[password]" />
              </label>
            </div>


            <div className="submit">
              <button>LOG IN</button>
            </div>
          </fieldset>
        </form>

        <form className="form group" onSubmit={ this.submit }>
          <input type="hidden" name="user[email]" value="test@test.com" />
          <input type="hidden" name="user[password]" value="password" />
          <div className="submit">
            <button>LOG IN AS GUEST</button>
          </div>
        </form>
      </section>

      <section className="login-content-sidebar">

        <p className="content-sidebar-link">
          Don't have an account?
        </p>
        <a className="signup-link" href="#/users/new">Sign up now for free</a>

      </section>
    </main>
  </div>
    );
  },

});

module.exports = SessionForm;
