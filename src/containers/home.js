import React from 'react';
import { routeActions } from 'react-router-redux';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { PropTypes } from 'prop-types';
import * as actions from '../actions';
import Timer from '../components/timer';

const mapStateToProps = (state) => {
  const select = {
    homevars: state.home
  };
  return select;
};

// const mapDispatchToProps = (dispatch) => {
//   const select = {
//     onSetFetchedLists: lists => dispatch(
//       actions.setFetchedLists(lists)
//     )
//   };
//   return select;
// };

class Home extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  myFunc = () => {
    console.log('yep');
    this.props.router.push('/about');
  }

  render() {
    return (
      <div>
        <span>home</span>
        <button onClick={() => { this.myFunc(); }}>go to about</button>
        <Link to="/about">TO ABOUT</Link>
        <br />
        <Timer />
      </div>
    );
  }
}

Home.propTypes = {
  router: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, null)(Home);
