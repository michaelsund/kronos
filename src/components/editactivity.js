import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Container, Row, Col } from 'react-grid-system';
import IconButton from 'material-ui/IconButton';
import IconEdit from 'material-ui/svg-icons/editor/mode-edit';
import * as actions from '../actions';

import styles from '../assets/css/addaccount.css';

const mapDispatchToProps = (dispatch) => {
  const props = {
    onEditActivity: activity => dispatch(
      actions.editActivity(activity)
    )
  };
  return props;
};

class EditActivity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      name: '',
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalSeconds: 0
    };
  }

  componentDidMount = () => {
    this.setState({
      name: this.props.activity.name,
      hours: this.props.activity.hours,
      minutes: this.props.activity.minutes,
      seconds: this.props.activity.seconds,
      totalSeconds: this.props.activity.totalSeconds
    });
  }

  onNameChanged = (event, accountName) => {
    this.setState({ name: accountName });
  }

  editActivity = () => {
    this.props.onEditActivity();
  }

  closeDialog = () => {
    this.setState({ open: false });
  }

  render() {
    return (
      <Dialog
        title="Edit activity"
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
                value={this.state.name}
                onChange={this.onNameChanged}
                hintText="Activity name"
                floatingLabelText="Activity name"
                errorText="This field is required"
              />
            </Col>
          </Row>
        </Container>
      </Dialog>
    );
  }
}

EditActivity.propTypes = {
  onEditActivity: PropTypes.func,
  activity: PropTypes.object.isRequired
};

export default connect(null, mapDispatchToProps)(EditActivity);
