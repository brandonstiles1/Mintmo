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
        category = transaction.category,
        date = transaction.date,
        amount = transaction.amount,
        id = transaction.id;

    return {
      showEditDetails: false,
      description: description,
      notes: notes,
      category: category,
      id: id,
      date: date,
      amount: amount
    };
  },

  componentDidMount: function() {
    this.listener = TransactionStore.addListener(this._onChange);
  },

  _onChange: function() {
    this.forceUpdate();
  },

  componentWillUnmount: function() {
    this.listener.remove();
  },

  toggleEditDetails: function () {
    this.setState({showEditDetails: !this.state.showEditDetails});
  },

  handleCancel: function (e) {
    e.preventDefault();
    this.setState({showEditDetails: false});
  },

  updateTransaction: function () {
    var category = this.state.category;
    if (category === "") {
      category = "UNCATEGORIZED";
    }

    var transaction = {
      id: this.state.id,
      description: this.state.description,
      category: category,
      notes: this.state.notes,
      date: this.state.date,
      amount: this.state.amount
    };

    ApiUtil.updateTransaction(transaction);
  },

  updateTransactionNotes: function () {
    this.updateTransaction();
    this.toggleEditDetails();
  },

  render: function () {
    var transaction = this.props.transaction,
        date = ComponentActions.formatDate(this.state.date);


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
              onClick={this.updateTransactionNotes}>I'M DONE</button>
          </a>
        </p>
      );
    }

    return (
      <tr className="edit-form">
        <td className="date">
          <input
            type="hidden"
            valueLink={this.linkState('date')} />
          {date}
        </td>
        <td className="description">
          <input
            onKeyUp={this.updateTransaction}
            type="text"
            placeholder="Description"
            valueLink={this.linkState('description')} />
          {editDetails}
        </td>
        <td className="category">
          <input
            onKeyUp={this.updateTransaction}
            type="text"
            valueLink={this.linkState('category')} />
        </td>
          <td className="amount">
            <input
              type="hidden"
              valueLink={this.linkState('amount')} />
            {this.state.amount}
          </td>
      </tr>
    );
  }



});


module.exports = TransactionItemForm;
