import update from 'react-addons-update';
import {
  ADD_TIMER,
  SET_TIME,
  SET_STATUS,
  SET_TIME_ACCOUNT,
  SET_TIME_ACTIVITY
} from '../actions';

const initialState = [
  {
    account: {
      name: '',
      activity: ''
    },
    staticSeconds: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    running: false
  },
  {
    account: {
      name: 'acc2',
      activity: 'testactivity2'
    },
    staticSeconds: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    running: false
  },
];

const calcTime = (staticSeconds) => {
  const hours = Math.floor(staticSeconds / (60 * 60));
  const divisorForMinutes = staticSeconds % (60 * 60);
  const minutes = Math.floor(divisorForMinutes / 60);
  const divisorForSeconds = divisorForMinutes % 60;
  const seconds = Math.ceil(divisorForSeconds);
  return ({ hours, minutes, seconds });
};

const timers = (state = initialState, action) => {
  let calculatedTime = null;
  switch (action.type) {
    case 'SET_TIME_ACCOUNT':
      return update(state, {
        [action.data.timerIndex]: {
          account: {
            name: { $set: action.data.account }
          }
        }
      });
    case 'SET_TIME_ACTIVITY':
      return update(state, {
        [action.data.timerIndex]: {
          account: {
            activity: { $set: action.data.activity }
          }
        }
      });
    case 'SET_TIME':
      calculatedTime = calcTime(action.data.staticSeconds);
      return update(state, {
        [action.data.timerIndex]: {
          staticSeconds: { $set: action.data.staticSeconds },
          hours: { $set: calculatedTime.hours },
          minutes: { $set: calculatedTime.minutes },
          seconds: { $set: calculatedTime.seconds }
        }
      });
    case 'RESET_TIME':
      return update(state, {
        [action.timerIndex]: {
          staticSeconds: { $set: 0 },
          hours: { $set: 0 },
          minutes: { $set: 0 },
          seconds: { $set: 0 }
        }
      });
    case 'SET_STATUS':
      return update(state, {
        [action.data.timerIndex]: {
          running: { $set: action.data.running }
        }
      });
    case 'ADD_TIMER':
      return Object.assign([
        ...state,
        {
          account: {
            name: '',
            activity: ''
          },
          staticSeconds: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          running: false
        }
      ]);
    default:
      return state;
  }
};

export default timers;
