var React = require('react');
var ReactDOM = require('react-dom');
var CSSTransitionGroup = require('react-addons-css-transition-group');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

//var History = ReactRouter.History;

var { browserHistory } = require('react-router');

var h = require('./helpers');


/*Import Component*/

import NotFound from './components/NotFound';
import StorePicker from './components/StorePicker';
import App from './components/App';

/*
*
* Routes
*
* */

var routes = (
    <Router history={browserHistory}>
        <Route path="/" component={StorePicker}/>
        <Route path="/store/:storeId" component={App}/>
        <Route path="*" component={NotFound}/>
    </Router>
)

ReactDOM.render(routes , document.querySelector('#main'));