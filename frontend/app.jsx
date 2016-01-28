var React = require('react');

var AccountIndex = require('./components/account_index'),
    TransactionIndex = require('./components/transaction_index'),
    History = require('react-router').History;

var App = React.createClass({


  render: function(){

    return (
        <div>
        </div>
    );
  }
});

module.exports = App;

// var App = React.createClass({
//   mixins: [History],
//
//   getInitialState: function () {
//       return { overviewClicked: true, transactionsClicked: false };
//   },
//
//   handleOverviewClick: function (account) {
//     this.setState({overviewClicked: true, transactionsClicked: false});
//     this.history.pushState(null, '/', {});
//   },
//
//   handleTransactionsClick: function (account) {
//     this.setState({overviewClicked: false, transactionsClicked: true});
//     this.history.pushState(null, '/', {});
//   },
//
//   render: function(){
//
//     var overviewClass = "overview",
//         transactionClass = "transaction";
//     if (this.state.overviewClicked) {
//       overviewClass = "content-header-list-selected";
//     } else {
//       transactionClass = "content-header-list-selected";
//     }
//
//     return (
//         <div>
//           <header className="content-header">
//             <nav className="content-header-nav group">
//
//               <h1 className="content-header-logo">
//                 <a href="#"><img className="mintmo-logo" src="http://i.imgur.com/lTEkRfz.png" alt="" /></a>
//               </h1>
//
//               <ul className="content-header-list group">
//                 <li className={overviewClass}><a onClick={this.handleOverviewClick} href="#">Overview</a></li>
//                 <li className={transactionClass}><a onClick={this.handleTransactionsClick} href="#">Transactions</a></li>
//               </ul>
//
//             </nav>
//           </header>
//           <main className="root-content group">
//             <section className="root-content-sidebar">
//               {this.props.children}
//             </section>
//             <section className="root-content-main">
//               <h1>Transactions</h1>
//               <TransactionIndex />
//
//             </section>
//
//           </main>
//         </div>
//     );
//   }
// });
