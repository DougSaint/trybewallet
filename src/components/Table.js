import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import css from '../styles/Table.module.css';
import {
  findCoin,
  getCambioRate,
  getValue,
  twoDecimals,
} from '../service/Helpers';

import { deleteExpense, startEdit } from '../redux/actions';

class Table extends React.Component {
  render() {
    const { expenses, dispatch } = this.props;
    return (
      <table className={ css.table }>
        <thead>
          <tr className={ css.row }>
            <th className={ css.headerItem }>Descrição</th>
            <th className={ css.headerItem }>Tag</th>
            <th className={ css.headerItem }>Método de pagamento</th>
            <th className={ css.headerItem }>Valor</th>
            <th className={ css.headerItem }>Moeda</th>
            <th className={ css.headerItem }>Câmbio utilizado</th>
            <th className={ css.headerItem }>Valor convertido</th>
            <th className={ css.headerItem }>Moeda de conversão</th>
            <th className={ css.headerItem }>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(
            ({
              id,
              value,
              description,
              currency,
              method,
              tag,
              exchangeRates,
            }) => (
              <tr key={ id } className={ css.row }>
                <td className={ css.rowItem }>{description}</td>
                <td className={ css.rowItem }>{tag}</td>
                <td className={ css.rowItem }>{method}</td>
                <td className={ css.rowItem }>{twoDecimals(value)}</td>
                <td className={ css.rowItem }>
                  {findCoin(currency, exchangeRates)}
                </td>
                <td className={ css.rowItem }>
                  {getCambioRate(exchangeRates, currency).toFixed(2)}
                </td>
                <td className={ css.rowItem }>
                  R$
                  {getValue({ value, currency, exchangeRates }).toFixed(2)}
                </td>
                <td className={ css.rowItem }>Real</td>
                <td className={ css.buttons }>
                  <button
                    className={ css.editButton }
                    data-testid="edit-btn"
                    onClick={ () => {
                      dispatch(startEdit(id));
                    } }
                  >
                    Editar
                  </button>
                  <button
                    className={ css.deleteButton }
                    data-testid="delete-btn"
                    onClick={ () => dispatch(deleteExpense(id)) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.shape({
    map: PropTypes.func,
  }),
}.isRequired;

const mapStateToProps = (state) => {
  const { wallet } = state;
  return wallet;
};

export default connect(mapStateToProps)(Table);
