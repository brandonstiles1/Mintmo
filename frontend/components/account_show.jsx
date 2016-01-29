var React = require('react'),
    History = require('react-router').History;

var AccountStore =require('../stores/account'),
    ApiUtil = require('../util/api_util'),
    TransactionIndex = require('./transaction_index');

var AccountShow = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return {account: AccountStore.find(this.props.params.accountId), allAccounts: AccountStore.all(), overviewClicked: false, transactionsClicked: true};
  },

  componentDidMount: function () {
    ApiUtil.fetchAccount(parseInt(this.props.params.accountId));
    this.accountListener = AccountStore.addListener(this.onChange);
  },

  componentWillReceiveProps: function (newProps) {
    ApiUtil.fetchAccount(newProps.params.accountId);
  },

  onChange: function () {
    this.setState({account: AccountStore.find(this.props.params.accountId), allAccounts: AccountStore.all()});
  },

  componentWillUnmount: function () {
    this.accountListener.remove();
  },

  handleOverviewClick: function () {
    this.setState({overviewClicked: true, transactionsClicked: false});
    this.history.pushState(null, '/', {});
  },

  handleAccountClick: function () {

  },

  handleTransactionsClick: function () {
    this.setState({overviewClicked: false, transactionsClicked: true});
    this.history.pushState(null, '/', {});
  },

  render: function () {
    var that = this;
    var account = this.state.account;
    var accounts = this.state.allAccounts;
    var accountsArr = [];
    var accountTypes = [];

    Object.keys(accounts).forEach(function(accountType) {
      if ( accounts[accountType].length > 0 ) {
        accountTypes.push(accountType);

        accounts[accountType].forEach(function(account){
          accountsArr.push(account);
        });
      }
    });

    var mappedAccountTypes = accountTypes.map(function(type){
      return (
        <div key={type} className="account-types">
          <div onClick={that.handleAccountClick.bind(null, type)} >
            <h3 className="account-types-show-type">{type}</h3>
          </div>
        </div>
      );
    });

    var mappedAccounts = accountsArr.map(function(account, index){
      return (
        <div key={index} className="account-types">
          <div onClick={that.handleAccountClick.bind(null, account)} >
            <a href={"#/accounts/" + account.id}><h3 className="account-types-show-type">{account.name}</h3></a>
          </div>
        </div>
      );
    });

    var overviewClass = "overview",
        transactionClass = "transaction";
    if (this.state.overviewClicked) {
      overviewClass = "content-header-list-selected";
    } else {
      transactionClass = "content-header-list-selected";
    }

    var transactions = this.state.account.transactions;

    if (transactions === undefined) { return <div></div>; }

    var mappedBody = transactions.map(function(transaction, index) {
      var date = new Date(transaction.date);
      var dateFormat =
              [date.getMonth()+1,
               date.getDate(),
               date.getFullYear()].join('/');

      return (
        <tr key={index}>
          <td className="date">{dateFormat}</td>
          <td className="description">{transaction.description}</td>
          <td className="category">{transaction.category}</td>
          <td className="amount">{transaction.amount}</td>
        </tr>
      );
    });

    return (
      <main className="root-content group">

        <section className="root-content-sidebar-show">
          <h1>Type</h1>
          <div className="accounts">
            <div className="account-types">
              <div className="account-type-headers group">
              {mappedAccountTypes}
              </div>
            </div>
          </div>
          <h1>Accounts</h1>
            <div className="accounts">
              <div className="account-types">
                <div className="account-type-headers group">
                  <div className="account-types">
                    <div>
                      <a href="/"><h3 className="account-types-show-type">All Accounts</h3></a>
                    </div>
                  </div>
                  {mappedAccounts}
                </div>
              </div>
            </div>
        </section>

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
      </main>);
  }

});


module.exports = AccountShow;
