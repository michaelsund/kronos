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
let totalReportCost = 0;

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
    let totalCost = 0;
    if (activity.useActivityCost) {
      totalCost = (parseFloat(activity.activityCost) * activity.hours);
      if (activity.minutes > 0) {
        totalCost += parseFloat(activity.activityCost);
      }
    } else {
      totalCost = (parseFloat(accountCost) * activity.hours);
      if (activity.minutes > 0) {
        totalCost += parseFloat(accountCost);
      }
    }
    totalReportCost += totalCost;
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
            { text: `${act.hours}h ${act.minutes}m` },
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
          ['Activity name', 'Time', { text: 'Cost', alignment: 'right' }],
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
            text: `${this.props.accounts[this.props.accountIndex].name} time report`,
            margin: [0, 20],
            style: pdfStyles.header
          },
          {
            text: `${this.props.accounts[this.props.accountIndex].activities.length} activities with a total time of ${this.calcTime(this.props.accounts[this.props.accountIndex].activities)}`,
            margin: [0, 20],
            style: pdfStyles.quote
          },
          {
            // layout: 'headerLineOnly',
            layout: 'lightHorizontalLines',
            table: {
              margin: [0, 20],
              widths: [350, 100, 50],
              body
            }
          },
          this.props.accounts[this.props.accountIndex].showDebitInReport ? (
          {
            text: `Total cost: ${totalReportCost} ${this.props.accounts[this.props.accountIndex].currency}`,
            margin: [0, 20],
            style: pdfStyles.quote
          }
          ) : (
            null
          )
        ]
      };

      ipc.send('print', JSON.stringify(layout), this.state.path);
      this.closeDialog();
    }
    // Reset total report cost for next run.
    totalReportCost = 0;
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
                label="Save as"
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
