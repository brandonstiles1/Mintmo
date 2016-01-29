var React = require('react'),
    History = require('react-router').History;

var AccountStore = require('../stores/account'),
    ApiUtil  = require('../util/api_util'),
    AccountTypeIndex = require('./account_type_index'),
    TransactionIndex = require('./transaction_index'),
    IndexSidebar = require('./sidebars/index_sidebar'),
    AccountShowSidebar = require('./sidebars/show_sidebar'),
    AccountShow = require('./account_show'),
    Header = require('./header');

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
        overviewClicked = this.state.overviewClicked,
        transactionsClicked = this.state.transactionsClicked,
        overviewClass = "overview",
        transactionClass = "transaction",
        header =
          <Header
            overviewClicked={overviewClicked}
            transactionsClicked={transactionsClicked}
            overviewClick={this.handleOverviewClick}
            transactionsClick={this.handleTransactionsClick}/>;

    if (overviewClicked) {
      overviewClass = "content-header-list-selected";
    } else {
      transactionClass = "content-header-list-selected";
    }

    if (this.state.accountClicked) {
      return (
        <div>
          {header}
          <AccountShow />
        </div>
      );
    } else if (this.state.transactionsClicked){

      return (
        <div>
          {header}
          <main className="root-content group">
            <AccountShowSidebar
              accounts={that.state.accounts}
              accountClick={that.handleAccountClick}
              transactionsClick={that.handleTransactionsClick}
              />
        <section className="root-content-main">
          <h1>Transactions</h1>
          <TransactionIndex />
        </section>
      </main>
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
          <h1>Transactions</h1>
          <TransactionIndex />
          </section>
        </main>
      </div>);
    }
  }

});


module.exports = AccountIndex;
