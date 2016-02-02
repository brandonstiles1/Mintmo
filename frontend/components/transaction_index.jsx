var React = require('react'),
    History = require('react-router').History;

var TransactionStore = require('../stores/transaction'),
    ApiUtil  = require('../util/api_util'),
    TransactionIndexItem = require('./transaction_index_item'),
    TransactionItemForm = require('./transaction_form'),
    Search = require('./search');

var TransactionIndex = React.createClass({
  mixins: [History],

  getInitialState: function () {

    return {
      transactions: TransactionStore.all(),
      formIndex: 0,
      inSearch: false,
      totalCount: null,
      query: null
    };
  },

  componentDidMount: function () {
    ApiUtil.fetchTransactions();
    this.storeListener = TransactionStore.addListener(this.onChange);
  },

  onChange: function () {
    this.setState({ transactions: TransactionStore.all() });
  },

  componentWillUnmount: function () {
    this.storeListener.remove();
  },

  componentWillReceiveProps: function () {
    this.setState({ inSearch: false, transactions: TransactionStore.all() });
  },

  makeFormIndex: function (index) {
    this.setState({formIndex: index});
  },

  handleSearch: function (transactions, query, totalCount) {
    if (query !== "")
      this.setState({transactions: transactions, query: query, inSearch: true, totalCount: totalCount});
    else {
      this.setState({transactions: TransactionStore.all(), inSearch: false});
    }
  },

  render: function () {

    var that = this,
    resultText = "",
        transactions = this.state.transactions,
        search =  <Search search={this.handleSearch} reset="true" />;

    if (this.props.filterAccountType) {

      var newTransactions = [];
      transactions.forEach(function(transaction) {
        if (transaction.account_type === that.props.filterAccountType) {
          newTransactions.push(transaction);
        }
      });
      transactions = newTransactions;
    }

    var mappedBody = transactions.map(function(transaction, index) {
      if (index === that.state.formIndex) {
        return (
          <TransactionItemForm
              transaction={transaction}
              key={index} /> );
      } else {
        return (
          <TransactionIndexItem
            index={index}
            onClick={that.makeFormIndex.bind(null, index)}
            transaction={transaction}
            key={index} /> );
      }
    });

    if (this.state.inSearch) {
      var button = (this.state.totalCount > transactions.length) ? <button onClick={this.nextPage}>Next ></button> : "";
      resultText = (
        <div className="search-result-text">
          <p>Showing { transactions.length } out of { this.state.totalCount } transaction(s) that match "{this.state.query}" {button}</p>
        </div>
      );
    }

    return (
      <div className="group">
        {search}
        {resultText}
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
