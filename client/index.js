import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';
import DynamicImport from './helpers/routing/DynamicImport';

const Home = () => import('containers/home/Home');

function asyncImport(customComponent, props) {
  return (
    <DynamicImport load={customComponent}>
      {Component => (Component === null
        ? (
          <p>
            Loading...
          </p>
        )
        : <Component {...props} />)}
    </DynamicImport>
  );
}


const App = () => (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">
            Home
          </Link>
        </li>
      </ul>

      <hr />

      <Route exact path="/" component={props => (asyncImport(Home, props))} />
    </div>
  </Router>
);

ReactDOM.render(<App />, document.getElementById('App'));
