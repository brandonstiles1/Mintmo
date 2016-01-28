var React = require('react'),
    ReactDOM = require('react-dom'),
    ReactRouter = require('react-router'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute,
    createBrowserHistory = ReactRouter.createBrowserHistory;

var App = require('./app'),
    AccountIndex = require('./components/account_index'),
    AccountShow = require('./components/account_show'),
    AccountTypeIndex = require('./components/account_type_index'),
    TransactionIndex = require('./components/transaction_index');


var routes = (
  <Router history={ createBrowserHistory } >
    <Route path="/" component={AccountIndex} >
      <Route path="accounts/:accountId" component={ AccountShow } >
      </Route>
    </Route>
  </Router>
);


window.init = function () {
  ReactDOM.render(
  routes,
  document.getElementById('root') );
};
