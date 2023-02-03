import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchWallet, createExpense } from '../redux/actions';
import css from '../styles/WalletForm.module.css';
import { fetchApi } from '../service/Api';

class WalletForm extends Component {
  state = {
    costValue: '',
    description: '',
    coin: 'USD',
    methodPayment: 'Dinheiro',
    tagInput: 'Alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchWallet());
  }

  clearForm = () => {
    this.setState({
      costValue: '',
      description: '',
      coin: 'USD',
      methodPayment: 'Dinheiro',
      tagInput: 'Alimentação',
    });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, this.validateData);
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    const { coin, costValue, description, methodPayment, tagInput } = this.state;
    const allCoins = await fetchApi();
    const data = {
      value: costValue,
      description,
      currency: coin,
      method: methodPayment,
      tag: tagInput,
      exchangeRates: allCoins,
    };
    dispatch(createExpense(data));
    this.clearForm();
  };

  render() {
    const { currencies } = this.props;
    const { coin, costValue, description, methodPayment, tagInput } = this.state;
    return (
      <form className={ css.mainForm } onSubmit={ this.handleSubmit }>
        <div className={ css.firstColumn }>
          <label htmlFor="costValue" className={ css.costLabel }>
            Valor da despesa:
            {' '}
            <input
              data-testid="value-input"
              type="number"
              onChange={ this.handleChange }
              name="costValue"
              value={ costValue }
            />
          </label>

          <label htmlFor="description">
            Descrição da despesa:
            {' '}
            <input
              data-testid="description-input"
              type="text"
              onChange={ this.handleChange }
              name="description"
              value={ description }
            />
          </label>
          <label htmlFor="coin">
            Moeda :
            <select
              name="coin"
              data-testid="currency-input"
              onChange={ this.handleChange }
              value={ coin }
            >
              {currencies.map((currency) => (
                <option key={ currency } name={ currency }>
                  {currency}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="methodPayment">
            Forma de pagamento:
            <select
              name="methodPayment"
              data-testid="method-input"
              onChange={ this.handleChange }
              value={ methodPayment }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="tagInput">
            Categoria:
            <select
              name="tagInput"
              data-testid="tag-input"
              onChange={ this.handleChange }
              value={ tagInput }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
        </div>
        <button type="submit">Adicionar despesa</button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.array,
  dispatch: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => {
  const { wallet } = state;
  return wallet;
};

export default connect(mapStateToProps)(WalletForm);
