var React = require('react'),
    LinkedStateMixin = require('react-addons-linked-state-mixin');

var TransactionStore = require('../stores/transaction'),
    ApiUtil  = require('../util/api_util');

var TransactionItemForm = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function () {
    return {
      showEditDetails: false
    };
  },

  toggleEditDetails: function () {
    this.setState({showEditDetails: !this.state.showEditDetails});
  },

  updateTransaction: function () {
    var transaction = { transaction: {
      description: this.state.transaction.description,
      notes: this.state.transaction.notes,
      date: this.state.transaction.date,
      category_id: this.state.transaction.category_id
    }};

    ApiUtil.updateTransaction(transaction, function () {
      this.props.history.pushState(null, '/', {});
    }.bind(this));
  },

  render: function () {
    var categoryOptions = this.state.categories.map(function(category, index) {

    });

    var editDetails = (
      <button className="edit-details-button" onClick={this.toggleEditDetails}>
        EDIT DETAILS
      </button>
    );

    if (this.state.showEditDetails) {
      editDetails = (
        <textarea
          className="edit-details-notes"
          placeholder="notes"
          valueLink={this.linkState('notes')} />
      );
    }

    return (
      <form onSubmit={this.updateTransaction}>
        <input
          type="text"
          placeholder="description"
          valueLink={this.linkState('description')}></input>

        <input
          type="datetime-local"
          valueLink={this.linkState('date')}></input>
        <select
          valueLink={this.linkState('category_id')}>
          <option></option>

        </select>
        {editDetails}
      </form  >
    );
  }



});


module.exports = TransactionItemForm;
