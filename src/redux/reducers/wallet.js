import { getTotalValue } from '../../service/TotalValue';
import {
  REQUEST_SUCESSFUL,
  REQUEST_STARTED,
  REQUEST_FAIL,
  CREATE_EXPENSE,
} from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  isFetching: false,
  errorMsg: '',
  totalValue: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_STARTED:
    return {
      ...state,
      isFetching: true,
    };
  case REQUEST_SUCESSFUL:
    return {
      ...state,
      currencies: [
        ...Object.keys(action.payload).filter((e) => e !== 'USDT'),
      ],
      isFetching: false,
    };
  case REQUEST_FAIL:
    return {
      ...state,
      errorMsg: 'deu ruim',
      isFetching: false,
    };

  case CREATE_EXPENSE:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        { ...action.payload, id: state.expenses.length },
      ],
      totalValue: getTotalValue([...state.expenses, action.payload]),
    };
  default:
    return state;
  }
};

export default wallet;
