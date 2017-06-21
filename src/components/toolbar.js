import React from 'react';
import { PropTypes } from 'prop-types';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FontIcon from 'material-ui/FontIcon';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';

import styles from '../../src/assets/css/toolbar.css';

const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;

const ipc = window.require('electron').ipcRenderer;

export default class ToolBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: null
    };
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
        this.props.router.push('/accounts');
        break;
      default:

    }
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
              icon={recentsIcon}
              onTouchTap={() => { this.selectNav(0); }}
            />
            <BottomNavigationItem
              label="Accounts"
              icon={favoritesIcon}
              onTouchTap={() => { this.selectNav(1); }}
            />
          </BottomNavigation>
        </div>
      </div>
    );
  }
}

ToolBar.propTypes = {
  children: PropTypes.element.isRequired,
  router: PropTypes.object.isRequired
};
