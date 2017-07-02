import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Container, Row, Col } from 'react-grid-system';
import IconButton from 'material-ui/IconButton';
import * as actions from '../actions';

import Timer from '../components/timer';
import NewTimer from '../components/newtimer';
import styles from '../../src/assets/css/main.css';

const mapStateToProps = (state) => {
  const props = {
    accounts: state.accounts,
    timers: state.timers
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
  test = () => {
    console.log('test');
  };


  render() {
    return (
      <Container>
        <Row>
          { this.props.timers.map((timer, i) => {
            const result = (
              <Col sm={6} key={i}>
                <Timer
                  hourProgress
                  timerIndex={i}
                />
              </Col>
            );
            return result;
          })}
          <Col sm={6}>
            <NewTimer />
          </Col>
        </Row>
      </Container>
    );
  }
}

Timers.propTypes = {
  timers: PropTypes.array
};

export default connect(mapStateToProps, mapDispatchToProps)(Timers);
