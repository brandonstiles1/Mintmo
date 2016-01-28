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
    var mappedTransactions = transactions.map(function(transaction) {
      return <li key={transaction.id}>{transaction.description}: {transaction.amount}</li>;
    });
    
    return (
      <ol className="transaction-list">
        {mappedTransactions}
      </ol>
    );
  }

});

module.exports = TransactionIndex;
