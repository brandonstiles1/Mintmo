var React = require('react'),
    History = require('react-router').History;

var TransactionStore = require('../stores/transaction'),
    ApiUtil  = require('../util/api_util');

var TransactionIndex = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return { transactions: TransactionStore.all()};
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

  render: function () {
    var transactions = this.state.transactions;

    var mappedBody = transactions.map(function(transaction, index) {
      var date = new Date(transaction.date);
      var dateFormat =
              [date.getMonth()+1,
               date.getDate(),
               date.getFullYear()].join('/');
      return (
        <tr>
          <td>{dateFormat}</td>
          <td>{transaction.description}</td>
          <td>{transaction.category}</td>
          <td>{transaction.amount}</td>
        </tr>
      );
    });

    return (
      <div>
        <table className="transaction-table">
          <thead className="transaction-table-header">
            <tr >
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
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
