import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import * as actions from '../actions';

const mapStateToProps = (state) => {
  const props = {
    accounts: state.accounts,
    timers: state.timers
  };
  return props;
};

const mapDispatchToProps = (dispatch) => {
  const props = {
    onLoadAccounts: accounts => dispatch(
      actions.loadAccounts(accounts)
    ),
    onLoadTimers: timers => dispatch(
      actions.loadTimers(timers)
    )
  };
  return props;
};

class PersistentStates extends React.Component {
  componentDidMount = () => {
    this.props.onRef(this);
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  saveToLocalStorage = () => {
    const toSave = {
      accounts: this.props.accounts,
      timers: this.props.timers
    };

    localStorage.setItem('kronos', JSON.stringify(toSave));
  }

  loadFromLocalStorage = () => {
    const storage = JSON.parse(localStorage.getItem('kronos'));
    if (storage !== null) {
      console.log(JSON.stringify(storage.timers));
      console.log(JSON.stringify(storage.accounts));
      this.props.onLoadTimers(storage.timers);
      this.props.onLoadAccounts(storage.accounts);
    }
  }

  render() {
    return (null);
  }
}

PersistentStates.propTypes = {
  accounts: PropTypes.array,
  timers: PropTypes.array,
  onRef: PropTypes.func.isRequired,
  onLoadTimers: PropTypes.func.isRequired,
  onLoadAccounts: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(PersistentStates);
