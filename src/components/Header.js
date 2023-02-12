import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../imgs/logoTrybeWallet.svg';
import cash from '../imgs/cash.svg';
import userImg from '../imgs/user.svg';
import css from '../styles/Header.module.css';

class Header extends Component {
  render() {
    const { email, totalValue } = this.props;
    return (
      <header className={ css.headerBar }>
        <Link to="/carteira">
          <img src={ logo } className={ css.logo } alt="logoTrybe" />
        </Link>
        <div className={ css.cost }>
          <p>
            <img src={ cash } alt="cash" />
            Total de despesas :
            {' '}
            <span data-testid="total-field">{totalValue.toFixed(2)}</span>
            <span data-testid="header-currency-field">BRL</span>
          </p>
        </div>
        <div className={ css.userEmail }>
          <p data-testid="email-field">
            <img src={ userImg } className={ css.userImg } alt="User" />
            {email}
          </p>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  totalValue: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  totalValue: state.wallet.totalValue,
});

export default connect(mapStateToProps)(Header);
