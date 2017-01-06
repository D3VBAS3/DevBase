import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './../styles/styles';
import query from './../actions/queryDB';

class Table extends Component {
    constructor() {
      super();

      this.state = {
        rowStrings: []
      }

      this.queryDB = this.queryDB.bind(this);
      //this.continueQuery = this.continueQuery.bind(this); //might need?
    }
    componentDidMount() {
      this.continueQuery = setInterval(this.queryDB(), 3000);
    }
    queryDB() {
      //this.props.dispatch(query());
      fetch('/query', {
      method: 'get',
      headers: {
        'Authorization': localStorage.getItem('devBase_user_token')
      }
    })
      .then((response) => {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then((data) => {
        console.log('QUERY DB FROM PROFILE DATA:', data);
        //return data;
        this.setState({ rowStrings: data });
      })
      .catch((error) => {
        console.log("Error in database query:", error);
      })
    }
    render() {

      const tableRows = this.state.rowString.map((string) => {
        return (<p>{string}</p>);
      });

      return (
        <div className='database-table-container' style={ styles.dbTable }>
          {tableRows}
        </div>
      );
    }
}

export default connect()(Table);