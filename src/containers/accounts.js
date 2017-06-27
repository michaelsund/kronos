import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Card } from 'material-ui/Card';
import AccountList from '../components/accountlist';
import AddAccount from '../components/addaccount';
import * as actions from '../actions';

import styles from '../assets/css/accounts.css';

const mapStateToProps = (state) => {
  const props = {
    accounts: state.accounts
  };
  return props;
};

class Accounts extends React.Component {
  render() {
    return (
      <Card className={styles.card}>
        <AddAccount />
        <AccountList accounts={this.props.accounts} />
      </Card>
    );
  }
}

Accounts.propTypes = {
  accounts: PropTypes.array.isRequired
};

export default connect(mapStateToProps, null)(Accounts);
