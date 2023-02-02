import React from 'react';
import Header from '../components/Header';
import css from '../styles/container.module.css';

class Wallet extends React.Component {
  render() {
    return (
      <main className={ css.container }>
        <Header />
      </main>
    );
  }
}

export default Wallet;
