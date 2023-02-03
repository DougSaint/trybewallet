import React from 'react';
import Header from '../components/Header';
import css from '../styles/container.module.css';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  render() {
    return (
      <main className={ css.container }>
        <Header />
        <WalletForm />
      </main>
    );
  }
}

export default Wallet;
