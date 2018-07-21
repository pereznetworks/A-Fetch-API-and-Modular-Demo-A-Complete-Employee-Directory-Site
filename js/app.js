  /* TODO:
      Modal window, hover affect,
      toggle back and forth between employees when modal window open
      search/filter
  */

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

  // wrapper function for actual fetch api calls
  exports.fetchDataFrom = function(url){
    return fetch(url)  // calling fetch() and returning the response ...
      .then( exports.checkStatus ) // verify status 'ok'
      .then( res => res.json() ) // parse response using json()
      .catch( error => console.log('Looks like there was a problem: ', error ) )
      // TODO: instead of logging to console, should probably do something better with errors
    }

  // simple arrow function to 'log' some data
  exports.displayData = data => console.log(data);

  return exports

}(getData || { } ));  // end getDirectory module

// module for html display and functionality for the employee directory
!(function(getData){

  // an array for the employee directory
  let employees = [];

  // managing fetch api calls with promise.all()
    // User-Interface functionality enabled when data returned
  const getDirectory = function(url){
    return Promise.all([
      getData.fetchDataFrom(url)
    ]).then(data => {
          getData.fetchResults = data;
          // getData.displayData(getData.fetchResults);
          employees = (getData.fetchResults[0].results);
          // getData.displayData(employees);
          makeEmployeeDirectory(employees);
          enabledModalWindow(employees);
      });
  };

  const capFirstLtrOf = function(word){
    let firstLetter = word[0];
    firstLetter = firstLetter.toUpperCase();
    let restOf = word.slice(1, word.length);
    let Word = firstLetter + restOf;
    return Word;
  };

  const combineProNoun = function(firstWord, space, secondWord){
    firstWord = capFirstLtrOf(firstWord);
    secondWord = capFirstLtrOf(secondWord);
    return firstWord.concat(space, secondWord);
  };

  const combineLocation = function(employeeLocation){
    employeeLocation.number = capFirstLtrOf(firstWord);
    secondWord = capFirstLtrOf(secondWord);
    return firstWord.concat(space, secondWord);
  };

  // create a div, insert employee's basic info
  const makeEmployeeDiv = function(employee){

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
    employeeFNameLName.textContent = combineProNoun(employee.name.first, ' ', employee.name.last);
    employeeEMail.textContent = employee.email;
    employeeLocation.textContent = capFirstLtrOf(employee.location.city);
    employeeBasicInfoUl.appendChild(employeeFNameLName);
    employeeBasicInfoUl.appendChild(employeeEMail);
    employeeBasicInfoUl.appendChild(employeeLocation);
    employeeBasicInfoDiv.appendChild(employeeImg);
    employeeBasicInfoDiv.appendChild(employeeBasicInfoUl);

    return employeeBasicInfoDiv;
  };

  // TODO: function to parse street address, cap'ing first letter of each proper name
  const parseStreetAddress = function(addressStr){
          // set up some variables
          let numOfSpaces = 0;
          let indexOfSpaces = [];
          let address = addressStr;
          let startI = 0;
          let endI = 0;
          let wordBeingParsed = false
          let parsedWord = '';
          let numBeingParsed = false;
          let addressNumParsed = 0;
          let addressNumStr = '';

          // array, a counter and function to create an array..
          // of the different parts of the street address
          // after each part is parsed...
          const streetAddressArray = [];

          const makeStreetAddressArray = function(parsedWord){
            parsedWord = parsedWord + ' ';
            streetAddressArray.push(parsedWord);
          };

          // using a space as a delimiter
          // separate numbers from words
          // capitalize the first letter of each word
          // create an array each part of strreet address, numbers and words
          // keeping order of each part
          for (let i = 0; i < address.length; i++ ) {

            if (!isNaN(parseInt(address[i]))) {
              addressNumStr += address[i].toString();
              numBeingParsed = true;
              wordBeingParsed = false
            } else if (address[i] === ' ' && wordBeingParsed) {
              endI = i;
              parsedWord = address.slice(startI, endI);
              parsedWord = capFirstLtrOf(parsedWord);
              makeStreetAddressArray(parsedWord);
              wordBeingParsed = false;
            } else if ( address[i] === ' ' && numBeingParsed){
              makeStreetAddressArray(addressNumStr)
              addressNumStr = '';
              numBeingParsed = false;
              wordBeingParsed = true;
              startI = i + 1;
           } else if (address[i] === ' ' && !numBeingParsed && !wordBeingParsed ) {
             wordBeingParsed = true;
             startI = i + 1;
           } else if (i == (address.length - 1) && endI < startI){
             parsedWord = address.slice(startI);
             parsedWord = capFirstLtrOf(parsedWord);
             makeStreetAddressArray(parsedWord)
           } else if (i == (address.length - 1) && endI > 0 ){
             parsedWord = address.slice(endI + 1);
             parsedWord = capFirstLtrOf(parsedWord);
             makeStreetAddressArray(parsedWord)
           }

          }

         // piece parsed street address parts back together in original order
         let parsedStreetAddress = '';
         streetAddressArray.forEach( function(item, index){
            parsedStreetAddress += item;
         });
         return parsedStreetAddress;
  };

  // add 1 div with basic info for each employee
  const makeEmployeeDirectory = function(employees){
    let employeeDirectory = document.getElementsByClassName('row')[0];
    employees.forEach(function(employee, index){
      employeeDirectory.appendChild(makeEmployeeDiv(employee));
      });
    };

  // setup eventlistener for each employee div, to open the modal window
  const enabledModalWindow = function(employees){

    // selecting html elements for opening and closing modal window
    const modal = document.getElementById('modal-dimMainPage');
    const employeeBoxes = document.getElementsByClassName('col-4');
    const modalWindow = document.getElementById('modal-userBox');
    const closeModalWindow = document.getElementById('closeModalWindow');
    const employeeImg = document.getElementById('modal-avatarImg');
    const employeeName = document.getElementById('name');
    const employeeEmail = document.getElementById('email');
    const employeeLocation = document.getElementById('location');
    const employeeFullAddress = document.getElementById('full-address');
    const employeeCellNumber = document.getElementById('phone');
    const employeeDOB = document.getElementById('dob');

    // adding an eventlistener for each employee div
    for (let i = 0; i < employeeBoxes.length; i++){
      employeeBoxes[i].addEventListener('click', function(e){
        const employees = getData.fetchResults[0].results;
        // display modal and add basic and contact info from employee div clicked on
        modal.style.display = 'block';
        modalWindow.style.display = "block";
        employeeImg.src = employees[i].picture.large;
        employeeName.textContent = combineProNoun(employees[i].name.first, ' ', employees[i].name.last);
        employeeEmail.textContent = employees[i].email;
        employeeLocation.textContent = capFirstLtrOf(employees[i].location.city);
        parsedStreetAddress = parseStreetAddress(employees[i].location.street);
        console.log(parsedStreetAddress);
        employeeFullAddress.textContent = `${employees[i].location.street}, ` + capFirstLtrOf(employees[i].location.city) + `, ` + capFirstLtrOf(employees[i].location.state)  + `, ` + `${employees[i].location.postcode}`;
        employeeCellNumber.textContent = employees[i].phone;
        employeeDOB.textContent = employees[i].dob;
      });
    }

    // eventlistener for close modal window
    closeModalWindow.addEventListener('click', function(e){
      modal.style.display = 'none';
      modalWindow.style.display = "none";
    });
  }

  // wait until html page loads, then get 12 random users
  window.onload = function(e){
    let status = getDirectory('https://randomuser.me/api/?results=12');
  };

  /* TODO:  hover affect, search/filter

    // added Modal Window,
    // eventlistener for each employee box
    // can open with click on each employee box
    // and a close button to close the modal window

    // TODO: add employee detail info
    // TODO: add prev and next functionality to view employee detail info

    // when employee basic info is moused-over
      // activate 'hover' style

    // search function: filter employee by any of the basic or details info
  */


}(getData));  // end displayDirectory module
