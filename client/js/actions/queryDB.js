import fetch from 'isomorphic-fetch';

function queryDB() {
  return {
    type: 'QUERY_DB'
  }
}

export default function query() {

  return function() {
    dispatch(queryDB());

    return fetch('/query', {
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
        return data;
      })
      .catch((error) => {
        console.log("Error in database query:", error);
      })
  }
}