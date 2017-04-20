import { TEST_STUFF } from '../actions';

const initialState = 'Test';

const home = (state = initialState, action) => {
  switch (action.type) {
    case 'TEST_STUFF':
      return state;
    default:
      return state;
  }
};

export default home;
