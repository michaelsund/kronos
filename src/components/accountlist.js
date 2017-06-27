import React from 'react';
import { PropTypes } from 'prop-types';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import { grey400, darkBlack, lightBlack } from 'material-ui/styles/colors';
import IconEdit from 'material-ui/svg-icons/editor/mode-edit';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import EditActivity from './editactivity';

import styles from '../assets/css/accountlist.css';

const iconButtonElement = (
  <IconButton>
    <MoreVertIcon />
  </IconButton>
);

export default class AccountList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  rightIconMenu = (
    <IconMenu iconButtonElement={iconButtonElement}>
      <MenuItem>Full report</MenuItem>
      <MenuItem>Edit</MenuItem>
      <MenuItem>Delete</MenuItem>
    </IconMenu>
  );

  handleNestedListToggle = (item) => {
    this.setState({
      open: item.state.open,
    });
  };

  render() {
    const handleEditActivity = (act) => {
      const res = (
        <EditActivity activity={act} />
      );
      return res;
    };

    return (
      <List>
        { this.props.accounts.map((account, i) => {
          const res = (
            <ListItem
              key={i}
              leftAvatar={
                <Avatar>
                  {account.name[0].toUpperCase()}
                </Avatar>
              }
              // rightIconButton={this.rightIconMenu}
              primaryText={account.name}
              secondaryText={
                <p>
                  <span style={{ color: darkBlack }}>{account.description}</span><br />
                  {account.additionalNote}
                </p>
              }
              secondaryTextLines={2}
              primaryTogglesNestedList
              nestedItems={account.activities.length > 0 ? (
                account.activities.map((act, x) => {
                  const activity = (
                    <ListItem
                      key={x}
                      primaryText={
                        `${act.hours} hours ${act.minutes} minutes, ${act.name}`
                      }
                      rightIconButton={
                        <IconButton
                          tooltip="Edit activity"
                          tooltipPosition="top-center"
                          onTouchTap={() => { handleEditActivity(act); }}
                        >
                          <IconEdit className={styles.icons} />
                        </IconButton>
                      }
                    />
                  );
                  return activity;
                })
              ) : (
                []
              )}
            />
          );
          return res;
        })}
      </List>
    );
  }
}

AccountList.propTypes = {
  accounts: PropTypes.array.isRequired
};
