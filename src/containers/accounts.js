import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Card } from 'material-ui/Card';
import { Container, Row, Col } from 'react-grid-system';
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
      <Container>
        <Row>
          <Col
            lg={4}
            sm={6}
          >
            <Card className={styles.card}>
              <AddAccount />
              <AccountList accounts={this.props.accounts} />
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

Accounts.propTypes = {
  accounts: PropTypes.array.isRequired
};

export default connect(mapStateToProps, null)(Accounts);
