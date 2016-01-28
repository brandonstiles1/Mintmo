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
    AccountTypeIndex = require('./components/account_type_index');


var routes = (
  <Route path="/" component={AccountIndex} >
    <Route path="accounts/:accountId" component={ AccountShow } />
  </Route>
);


window.init = function () {
  ReactDOM.render(
  <Router history={ createBrowserHistory } >{routes}</Router>,
  document.getElementById('root') );
};
