import { ADD_ACCOUNT } from '../actions';

const initialState = [
  {
    name: 'Bacc1',
    description: 'my first landed customer!',
    additionalNote: 'Contact is James Jameson',
    currency: 'kr',
    debitOnHourStarted: true,
    showDebitInReport: true,
    activities: []
  },
  {
    name: 'Cacc1',
    description: 'my first landed customer!',
    additionalNote: 'Contact is James Jameson',
    currency: 'kr',
    debitOnHourStarted: true,
    showDebitInReport: true,
    activities: [
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
  {
    name: 'Aacc1',
    description: 'my first landed customer!',
    additionalNote: 'Contact is James Jameson',
    currency: 'kr',
    debitOnHourStarted: true,
    showDebitInReport: true,
    activities: [
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

const sortAccountsByName = (accounts) => {
  const sorted = accounts.sort((a, b) => a.name.localeCompare(b.name));
  return sorted;
};

const accounts = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ACCOUNT':
      return sortAccountsByName(Object([...state, action.account]));
    default:
      return sortAccountsByName(state);
  }
};

export default accounts;
