import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
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
      open: false,
      name: ''
    };
  }

  onNameChanged = (event, accountName) => {
    this.setState({ name: accountName });
  }

  generateAccountId = () => {
    const id = Math.random().toString(36).substr(2, 9);
    return id;
  }

  addAccount = () => {
    if (this.state.name.length > 0) {
      this.props.onAddAccount({
        id: this.generateAccountId(),
        name: this.state.name[0].toUpperCase() + this.state.name.slice(1),
        description: 'created',
        additionalNote: 'created',
        currency: '$',
        debitOnHourStarted: false,
        showDebitInReport: false,
        activities: []
      });
      this.closeDialog();
      this.setState({ name: '' });
    }
  }

  openDialog = () => {
    this.setState({ open: true });
  }

  closeDialog = () => {
    this.setState({ open: false });
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
                label="Submit"
                onTouchTap={this.addAccount}
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
                  onChange={this.onNameChanged}
                  floatingLabelText="Account name"
                />
              </Col>
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
