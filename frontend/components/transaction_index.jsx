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
    this.setState({ transactions: TransactionStore.all(), totalCount: TransactionStore.all().length});
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
      this.setState({transactions: TransactionStore.all(), inSearch: false, page: 1});
    }
  },

  render: function () {

    var that = this,
        resultText = "",
        page = this.state.page,
        firstResult = (page - 1) * 25,
        transactions = this.state.transactions.slice(firstResult, firstResult + 25 ),
        inSearch = this.state.inSearch,
        buttonNext = "",
        totalCount = this.state.totalCount,
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
                <p>Showing { transactions.length } out of { totalCount } transaction(s) {buttonBack} {buttonNext}</p>
              </div>
            );
          }
    } else {
      resultText = (
        <div className="search-result-text">
          <p>Showing { transactions.length } out of { transactions.length } transaction(s) {buttonBack} {buttonNext}</p>
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
