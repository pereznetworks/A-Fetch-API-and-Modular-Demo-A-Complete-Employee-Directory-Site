// using module pattern for employee directory site

// module for fetch api function calls
var getData = (function(exports){

  var exports = {
    fetchResults:[],
    fetchSuccess: false
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
      fetchSuccess = true;
      return Promise.resolve(response);
    } else {          // else return reject object with statusText
      fetchSuccess = false;
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

  // simple arrow function to 'log' some data
  exports.displayData = data => console.log(data);

  return exports

}(getData || { } ));  // end getDirectory module

// module for html display and functionality for the employee directory
!(function(getData){

  let employees = [];

  // using fetch api calls with promise.all()
  const getDirectory = function(url){
    return Promise.all([
      getData.fetchDataFrom(url)
    ]).then(data => {
          getData.fetchResults = data;
          getData.displayData(getData.fetchResults);
          employees = (getData.fetchResults[0].results);
          getData.displayData(employees);
          makeEmployeeDirectory(employees);
      });
  };

  // create a div, insert employee's basic info
  const makeEmployeeDiv = function(employee){

    const capFirstLtrOf = function(word){
      let firstLetter = word[0];
      firstLetter = firstLetter.toUpperCase();
      let restOf = word.slice(1, word.length);
      let Word = firstLetter + restOf;
      return Word;
    };

    const conbineProNoun = function(firstWord, space, secondWord){
      firstWord = capFirstLtrOf(firstWord);
      secondWord = capFirstLtrOf(secondWord);
      return firstWord.concat(space, secondWord);
    };

    const directory = document.createElement('div');

    const employeeBasicInfoDiv = document.createElement('div');
    employeeBasicInfoDiv.className = 'col-4 userBox';

    const employeeImg = document.createElement('img');
    employeeImg.className = 'avatarImg';

    const employeeBasicInfoUl = document.createElement('ul');
    employeeBasicInfoUl.className = 'BasicInfo';

    const employeeFNameLName = document.createElement('li');
    employeeFNameLName.className = 'fnamelname';

    const employeeEMail = document.createElement('li');
    employeeEMail.className = 'email';

    const employeeLocation = document.createElement('li');
    employeeLocation.className = 'location';

    employeeImg.src = employee.picture.large;
    employeeFNameLName.textContent = conbineProNoun(employee.name.first, ' ', employee.name.last);
    employeeEMail.textContent = employee.email;
    employeeLocation.textContent = capFirstLtrOf(employee.location.city);
    employeeBasicInfoUl.appendChild(employeeFNameLName);
    employeeBasicInfoUl.appendChild(employeeEMail);
    employeeBasicInfoUl.appendChild(employeeLocation);
    employeeBasicInfoDiv.appendChild(employeeImg);
    employeeBasicInfoDiv.appendChild(employeeBasicInfoUl);

    return employeeBasicInfoDiv;
  };

  const makeEmployeeDirectory = function(employees){
    let employeeDirectory = document.getElementsByClassName('row')[0];
    employees.forEach(function(employee, index){
      employeeDirectory.appendChild(makeEmployeeDiv(employee));
      console.log(makeEmployeeDiv(employee));
      });
    };
  // add 1 div with basic info for each employee

  // wait until html page loads, then get 12 random users
  window.onload = function(e){
    getDirectory('https://randomuser.me/api/?results=12');
  };

  /*
  // forEach employee, create an employee details info modal window

  // when employee basic info is moused-over
    // activate 'hover' style

  // when employee basic info div is clicked on
    // display modal windows with that employee's detials info div
    // with modal Window open, toogle between employees
    // when modal window closed return to employee directory

  // search function: filter employee by any of the basic or details info
  */


}(getData));  // end displayDirectory module
