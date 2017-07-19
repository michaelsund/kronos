import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

const ipc = window.require('electron').ipcRenderer;

const mapStateToProps = (state) => {
  const props = {
    accounts: state.accounts,
    timers: state.timers
  };
  return props;
};

class ImportExport extends React.Component {
  componentDidMount = () => {
    this.props.onRef(this);
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  exportToJsonFile = (path) => {
    const toSend = {
      accounts: this.props.accounts,
      timers: this.props.timers
    };

    // TODO: check if ipc can recieve more than one arg
    ipc.send('export', toSend, path);
  }

  render() {
    return (null);
  }
}

ImportExport.propTypes = {
  accounts: PropTypes.array,
  timers: PropTypes.array,
  onRef: PropTypes.func.isRequired
};

export default connect(mapStateToProps, null)(ImportExport);
