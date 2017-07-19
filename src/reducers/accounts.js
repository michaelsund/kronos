import update from 'react-addons-update';

const initialState = [
  // {
  //   id: 'a1zxsgcps',
  //   name: 'Test',
  //   description: 'created CURRENT DEV',
  //   additionalNote: 'created additional note',
  //   currency: '$',
  //   debitOnHourStarted: true,
  //   showDebitInReport: false,
  //   activities: [
  //     {
  //       name: '123',
  //       staticSeconds: 300,
  //       hours: 0,
  //       minutes: 3,
  //       seconds: 4,
  //       createdAt: '2017-07-08T16:24:27.160Z'
  //     }
  //   ]
  // },
  // {
  //   id: '25p73ckpy',
  //   name: 'Test2',
  //   description: 'created',
  //   additionalNote: 'created additional note',
  //   currency: '$',
  //   debitOnHourStarted: false,
  //   showDebitInReport: false,
  //   activities: []
  // },
  // {
  //   id: '97ekc3j5a',
  //   name: 'Test3',
  //   description: 'created',
  //   additionalNote: 'created additional note',
  //   currency: '$',
  //   debitOnHourStarted: false,
  //   showDebitInReport: false,
  //   activities: []
  // }
];

const sortAccountsByName = (accounts) => {
  const sorted = accounts.sort((a, b) => a.name.localeCompare(b.name));
  return Object([...sorted]);
};

const updateActivity = (
  accountIndex,
  activityIndex,
  activity,
  accounts,
  moveToAccountIndex
) => {
  // Sort
  const accs = sortAccountsByName(accounts);
  // Calc staticSeconds
  const staticSeconds = ((activity.hours * 60 * 60) + (activity.minutes * 60) + activity.seconds);
  const newActivity = activity;
  newActivity.staticSeconds = staticSeconds;
  if (moveToAccountIndex === null) {
    accs[accountIndex].activities[activityIndex] = newActivity;
  } else {
    accs[accountIndex].activities.pop(activityIndex);
    accs[moveToAccountIndex].activities.unshift(newActivity);
  }
  return accs;
};

const editAccount = (accountIndex, oldAccs, account) => {
  // Not passing along activities so a copy of those will be needed.
  let savedActivities = null;
  const newAccs = oldAccs;
  if (oldAccs[accountIndex].activities.length > 0) {
    savedActivities = oldAccs[accountIndex].activities;
  } else {
    savedActivities = [];
  }
  newAccs[accountIndex] = account;
  newAccs[accountIndex].activities = savedActivities;
  return sortAccountsByName(newAccs);
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
    case 'LOAD_ACCOUNTS':
      return Object([...action.accounts]);
    case 'EDIT_ACCOUNT':
      return editAccount(action.accountIndex, state, action.account);
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
