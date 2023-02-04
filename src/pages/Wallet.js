import React from 'react';
import Header from '../components/Header';
import css from '../styles/container.module.css';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <main className={ css.container }>
        <Header />
        <WalletForm />
        <Table />
      </main>
    );
  }
}

export default Wallet;
