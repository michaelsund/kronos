import React from 'react';
import { routeActions } from 'react-router-redux';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { PropTypes } from 'prop-types';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import * as actions from '../actions';
import Timer from '../components/timer';

import styles from '../../src/assets/css/main.css';

const mapStateToProps = (state) => {
  const props = {
    accounts: state.accounts
  };
  return props;
};

const mapDispatchToProps = (dispatch) => {
  const props = {
    onAddAccount: account => dispatch(
      actions.addAccount(account)
    )
  };
  return props;
};

class Home extends React.Component {
  static propTypes = {
    router: PropTypes.object.isRequired,
    // onAddAccount: PropTypes.func
  }

  componentDidMount() {
    // this.props.onAddAccount({ name: 'test', other: true });
  }

  myFunc = () => {
    console.log('yep');
    this.props.router.push('/about');
  }

  render() {
    return (
      <div className={styles.container}>
        {/* <button onClick={() => { this.myFunc(); }}>go to about</button> */}
        <div className={styles.right}>
          <span>right</span>
        </div>
        <div className={styles.left}>
          <Paper zDepth={2}>
            <Timer hourProgress />
          </Paper>
          <Paper zDepth={2}>
            <Timer hourProgress />
          </Paper>
          <Paper zDepth={2}>
            <Timer hourProgress />
          </Paper>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
