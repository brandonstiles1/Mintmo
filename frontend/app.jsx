var React = require('react');

var AccountIndex = require('./components/account_index');

var App = React.createClass({
  render: function(){
    return (
        <div>
          <header className="content-header">
            <nav className="content-header-nav group">

              <h1 className="content-header-logo">
                <a href="#"><img src="../app/images/mint-logo.png" alt="" /></a>
              </h1>

              <ul className="content-header-list group">
                <li><a href="#">Overview</a></li>
                <li><a href="#">Transactions</a></li>
              </ul>

            </nav>
          </header>

          <main className="root-content group">
            <section className="root-content-sidebar">

              <h1>Accounts</h1>
              <AccountIndex />
              

            </section>

          </main>
        </div>
    );
  }
});

module.exports = App;
