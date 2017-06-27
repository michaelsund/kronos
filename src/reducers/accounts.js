import { ADD_ACCOUNT } from '../actions';

const initialState = [
  {
    name: 'acc1',
    description: 'my first landed customer!',
    additionalNote: 'Contact is James Jameson',
    currency: 'kr',
    debitOnHourStarted: true,
    showDebitInReport: true,
    activites: [
      {
        name: 'activity1',
        totalSeconds: 1000,
        hours: 10,
        minutes: 9,
        seconds: 8
      },
      {
        name: 'activity2',
        totalSeconds: 1000,
        hours: 10,
        minutes: 9,
        seconds: 8
      }
    ]
  },
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
