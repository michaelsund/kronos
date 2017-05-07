import { ADD_ACCOUNT } from '../actions';

const initialState = [
  { name: 'acc1' },
  { name: 'acc2' },
];

const accounts = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ACCOUNT':
      return Object([...state, action.account]);
    default:
      return state;
  }
};

export default accounts;
