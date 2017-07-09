import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import * as actions from '../actions';

import styles from '../assets/css/deleteactivity.css';

const mapDispatchToProps = (dispatch) => {
  const props = {
    onDeleteActivity: (accountIndex, activityIndex) => dispatch(
      actions.deleteActivity(accountIndex, activityIndex)
    )
  };
  return props;
};

class DeleteActivity extends React.Component {
  handleDeleteActivity = () => {
    this.props.onDeleteActivity(
      this.props.accountIndex,
      this.props.activityIndex
    );
    this.props.handleButtonPressed();
  }
  render() {
    return (
      <FlatButton
        secondary
        label="Delete activity"
        onTouchTap={this.handleDeleteActivity}
      />
    );
  }
}

DeleteActivity.propTypes = {
  accountIndex: PropTypes.number.isRequired,
  activityIndex: PropTypes.number.isRequired,
  handleButtonPressed: PropTypes.func,
  onDeleteActivity: PropTypes.func
};

export default connect(null, mapDispatchToProps)(DeleteActivity);
