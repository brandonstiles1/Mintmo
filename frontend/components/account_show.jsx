var React = require('react'),
    History = require('react-router').History;

var AccountStore =require('../stores/account'),
    ApiUtil = require('../util/api_util'),
    TransactionIndex = require('./transaction_index');

var AccountShow = React.createClass({
  mixins: [History],

  getStateFromStore: function () {
    return {account: AccountStore.find(this.props.params.accountId)};
  },

  getInitialState: function () {
    return {account: this.getStateFromStore(), overviewClicked: false, transactionsClicked: true};
  },

  componentDidMount: function () {
    ApiUtil.fetchAccount(parseInt(this.props.params.accountId));
    this.accountListener = AccountStore.addListener(this.onChange);
  },

  componentWillReceiveProps: function (newProps) {
    ApiUtil.fetchAccount(newProps.params.accountId);
  },

  onChange: function () {
    this.setState({account: this.getStateFromStore()});
  },

  componentWillUnmount: function () {
    this.accountListener.remove();
  },

  handleOverviewClick: function () {
    this.setState({overviewClicked: true, transactionsClicked: false});
    this.history.pushState(null, '/', {});
  },

  handleTransactionsClick: function () {
    this.setState({overviewClicked: false, transactionsClicked: true});
    this.history.pushState(null, '/', {});
  },

  render: function () {

    var overviewClass = "overview",
        transactionClass = "transaction";
    if (this.state.overviewClicked) {
      overviewClass = "content-header-list-selected";
    } else {
      transactionClass = "content-header-list-selected";
    }

    var transactions = this.state.account.account.transactions;

    if (transactions === undefined) { return <div></div>; }

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
      <main className="root-content group">

        <section className="root-content-sidebar">
          <h1>Type</h1>
          <div className="accounts">
            <div className="account-types">
              <div className="account-type-headers group">
                <h3>Cash</h3>
                <h3>Investment</h3>
                <h3>Loan</h3>
              </div>
            </div>
          </div>
          <h1>Accounts</h1>
            <div className="accounts">
              <div className="account-types">
                <div className="account-type-headers group">
                  <h3>All Accounts</h3>
                  <h3>Account 1</h3>
                  <h3>Account 2</h3>
                  <h3>Etc</h3>
                </div>
              </div>
            </div>
        </section>

        <section className="root-content-main">
          <h1>Transactions</h1>
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
        </section>
      </main>);
  }

});


module.exports = AccountShow;
