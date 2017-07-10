import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-grid-system';
import { Card } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import IconAdd from 'material-ui/svg-icons/content/add';
import * as actions from '../actions';

import styles from '../assets/css/newtimer.css';
import kronosSvg from '../assets/images/kronoslogo.svg';

const mapStateToProps = (state) => {
  const props = {
    timers: state.timers
  };
  return props;
};

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
        <div>
          <IconButton
            tooltip="Add a timer"
            tooltipPosition="bottom-right"
            onTouchTap={() => { this.addNewTimer(); }}
          >
            <IconAdd className={styles.icons} />
          </IconButton>
        </div>
        <div className={styles.textDiv}>
          <p className={styles.addText}>
            {this.props.timers.length > 0 ? (
              <span>Click the plus sign to add another timer.</span>
            ) : (
              <span>Sure is empty here..<br />Add a timer to get started.</span>
            )}
          </p>
        </div>
        <img role="presentation" src={kronosSvg} className={styles.logoNewTimer} />
      </Card>
    );
  }
}

NewTimer.propTypes = {
  onAddTimer: PropTypes.func,
  timers: PropTypes.array
};

export default connect(mapStateToProps, mapDispatchToProps)(NewTimer);
