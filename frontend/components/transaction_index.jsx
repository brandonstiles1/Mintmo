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
      page: 1,
      filterAccountType: this.props.filterAccountType || false
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
      var transactions = this.findNewTransactions();
      this.setState({
        transactions: transactions,
        totalCount: transactions.length
      });
    } else {
      this.setState({
        transactions: TransactionStore.all(),
        totalCount: TransactionStore.all().length
      });
    }
  },

  findNewTransactions: function () {
    var newTransactions = [];
    this.state.transactions.forEach(function(transaction) {
      newTransactions.push(TransactionStore.find(transaction.id));
    });
    return newTransactions;
  },

  componentWillUnmount: function () {
    this.storeListener.remove();
  },

  componentWillReceiveProps: function (newProps) {

    ApiUtil.fetchTransactions(this.state.page);
    this.setState({
      inSearch: false,
      // transactions: TransactionStore.all(),
      // totalCount: TransactionStore.all().length,
      filterAccountType: newProps.filterAccountType || false
    });
  },

  makeFormIndex: function (index) {
    this.setState({formIndex: index});
  },

  handleSearch: function (transactions, query, totalCount) {
    if (query !== "")
      this.setState({
        transactions: transactions,
        query: query,
        inSearch: true,
        totalCount: totalCount,
        page: 1});
    else {
      this.setState({
        transactions: TransactionStore.all(),
        inSearch: false,
        page: 1,
        totalCount: TransactionStore.all().length});
    }
  },


  render: function () {
    // console.log("state transactions:");
    // console.log(this.state.transactions.length);
    var that = this,
        page = this.state.page,
        firstResult = (page - 1) * 25,
        lastResult = (this.state.transactions.length > firstResult + 25) ? firstResult + 25 : this.state.transactions.length,
        transactions = this.state.transactions.slice( firstResult, lastResult ),
        totalCount = this.state.totalCount,
        search =  <Search search={this.handleSearch} />;


    if (this.state.filterAccountType) {
      var newTransactions = this.filterTransactionsByType();
      lastResult = (newTransactions.length > firstResult + 25) ? firstResult + 25 : newTransactions.length;
      transactions = newTransactions.slice(firstResult, lastResult);
      totalCount = newTransactions.length;
    }

    var mappedBody = this.mapBody(transactions);
    var resultText = this.resultText(transactions, firstResult, totalCount, lastResult);

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
  },

  filterTransactionsByType: function () {
    console.log(this.state.transactions.length);
    var newTransactions = [];
    this.state.transactions.forEach(function(transaction) {
      if (!transaction.account_type) {debugger}
      if (transaction.account_type === this.state.filterAccountType) {
        newTransactions.push(transaction);
      }
    }.bind(this));
    console.log(newTransactions.length);
    return newTransactions;
  },

  mapBody: function (transactions) {
    // console.log("filtered transactions:");
    // console.log(transactions.length);
    var that = this;

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

    return mappedBody;
  },

  resultText: function (transactions, firstResult, totalCount, lastResult) {
    var buttonNext = "",
        page = this.state.page,
        inSearch = this.state.inSearch,
        filterAccountType = this.state.filterAccountType;

    var buttonBack = (page > 1) ? <button onClick={this.backPage}> Back </button> : "";

    if (totalCount > (25 * page)) {
      buttonNext = <button onClick={this.nextPage}>Next </button>;
      }

    if ( filterAccountType ) {
      return (
        <div className="search-result-text">
          <p>Showing { firstResult + 1 } - { lastResult }  of { totalCount } transaction(s) {buttonBack} {buttonNext}</p>
        </div>
      );
    } else if (inSearch) {
      return (
        <div className="search-result-text">
          <p>Showing { transactions.length } out of { totalCount } transaction(s) that match "{this.state.query}" {buttonBack} {buttonNext}</p>
        </div>
      );
    } else {
      return (
        <div className="search-result-text">
          <p>Showing { firstResult + 1 } - { lastResult } of { totalCount } transaction(s) {buttonBack} {buttonNext}</p>
        </div>
      );
    }
  }

});

module.exports = TransactionIndex;
