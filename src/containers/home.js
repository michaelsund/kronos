import React from 'react';
import { routeActions } from 'react-router-redux';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { PropTypes } from 'prop-types';
import IconButton from 'material-ui/IconButton';
import * as actions from '../actions';
import Timer from '../components/timer';

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
      <div>
        {/* <button onClick={() => { this.myFunc(); }}>go to about</button> */}
        <Timer hourProgress />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
