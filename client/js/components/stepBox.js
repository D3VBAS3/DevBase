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
    {'function BASE(command){ return function(req, res, next){request.post(\'http://localhost:8080/setdata\',{form: {body: JSON.stringify(req.body), Command: command, User: '}  {username}  {', Token: '}  {token} {'}},function(err, response, body){res.send(body);});}}'}

    
    </div>
  );
}