import update from 'react-addons-update';

const initialState = [
  {
    id: 'a1zxsgcps',
    name: 'Test',
    description: 'created',
    additionalNote: 'created additional note',
    currency: '$',
    debitOnHourStarted: false,
    showDebitInReport: false,
    activities: [
      {
        name: '123',
        staticSeconds: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        createdAt: '2017-07-08T16:24:27.160Z'
      }
    ]
  },
  {
    id: '25p73ckpy',
    name: 'Test2',
    description: 'created',
    additionalNote: 'created additional note',
    currency: '$',
    debitOnHourStarted: false,
    showDebitInReport: false,
    activities: []
  },
  {
    id: '97ekc3j5a',
    name: 'Test3',
    description: 'created',
    additionalNote: 'created additional note',
    currency: '$',
    debitOnHourStarted: false,
    showDebitInReport: false,
    activities: []
  }
];

const sortAccountsByName = (accounts) => {
  const sorted = accounts.sort((a, b) => a.name.localeCompare(b.name));
  return sorted;
};

const updateActivity = (
  accountIndex,
  activityIndex,
  activity,
  accounts,
  moveToAccountConfirm,
  moveToAccountIndex
) => {
  // Sort
  const accs = sortAccountsByName(accounts);
  // Calc staticSeconds
  const staticSeconds = ((activity.hours * 60 * 60) + (activity.minutes * 60) + activity.seconds);
  const newActivity = activity;
  newActivity.staticSeconds = staticSeconds;
  if (!moveToAccountConfirm) {
    accs[accountIndex].activities[activityIndex] = newActivity;
  } else {
    accs[accountIndex].activities.pop(activityIndex);
    accs[moveToAccountIndex].activities.unshift(newActivity);
  }
  return accs;
};

const findAccountIndexById = (accounts, id) => {
  let index = null;
  for (const [i, val] of accounts.entries()) {
    if (val.id === id) {
      index = i;
    }
  }
  return index;
};

const accounts = (state = initialState, action) => {
  let accountIndex = null;
  switch (action.type) {
    case 'DEL_ACTIVITY':
      return update(state, {
        [action.accountIndex]: {
          activities: { $splice: [[action.activityIndex, 1]] }
        }
      });
    case 'DEL_ACCOUNT':
      return update(state, {
        $splice: [[action.accountIndex, 1]]
      });
    case 'ADD_ACCOUNT':
      return sortAccountsByName(Object([...state, action.account]));
    case 'EDIT_ACCOUNT_ACTIVITY':
      return updateActivity(
        action.accountIndex,
        action.activityIndex,
        action.activity,
        state,
        action.moveToAccountConfirm,
        action.moveToAccountIndex
      );
    case 'SAVE_TIMER':
      accountIndex = findAccountIndexById(state, action.accountId);
      return update(state, {
        [accountIndex]: {
          activities: { $set: [action.activity, ...state[accountIndex].activities] }
        }
      });
    default:
      return sortAccountsByName(state);
  }
};

export default accounts;
