/* helper functions
*/

var getDirectory = (function(exports){

  var exports = {
    employees:[],
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

/* managing the fetch api calls with promise.all()
    in response from randomUser.me, is an array of objects
    [
      0:{
        info: {}, // contains a 'seed', can be used to get this same user again
        results: [{..}]  // the random user
      }
    ]
*/
window.onload = function(e){
  Promise.all([
    getDirectory.fetchDataFrom('https://randomuser.me/api/?results=12')
  ]).then(data => {
        getDirectory.employees = data;
        getDirectory.displayData(getDirectory.employees);
    });
};
