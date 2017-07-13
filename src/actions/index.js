export const ADD_ACCOUNT = 'ADD_ACCOUNT';
export const ADD_TIMER = 'ADD_TIMER';
export const SET_TIME = 'SET_TIME';
export const SET_TIME_ACCOUNT = 'SET_TIME_ACCOUNT';
export const SET_TIME_ACTIVITY = 'SET_TIME_ACTIVITY';
export const SET_STATUS = 'SET_STATUS';
export const RESET_TIME = 'RESET_TIME';
export const DELETE_TIMER = 'DELETE_TIMER';
export const SET_ALL_PAUSED = 'SET_ALL_PAUSED';
export const EDIT_ACCOUNT_ACTIVITY = 'EDIT_ACCOUNT_ACTIVITY';
export const DEL_ACTIVITY = 'DEL_ACTIVITY';
export const DEL_ACCOUNT = 'DEL_ACCOUNT';
export const SAVE_TIMER = 'SAVE_TIMER';
export const EDIT_ACCOUNT = 'EDIT_ACCOUNT';

export const editAccount = (accountIndex, account) => {
  const r = {
    type: EDIT_ACCOUNT,
    accountIndex,
    account
  };
  return r;
};

export const deleteAccount = (accountIndex) => {
  const r = {
    type: DEL_ACCOUNT,
    accountIndex
  };
  return r;
};

export const saveTimer = (accountId, activity) => {
  const r = {
    type: SAVE_TIMER,
    accountId,
    activity
  };
  return r;
};

export const deleteActivity = (accountIndex, activityIndex) => {
  const r = {
    type: DEL_ACTIVITY,
    accountIndex,
    activityIndex
  };
  return r;
};

export const setAllPaused = () => {
  const r = {
    type: SET_ALL_PAUSED
  };
  return r;
};

export const addAccount = (account) => {
  const r = {
    type: ADD_ACCOUNT,
    account
  };
  return r;
};

export const addTimer = () => {
  const r = {
    type: ADD_TIMER
  };
  return r;
};

export const setTime = (data) => {
  const r = {
    type: SET_TIME,
    data
  };
  return r;
};

export const resetTime = (timerIndex) => {
  const r = {
    type: RESET_TIME,
    timerIndex
  };
  return r;
};

export const setStatus = (data) => {
  const r = {
    type: SET_STATUS,
    data
  };
  return r;
};

export const setTimeAccount = (data) => {
  const r = {
    type: SET_TIME_ACCOUNT,
    data
  };
  return r;
};

export const setTimeActivity = (data) => {
  const r = {
    type: SET_TIME_ACTIVITY,
    data
  };
  return r;
};

export const deleteTimer = (timerIndex) => {
  const r = {
    type: DELETE_TIMER,
    timerIndex
  };
  return r;
};

export const editAccountActivity = (
  accountIndex,
  activityIndex,
  activity,
  moveToAccountIndex
) => {
  const r = {
    type: EDIT_ACCOUNT_ACTIVITY,
    accountIndex,
    activityIndex,
    activity,
    moveToAccountIndex
  };
  return r;
};
