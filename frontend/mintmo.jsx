var React = require('react'),
    ReactDOM = require('react-dom'),
    ReactRouter = require('react-router'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute;

var App = require('./app'),
    AccountIndex = require('./components/account_index');


var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={AccountIndex}/>
  </Route>
);


window.init = function () {
  ReactDOM.render(
  <Router>{routes}</Router>,
  document.getElementById('root') );
};
