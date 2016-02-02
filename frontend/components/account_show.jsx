var React = require('react'),
    History = require('react-router').History;

var AccountStore =require('../stores/account'),
    ApiUtil = require('../util/api_util'),
    TransactionIndex = require('./transaction_index'),
    Header = require('./header'),
    AccountShowSidebar = require('./sidebars/show_sidebar'),
    TransactionIndexItem = require('./transaction_index_item'),
    ComponentActions = require('../actions/component_actions'),
    TransactionItemForm = require('./transaction_form'),
    TransactionStore = require('../stores/transaction'),
    Search = require('./search');

var AccountShow = React.createClass({
  mixins: [History],

  getInitialState: function () {
    var accountId = this.props.params.accountId;

    return {
      account: AccountStore.find(accountId),
      transactions: TransactionStore.all(),
      allAccounts: AccountStore.all(),
      overviewClicked: false,
      transactionsClicked: true,
      formIndex: 0,
      inSearch: false,
      totalCount: null,
      query: null,
      filterAccountType: false,
      typeIds: null
    };
  },

  componentDidMount: function () {
    ApiUtil.fetchAccounts();
    ApiUtil.fetchAccount(parseInt(this.props.params.accountId));
    ApiUtil.fetchAccountTransactions(this.props.params.accountId);
    this.accountListener = AccountStore.addListener(this.onChange);
    this.transactionListener = TransactionStore.addListener(this.onChange);
  },

  componentWillReceiveProps: function (newProps) {
    var newId = newProps.params.accountId;
    
    if (typeof AccountStore.find(newId) === "undefined") {
      this.history.pushState(null, '/', {});
    } else {
      ApiUtil.fetchAccount(parseInt(newProps.params.accountId));
      ApiUtil.fetchAccountTransactions(newProps.params.accountId);
      this.setState({formIndex: 0, inSearch: false});
    }
  },

  onChange: function () {
    var accountId = this.props.params.accountId;
    this.setState({
      account: AccountStore.find(accountId),
      allAccounts: AccountStore.all(),
      transactions: TransactionStore.all()
    });
  },

  componentWillUnmount: function () {
    this.accountListener.remove();
    this.transactionListener.remove();
  },

  handleAccountTypeClick: function (type) {
    var typeAccounts = this.state.allAccounts[type];
    this.typeBalance = 0;
    var typeIds = typeAccounts.map(function(account) {
      this.typeBalance += parseInt(account.balance_n);
      return account.id;
    }.bind(this));


    this.setState({filterAccountType: type, typeIds: typeIds, inSearch: false, totalCount: null});
  },

  handleSearch: function (transactions, query, totalCount) {
    if (query !== "")
      this.setState({transactions: transactions, query: query, inSearch: true, totalCount: totalCount});
    else {
      this.setState({transactions: TransactionStore.all(), inSearch: false});
    }
  },

  handleOverviewClick: function () {
    this.history.pushState(null, 'accounts', {});
  },

  handleTransactionsClick: function () {
    this.history.pushState(null, 'accounts', {});
  },

  handleAccountClick: function () {
    this.setState({accountClicked: true, filterAccountType: false, inSearch: false});
  },

  handleAllAccountsClick: function (e) {
    e.preventDefault();
    this.history.pushState(null, 'accounts', {});
  },

  makeFormIndex: function (index) {
    this.setState({formIndex: index});
  },

  render: function () {

    var that = this,
        account = this.state.account,
        transactions = this.state.transactions,
        accounts = this.state.allAccounts,
        transactionsClicked =this.state.transactionsClicked,
        overviewClicked =this.state.overviewClicked,
        resultText = "",
        balanceClass = "",
        overviewClass = ComponentActions.getOverviewClass(overviewClicked),
        transactionClass = ComponentActions.getTransactionClass(transactionsClicked),
        search,
        headerText,
        header =
          <Header
            overviewClicked={overviewClicked}
            overviewClick={this.handleOverviewClick}
            transactionsClicked={transactionsClicked}
            transactionsClick={this.handleTransactionsClick}/>,
          sidebar =
          <AccountShowSidebar
            accountTypeClick={this.handleAccountTypeClick}
            accountId={this.props.params.accountId}
            accounts={that.state.allAccounts}
            accountClick={that.handleAccountClick}
            transactionsClick={that.handleTransactionsClick}
            />;

    if (!(account && transactions)) { return <div>SPINNER</div>; }

      if (this.state.inSearch) {

        var button = (this.state.totalCount > transactions.length) ? <button onClick={this.nextPage}>Next ></button> : "";
        resultText = (
          <div className="search-result-text">
            <p>Showing { transactions.length } out of { this.state.totalCount } transaction(s) that match "{this.state.query}" {button}</p>
          </div>
        );

      }

    search = <Search search={this.handleSearch} account={account.id} />;
    headerText = <h1>{account.name}</h1>;


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

    if (this.state.filterAccountType) {
      balanceClass = (this.typeBalance > 0) ? "" : "neg";

      headerText = <h1>All {this.state.filterAccountType} Accounts</h1>;
      return (
        <div>
          {header}
        <main className="root-content group">

          {sidebar}

          <section className="root-content-main">
            {headerText}
            <h6>TOTAL BALANCE</h6>
            <h5 className={balanceClass}>${this.typeBalance}</h5>
            <TransactionIndex
              filterAccountType={this.state.filterAccountType}
              typeIds={this.state.typeIds} />
          </section>
        </main>
      </div>);
    } else {
      balanceClass = (account.balance_n > 0) ? "" : "neg";
      return (
        <div>
          {header}
          <main className="root-content group">

            {sidebar}

            <section className="root-content-main group">
              {headerText}
              <h6>TOTAL BALANCE</h6>
              <h5 className={balanceClass}>{account.balance}</h5>
              {search}
              {resultText}
              <table className="transaction-table group">
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
            </section>
          </main>
        </div>);
    }

  }

});


module.exports = AccountShow;
