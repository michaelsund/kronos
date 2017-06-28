import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Container, Row, Col } from 'react-grid-system';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import { grey400, darkBlack, lightBlack } from 'material-ui/styles/colors';
import IconEdit from 'material-ui/svg-icons/editor/mode-edit';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import * as actions from '../actions';

import styles from '../assets/css/accountlist.css';

const mapDispatchToProps = (dispatch) => {
  const props = {
    onEditActivity: (accountIndex, activityIndex, activity) => dispatch(
      actions.editAccountActivity(accountIndex, activityIndex, activity)
    )
  };
  return props;
};

const iconButtonElement = (
  <IconButton>
    <MoreVertIcon />
  </IconButton>
);

class AccountList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountIndex: null,
      activityIndex: null,
      open: false,
      modalOpen: false,
      activity: {
        name: '',
        hours: 0,
        minutes: 0,
        seconds: 0
      }
    };
  }

  onNameChanged = (event) => {
    this.setState({
      activity: {
        name: event.target.value,
        hours: this.state.activity.hours,
        minutes: this.state.activity.minutes,
        seconds: this.state.activity.seconds
      }
    });
  }

  onHoursChanged = (event) => {
    this.setState({
      activity: {
        name: this.state.activity.name,
        hours: isNaN(parseFloat(event.target.value)) ? '' : parseFloat(event.target.value),
        minutes: this.state.activity.minutes,
        seconds: this.state.activity.seconds
      }
    });
  }

  onMinutesChanged = (event) => {
    this.setState({
      activity: {
        name: this.state.activity.name,
        hours: this.state.activity.hours,
        minutes: isNaN(parseFloat(event.target.value)) ? '' : parseFloat(event.target.value),
        seconds: this.state.activity.seconds
      }
    });
  }

  onSecondsChanged = (event) => {
    this.setState({
      activity: {
        name: this.state.activity.name,
        hours: this.state.activity.hours,
        minutes: this.state.activity.minutes,
        seconds: isNaN(parseFloat(event.target.value)) ? '' : parseFloat(event.target.value)
      }
    });
  }

  handleNestedListToggle = (item) => {
    this.setState({
      open: item.state.open,
    });
  };

  // TODO input validation

  handleEditModal = (accountIndex, activityIndex, activity) => {
    this.setState({
      accountIndex,
      activityIndex,
      modalOpen: true,
      activity: {
        name: activity.name,
        hours: activity.hours,
        minutes: activity.minutes,
        seconds: activity.seconds
      }
    });
  }

  handleEditActivity = () => {
    this.closeDialog();
    this.props.onEditActivity(
      this.state.accountIndex,
      this.state.activityIndex,
      this.state.activity
    );
  }

  closeDialog = () => {
    this.setState({ modalOpen: false });
  }

  render() {
    return (
      <div>
        <Dialog
          title="Edit activity"
          modal={false}
          actions={
            <div>
              <FlatButton
                label="Cancel"
                onTouchTap={this.closeDialog}
              />
              <FlatButton
                label="Submit"
                onTouchTap={() => { this.handleEditActivity(); }}
              />
            </div>
          }
          open={this.state.modalOpen}
        >
          <Container>
            <Row>
              <Col sm={6}>
                <TextField
                  value={this.state.activity.name}
                  onChange={this.onNameChanged}
                  floatingLabelText="Activity name"
                />
              </Col>
              <Col sm={6}>
                <TextField
                  type="number"
                  value={this.state.activity.hours}
                  onChange={this.onHoursChanged}
                  floatingLabelText="Hours"
                />
              </Col>
              <Col sm={6}>
                <TextField
                  type="number"
                  value={this.state.activity.minutes}
                  onChange={this.onMinutesChanged}
                  floatingLabelText="Minutes"
                />
              </Col>
              <Col sm={6}>
                <TextField
                  type="number"
                  value={this.state.activity.seconds}
                  onChange={this.onSecondsChanged}
                  floatingLabelText="Seconds"
                />
              </Col>
            </Row>
          </Container>
        </Dialog>
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
                            onClick={() => { this.handleEditModal(i, x, act); }}
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
      </div>
    );
  }
}

AccountList.propTypes = {
  accounts: PropTypes.array.isRequired,
  onEditActivity: PropTypes.func
};

export default connect(null, mapDispatchToProps)(AccountList);
