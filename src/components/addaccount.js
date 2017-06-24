import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Container, Row, Col } from 'react-grid-system';
import IconButton from 'material-ui/IconButton';
import IconAdd from 'material-ui/svg-icons/content/add';

import styles from '../assets/css/addaccount.css';

class AddAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      account: {
        name: ''
      }
    };
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
          className={styles.addIconButton}
          tooltip="New account"
          tooltipPosition="top-center"
          onTouchTap={() => { this.openDialog(); }}
        >
          <IconAdd className={styles.icons} />
        </IconButton>
        <Dialog
          title="Dialog With Actions"
          modal={false}
          actions={
            <div>
              <FlatButton
                label="Cancel"
                onTouchTap={this.closeDialog}
              />
              <FlatButton
                label="Submit"
                onTouchTap={this.closeDialog}
              />
            </div>
          }
          open={this.state.open}
        >
          <Container>
            <Row>
              <Col sm={6}>
                <TextField
                  hintText="Company X"
                  floatingLabelText="Account name"
                  floatingLabelFixed
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
};

export default connect(null, null)(AddAccount);
