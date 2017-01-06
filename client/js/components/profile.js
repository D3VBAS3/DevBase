import React, { Component } from 'react';
import { connect } from 'react-redux';
import logout from './../actions/logout';
import { browserHistory } from 'react-router';
import DbTable from './db-table';
import StepBox from './stepBox';
import fetch from 'isomorphic-fetch'; 

class Profile extends Component {
  constructor() {
    super();
    this.handleLogOut = this.handleLogOut.bind(this);

    this.state = {
      profile_token: '',
      profile_username: ''
    }
  }
  componentDidMount() {
    if (localStorage.getItem('devBase_user_token') === null) {
      browserHistory.push('/');
    } else {
      this.setState({
        profile_token: localStorage.getItem('devBase_user_token'),
        profile_username: localStorage.getItem('devBase_username')
      });
    }
  }
  handleLogOut() {
    this.props.dispatch(logout());
  }
  handleReset() {
    // fetch post request to drop table
    // fetch('/login',{
    //   method: 'post',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(userData)
    // })
    //   .then((response) => {
    //     if (response.status !== 200) {
    //       console.log('ERRROORRR not 200');
    //       throw new Error(response.statusText);
    //     }
        
    //     return response.json();
    //   })
    //   .then((data) => {
    //     dispatch(loginSuccess(data.token, data.username));
    //     browserHistory.push('/profile');
    //   })
  }
  render() {
    return (
      <div>
        <div>
          <p>{'Token: '}{this.state.profile_token}</p>
          <p>{'Username: '}{this.state.profile_username}</p>
        </div>
        <div>
          <button onClick={this.handleLogOut}>LOG OUT</button>
        </div>
        <DbTable />
        <StepBox username={this.state.profile_username} token={this.state.profile_token}/>
        <button onClick={this.handleReset}>Reset</button>
      </div>
    )
  }
}

export default connect()(Profile);