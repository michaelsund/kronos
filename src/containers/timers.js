import React from 'react';
import { routeActions } from 'react-router-redux';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { PropTypes } from 'prop-types';
import { Container, Row, Col } from 'react-grid-system';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
// import Paper from 'material-ui/Paper';
import * as actions from '../actions';
import Timer from '../components/timer';

import styles from '../../src/assets/css/main.css';

const mapStateToProps = (state) => {
  const props = {
    accounts: state.accounts
  };
  return props;
};

const mapDispatchToProps = (dispatch) => {
  const props = {
    onAddAccount: account => dispatch(
      actions.addAccount(account)
    )
  };
  return props;
};

class Timers extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Col sm={6}>
            <Timer hourProgress />
          </Col>
          <Col sm={6}>
            <Timer hourProgress />
          </Col>
          <Col sm={6}>
            <Timer hourProgress />
          </Col>
          <Col sm={6}>
            <Timer hourProgress />
          </Col>
        </Row>
      </Container>
    );
  }
}

Timers.propTypes = {
  router: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Timers);
