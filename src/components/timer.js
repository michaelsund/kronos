import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import LinearProgress from 'material-ui/LinearProgress';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import IconSave from 'material-ui/svg-icons/content/save';
import IconDelete from 'material-ui/svg-icons/action/delete';
import IconPause from 'material-ui/svg-icons/av/pause';
import IconPlay from 'material-ui/svg-icons/av/play-arrow';
import IconReplay from 'material-ui/svg-icons/av/replay';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import { Container, Row, Col, ClearFix } from 'react-grid-system';
import Dialog from 'material-ui/Dialog';
import * as actions from '../actions';

import styles from '../assets/css/timer.css';

const mapStateToProps = (state) => {
  const props = {
    accounts: state.accounts,
    timers: state.timers
  };
  return props;
};

const mapDispatchToProps = (dispatch) => {
  const props = {
    onSetTime: data => dispatch(
      actions.setTime(data)
    ),
    onSetTimeAccount: data => dispatch(
      actions.setTimeAccount(data)
    ),
    onSetTimeActivity: data => dispatch(
      actions.setTimeActivity(data)
    ),
    onSetStatus: data => dispatch(
      actions.setStatus(data)
    ),
    onResetTime: timerIndex => dispatch(
      actions.resetTime(timerIndex)
    ),
    onDeleteTimer: timerIndex => dispatch(
      actions.deleteTimer(timerIndex)
    ),
    onSaveTimer: (accountId, activity) => dispatch(
      actions.saveTimer(accountId, activity)
    )
  };
  return props;
};

class Timer extends React.Component {
  static timer = null;

  constructor(props) {
    super(props);
    this.state = {
      deleteDialogOpen: false,
      timerWasSaved: false,
      createdAt: null,
      saveToAccountIndex: null
    };
  }

  componentWillMount = () => {
    this.setState({ createdAt: new Date() });
  }

  componentWillReceiveProps = (nextProps) => {
    if (!nextProps.timers[this.props.timerIndex].running) {
      // Pause timer, we got not running from redux store.
      clearInterval(this.timer);
    }
  }

  componentWillUnmount = () => {
    this.setState({ running: false });
    clearInterval(this.timer);
  }

  startPauseTimer = () => {
    if (!this.props.timers[this.props.timerIndex].running) {
      this.props.onSetStatus({
        timerIndex: this.props.timerIndex,
        running: true
      });
      this.timer = setInterval(() => {
        this.props.onSetTime({
          timerIndex: this.props.timerIndex,
          staticSeconds: this.props.timers[this.props.timerIndex].staticSeconds + 1
        });
      }, 1000);
    } else {
      clearInterval(this.timer);
      this.props.onSetStatus({
        timerIndex: this.props.timerIndex,
        running: false
      });
    }
  }

  resetTimer = () => {
    clearInterval(this.timer);
    this.props.onSetStatus({
      timerIndex: this.props.timerIndex,
      running: false
    });
    this.props.onResetTime(this.props.timerIndex);
  }

  handleAccountChange = (event, index, account) => {
    this.props.onSetTimeAccount({
      timerIndex: this.props.timerIndex,
      accountId: this.findAccountIdByIndex(index),
      account
    });
  }

  handleActivityChange = (event, activity) => {
    this.props.onSetTimeActivity({
      timerIndex: this.props.timerIndex,
      activity
    });
  }

  deleteTimer = () => {
    this.props.onDeleteTimer(this.props.timerIndex);
    this.setState({ deleteDialogOpen: false });
  }

  saveTimer = () => {
    const timer = this.props.timers[this.props.timerIndex];
    if (timer.account.name && timer.account.activity) {
      if (this.props.timers[this.props.timerIndex].account.id !== null) {
        this.props.onSaveTimer(
          this.props.timers[this.props.timerIndex].account.id,
          {
            name: timer.account.activity,
            staticSeconds: timer.staticSeconds,
            hours: timer.hours,
            minutes: timer.minutes,
            seconds: timer.seconds,
            createdAt: this.state.createdAt
          }
        );
        this.setState({ timerWasSaved: true });
        clearInterval(this.timer);
        this.props.onSetStatus({
          timerIndex: this.props.timerIndex,
          running: false
        });
      }
    }
  }

  findAccountIdByIndex = (accountIndex) => {
    const id = this.props.accounts[accountIndex].id;
    return id;
  };

