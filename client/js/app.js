import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Route, Router, IndexRoute, browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import Home from './components/home';
import Profile from './components/profile';
import Index from './components/index';

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={ store }>
    <Router history={ browserHistory }>
      <Route path="/" component={ Index }>
        <IndexRoute component={ Home }></IndexRoute>
        <Route path="/profile" component={ Profile }></Route>
      </Route>
    </Router>
  </Provider>, document.getElementById('app'));