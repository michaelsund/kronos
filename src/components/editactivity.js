import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import { Container, Row, Col } from 'react-grid-system';
import IconButton from 'material-ui/IconButton';
import IconAdd from 'material-ui/svg-icons/content/add';
import * as actions from '../actions';

import styles from '../assets/css/editaccount.css';

const mapStateToProps = (state) => {
  const props = {
    accounts: state.accounts
  };
  return props;
};

const mapDispatchToProps = (dispatch) => {
  const props = {
    onEditActivity: (
      accountIndex,
      activityIndex,
      activity,
      moveToAccountIndex
    ) => dispatch(
      actions.editAccountActivity(
        accountIndex,
        activityIndex,
        activity,
        moveToAccountIndex
      )
    ),
    onDeleteActivity: (accountIndex, activityIndex) => dispatch(
      actions.deleteActivity(accountIndex, activityIndex)
    )
  };
  return props;
};

class EditActivity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formNotValid: false,
      open: false,
      moveToAccountIndex: null,
      moveToAccountName: null,
      name: '',
      hours: 0,
      minutes: 0,
      seconds: 0,
      staticSeconds: 0,
      createdAt: null,
      useActivityCost: false,
      activityCost: 0
    };
  }

  componentDidMount = () => {
    this.props.onRef(this);
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  upperCaseIt = (inputString) => {
    if (inputString.length > 0) {
      return inputString[0].toUpperCase() + inputString.slice(1);
    }
    return '';
  }

  validateInput = (data) => {
    if (data.length > 0) {
      this.setState({ formNotValid: false });
    } else {
      this.setState({ formNotValid: true });
    }
  }

  handleEditActivity = () => {
    this.props.onEditActivity(
      this.state.accountIndex,
      this.state.activityIndex,
      {
        name: this.state.name,
        hours: this.state.hours,
        minutes: this.state.minutes,
        seconds: this.state.seconds,
        staticSeconds: this.state.staticSeconds,
        createdAt: this.state.createdAt,
        useActivityCost: this.state.useActivityCost,
        activityCost: this.state.activityCost
      },
      this.state.moveToAccountIndex
    );
    this.closeDialog();
  }

  openDialog = (accountIndex, activityIndex, activityObj) => {
    this.setState({
      accountIndex,
      activityIndex,
      open: true,
      name: activityObj.name,
      hours: activityObj.hours,
      minutes: activityObj.minutes,
      seconds: activityObj.seconds,
      staticSeconds: activityObj.staticSeconds,
      createdAt: activityObj.createdAt,
      useActivityCost: activityObj.useActivityCost,
      activityCost: activityObj.activityCost
    });
  }

  closeDialog = () => {
    this.setState({ open: false });
  }

  handleInputs = (e, sender) => {
    switch (sender) {
      case 'name':
        this.setState({ name: e.target.value });
        this.validateInput(e.target.value);
        break;
      case 'hours':
        if (e.target.value > -1 && e.target.value !== '') {
          this.setState({ hours: e.target.value });
        }
        break;
      case 'minutes':
        if (e.target.value > -1 && e.target.value !== '') {
          this.setState({ minutes: e.target.value });
        }
        break;
      case 'activityCost':
        if (e.target.value > -1 && e.target.value !== '') {
          this.setState({ activityCost: e.target.value });
        }
        break;
      case 'useActivityCost':
        if (this.state.useActivityCost) {
          this.setState({ useActivityCost: false });
        } else {
          this.setState({ useActivityCost: true });
        }
        break;
      default:
    }
  }

  handleSelectInput = (event, index, val) => {
    this.setState({
      moveToAccountIndex: index,
      moveToAccountName: val
    });
  }

  handleDeleteActivity = () => {
    this.props.onDeleteActivity(this.state.accountIndex, this.state.activityIndex);
    this.closeDialog();
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
                label="Delete"
                secondary
                onTouchTap={this.handleDeleteActivity}
              />
              <FlatButton
                label="Cancel"
                onTouchTap={this.closeDialog}
              />
              <FlatButton
                label="Ok"
                disabled={this.state.formNotValid}
                onTouchTap={this.handleEditActivity}
              />
            </div>
          }
          open={this.state.open}
        >
          <Container>
            <Row>
              <Col sm={6}>
                <TextField
                  value={this.state.name}
                  onChange={(e) => { this.handleInputs(e, 'name'); }}
                  floatingLabelText="Activity name (required)"
                />
              </Col>
              <Col sm={6}>
                <TextField
                  type="number"
                  value={this.state.hours}
                  onChange={(e) => { this.handleInputs(e, 'hours'); }}
                  floatingLabelText="Hours"
                />
              </Col>
              <Col sm={6}>
                <TextField
                  type="number"
                  value={this.state.minutes}
                  onChange={(e) => { this.handleInputs(e, 'minutes'); }}
                  floatingLabelText="Minutes"
                />
              </Col>
              <Col sm={6}>
                <SelectField
                  floatingLabelFixed
                  floatingLabelText="Move to account"
                  value={this.state.moveToAccountName}
                  onChange={this.handleSelectInput}
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
              </Col>
            </Row>
            <Row>
              <Col sm={6}>
                <Checkbox
                  label="Override account cost"
                  checked={this.state.useActivityCost}
                  onCheck={(e) => { this.handleInputs(e, 'useActivityCost'); }}
                />
              </Col>
              <Col sm={6}>
                <TextField
                  type="number"
                  value={this.state.activityCost}
                  onChange={(e) => { this.handleInputs(e, 'activityCost'); }}
                  floatingLabelText="Activity cost/started hour"
                />
              </Col>
            </Row>
          </Container>
        </Dialog>
      </div>
    );
  }
}

EditActivity.propTypes = {
  onEditActivity: PropTypes.func,
  onDeleteActivity: PropTypes.func,
  onRef: PropTypes.func.isRequired,
  accounts: PropTypes.array
};

export default connect(mapStateToProps, mapDispatchToProps)(EditActivity);
