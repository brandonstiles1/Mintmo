var React = require('react'),
    History = require('react-router').History;

var AccountStore = require('../stores/account'),
    ApiUtil  = require('../util/api_util'),
    AccountTypeIndex = require('./account_type_index'),
    TransactionIndex = require('./transaction_index');

var AccountIndex = React.createClass({
  mixins: [History],


  getInitialState: function () {
    return { accounts: AccountStore.all(), expanded: {}, overviewClicked: true, transactionsClicked: false, accountClicked: false};
  },

  handleOverviewClick: function () {
    this.setState({overviewClicked: true, transactionsClicked: false, accountClicked: false});
    this.history.pushState(null, '/', {});
  },

  handleAccountClick: function () {
    this.setState({accountClicked: true});
  },

  handleTransactionsClick: function () {
    this.setState({overviewClicked: false, transactionsClicked: true});
  },

  componentDidMount: function () {
    ApiUtil.fetchAccounts();
    this.storeListener = AccountStore.addListener(this.onChange);
  },

  onChange: function () {
    this.setState({accounts: AccountStore.all()});
  },

  componentWillUnmount: function () {
    this.storeListener.remove();
  },

  totalAccountTypeBalance: function (accountType) {
    var sum = 0;

    this.state.accounts[accountType].forEach(function(account) {
      sum += parseFloat(account.balance_n);
    });

    return sum;
  },

  toggleExpand: function (type) {
    if (this.state.expanded[type] === undefined) {
      this.state.expanded[type] = false;
    } else {
      this.state.expanded[type] = !this.state.expanded[type];
    }

    this.onChange();
  },

  render: function () {
    var that = this;
    var accounts = this.state.accounts;
    var accountTypes = [];
    var accountBalances = {};

    Object.keys(accounts).forEach(function(accountType) {
      if ( accounts[accountType].length > 0 ) {
        accountTypes.push(accountType);
        accountBalances[accountType] = that.totalAccountTypeBalance(accountType);
      }
    });

    var overviewClass = "overview",
        transactionClass = "transaction";
    if (this.state.overviewClicked) {
      overviewClass = "content-header-list-selected";
    } else {
      transactionClass = "content-header-list-selected";
    }

    var mappedAccounts = accountTypes.map(function(type){
      var typeClass = (accountBalances[type] > 0) ? "account-type-headers group" : "account-type-headers-neg group";
      var expandedAccounts;
      if (that.state.expanded[type] === undefined || that.state.expanded[type]) {
        expandedAccounts = (
          <ul >
            <AccountTypeIndex accountClick={that.handleAccountClick} transactionsClick={that.handleTransactionsClick} accounts={accounts[type]}/>
          </ul>);
      }

      return (
        <div key={type} className="account-types">
          <div onClick={that.toggleExpand.bind(null, type)} className={typeClass}>
            <h3 >{type}</h3>
            <h4 >${accountBalances[type]}</h4>
          </div>
          {expandedAccounts}
        </div>
      );
    });

    if (this.state.accountClicked) {

      return (
        <div>
          <header className="content-header">
            <nav className="content-header-nav group">

              <h1 className="content-header-logo">
                <a href="#"><img className="mintmo-logo" src="http://i.imgur.com/lTEkRfz.png" alt="" /></a>
              </h1>

              <ul className="content-header-list group">
                <li className={overviewClass}><a onClick={this.handleOverviewClick} href="#">Overview</a></li>
                <li className={transactionClass}><a onClick={this.handleTransactionsClick} href="#">Transactions</a></li>
              </ul>

            </nav>
          </header>
          {this.props.children}
        </div>
      );
    } else if (this.state.transactionsClicked){
      return (
        <div>
          <header className="content-header">
            <nav className="content-header-nav group">

              <h1 className="content-header-logo">
                <a href="#"><img className="mintmo-logo" src="http://i.imgur.com/lTEkRfz.png" alt="" /></a>
              </h1>

              <ul className="content-header-list group">
                <li className={overviewClass}><a onClick={this.handleOverviewClick} href="#">Overview</a></li>
                <li className={transactionClass}><a onClick={this.handleTransactionsClick} href="#">Transactions</a></li>
              </ul>

            </nav>
          </header>
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
          <TransactionIndex />
        </section>

      </main>
    </div>);
    } else {
      return (
        <div>
          <header className="content-header">
            <nav className="content-header-nav group">

              <h1 className="content-header-logo">
                <a href="#"><img className="mintmo-logo" src="http://i.imgur.com/lTEkRfz.png" alt="" /></a>
              </h1>

              <ul className="content-header-list group">
                <li className={overviewClass}><a onClick={this.handleOverviewClick} href="#">Overview</a></li>
                <li className={transactionClass}><a onClick={this.handleTransactionsClick} href="#">Transactions</a></li>
              </ul>

            </nav>
          </header>
          <main className="root-content group">
            <section className="root-content-sidebar">
            <h1>Accounts</h1>
          <div className="accounts">
            {mappedAccounts}

          </div>
        </section>
        <section className="root-content-main">
          <h1>Transactions</h1>
          <TransactionIndex />
        </section>

      </main>
    </div>);
    }


  }

});


module.exports = AccountIndex;



//               {this.props.children}
