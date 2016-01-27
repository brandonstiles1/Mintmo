var React = require('react'),
    History = require('react-router').History;

var AccountStore = require('../stores/account'),
    ApiUtil  = require('../util/api_util');

var AccountTypeIndex = React.createClass({
  mixins: [History],

  handleClick: function (account) {
    this.history.pushState(null, '/accounts/' + account.id, {});
  },

  totalAccountTypeBalance: function (account_type) {
    var sum = 0;

    this.state.accounts[account_type].forEach(function(account) {
      sum += parseFloat(account.balance_n);
    });

    return sum;
  },

  render: function () {
    var that = this;
    var accounts = this.props.accounts;

    var mappedAccounts = accounts.map(function(account, index) {
      return <li className="account-type-account group" key={index}  >
              <p1 onClick={that.handleClick.bind(null, account)} >{account.name.slice(0, 18)}...</p1>
              <p2 >{account.balance}</p2>
            </li>;
    });

    return (
      <div className="accounts">
        {mappedAccounts}
      </div>
    );
  }

});

module.exports = AccountTypeIndex;
