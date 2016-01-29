// var React = require('react'),
//     LinkedStateMixin = require('react-addons-linked-state-mixin');
//
// var TransactionStore = require('../stores/transaction'),
//     ApiUtil  = require('../util/api_util');
//
// var TransactionItemForm = React.createClass({
//   mixins: [LinkedStateMixin],
//
//   getInitialState: function () {
//
//   },
//
//   updateTransaction: function () {
//     var transaction = { transaction: {
//       description: this.state.transaction.description,
//       notes: this.state.transaction.notes,
//       date: this.state.transaction.date,
//       category_id: this.state.transaction.category_id
//     }};
//
//     ApiUtil.updateTransaction(transaction, function () {
//       this.props.history.pushState(null, '/', {});
//     }.bind(this));
//   },
//
//   render: function () {
//     var categoryOptions = this.state.categories.map(function(category, index) {
//
//     });
//
//     return (
//       <form onSubmit={this.updateTransaction}>
//         <input
//           type="text"
//           placeholder="description"
//           valueLink={this.linkState('description')}></input>
//         <textarea
//           placeholder="notes"
//           valueLink={this.linkState('notes')}></textarea>
//         <input
//           type="datetime-local"
//           valueLink={this.linkState('date')}></input>
//         <select
//           valueLink={this.linkState('category_id')}>
//           <option></option>
//
//         </select>
//         <button>Create New Bench</button>
//       </form  >
//     );
//   }
//
//
//
// });
//
//
// module.exports = TransactionItemForm;
