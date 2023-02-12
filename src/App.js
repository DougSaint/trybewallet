import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import css from './app.module.css';
import NotFound from './pages/NotFound';

function App() {
  return (
    <main className={ css.root }>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/carteira" component={ Wallet } />
        <Route component={ NotFound } />
      </Switch>
    </main>
  );
}

export default App;
