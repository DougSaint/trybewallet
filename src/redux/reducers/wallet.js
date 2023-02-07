import {
  getTotalValue,
  removeElement,
  orderArray,
} from '../../service/Helpers';
import {
  REQUEST_SUCESSFUL,
  CREATE_EXPENSE,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  START_EDIT,
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
  case REQUEST_SUCESSFUL:
    return {
      ...state,
      currencies: [
        ...Object.keys(action.payload).filter((e) => e !== 'USDT'),
      ],
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
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: removeElement(state.expenses, action.payload),
      totalValue: getTotalValue(
        removeElement(state.expenses, action.payload),
      ),
    };
  case START_EDIT:
    return { ...state, editor: true, idToEdit: action.payload };
  case EDIT_EXPENSE:
    return {
      ...state,
      expenses: orderArray([...state.expenses, action.payload]),
      totalValue: getTotalValue([...state.expenses, action.payload]),
      editor: false,
      idToEdit: 0,
    };
  default:
    return state;
  }
};

export default wallet;
