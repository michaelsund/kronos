import React from 'react';
import { Card } from 'material-ui/Card';
import AccountList from '../components/accountlist';
import AddAccount from '../components/addaccount';

import styles from '../assets/css/accounts.css';

class Accounts extends React.Component {
  render() {
    return (
      <Card className={styles.card}>
        <AddAccount />
        <AccountList accounts={[{ name: 'test1' }, { name: 'test2' }]} />
      </Card>
    );
  }
}

export default Accounts;
