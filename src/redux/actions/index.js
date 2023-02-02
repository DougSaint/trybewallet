export const USER_EMAIL = 'USER_EMAIL';
export const WALLET = 'WALLET';

export const userEmail = (email) => ({
  type: USER_EMAIL,
  payload: email,
});
export const wallet = (data) => ({
  type: WALLET,
  payload: data,
});
