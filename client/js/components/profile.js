import React, { Component } from 'react';
import { connect } from 'react-redux';
import logout from './../actions/logout';
import { browserHistory } from 'react-router';

class Profile extends Component {
  constructor() {
    super();
    this.handleLogOut = this.handleLogOut.bind(this);
  }
  componentDidMount() {
    console.log('component did mount token:', localStorage.getItem('devBase_user_token'));
    if (localStorage.getItem('devBase_user_token') === null) {
      browserHistory.push('/');
    }
  }
  handleLogOut() {
    this.props.dispatch(logout());
  }
  render() {
    return (
      <div>
        Profile
        <button onClick={this.handleLogOut}>LOG OUT</button>
      </div>
    )
  }
}

export default connect()(Profile);