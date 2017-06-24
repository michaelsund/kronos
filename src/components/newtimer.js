import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-grid-system';
import { Card } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import IconAdd from 'material-ui/svg-icons/content/add';
import * as actions from '../actions';

import styles from '../assets/css/newtimer.css';

const mapDispatchToProps = (dispatch) => {
  const props = {
    onAddTimer: () => dispatch(
      actions.addTimer()
    )
  };
  return props;
};

class NewTimer extends React.Component {
  addNewTimer = () => {
    this.props.onAddTimer();
  }

  render() {
    return (
      <Card className={styles.card}>
        <Container>
          <Row>
            <Col sm={5} />
            <Col sm={2}>
              <IconButton
                tooltip="New timer"
                tooltipPosition="top-center"
                onTouchTap={() => { this.addNewTimer(); }}
              >
                <IconAdd className={styles.icons} />
              </IconButton>
            </Col>
            <Col sm={5} />
          </Row>
        </Container>
      </Card>
    );
  }
}

NewTimer.propTypes = {
  onAddTimer: PropTypes.func
};

export default connect(null, mapDispatchToProps)(NewTimer);
