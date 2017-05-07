export const ADD_ACCOUNT = 'ADD_ACCOUNT';

export function addAccount(account) {
  return {
    type: ADD_ACCOUNT,
    account
  };
}
