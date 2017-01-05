import React, { Component } from 'react';
import { connect } from 'react-redux';
import logout from './../actions/logout';
import { browserHistory } from 'react-router';

class Profile extends Component {
  constructor() {
    super();
    this.handleLogOut = this.handleLogOut.bind(this);

    this.state = {
      profile_token: '',
      profile_email: ''
    }
  }
  componentDidMount() {
    console.log('component did mount token:', localStorage.getItem('devBase_user_token'));
    if (localStorage.getItem('devBase_user_token') === null) {
      browserHistory.push('/');
    } else {
      this.setState({
        profile_token: localStorage.getItem('devBase_user_token'),
        profile_email: localStorage.getItem('devBase_user_email')
      });
    }
  }
  handleLogOut() {
    this.props.dispatch(logout());
  }
  render() {
    return (
      <div>
        <div>
          {this.state.profile_token}
          {this.state.profile_email}
        </div>
        <button onClick={this.handleLogOut}>LOG OUT</button>
      </div>
    )
  }
}

export default connect()(Profile);