import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import login from './../actions/login';

class LogInForm extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: ''
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }
  handleUsernameChange(e) {
    this.setState({
      username: e.target.value
    });
  }
  handlePasswordChange(e) {
    this.setState({
      password: e.target.value
    });
  }
  handleClick(e) {
    const username = this.state.username;
    const password = this.state.password;
    this.props.dispatch(login({ 
      username: username, password: password
    }));
  }
  render() {
    return (
      <div>
        <h3>Log In</h3>
        <input type='text' placeholder='username' value={ this.state.username } onChange={ this.handleUsernameChange } className='username'/>
        <input type='password' placeholder='password' value={ this.state.password } onChange={ this.handlePasswordChange } className='password'/>
        <button type='submit' className='loginBtn' onClick={ this.handleClick }>{ 'LOG IN' }</button>
      </div>
    )
  }
}

export default connect()(LogInForm);