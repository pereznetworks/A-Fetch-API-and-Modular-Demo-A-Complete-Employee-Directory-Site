// using module pattern for employee directory site

// module for fetch api function calls
var getDirectory = (function(exports){

  var exports = {
    fetchResults:[],
    employees: []
  }

  exports.checkStatus = function(response){
    if (response.ok){  // if 'ok' then return response object and cont.
      return Promise.resolve(response);
    } else {           // else return reject object with statusText
      return Promise.reject(new Error(response.statusText) );
    }
  };

  // handling http connection and other status errors
  exports.checkStatus = function(response){
    if (response.ok){  // if 'ok' then return response object and cont.
      return Promise.resolve(response);
    } else {           // else return reject object with statusText
      return Promise.reject(new Error(response.statusText) );
    }
  }

  // wrapper function for actual fetch api calls
  exports.fetchDataFrom = function(url){
    return fetch(url)  // calling fetch() and returning the response ...
      .then( exports.checkStatus ) // verify status 'ok'
      .then( res => res.json() ) // parse response using json()
      .catch( error => console.log('Looks like there was a problem: ', error ) )
      // instead of logging to console, should probably do something better with errors
    }

  // simple arrow function to 'display' the data
  exports.displayData = data => console.log(data);

  return exports

}(getDirectory || { } ));  // end IIFE

// module for html display and functionality for the employee directory 
var showDirectory = (function(exports, employeeDir){

}(showDirectory || {}, getDirectory.employees));

// managing the fetch api calls with promise.all()
window.onload = function(e){
  Promise.all([
    getDirectory.fetchDataFrom('https://randomuser.me/api/?results=12')
  ]).then(data => {
        getDirectory.fetchResults = data;
        getDirectory.displayData(getDirectory.fetchResults);
        getDirectory.employees = getDirectory.fetchResults[0].results;
    });
};
