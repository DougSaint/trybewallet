import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import css from '../styles/container.module.css';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    const { editor, idToEdit } = this.props;
    return (
      <main className={ css.container }>
        <Header />
        {editor ? <WalletForm id={ idToEdit } editor={ editor } /> : <WalletForm />}
        <Table />
      </main>
    );
  }
}

Wallet.propTypes = {
  editor: PropTypes.bool,
  idToEdit: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => {
  const { wallet } = state;
  return wallet;
};

export default connect(mapStateToProps)(Wallet);
