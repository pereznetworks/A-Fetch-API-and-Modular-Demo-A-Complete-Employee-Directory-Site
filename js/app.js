// using module pattern for employee directory site

// module for fetch api function calls
var getData = (function(exports){

  var exports = {
    fetchResults:[]
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

}(getData || { } ));  // end getDirectory module

// module for html display and functionality for the employee directory
var displayDirectory = (function(exports){

  var exports = {
    employees: [],
  }

  // forEach employee,
      // create an employee basic info 'col-3 userBox' div
      // append as child of div '.row' on the employee directory page

  // forEach employee, create an employee details info modal window

  // when employee basic info is moused-over
    // activate 'hover' style

  // when employee basic info div is clicked on
    // display modal windows with that employee's detials info div
    // with modal Window open, toogle between employees
    // when modal window closed return to employee directory

  // search function: filter employee by any of the basic or details info


}(displayDirectory || {}));  // end displayDirectory module

// managing the fetch api calls with promise.all()
window.onload = function(e){
  Promise.all([
    getData.fetchDataFrom('https://randomuser.me/api/?results=12')
  ]).then(data => {
        getData.fetchResults = data;
        getData.displayData(getData.fetchResults);
        displayDirectory.employees = getData.fetchResults[0].results;
    });
};
