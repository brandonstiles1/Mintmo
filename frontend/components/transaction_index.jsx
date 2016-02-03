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
      totalCount: TransactionStore.all().length,
      query: null,
      page: 1
    };
  },

  componentDidMount: function () {
    ApiUtil.fetchTransactions(this.state.page);
    this.storeListener = TransactionStore.addListener(this.onChange);
  },

  nextPage: function () {
    var nextPage = this.state.page + 1;
    this.setState({page: nextPage});
  },

  backPage: function () {
    var backPage = this.state.page - 1;
    this.setState({page: backPage});
  },

  onChange: function () {
    if (this.state.inSearch) {
      var newTransactions = [];
      this.state.transactions.forEach(function(transaction) {
        newTransactions.push(TransactionStore.find(transaction.id));
      });

      this.setState({ transactions: newTransactions, totalCount: newTransactions.length});
    } else {
      this.setState({ transactions: TransactionStore.all(), totalCount: TransactionStore.all().length});
    }
  },

  componentWillUnmount: function () {
    this.storeListener.remove();
  },

  componentWillReceiveProps: function () {

    this.setState({ inSearch: false, transactions: TransactionStore.all(), totalCount: TransactionStore.all().length });
  },

  makeFormIndex: function (index) {
    this.setState({formIndex: index});
  },

  handleSearch: function (transactions, query, totalCount) {
    if (query !== "")
      this.setState({transactions: transactions, query: query, inSearch: true, totalCount: totalCount, page: 1});
    else {

      this.setState({transactions: TransactionStore.all(), inSearch: false, page: 1, totalCount: TransactionStore.all().length});
    }
  },

  render: function () {

    var that = this,
        resultText = "",
        page = this.state.page,
        firstResult = (page - 1) * 25,
        lastResult = (this.state.transactions.length > firstResult + 25) ? firstResult + 25 : this.state.transactions.length,
        transactions = this.state.transactions.slice(firstResult, lastResult ),
        inSearch = this.state.inSearch,
        buttonNext = "",
        totalCount = this.state.totalCount,
        search =  <Search search={this.handleSearch} reset="true" />;


    if (this.props.filterAccountType) {

      var newTransactions = [];
      this.state.transactions.forEach(function(transaction) {
        if (transaction.account_type === that.props.filterAccountType) {
          newTransactions.push(transaction);
        }
      });
      lastResult = (newTransactions.length > firstResult + 25) ? firstResult + 25 : newTransactions.length;
      transactions = newTransactions.slice(firstResult, lastResult);
      totalCount = newTransactions.length;
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

    var buttonBack = (page > 1) ? <button onClick={this.backPage}> Back </button> : "";
    if (!this.props.filterAccountType) {
      if ( inSearch ) {
        if (totalCount > (25 * page)) {
          buttonNext = <button onClick={this.nextPage}>Next </button>;
          }
          resultText = (
            <div className="search-result-text">
              <p>Showing { transactions.length } out of { totalCount } transaction(s) that match "{this.state.query}" {buttonBack} {buttonNext}</p>
            </div>
          );
        } else {
          if (totalCount > (25 * page)) {
            buttonNext = <button onClick={this.nextPage}>Next </button>;
            }
            resultText = (
              <div className="search-result-text">
                <p>Showing { firstResult + 1 } - { lastResult } of { totalCount } transaction(s) {buttonBack} {buttonNext}</p>
              </div>
            );
          }
    } else {
      if (totalCount > (25 * page)) {
        buttonNext = <button onClick={this.nextPage}>Next </button>;
        }
      resultText = (
        <div className="search-result-text">
          <p>Showing { firstResult + 1 } - { lastResult }  of { totalCount } transaction(s) {buttonBack} {buttonNext}</p>
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
