import React from 'react';
import { PropTypes } from 'prop-types';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import { Container, Row, Col } from 'react-grid-system';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import { grey400, darkBlack, lightBlack } from 'material-ui/styles/colors';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import moment from 'moment';
import EditAccount from './editaccount';
import EditActivity from './editactivity';

import styles from '../assets/css/accountlist.css';

export default class AccountList extends React.Component {
  render() {
    moment.locale('en');
    return (
      <div>
        <EditAccount
          onRef={ref => (this.editAccountRef = ref)}
        />
        <EditActivity
          onRef={ref => (this.editActivityRef = ref)}
        />
        { this.props.accounts.length > 0 ? (
          <List>
            { this.props.accounts.map((account, i) => {
              const res = (
                <ListItem
                  key={i}
                  leftAvatar={
                    <div>
                      <Avatar>
                        {account.name[0].toUpperCase()}
                      </Avatar>
                    </div>
                  }
                  primaryText={account.name}
                  secondaryText={
                    <div>
                      <span style={{ color: darkBlack }}>{account.description}</span><br />
                      <span>{account.additionalNote}</span>
                    </div>
                  }
                  secondaryTextLines={2}
                  onClick={() => { this.editAccountRef.openDialog(i, account); }}
                  nestedItems={account.activities.length > 0 ? (
                    account.activities.map((act, x) => {
                      const activity = (
                        <ListItem
                          key={x}
                          onClick={() => { this.editActivityRef.openDialog(i, x, act); }}
                          primaryText={
                            <div>
                              <p>
                                {act.name} for {act.hours} hours and {act.minutes} minutes
                              </p>
                            </div>
                          }
                          secondaryText={
                            <p>
                              Created at {moment(act.createdAt).format('d MMM YYYY')}
                            </p>
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
        ) : (
          <div className={styles.accountsEmptyText}>
            Oh dear, no accounts yet? better create one!
          </div>
        )}
      </div>
    );
  }
}

AccountList.propTypes = {
  accounts: PropTypes.array.isRequired
};
