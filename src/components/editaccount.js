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

const mapDispatchToProps = (dispatch) => {
  const props = {
    onEditAccount: (accountIndex, account) => dispatch(
      actions.editAccount(accountIndex, account)
    )
  };
  return props;
};

class EditAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formNotValid: false,
      open: false,
      id: '',
      name: '',
      description: '',
      additionalNote: '',
      currency: '',
      debitOnHourStarted: false,
      showDebitInReport: false,
      currencies: ['kr', '€', '$', '£']
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
    console.log(data);
    if (data.length > 0) {
      this.setState({ formNotValid: false });
      console.log('valid');
    } else {
      this.setState({ formNotValid: true });
      console.log('not valid');
    }
  }

  handleEditAccount = () => {
    // TODO Input validation
    this.props.onEditAccount(
      this.state.accountIndex,
      {
        id: this.state.id,
        name: this.upperCaseIt(this.state.name),
        description: this.upperCaseIt(this.state.description),
        additionalNote:
          this.upperCaseIt(this.state.additionalNote),
        currency: this.state.currency,
        debitOnHourStarted: this.state.debitOnHourStarted,
        showDebitInReport: this.state.showDebitInReport
      }
    );
    this.closeDialog();
  }

  openDialog = (accountIndex, accountObj) => {
    this.setState({
      accountIndex,
      open: true,
      id: accountObj.id,
      name: accountObj.name,
      description: accountObj.description,
      additionalNote: accountObj.additionalNote,
      currency: accountObj.currency,
      debitOnHourStarted: accountObj.debitOnHourStarted,
      showDebitInReport: accountObj.showDebitInReport,
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

  render() {
    return (
      <div>
        <Dialog
          title="Edit account"
          modal={false}
          actions={
            <div>
              <FlatButton
                label="Cancel"
                onTouchTap={this.closeDialog}
              />
              <FlatButton
                label="Ok"
                disabled={this.state.formNotValid}
                onTouchTap={this.handleEditAccount}
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
                  autoFocus
                  value={this.state.additionalNote}
                  onChange={(e) => { this.handleInputs(e, 'additionalNote'); }}
                  floatingLabelText="Additional note"
                />
              </Col>
              <Col sm={6}>
                <SelectField
                  floatingLabelFixed
                  floatingLabelText="Currency"
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
                    label="Debits on hour started"
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

EditAccount.propTypes = {
  onEditAccount: PropTypes.func,
  onRef: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(EditAccount);
