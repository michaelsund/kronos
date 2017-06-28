import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Container, Row, Col } from 'react-grid-system';
import Subheader from 'material-ui/Subheader';
import SelectField from 'material-ui/SelectField';
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
    onEditActivity: (
      accountIndex,
      activityIndex,
      activity,
      moveToAccountConfirm,
      moveToAccountIndex
    ) => dispatch(
      actions.editAccountActivity(
        accountIndex,
        activityIndex,
        activity,
        moveToAccountConfirm,
        moveToAccountIndex
      )
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
      moveToAccountConfirm: false,
      moveToAccountIndex: null,
      moveToAccountName: null,
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

  handleMoveCheckBoxChanged = (event, isInputChecked) => {
    this.setState({
      moveToAccountConfirm: isInputChecked
    });
  }

  handleSetMoveToAccountIndex = (event, index, value) => {
    this.setState({
      moveToAccountIndex: index,
      moveToAccountName: value
    });
  }

  handleNameChanged = (event) => {
    this.setState({
      activity: {
        name: event.target.value,
        hours: this.state.activity.hours,
        minutes: this.state.activity.minutes,
        seconds: this.state.activity.seconds
      }
    });
  }

  handleHoursChanged = (event) => {
    this.setState({
      activity: {
        name: this.state.activity.name,
        hours: isNaN(parseFloat(event.target.value)) ? '' : parseFloat(event.target.value),
        minutes: this.state.activity.minutes,
        seconds: this.state.activity.seconds
      }
    });
  }

  handleMinutesChanged = (event) => {
    this.setState({
      activity: {
        name: this.state.activity.name,
        hours: this.state.activity.hours,
        minutes: isNaN(parseFloat(event.target.value)) ? '' : parseFloat(event.target.value),
        seconds: this.state.activity.seconds
      }
    });
  }

  handleSecondsChanged = (event) => {
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
      this.state.activity,
      this.state.moveToAccountConfirm,
      this.state.moveToAccountIndex
    );
    this.setState({
      accountIndex: null,
      activityIndex: null,
      moveToAccountIndex: null,
      moveToAccountConfirm: null,
      moveToAccountName: null
    });
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
                  onChange={this.handleNameChanged}
                  floatingLabelText="Activity name"
                />
              </Col>
              <Col sm={6}>
                <TextField
                  type="number"
                  value={this.state.activity.hours}
                  onChange={this.handleHoursChanged}
                  floatingLabelText="Hours"
                />
              </Col>
              <Col sm={6}>
                <TextField
                  type="number"
                  value={this.state.activity.minutes}
                  onChange={this.handleMinutesChanged}
                  floatingLabelText="Minutes"
                />
              </Col>
              <Col sm={6}>
                <TextField
                  type="number"
                  value={this.state.activity.seconds}
                  onChange={this.handleSecondsChanged}
                  floatingLabelText="Seconds"
                />
              </Col>
              <Col sm={12}>
                <Row>
                  <Checkbox
                    label="Move activity"
                    checked={this.state.moveToAccountConfirm}
                    onCheck={this.handleMoveCheckBoxChanged}
                  />
                  <SelectField
                    disabled={!this.state.moveToAccountConfirm}
                    floatingLabelFixed
                    floatingLabelText="Move to account"
                    value={this.state.moveToAccountName}
                    onChange={this.handleSetMoveToAccountIndex}
                  >
                    {this.props.accounts.map((account, i) => {
                      const row = (
                        <MenuItem
                          key={i}
                          value={account.name}
                          primaryText={account.name}
                        />
                      );
                      return row;
                    })}
                  </SelectField>
                </Row>
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
                        onClick={() => { this.handleEditModal(i, x, act); }}
                        primaryText={act.hours > 0 ? (
                          `${act.name} for ${act.hours} hours and ${act.minutes} minutes`
                        ) : (
                          `${act.name} for ${act.minutes} minutes`
                        )}
                        secondaryText={`Created at ${act.createdAt}`}
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
