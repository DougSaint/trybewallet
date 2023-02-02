import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../imgs/logoTrybeWallet.svg';
import cash from '../imgs/cash.svg';
import userImg from '../imgs/user.svg';
import css from '../styles/Header.module.css';

class Header extends Component {
  render() {
    const { email } = this.props;
    console.log(email);
    return (
      <header className={ css.headerBar }>
        <img src={ logo } className={ css.logo } alt="logoTrybe" />
        <div className={ css.cost }>
          <p>
            <img src={ cash } alt="cash" />
            Total de despesas :
            {' '}
            <span data-testid="total-field">0</span>
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
}.isRequired;

const mapStateToProps = (state) => ({ ...state.user });

export default connect(mapStateToProps)(Header);
