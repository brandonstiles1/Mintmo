var React = require('react');

var AddAccountModal = require('./add_account'),
    EditUserFormModal = require('./edit_user_form');

var ModalIndex = React.createClass({

  getInitialState: function () {
    return { modalBody: this.props.location, location: this.props.location };
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
    var accountsClass= "",
        userClass= "",
        divClass = "modal-index";

    var modalBody = (this.state.modalBody === "user") ? <EditUserFormModal /> : <AddAccountModal />;

    if (this.state.location === "user") {
      userClass = "selected";
    } else if (this.state.location === "accountIndex"){
      accountsClass = "selected";
      divClass = "modal-account-index";
    } else if (this.state.location === "accountShow") {
      divClass = "modal-account-show";
      accountsClass = "selected";
    }

    return (
      <div>
        <div className="transparent-wrapper"></div>
        <div className={divClass}>
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
      </div>

    );
  }
});

module.exports = ModalIndex;
