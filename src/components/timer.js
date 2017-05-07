import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import LinearProgress from 'material-ui/LinearProgress';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import IconSave from 'material-ui/svg-icons/content/save';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';

import styles from '../assets/css/timer.css';

const mapStateToProps = (state) => {
  const props = {
    accounts: state.accounts
  };
  return props;
};

class Timer extends React.Component {
  static timer = null;

  static propTypes = {
    accounts: PropTypes.array.isRequired,
    hourProgress: PropTypes.bool.isRequired
  }

  state = {
    staticSeconds: 0,
    running: false,
    hours: 0,
    minutes: 0,
    seconds: 0,
    account: '',
    activity: ''
  }

  componentWillUnmount = () => {
    this.setState({ running: false });
    clearInterval(this.timer);
  }

  startPauseTimer = () => {
    if (!this.state.running) {
      this.setState({ running: true });
      this.timer = setInterval(() => {
        this.setState({ staticSeconds: this.state.staticSeconds + 1 });
        if (this.state.minutes === 59) {
          this.setState({ hours: this.state.hours + 1, minutes: 0 });
        }
        if (this.state.seconds === 59) {
          this.setState({ minutes: this.state.minutes + 1, seconds: 0 });
        } else {
          this.setState({ seconds: this.state.seconds + 1 });
        }
      }, 1000);
    } else {
      clearInterval(this.timer);
      this.setState({ running: false });
    }
  }

  resetTimer = () => {
    clearInterval(this.timer);
    this.setState({
      staticSeconds: 0,
      running: false,
      hours: 0,
      minutes: 0,
      seconds: 0
    });
  }

  handleAccountChange = (event, index, account) => {
    this.setState({ account });
  }

  handleActivityChange = (event, activity) => {
    this.setState({ activity });
  }

  render() {
    return (
      <div className={styles.timerContainer}>
        <TextField
          floatingLabelText="Activity"
          onChange={this.handleActivityChange}
        />
        <h2>
          {(0 + this.state.hours.toString()).slice(-2)}:
          {(0 + this.state.minutes.toString()).slice(-2)}:
          {(0 + this.state.seconds.toString()).slice(-2)}
        </h2>
        <FlatButton onClick={() => { this.startPauseTimer(); }}>
          {this.state.running ? (
            <span>Pause</span>
          ) : (
            <span>Start</span>
          )}
        </FlatButton>
        <FlatButton onClick={() => { this.resetTimer(); }}>
          Reset
        </FlatButton>
        <div className={styles.hourProgress}>
          {this.props.hourProgress ? (
            <LinearProgress min={0} max={60} mode="determinate" value={this.state.minutes} />
          ) : (
            null
          )}
        </div>
        <SelectField
          floatingLabelText="Account"
          value={this.state.account}
          onChange={this.handleAccountChange}
        >
          {this.props.accounts.map((account, i) => {
            const row = <MenuItem key={i} value={account.name} primaryText={account.name} />;
            return row;
          })}
        </SelectField>
        <IconButton tooltip="Save">
          <IconSave />
        </IconButton>
        <IconButton tooltip="Delete">
          <DeleteIcon />
        </IconButton>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(Timer);
