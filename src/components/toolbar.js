import React from 'react';
import { PropTypes } from 'prop-types';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import styles from '../../src/assets/css/toolbar.css';

const ipc = window.require('electron').ipcRenderer;

export default class ToolBar extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  }

  closeApplication = () => {
    console.log('closing');
    ipc.send('close-main-window');
  }

  render() {
    return (
      <div>
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
        {this.props.children}
      </div>
    );
  }
}
