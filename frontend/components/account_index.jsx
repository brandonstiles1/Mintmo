var React = require('react'),
    History = require('react-router').History;

var AccountStore = require('../stores/account'),
    ApiUtil  = require('../util/api_util'),
    AccountTypeIndex = require('./account_type_index'),
    TransactionIndex = require('./transaction_index'),
    IndexSidebar = require('./sidebars/index_sidebar'),
    AccountShowSidebar = require('./sidebars/show_sidebar'),
    AccountShow = require('./account_show'),
    Header = require('./header'),
    ComponentActions = require('../actions/component_actions'),
    Search = require('./search'),
    Footer = require('./footer');

var AccountIndex = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return {
      accounts: AccountStore.all(),
      expanded: {},
      overviewClicked: true,
      transactionsClicked: false,
      accountClicked: false
    };
  },

  handleOverviewClick: function () {
    this.setState({overviewClicked: true, transactionsClicked: false, accountClicked: false});
  },

  handleAccountClick: function () {
    this.setState({accountClicked: true});
  },

  handleAllAccountsClick: function () {
    this.setState({overviewClicked: true, transactionsClicked: false, accountClicked: false});
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


  render: function () {

    var that = this,
        accounts = this.state.accounts,
        accountClicked = this.state.accountClicked,
        overviewClicked = this.state.overviewClicked,
        transactionsClicked = this.state.transactionsClicked,
        overviewClass = ComponentActions.getOverviewClass(overviewClicked),
        accountsArr = ComponentActions.getAccountsArr(accounts),
        transactionClass = ComponentActions.getTransactionClass(transactionsClicked),
        modal = <div></div>;
        header =
          <Header
            overviewClicked={overviewClicked}
            transactionsClicked={transactionsClicked}
            overviewClick={this.handleOverviewClick}
            transactionsClick={this.handleTransactionsClick}/>;

    if (accountsArr.length === 0) {
      return this.newUserWelcome();
    } else if (accountClicked) {
      
      return (
        <div>
          {header}
          <AccountShow />
          <Footer />
        </div>
      );
    } else if (transactionsClicked){

      return (
        <div>
          {header}
          <main className="root-content group">
            <AccountShowSidebar
              showAllAccounts="true"
              allAccountsClick={that.handleAllAccountsClick}
              accounts={that.state.accounts}
              accountClick={that.handleAccountClick}
              transactionsClick={that.handleTransactionsClick}
              />
        <section className="root-content-main">
          <h1>Transactions</h1>
          <TransactionIndex />
        </section>
      </main>
      <Footer />
    </div>);
    } else {
    return (
      <div>
        {header}
        <main className="root-content group">
          <IndexSidebar
            accounts={that.state.accounts}
            accountClick={that.handleAccountClick}
            transactionsClick={that.handleTransactionsClick}
            />

          <section className="root-content-main">
          <header className="root-content-main-header">
            <h1>All Transactions</h1>

          </header>
            <TransactionIndex />
          </section>
        </main>
        <Footer />
      </div>);
    }
  },

  newUserWelcome: function () {
    return (
      <div>
        {header}
        <main className="root-content group">
          <IndexSidebar
            accounts={this.state.accounts}
            accountClick={this.handleAccountClick}
            transactionsClick={this.handleTransactionsClick}
            />

          <section className="root-content-main">
          <header className="root-content-main-header">
            <h1>Welcome to Mintmo</h1>
          </header>
          <section>
            <p className="get-started">Let's get started! Try adding some accounts by clicking the pencil icon in the left sidebar. To improve the financial advice we provide, update your profile by clicking account on the navbar above.</p>

          </section>
          </section>
        </main>
        <Footer/>
      </div>);
  }

});


module.exports = AccountIndex;
