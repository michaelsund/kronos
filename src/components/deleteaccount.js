import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import * as actions from '../actions';

import styles from '../assets/css/deleteaccount.css';

const mapDispatchToProps = (dispatch) => {
  const props = {
    onDeleteAccount: accountIndex => dispatch(
      actions.deleteAccount(accountIndex)
    )
  };
  return props;
};

class DeleteAccount extends React.Component {
  handleDeleteAccount = () => {
    this.props.onDeleteAccount(
      this.props.accountIndex
    );
    this.props.handleButtonPressed();
  }
  render() {
    return (
      <FlatButton
        secondary
        label="Delete account"
        onTouchTap={this.handleDeleteAccount}
      />
    );
  }
}

DeleteAccount.propTypes = {
  accountIndex: PropTypes.number.isRequired,
  handleButtonPressed: PropTypes.func,
  onDeleteAccount: PropTypes.func
};

export default connect(null, mapDispatchToProps)(DeleteAccount);