  render() {
    return (
      <div>
        <Card className={styles.cards}>
          <CardHeader
            title={this.props.timers[this.props.timerIndex].account.name.length > 0 ? (this.props.timers[this.props.timerIndex].account.name) : ('Account not assigned')}
            subtitle={this.props.timers[this.props.timerIndex].account.activity.length > 0 ? (this.props.timers[this.props.timerIndex].account.activity) : ('No activity set')}
            actAsExpander
            showExpandableButton
          />
          <CardActions>
            <Container>
              <Row>
                <div className={styles.progressDiv}>
                  {this.props.hourProgress ? (
                    <LinearProgress
                      color="#333"
                      min={0}
                      max={60}
                      mode="determinate"
                      value={this.props.timers[this.props.timerIndex].minutes}
                    />
                  ) : (
                    null
                  )}
                </div>
              </Row>
              <Row>
                <Col sm={4}>
                  <p className={styles.timerText}>
                    {(0 + this.props.timers[this.props.timerIndex].hours.toString()).slice(-2)}:
                    {(0 + this.props.timers[this.props.timerIndex].minutes.toString()).slice(-2)}:
                    {(0 + this.props.timers[this.props.timerIndex].seconds.toString()).slice(-2)}
                  </p>
                </Col>
                <Col sm={2} />
                <Col sm={6} className={styles.buttonRow}>
                  {this.props.timers[this.props.timerIndex].running ? (
                    <IconButton
                      className={styles.playPauseButtons}
                      tooltip="Pause"
                      tooltipPosition="top-center"
                      onClick={() => { this.startPauseTimer(); }}
                    >
                      <IconPause className={styles.icons} />
                    </IconButton>
                  ) : (
                    <IconButton
                      className={styles.playPauseButtons}
                      tooltip="Start"
                      tooltipPosition="top-center"
                      onClick={() => { this.startPauseTimer(); }}
                    >
                      <IconPlay className={styles.icons} />
                    </IconButton>
                  )}
                  <IconButton
                    tooltip="Reset"
                    tooltipPosition="top-center"
                    onClick={() => { this.resetTimer(); }}
                  >
                    <IconReplay className={styles.icons} />
                  </IconButton>
                </Col>
              </Row>
            </Container>
          </CardActions>
          <CardText expandable>
            <Container>
              <Row>
                <SelectField
                  floatingLabelFixed
                  floatingLabelText="Account (required)"
                  value={this.props.timers[this.props.timerIndex].account.name}
                  onChange={this.handleAccountChange}
                >
                  {this.props.accounts.map((account, i) => {
                    const row = (
                      <MenuItem
                        key={i}
                        value={account.name}
                        primaryText={account.name}
                      />
                    );
                    return row;
                  })}
                </SelectField>
              </Row>
            </Container>
            <Container>
              <Row>
                <TextField
                  floatingLabelFixed
                  floatingLabelText="Activity  (required)"
                  value={this.props.timers[this.props.timerIndex].account.activity}
                  onChange={this.handleActivityChange}
                />
              </Row>
            </Container>
            <Container className={styles.iconButtonsContainer}>
              <Row>
                <Col sm={2} className={styles.colNoPad}>
                  <IconButton
                    tooltip="Save"
                    tooltipPosition="top-center"
                    onClick={() => { this.saveTimer(); }}
                  >
                    <IconSave className={styles.icons} />
                  </IconButton>
                </Col>
                <Col sm={2} className={styles.colNoPad}>
                  <IconButton
                    tooltip="Delete"
                    tooltipPosition="top-center"
                    onClick={() => { this.setState({ deleteDialogOpen: true }); }}
                  >
                    <IconDelete className={styles.icons} />
                  </IconButton>
                </Col>
                <Col sm={8}>
                  { this.state.timerWasSaved ? (
                    <p className={styles.timerSavedText}>Timer has been saved!</p>
                  ) : (
                    null
                  )}
                </Col>
              </Row>
            </Container>
          </CardText>
        </Card>
        <Dialog
          title="Attention!"
          modal={false}
          actions={
            <div>
              <FlatButton
                label="Cancel"
                onTouchTap={() => { this.setState({ deleteDialogOpen: false }); }}
              />
              <FlatButton
                label="Ok"
                onTouchTap={() => { this.deleteTimer(); }}
              />
            </div>
          }
          open={this.state.deleteDialogOpen}
        >
          <span>
            Are you sure?<br />
            {this.props.timers[this.props.timerIndex].account.name.length > 0 ? (
              <p>
                The timer for acccount
                <b> {this.props.timers[this.props.timerIndex].account.name} </b>
                with activity<b> {this.props.timers[this.props.timerIndex].account.activity} </b>
                will be removed.
              </p>
            ) : (
              <p>The timer will be stopped and removed.</p>
            )}
          </span>
        </Dialog>
      </div>
    );
  }
}

Timer.propTypes = {
  accounts: PropTypes.array.isRequired,
  timers: PropTypes.array.isRequired,
  hourProgress: PropTypes.bool.isRequired,
  timerIndex: PropTypes.number.isRequired,
  onSetTime: PropTypes.func,
  onResetTime: PropTypes.func,
  onSetStatus: PropTypes.func,
  onSetTimeAccount: PropTypes.func,
  onSetTimeActivity: PropTypes.func,
  onDeleteTimer: PropTypes.func,
  onSaveTimer: PropTypes.func,
};


export default connect(mapStateToProps, mapDispatchToProps)(Timer);
