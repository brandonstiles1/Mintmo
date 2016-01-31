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
        logo = this.props.logo,
        passwordInputType = "password";

    if (this.state.checked) {
      passwordInputType = "text";
    }

    return (
      <div className="modal-edit-form">
        <h1 className="main-header">
          { this.props.inst }
        </h1>
        <form className="modal-form group" onSubmit={ this.submit }>

          <fieldset className="modal-form-fieldset">

            <div className="input">
              <label className="add-account-label">Account Name</label>
              <p className="add-account-label">Name your {institution} account</p>
              <input
                type="text"
                valueLink={this.linkState('account_name')} />
            </div>

            <div className="input">
              <label className="add-account-label">User ID</label>
              <p className="add-account-label">for your {institution} account</p>
              <input
                type="text"
                valueLink={this.linkState('userID')} />
            </div>

            <div className="input">
              <label className="add-account-label">Password</label>
              <p className="add-account-label">for your {institution} account</p>
              <input
                type={passwordInputType}
                valueLink={this.linkState('account_password')} />
            </div>

              <div className="input show-pass group">
                <input
                  onChange={this.toggleShowPassword}
                  type="checkbox" />
                <p>Show password</p>
              </div>

            <div className="submit group">
              <button
                className="add-account-submit"
                onClick={this.handleSubmit} >CONNECT SECURELY</button>
              <p onClick={this.goBack} className="go-back" to={"/"}>Go back</p>
            </div>
          </fieldset>
          <img className="preview-image" src={ logo } />
        </form>
      </div>
    );
  }

});

module.exports = AddAccountFormModal;
