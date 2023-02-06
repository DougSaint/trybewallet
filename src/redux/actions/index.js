import { fetchApi } from '../../service/Api';

export const USER_EMAIL = 'USER_EMAIL';
export const WALLET = 'WALLET';
export const REQUEST_STARTED = 'REQUEST_STARTED';
export const REQUEST_SUCESSFUL = 'REQUEST_SUCESSFUL';
export const REQUEST_FAIL = 'REQUEST_FAIL';
export const CREATE_EXPENSE = 'CREATE_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const START_EDIT = 'START_EDIT';

export const userEmail = (email) => ({
  type: USER_EMAIL,
  payload: email,
});

export const requestSucessful = (data) => ({
  type: REQUEST_SUCESSFUL,
  payload: data,
});

export const requestWallet = () => ({
  type: REQUEST_STARTED,
});

export const requestFail = () => ({
  type: REQUEST_FAIL,
});

export const fetchWallet = () => async (dispatch) => {
  dispatch(requestWallet);
  try {
    const data = await fetchApi();
    dispatch(requestSucessful(data));
  } catch (e) {
    dispatch(requestFail());
  }
};

export const createExpense = (expense) => ({
  type: CREATE_EXPENSE,
  payload: expense,
});

export const deleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  payload: id,
});

export const editExpense = (expense) => ({
  type: EDIT_EXPENSE,
  payload: expense,
});

export const startEdit = (id) => ({
  type: START_EDIT,
  payload: id,
});
