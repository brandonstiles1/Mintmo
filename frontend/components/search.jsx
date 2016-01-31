var React = require('react'),
    LinkedStateMixin = require('react-addons-linked-state-mixin');

var SearchResultsStore = require('../stores/search_results_store'),
    SearchApiUtil = require('../util/search_api_util'),
    TransactionIndexItem = require('./transaction_index_item'),
    TransactionItemForm = require('./transaction_form');

var Search = React.createClass({
    mixins: [LinkedStateMixin],

  componentDidMount: function() {
    this.listener = SearchResultsStore.addListener(this._onChange);
  },

  getInitialState: function () {
    return {page: 1, query: ""};
  },

  _onChange: function() {
    this.forceUpdate();
  },

  search: function () {
    var query = this.state.query;
    SearchApiUtil.search(query, 1);

    this.setState({page: 1, query: query, formIndex: 0});
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
    var that = this;

    var searchResults = SearchResultsStore.all().map(function (searchResult, index) {
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
        Displaying {SearchResultsStore.all().length} of
        {SearchResultsStore.meta().totalCount}
        <button className="search-button" onClick={this.search}>Search</button>
        <button onClick={this.nextPage}>Next ></button>

        <section className="transaction-table-body">
          { searchResults }
        </section>
      </div>
    );
  }


});

module.exports = Search;
