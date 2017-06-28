const initialState = [
  {
    name: 'Bacc1',
    description: 'my first landed customer!',
    additionalNote: 'Contact is James Jameson',
    currency: 'kr',
    debitOnHourStarted: true,
    showDebitInReport: true,
    activities: [
      {
        name: 'testactivity1',
        totalSeconds: 60,
        hours: 0,
        minutes: 1,
        seconds: 0
      }
    ]
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
        name: 'testactivity1',
        totalSeconds: 60,
        hours: 0,
        minutes: 1,
        seconds: 0
      },
      {
        name: 'testactivity2',
        totalSeconds: 60,
        hours: 0,
        minutes: 1,
        seconds: 0
      }
    ]
  }
];

const sortAccountsByName = (accounts) => {
  const sorted = accounts.sort((a, b) => a.name.localeCompare(b.name));
  return sorted;
};

const updateActivity = (accountIndex, activityIndex, activity, accounts) => {
  // Sort
  const accs = sortAccountsByName(accounts);
  // Calc totalSeconds
  const totalSeconds = ((activity.hours * 60 * 60) + (activity.minutes * 60) + activity.seconds);
  const newActivity = activity;
  newActivity.totalSeconds = totalSeconds;
  // Updated and return the new accounts array
  accs[accountIndex].activities[activityIndex] = newActivity;
  return accs;
};

const accounts = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ACCOUNT':
      return sortAccountsByName(Object([...state, action.account]));
    case 'EDIT_ACCOUNT_ACTIVITY':
      console.log(`accountIndex: ${action.accountIndex} activityIndex: ${action.activityIndex}`);
      console.log(`activity: ${JSON.stringify(action.activity)}`);
      return updateActivity(
        action.accountIndex,
        action.activityIndex,
        action.activity,
        state
      );
    default:
      return sortAccountsByName(state);
  }
};

export default accounts;
