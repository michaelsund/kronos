import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

const ipc = window.require('electron').ipcRenderer;

class ToolBar extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  asdf = () => {
    console.log('closing main window');
    ipc.send('close-main-window');
  }

  render() {
    return (
      <div>
        <AppBar
          style={{ WebkitAppRegion: 'drag', boxShadow: 'none' }}
          title="Kronos"
          iconElementRight={
            <IconButton>
              <NavigationClose />
            </IconButton>
          }
        />
      </div>
    );
  }
}

export default ToolBar;
