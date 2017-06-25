import React from 'react';
import { PropTypes } from 'prop-types';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import { grey400, darkBlack, lightBlack } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

import styles from '../assets/css/accountlist.css';

const iconButtonElement = (
  <IconButton>
    <MoreVertIcon />
  </IconButton>
);

export default class AccountList extends React.Component {
  rightIconMenu = (
    <IconMenu iconButtonElement={iconButtonElement}>
      <MenuItem>Full report</MenuItem>
      <MenuItem>Edit</MenuItem>
      <MenuItem>Delete</MenuItem>
    </IconMenu>
  );

  render() {
    return (
      <List>
        { this.props.accounts.map((account, i) => {
          const res = (
            <div key={i}>
              <ListItem
                // leftAvatar={<Avatar src="images/ok-128.jpg" />}
                rightIconButton={this.rightIconMenu}
                primaryText={account.name}
                secondaryText={
                  <p>
                    <span style={{ color: darkBlack }}>Brunch this weekend?</span><br />
                    Some other text
                  </p>
                }
                secondaryTextLines={2}
              />
              <Divider />
            </div>
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