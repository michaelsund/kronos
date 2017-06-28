import update from 'react-addons-update';

const initialState = [];

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
        state,
        action.moveToAccountConfirm,
        action.moveToAccountIndex
      );
    case 'SAVE_TIMER':
      return update(state, {
        [action.accountIndex]: {
          activities: { $set: [...state[action.accountIndex].activities, action.activity] }
        }
      });
    default:
      return sortAccountsByName(state);
  }
};

export default accounts;
