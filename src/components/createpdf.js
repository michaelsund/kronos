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

const pdfStyles = {
  header: {
    fontSize: 18,
    bold: true,
    alignment: 'right',
    margin: [0, 190, 0, 80]
  },
  subheader: {
    fontSize: 15,
    bold: true
  },
  quote: {
    italics: true
  },
  small: {
    fontSize: 8
  }
};

const ipc = window.require('electron').ipcRenderer;

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
    ipc.on('set-path', (event, data) => {
      this.setState({ path: data.path });
    });
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  getFilePath = () => {
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
          {
            stack: [
              'This header has both top and bottom margins defined',
              { text: `${this.props.accounts[this.props.accountIndex].name}` }
            ],
            style: pdfStyles.header
          },
          { text: `${this.props.accounts[this.props.accountIndex].activities.length} activities logged.`, style: pdfStyles.quote },
          { text: 'Activities' },
          {
            table: {
              body
            }
          }
        ]
      };

      ipc.send('print', JSON.stringify(layout), this.state.path);
      this.closeDialog();
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
              label="Create report"
              onTouchTap={() => { this.savePdf(); }}
            />
          </div>
        }
        open={this.state.open}
      >
        <Container>
          <Row>
            <Col sm={12}>
              <FlatButton
                label="Save report to"
                onTouchTap={() => { this.getFilePath(); }}
                primary
              />
              <p>{this.state.path}</p>
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
