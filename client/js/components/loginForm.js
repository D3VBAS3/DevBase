import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import login from './../actions/login';
import axios from 'axios';

class LogInForm extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: ''
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }
  handleEmailChange(e) {
    this.setState({
      email: e.target.value
    });
  }
  handlePasswordChange(e) {
    this.setState({
      password: e.target.value
    });
  }
  handleClick(e) {
    //e.preventDefault();
    console.log('CLIIICCKKKEEDD');
    const email = this.state.email;
    const password = this.state.password;
    console.log('LOGIN FORM PROPS:', this.props);
    this.props.dispatch(login({ 
      email: email, password: password
    }));
  }
  render() {
    return (
      <div>
        <h3>Log In</h3>
        <input type='email' placeholder='email' value={ this.state.email } onChange={ this.handleEmailChange } className='email'/>
        <input type='password' placeholder='password' value={ this.state.password } onChange={ this.handlePasswordChange } className='password'/>
        <button type='submit' className='loginBtn' onClick={ this.handleClick }>{ 'LOG IN' }</button>
      </div>
    )
  }
}

export default connect()(LogInForm);