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
    alignment: 'center',
    // margin: [0, 190, 0, 80]
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
      path: '',
      totalReportCost: 0
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

  calcTime = (activities) => {
    let staticSeconds = 0;
    for (const act of activities) {
      staticSeconds += act.staticSeconds;
    }
    const hours = Math.floor(staticSeconds / (60 * 60));
    const divisorForMinutes = staticSeconds % (60 * 60);
    const minutes = Math.floor(divisorForMinutes / 60);
    return `${hours} hours and ${minutes} minutes`;
  };

  calcCostPerActivity = (accountCost, activity) => {
    let totalCost = 0.0;
    totalCost = (parseFloat(accountCost) * activity.hours);
    if (activity.minutes > 0) {
      totalCost += parseFloat(accountCost);
    }
    this.setState({ totalReportCost: (this.state.totalReportCost + totalCost) });
    return totalCost;
  }

  savePdf = () => {
    if (this.state.path !== '') {
      // Create the makepdf layout
      const accountCost = this.props.accounts[this.props.accountIndex].accountCost;
      let res;
      let body = this.props.accounts[this.props.accountIndex].activities.map((act) => {
        if (this.props.accounts[this.props.accountIndex].showDebitInReport) {
          res = [
            act.name,
            { text: `${act.hours}:${act.minutes}` },
            { text: `${this.calcCostPerActivity(accountCost, act)} ${this.props.accounts[this.props.accountIndex].currency}`, alignment: 'right' }
          ];
        } else {
          res = [
            act.name,
            { text: `${act.hours}:${act.minutes}` },
          ];
        }
        return res;
      });

      if (this.props.accounts[this.props.accountIndex].showDebitInReport) {
        body = [
          ['Activity name', 'Time hh:mm', { text: 'Cost', alignment: 'right' }],
          ...body
        ];
      } else {
        body = [
          ['Activity name', 'Time hh:mm'],
          ...body
        ];
      }

      const layout = {
        content: [
          {
            stack: [
              { text: `${this.props.accounts[this.props.accountIndex].name} time report` }
            ],
            style: pdfStyles.header
          },
          {
            text: `${this.props.accounts[this.props.accountIndex].activities.length} activities logged with a total time of ${this.calcTime(this.props.accounts[this.props.accountIndex].activities)}`,
            style: pdfStyles.quote
          },
          {
            layout: 'headerLineOnly',
            table: {
              widths: [350, 100, 50],
              body
            }
          },
          this.props.accounts[this.props.accountIndex].showDebitInReport ? (
            { text: `Total cost: ${this.state.totalReportCost} ${this.props.accounts[this.props.accountIndex].currency}`, style: pdfStyles.quote }
          ) : (
            null
          )
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
