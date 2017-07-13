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

import styles from '../assets/css/addaccount.css';

const mapDispatchToProps = (dispatch) => {
  const props = {
    onAddAccount: account => dispatch(
      actions.addAccount(account)
    )
  };
  return props;
};

class AddAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formNotValid: false,
      open: false,
      name: '',
      description: '',
      additionalNote: '',
      currency: '$',
      debitOnHourStarted: true,
      showDebitInReport: true,
      currencies: ['kr', '€', '$', '£']
    };
  }

  onNameChanged = (event, accountName) => {
    this.setState({ name: accountName });
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

  addAccount = () => {
    if (this.state.name.length > 0) {
      this.props.onAddAccount({
        id: this.generateAccountId(),
        name: this.upperCaseIt(this.state.name),
        description: this.upperCaseIt(this.state.description),
        additionalNote:
          this.upperCaseIt(this.state.additionalNote),
        currency: this.state.currency,
        debitOnHourStarted: this.state.debitOnHourStarted,
        showDebitInReport: this.state.showDebitInReport,
        activities: []
      });
      this.closeDialog();
      this.setState({
        name: '',
        description: '',
        additionalNote: '',
        currency: '$',
        debitOnHourStarted: true,
        showDebitInReport: true
      });
    }
  }

  openDialog = () => {
    this.setState({ open: true });
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
      case 'description':
        this.setState({ description: e.target.value });
        break;
      case 'additionalNote':
        this.setState({ additionalNote: e.target.value });
        break;
      case 'currency':
        this.setState({ currency: e.target.textContent });
        break;
      case 'debitOnHourStarted':
        if (this.state.debitOnHourStarted) {
          this.setState({ debitOnHourStarted: false });
        } else {
          this.setState({ debitOnHourStarted: true });
        }
        break;
      case 'showDebitInReport':
        if (this.state.showDebitInReport) {
          this.setState({ showDebitInReport: false });
        } else {
          this.setState({ showDebitInReport: true });
        }
        break;
      default:
    }
  }

  generateAccountId = () => {
    const id = Math.random().toString(36).substr(2, 9);
    return id;
  }

  render() {
    return (
      <div>
        <IconButton
          tooltip="New account"
          tooltipPosition="bottom-center"
          onTouchTap={() => { this.openDialog(); }}
        >
          <IconAdd className={styles.icons} />
        </IconButton>
        <Dialog
          title="Add new account"
          modal={false}
          actions={
            <div>
              <FlatButton
                label="Cancel"
                onTouchTap={this.closeDialog}
              />
              <FlatButton
                label="Ok"
                onTouchTap={this.addAccount}
                disabled={this.state.formNotValid}
              />
            </div>
          }
          open={this.state.open}
        >
          <Container>
            <Row>
              <Col sm={6}>
                <TextField
                  autoFocus
                  value={this.state.name}
                  onChange={(e) => { this.handleInputs(e, 'name'); }}
                  floatingLabelText="Account name (required)"
                />
              </Col>
              <Col sm={6}>
                <TextField
                  value={this.state.description}
                  onChange={(e) => { this.handleInputs(e, 'description'); }}
                  floatingLabelText="Description"
                />
              </Col>
            </Row>
            <Row>
              <Col sm={6}>
                <TextField
                  value={this.state.additionalNote}
                  onChange={(e) => { this.handleInputs(e, 'additionalNote'); }}
                  floatingLabelText="Additional note"
                />
              </Col>
              <Col sm={6}>
                <SelectField
                  floatingLabelFixed
                  floatingLabelText="Move to account"
                  value={this.state.currency}
                  onChange={(e) => { this.handleInputs(e, 'currency'); }}
                >
                  {this.state.currencies.map((currency, i) => {
                    const row = (
                      <MenuItem
                        key={i}
                        value={currency}
                        primaryText={currency}
                      />
                    );
                    return row;
                  })}
                </SelectField>
              </Col>
              <Row>
                <Col sm={6}>
                  <Checkbox
                    label="Debit on hour started"
                    checked={this.state.debitOnHourStarted}
                    onCheck={(e) => { this.handleInputs(e, 'debitOnHourStarted'); }}
                  />
                </Col>
                <Col sm={6}>
                  <Checkbox
                    label="Show debit in report"
                    checked={this.state.showDebitInReport}
                    onCheck={(e) => { this.handleInputs(e, 'showDebitInReport'); }}
                  />
                </Col>
              </Row>
            </Row>
          </Container>
        </Dialog>
      </div>
    );
  }
}

AddAccount.propTypes = {
  onAddAccount: PropTypes.func
};

export default connect(null, mapDispatchToProps)(AddAccount);
