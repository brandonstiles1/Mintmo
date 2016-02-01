var React = require('react'),
    LinkedStateMixin = require('react-addons-linked-state-mixin');

var SearchResultsStore = require('../stores/search_results_store'),
    SearchApiUtil = require('../util/search_api_util'),
    TransactionIndexItem = require('./transaction_index_item'),
    TransactionItemForm = require('./transaction_form');

var Search = React.createClass({
    mixins: [LinkedStateMixin],

    getInitialState: function () {
      return {
        page: 1,
        query: "",
        results: SearchResultsStore.all(),
        totalCount: SearchResultsStore.meta().totalCount
      };
    },

  componentDidMount: function() {
    this.listener = SearchResultsStore.addListener(this._onChange);
  },


  _onChange: function() {
    var results = SearchResultsStore.all(),
        that = this;

    if (this.props.account) {
      filteredResults = [];
      results.forEach(function(result) {
        if (result.account_id === that.props.account) {
          filteredResults.push(result);
        }
      });
      this.setState({results: filteredResults, totalCount: filteredResults.length});
      this.props.search(this.state.results, this.state.query);
    } else {
      this.setState({results: results, totalCount: SearchResultsStore.meta().totalCount});
      this.props.search(this.state.results, this.state.query);
    }
  },

  search: function () {
    var query = this.state.query;

    SearchApiUtil.search(query, 1);

    this.setState({
      page: 1,
      query: query,
      formIndex: 0
    });

  },

  nextPage: function () {
    var nextPage = this.state.page + 1;
    SearchApiUtil.search(this.state.query, nextPage);

    this.setState({page: nextPage});
  },

  componentWillUnmount: function() {
    this.listener.remove();
  },

  makeFormIndex: function (index) {
    this.setState({formIndex: index});
  },

  render: function() {
    var that = this,
        resultText = "",
        results = this.state.results,
        totalCount = this.state.totalCount;


    if (results.length > 0) {

      resultText = (
        <div>
          <p>Showing { results.length } out of { totalCount } transactions</p>
          <button onClick={this.nextPage}>Next ></button>
        </div>
      );
    }

    var searchResults = SearchResultsStore.all().map(function (searchResult, index) {
      if (index === that.state.formIndex) {
        return (
          <TransactionItemForm
              transaction={searchResult}
              key={index} /> );
      } else {
        return (
          <TransactionIndexItem
            index={index}
            onClick={that.makeFormIndex.bind(null, index)}
            transaction={searchResult}
            key={index} />
        );
      }
    });

    return (
      <div className="search-component">
        <input
          type="text"
          valueLink={this.linkState('query')}
          placeholder="Can't search yet" />
        {resultText}
        <button className="search-button" onClick={this.search}>Search</button>
      </div>
    );
  }


});

module.exports = Search;
