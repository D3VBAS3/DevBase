import React, { Component } from 'react';

export default class App extends Component {
  constructor() {
    super();
  }
 
  render() {
    return (
      <div>
        <h1>DevBase</h1>
        {this.props.children}
      </div>
    );
  }
}