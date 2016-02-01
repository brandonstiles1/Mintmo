var React = require('react');

var AddAccountModal = require('./add_account'),
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
              onClick={this.renderAccountBody}><i id="fa-account-modal" className="fa fa-folder-open"></i><p>Accounts</p></li>
            <li
              className={userClass}
              onClick={this.renderUserBody}><i id="fa-user-modal" className="fa fa-user fa-modal"></i><p>About Me</p></li>
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
