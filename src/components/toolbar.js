import React from 'react';
import { PropTypes } from 'prop-types';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

const ipc = window.require('electron').ipcRenderer;

class ToolBar extends React.Component {
  closeApplication = () => {
    console.log('closing');
    ipc.send('close-main-window');
  }

  render() {
    return (
      <div>
        <AppBar
          style={{ boxShadow: 'none' }}
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

ToolBar.propTypes = {
  children: PropTypes.element.isRequired
};

export default ToolBar;
