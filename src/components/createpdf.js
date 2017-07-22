import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconPdf from 'material-ui/svg-icons/image/picture-as-pdf';
import IconButton from 'material-ui/IconButton';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import * as actions from '../actions';

import styles from '../assets/css/createpdf.css';

const ipc = window.require('electron').ipcRenderer;

const mapStateToProps = (state) => {
  const props = {
    accounts: state.accounts
  };
  return props;
};

class CreatePdf extends React.Component {
  savePdf = () => {
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

    ipc.send('print', JSON.stringify(layout), 'D:\\Code\\kronos\\pdfs\\test.pdf');
  }

  render() {
    return (
      <FlatButton
        label="Create report"
        onTouchTap={() => { this.savePdf(); }}
      />
    );
  }
}

CreatePdf.propTypes = {
  accounts: PropTypes.array.isRequired,
  accountIndex: PropTypes.number.isRequired
};

export default connect(mapStateToProps, null)(CreatePdf);
