import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import css from '../styles/Login.module.css';
import { userEmail as actionEmail } from '../redux/actions';

class Login extends React.Component {
  state = {
    userEmail: '',
    userPassword: '',
    disabled: true,
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState(
      {
        [name]: value,
      },
      this.validateData,
    );
  };

  validateData = () => {
    const maxLengthPassword = 6;

    const { userEmail, userPassword } = this.state;
    const isValidEmail = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;
    if (
      userPassword.length >= maxLengthPassword
      && isValidEmail.test(userEmail)
    ) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  };

  handleSubmit = () => {
    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(actionEmail(email));
    history.push('/carteira');
  };

  render() {
    const { disabled } = this.state;
    return (
      <div className={ css.loginForm }>
        <h3>Login</h3>
        <label htmlFor="userEmail">
          Email :
          <input
            name="userEmail"
            type="email"
            data-testid="email-input"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="user-password">
          Senha :
          <input
            name="userPassword"
            type="password"
            data-testid="password-input"
            onChange={ this.handleChange }
          />
        </label>
        <button
          className={ css.btn }
          disabled={ disabled }
          onClick={ this.handleSubmit }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(Login);
