import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import NavigationMinimize from 'material-ui/svg-icons/content/remove';
import IconTimer from 'material-ui/svg-icons/image/timer';
import FlatButton from 'material-ui/FlatButton';
import IconFormatListBulleted from 'material-ui/svg-icons/editor/format-list-bulleted';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import * as actions from '../actions';

import styles from '../../src/assets/css/toolbar.css';

const ipc = window.require('electron').ipcRenderer;

const mapStateToProps = (state) => {
  const props = {
    timers: state.timers
  };
  return props;
};

const mapDispatchToProps = (dispatch) => {
  const props = {
    onSetAllPaused: () => dispatch(
      actions.setAllPaused()
    )
  };
  return props;
};

class ToolBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: null,
      open: false
    };
  }

  closeDialog = () => {
    this.setState({ open: false });
  }

  closeApplication = () => {
    ipc.send('close-main-window');
  }

  minimizeApplication = () => {
    ipc.send('minimize-main-window');
  }

  selectNav = (index) => {
    switch (index) {
      case 0:
        this.props.router.push('/timers');
        break;
      case 1:
        this.checkTimersState();
        break;
      default:

    }
  }

  checkTimersState = () => {
    let allPaused = false;
    if (this.props.timers.length > 0) {
      for (const timer of this.props.timers) {
        if (!timer.running) {
          allPaused = true;
        }
      }
      if (!allPaused) {
        // Not all timers are paused, ask if its ok to pause.
        this.setState({ open: true });
      } else {
        this.props.router.push('/accounts');
      }
    } else {
      this.props.router.push('/accounts');
    }
  }

  continueToAccounts = () => {
    this.props.onSetAllPaused();
    this.closeDialog();
    this.props.router.push('/accounts');
  }

  render() {
    return (
      <div>
        <div className={styles.mainContainer}>
          <AppBar
            style={{ position: 'fixed' }}
            className={styles.toolBar}
            showMenuIconButton={false}
            title="Kronos"
            iconElementRight={
              <div>
                <IconButton
                  onTouchTap={() => { this.minimizeApplication(); }}
                >
                  <NavigationMinimize className={styles.minimizeIcon} />
                </IconButton>
                <IconButton
                  onTouchTap={() => { this.closeApplication(); }}
                >
                  <NavigationClose className={styles.closeIcon} />
                </IconButton>
              </div>
            }
          />
        </div>
        <div className={styles.children}>
          {this.props.children}
        </div>
        <div className={styles.footerMenu}>
          <Paper zDepth={1}>
            <BottomNavigation selectedIndex={this.state.selectedIndex}>
              <BottomNavigationItem
                label="Timers"
                icon={
                  <IconTimer />
                }
                onTouchTap={() => { this.selectNav(0); }}
              />
              <BottomNavigationItem
                label="Accounts"
                icon={
                  <IconFormatListBulleted />
                }
                onTouchTap={() => { this.selectNav(1); }}
              />
            </BottomNavigation>
          </Paper>
          <Dialog
            title="Attention!"
            modal={false}
            actions={
              <div>
                <FlatButton
                  label="Cancel"
                  onTouchTap={this.closeDialog}
                />
                <FlatButton
                  label="Ok"
                  onTouchTap={this.continueToAccounts}
                />
              </div>
            }
            open={this.state.open}
          >
            <span>
              All timers will be paused, you can resume them at any time.
            </span>
          </Dialog>
        </div>
      </div>
    );
  }
}

ToolBar.propTypes = {
  children: PropTypes.element.isRequired,
  timers: PropTypes.array.isRequired,
  router: PropTypes.object.isRequired,
  onSetAllPaused: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(ToolBar);
