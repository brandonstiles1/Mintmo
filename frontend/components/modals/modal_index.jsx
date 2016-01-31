var React = require('react');

var AddAccountModal = require('./add_account'),
    AddAccountFormModal = require('./add_account_form'),
    EditUserFormModal = require('./edit_user_form');

var ModalIndex = React.createClass({

  getInitialState: function () {
    return { modalBody: this.props.location };
  },

  closeModal: function () {
    this.props.toggleModal();
  },

  renderAccountBody: function () {
    if (this.state.modalBody !== "accounts") {
      this.setState({modalBody: "accounts"});
    }
  },

  renderUserBody: function () {
    if (this.state.modalBody !== "user") {
      this.setState({modalBody: "user"});
    }
  },

  render: function () {
    var modalBody,
        accountsClass="",
        userClass="";

    if (this.state.modalBody === "user") {
      modalBody = <EditUserFormModal />;
      userClass = "selected";
    } else {
      modalBody = <AddAccountModal />;
      accountsClass = "selected";
    }

    return (
      <div className="modal-index">
        <header className="modal-index-header">
          <ul className="modal-header-list group">
            <li
              className={accountsClass}
              onClick={this.renderAccountBody} >Accounts</li>
            <li
              className={userClass}
              onClick={this.renderUserBody}>About Me</li>
          </ul>
        </header>
        {modalBody}
        <footer className="modal-index-footer submit group">
          <button
            onClick={this.closeModal}>Close</button>
        </footer>
      </div>
    );
  }
});

module.exports = ModalIndex;
