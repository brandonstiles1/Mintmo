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
    TransactionIndex = require('./components/transaction_index'),
    CurrentUserStore = require('./stores/current_user_store'),
    SessionsApiUtil = require('./util/sessions_api_util'),
    SessionForm = require('./components/sessions/new'),
    UserForm = require('./components/users/user_form');


var routes = (
  <Router >
    <Route path="/" component={App} >
    <IndexRoute component={AccountIndex}  />
    <Route path="login" component={ SessionForm }/>
    <Route path="users/new" component={ UserForm } />
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

function _ensureLoggedIn(nextState, replace, callback) {
  // the third `callback` arg allows us to do async
  // operations before the route runs. Router will wait
  // for us to call it before actually routing

  if (CurrentUserStore.userHasBeenFetched()) {
    // _redirectIfNotLoggedIn(); // this function below
  } else {
    // currentUser has not been fetched
    // lets fetch them and then see if
    // we have to redirect or not

    SessionsApiUtil.fetchCurrentUser(_redirectIfNotLoggedIn);
  }

  function _redirectIfNotLoggedIn() {
    if (!CurrentUserStore.isLoggedIn()) {

      replace({}, "/login");
      callback();
    }
    callback();
  }
};
