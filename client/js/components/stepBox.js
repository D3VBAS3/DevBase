import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './../styles/styles';

// class StepBox extends Component {
// 	constructor() {
// 		super();
// 	}
// 	render() {
// 		return (
// 			<div className="step-box" style={ styles.stepBox }>

// 			</div>
// 		)
// 	}
// }

//export default StepBox;

export default ({ token, username }) => {
	return (
    <div className="step-box" style={ styles.stepBox }>
      {token} {username}
    </div>
  );
}