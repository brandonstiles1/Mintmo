var React = require('react'),
    ReactDOM = require('react-dom'),
    ReactRouter = require('react-router'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute;


var App = React.createClass({
  render: function(){
    return (
        <div>
          <header><h1>Mintmo</h1></header>
          <p> I'm the root!</p>
        </div>
    );
  }
  });

var routes = (
  <Route path="/" component={App}>
  </Route>
);


document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(
  <Router>{routes}</Router>,
  document.getElementById('root') );
});
