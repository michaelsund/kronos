import React from 'react';
import { PropTypes } from 'prop-types';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import IconTimer from 'material-ui/svg-icons/image/timer';
import FlatButton from 'material-ui/FlatButton';
import IconFormatListBulleted from 'material-ui/svg-icons/editor/format-list-bulleted';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';

import styles from '../../src/assets/css/toolbar.css';

const ipc = window.require('electron').ipcRenderer;

export default class ToolBar extends React.Component {
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
    console.log('closing');
    ipc.send('close-main-window');
  }

  selectNav = (index) => {
    switch (index) {
      case 0:
        this.props.router.push('/timers');
        break;
      case 1:
        this.setState({ open: true });
        break;
      default:

    }
  }

  continueToAccounts = () => {
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
            titleStyle={{ WebkitAppRegion: 'drag' }}
            iconElementRight={
              <IconButton
                onTouchTap={() => { this.closeApplication(); }}
              >
                <NavigationClose />
              </IconButton>
            }
          />
        </div>
        <div className={styles.children}>
          {this.props.children}
        </div>
        <div className={styles.footerMenu}>
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
              All timers will be saved and paused, you can resume them at any time.
            </span>
          </Dialog>
        </div>
      </div>
    );
  }
}

ToolBar.propTypes = {
  children: PropTypes.element.isRequired,
  router: PropTypes.object.isRequired
};
