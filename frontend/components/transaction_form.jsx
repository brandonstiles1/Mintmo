var React = require('react'),
    LinkedStateMixin = require('react-addons-linked-state-mixin');

var TransactionStore = require('../stores/transaction'),
    ApiUtil  = require('../util/api_util'),
    ComponentActions = require('../actions/component_actions');

var TransactionItemForm = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function () {
    var transaction = this.props.transaction,
        description = transaction.description,
        notes = transaction.notes,
        date = transaction.date,
        category_id = transaction.category_id,
        category = transaction.category;

    return {
      showEditDetails: false,
      description: description,
      notes: notes,
      category_id: category_id,
      category: category
    };
  },

  toggleEditDetails: function () {
    this.setState({showEditDetails: !this.state.showEditDetails});
  },

  handleCancel: function (e) {
    e.preventDefault();
    this.setState({showEditDetails: false});
  },

  updateTransaction: function () {
    var transaction = { transaction: {
      description: this.state.transaction.description,
      notes: this.state.transaction.notes,
    }};

    ApiUtil.updateTransaction(transaction, function () {
      this.toggleEditDetails();
    }.bind(this));
  },

  render: function () {
    var transaction = this.props.transaction,
        date = ComponentActions.formatDate(transaction.date);

    var editDetails = (
        <button className="edit-details" onClick={this.toggleEditDetails}>
          EDIT DETAILS
        </button>
    );

    if (this.state.showEditDetails) {
      editDetails = (
        <p className="edit-details-show group">
          <h7 className="edit-notes group">
            <a>Notes</a>
            <textarea
              type="text"
              className="edit-details-notes"
              valueLink={this.linkState('notes')} />
          </h7>
          <a className="edit-detail-buttons group">
            <button
              className="edit-details-cancel"
              onClick={this.handleCancel}>CANCEL</button>
            <button
              className="edit-details-submit"
              onClick={this.updateTransaction}>I'M DONE</button>
          </a>
        </p>
      );
    }

    return (
      <tr className="edit-form">
        <td className="date">{date}</td>
        <td className="description">
          <input
            type="text"
            placeholder="description"
            valueLink={this.linkState('description')} />
          {editDetails}
        </td>
        <td className="category">
          <input
          type="text"
          placeholder="category"
          valueLink={this.linkState('category')} />
        </td>
          <td className="amount">{transaction.amount}</td>
      </tr>
    );
  }



});


module.exports = TransactionItemForm;
