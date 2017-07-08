import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import IconAdd from 'material-ui/svg-icons/content/add';
import * as actions from '../actions';

import styles from '../assets/css/deleteactivity.css';

const mapDispatchToProps = (dispatch) => {
  const props = {
    onAddTimer: () => dispatch(
      actions.addTimer()
    )
  };
  return props;
};

class DeleteActivity extends React.Component {
  render() {
    return (
      <p>Remove</p>
    );
  }
}

DeleteActivity.propTypes = {
};

export default connect(null, mapDispatchToProps)(DeleteActivity);
