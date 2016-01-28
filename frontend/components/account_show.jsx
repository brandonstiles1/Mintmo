var React = require('react'),
    History = require('react-router').History;

var AccountStore =require('../stores/account');

var AccountShow = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return {account: AccountStore.find(parseInt(this.props.params.accountId))};
  },

  render: function () {

    return (
      <div>

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
          </div>
    );
  }

});


module.exports = AccountShow;
