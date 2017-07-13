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
import IconDelete from 'material-ui/svg-icons/action/delete';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import DeleteActivity from './deleteactivity';
import DeleteAccount from './deleteaccount';
import EditAccount from './editaccount';
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
      activityIndex: null,
      activityModalOpen: false,
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
  handleEditActivityModal = (accountIndex, activityIndex, activity) => {
    this.setState({
      accountIndex,
      activityIndex,
      activityModalOpen: true,
      activity: {
        name: activity.name,
        hours: activity.hours,
        minutes: activity.minutes,
        seconds: activity.seconds
      }
    });
  }

  handleEditActivity = () => {
    this.closeActivityModal();
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

  closeActivityModal = () => {
    this.setState({ activityModalOpen: false });
  }

  render() {
    return (
      <div>
        <EditAccount
          accountIndex={this.state.accountIndexToEdit}
          account={this.state.accountToEdit}
          onRef={ref => (this.editAccountRef = ref)}
        />
        <Dialog
          title="Edit activity"
          modal={false}
          actions={
            <div>
              <DeleteActivity
                accountIndex={this.state.accountIndex}
                activityIndex={this.state.activityIndex}
                handleButtonPressed={this.closeActivityModal}
              />
              <FlatButton
                label="Cancel"
                onTouchTap={this.closeActivityModal}
              />
              <FlatButton
                label="Ok"
                onTouchTap={() => { this.handleEditActivity(); }}
              />
            </div>
          }
          open={this.state.activityModalOpen}
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
        { this.props.accounts.length > 0 ? (
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
                          onClick={() => { this.handleEditActivityModal(i, x, act); }}
                          primaryText={
                            <div>
                              <p>
                                {act.name} for {act.hours} hours and {act.minutes} minutes
                              </p>
                            </div>
                          }
                          secondaryText={
                            <p>
                              {/* Created at {act.createdAt} */}
                              <span>bleh date time</span>
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
  accounts: PropTypes.array.isRequired,
  onEditActivity: PropTypes.func
};

export default connect(null, mapDispatchToProps)(AccountList);
