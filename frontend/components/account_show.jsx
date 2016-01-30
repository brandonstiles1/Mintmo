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
    TransactionStore =require('../stores/transaction');

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
      formIndex: 0
    };
  },

  componentDidMount: function () {
    ApiUtil.fetchAccount(parseInt(this.props.params.accountId));
    ApiUtil.fetchAccountTransactions(this.props.params.accountId);
    this.accountListener = AccountStore.addListener(this.onChange);
    this.transactionListener = TransactionStore.addListener(this.onChange);

  },

  componentWillReceiveProps: function (newProps) {
    ApiUtil.fetchAccount(parseInt(newProps.params.accountId));
    ApiUtil.fetchAccountTransactions(newProps.params.accountId);
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

  handleAccountTypeClick: function () {

  },

  handleOverviewClick: function () {
    this.history.pushState(null, 'accounts', {});
  },

  handleTransactionsClick: function () {
    this.history.pushState(null, 'accounts', {});
  },

  handleAccountClick: function () {
    this.setState({accountClicked: true});
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
        overviewClass = ComponentActions.getOverviewClass(overviewClicked),
        transactionClass = ComponentActions.getTransactionClass(transactionsClicked),
        header =
          <Header
            overviewClicked={overviewClicked}
            overviewClick={this.handleOverviewClick}
            transactionsClicked={transactionsClicked}
            transactionsClick={this.handleTransactionsClick}/>,
          sidebar =
          <AccountShowSidebar
            accounts={that.state.allAccounts}
            accountClick={that.handleAccountClick}
            transactionsClick={that.handleTransactionsClick}
            />;

          if (!(account && transactions)) { return <div>SPINNER</div>; }

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

    return (
      <div>
        {header}
      <main className="root-content group">

        {sidebar}

        <section className="root-content-main">
          <h1>{account.name.slice(0,25)}...</h1>
          <h6>TOTAL BALANCE</h6>
          <h5>{account.balance}</h5>
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

});


module.exports = AccountShow;
