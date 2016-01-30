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
      date: this.state.transaction.date,
      category_id: this.state.transaction.category_id
    }};

    ApiUtil.updateTransaction(transaction, function () {
      this.toggleEditDetails();
    }.bind(this));
  },

  render: function () {
    var transaction = this.props.transaction,
        date = ComponentActions.formatDate(transaction.date);

    var editDetails = (
      <td className="edit-details">
        <button className="edit-details" onClick={this.toggleEditDetails}>
          EDIT DETAILS
        </button>
      </td>
    );

    if (this.state.showEditDetails) {
      editDetails = (
        <td className="edit-details-show">
          <textarea
            className="edit-details-notes"
            placeholder="notes"
            valueLink={this.linkState('notes')} />
          <div className="edit-detail-buttons group">
            <button
              className="edit-details-cancel"
              onClick={this.handleCancel}>CANCEL</button>
            <button
              className="edit-details-submit"
              onClick={this.updateTransaction}>IM DONE</button>
          </div>
        </td>
      );
    }

    return (
      <tr className="edit-form group">
        <td className="date">{date}</td>
        <td className="description">
          <input
            type="text"
            placeholder="description"
            valueLink={this.linkState('description')} />
        </td>
        <td className="category">
          <input
          type="text"
          placeholder="category"
          valueLink={this.linkState('category')} />
        </td>
          <td className="amount">{transaction.amount}</td>
          {editDetails}
      </tr>
    );
  }



});


module.exports = TransactionItemForm;
