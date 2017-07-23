import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import { Container, Row, Col } from 'react-grid-system';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import * as actions from '../actions';

import styles from '../assets/css/createpdf.css';

const ipc = window.require('electron').ipcRenderer;
ipc.on('set-path', (event, data) => {
  console.log('revieved data');
  console.log(data);
});


const mapStateToProps = (state) => {
  const props = {
    accounts: state.accounts
  };
  return props;
};

class CreatePdf extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      path: ''
    };
  }

  componentDidMount = () => {
    this.props.onRef(this);
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  getFilePath = () => {
    console.log('sending request of path');
    ipc.send('get-path');
  }

  savePdf = () => {
    if (this.state.path !== '') {
      // Create the makepdf layout
      let body = this.props.accounts[this.props.accountIndex].activities.map((act) => {
        const res = [act.name, act.hours, act.minutes];
        return res;
      });

      body = [['Activity name', 'Hours', 'Minutes'], ...body];

      const layout = {
        content: [
          { text: `Report for ${this.props.accounts[this.props.accountIndex].name}` },
          'and some other text',
          { text: 'Activities' },
          {
            table: {
              body
            }
          }
        ]
      };

      ipc.send('print', JSON.stringify(layout), this.state.path);
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
      <Dialog
        title="Save pdf report"
        modal={false}
        actions={
          <div>
            <FlatButton
              label="Cancel"
              onTouchTap={this.closeDialog}
            />
            <FlatButton
              label="Ok"
              onTouchTap={this.savePdf}
            />
          </div>
        }
        open={this.state.open}
      >
        <Container>
          <Row>
            <Col sm={6}>
              <span>{this.state.path}</span>
              <FlatButton
                label="Choose"
                onTouchTap={() => { this.getFilePath(); }}
                primary
              />
            </Col>
          </Row>
        </Container>
      </Dialog>
    );
  }
}

CreatePdf.propTypes = {
  accounts: PropTypes.array.isRequired,
  accountIndex: PropTypes.number,
  onRef: PropTypes.func.isRequired
};

export default connect(mapStateToProps, null)(CreatePdf);
