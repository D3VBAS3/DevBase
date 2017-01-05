import React, { Component } from 'react';
import LoginForm from './loginForm';

export default class Home extends Component {
  constructor() {
    super();

  }

  render() {
    return (
      <div>
        <LoginForm />
      </div>
    )
  }
}