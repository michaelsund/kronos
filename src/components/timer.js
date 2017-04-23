import React from 'react';
import { PropTypes } from 'prop-types';
import IconButton from 'material-ui/IconButton';

class ToolBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      staticSeconds: 0,
      running: false,
      hours: 0,
      minutes: 0,
      seconds: 0
    };
    this.timer = null;
  }

  componentWillUnmount() {
    this.setState({ running: false });
    clearInterval(this.timer);
  }

  startTimer = () => {
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
  }

  stopTimer = () => {
    this.setState({ running: false });
    clearInterval(this.timer);
  }

  render() {
    return (
      <div>
        <h2>Hours {this.state.hours} Minutes {this.state.minutes} Seconds {this.state.seconds}</h2>
        <button onClick={() => { this.startTimer(); }}>Start</button>
        <button onClick={() => { this.stopTimer(); }}>Stop</button>
      </div>
    );
  }
}

ToolBar.propTypes = {
};

export default ToolBar;
