var React = require('react'),
    History = require('react-router').History;

var TransactionStore = require('../stores/transaction'),
    ApiUtil  = require('../util/api_util'),
    TransactionIndexItem = require('./transaction_index_item'),
    TransactionItemForm = require('./transaction_form');

var TransactionIndex = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return { transactions: TransactionStore.all(), formIndex: null};
  },

  componentDidMount: function () {
    ApiUtil.fetchTransactions();
    this.storeListener = TransactionStore.addListener(this.onChange);
  },

  onChange: function () {
    this.setState({ transactions: TransactionStore.all()} );
  },

  componentWillUnmount: function () {
    this.storeListener.remove();
  },

  makeFormIndex: function (index) {
    this.setState({formIndex: index});
  },

  render: function () {
    var that = this,
        transactions = this.state.transactions;

    var mappedBody = transactions.map(function(transaction, index) {
      if (index === that.state.formIndex) {
        return (
          <TransactionItemForm
              transaction={transaction}
              key={index} /> );
      } else {
        return (
          <TransactionIndexItem
            onClick={that.makeFormIndex.bind(null, index)}
            transaction={transaction}
            key={index} /> );
      }
    });

    return (
      <div>
        <table className="transaction-table">
          <thead className="transaction-table-header">
            <tr >
              <th className="date">Date</th>
              <th className="description">Description</th>
              <th className="category">Category</th>
              <th className="amount">Amount</th>
            </tr>
          </thead>
          <tbody className="transaction-table-body">
            {mappedBody}
          </tbody>
        </table>
      </div>
    );
  }

});

module.exports = TransactionIndex;
