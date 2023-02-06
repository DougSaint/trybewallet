import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchWallet,
  createExpense,
  editExpense,
  deleteExpense,
} from '../redux/actions';
import { findById } from '../service/Helpers';
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

  componentDidUpdate(prevProps) {
    const { editor, idToEdit, expenses } = this.props;

    if (editor && editor !== prevProps.editor) {
      const teste = findById(expenses, idToEdit);
      console.log(teste);
      this.setState({
        costValue: teste.value,
        description: teste.description,
        coin: teste.currency,
        methodPayment: teste.ethod,
        tagInput: teste.tag,
      });
    }
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
    const { dispatch, editor, idToEdit } = this.props;
    const { coin, costValue, description, methodPayment, tagInput } = this.state;
    const data = {
      value: costValue,
      description,
      currency: coin,
      method: methodPayment,
      tag: tagInput,
      exchangeRates: await fetchApi(),
    };
    if (editor) {
      dispatch(deleteExpense(idToEdit));
      dispatch(editExpense({ ...data, id: idToEdit }));
    } else {
      dispatch(createExpense(data));
      this.clearForm();
    }
  };

  render() {
    const { currencies, editor } = this.props;
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
        <button type="submit" className={ editor ? css.editBtn : css.addBtn }>
          {editor ? 'Editar despesa' : 'Adicionar Despesa'}
        </button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.instanceOf(Array).isRequired,
  dispatch: PropTypes.func.isRequired,
  editor: PropTypes.bool,
  expenses: PropTypes.instanceOf(Array),
  idToEdit: PropTypes.number,
};

WalletForm.defaultProps = {
  editor: false,
  idToEdit: false,
  expenses: [],
};

const mapStateToProps = (state) => {
  const { wallet } = state;
  return wallet;
};

export default connect(mapStateToProps)(WalletForm);
