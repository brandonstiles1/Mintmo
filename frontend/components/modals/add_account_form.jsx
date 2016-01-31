var React = require('react'),
    LinkedStateMixin = require('react-addons-linked-state-mixin'),
    Link = require('react-router').Link;


var AddAccountFormModal = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function() {
    return {
      userID: "",
      account_password: "",
      account_type: "",
      account_name: "",
      checked: false
    };
  },

  toggleShowPassword: function () {
    this.setState({checked: !this.state.checked});
  },

  handleSubmit: function () {
    var instId = this.props.id;

    var account = {
      account_name: this.state.account_name,
      institution_id: instId,
    };

    ApiUtil.addNewAccount(account);

  },

  goBack: function () {
    this.props.goBack();
  },

  render: function () {
    var institution = this.props.inst,
        passwordInputType = "password";

    if (this.state.checked) {
      passwordInputType = "text";
    }

    return (
      <div>
        <h1 className="main-header">
          { this.props.location.query.institution }
        </h1>
        <form className="form group" onSubmit={ this.submit }>

          <fieldset className="form-fieldset">

            <div className="input">
              <label>Account Name</label>
              <p>Name your {institution} account</p>
              <input
                type="text"
                valueLink={this.linkState('account_name')} />
            </div>

            <div className="input">
              <label>User ID</label>
              <p>for your {institution} account</p>
              <input
                type="text"
                valueLink={this.linkState('userID')} />
            </div>

            <div className="input">
              <label>Password</label>
              <p>for your {institution} account</p>
              <input
                type={passwordInputType}
                valueLink={this.linkState('account_password')} />
            </div>

              <div className="input">
                <input
                  onChange={this.toggleShowPassword}
                  type="checkbox">Show password</input>
              </div>

            <div className="submit">
              <button onClick={this.handleSubmit} >CONNECT SECURELY</button>
              <p onClick={this.goBack} className="go-back" to={"/"}>Go back</p>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }

});

module.exports = AddAccountFormModal;
