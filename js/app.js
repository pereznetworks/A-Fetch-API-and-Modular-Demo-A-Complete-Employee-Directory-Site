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
        employeeFullAddress.textContent = `${employees[i].location.street}, ${employees[i].location.city}, ${employees[i].location.state}, ${employees[i].location.postcode}`;
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

// TODO: function to parse street address, cap'ing first letter of each proper name
const parseStreetAddress = function(addressStr){
        var address = addressStr;
        var startI = 0;
        var endI = 0;
        var streetNameParsed = 0;
        var streetNumsParsed = 0;
        var addressNumParsed = false;
        var aptNumParsed = false
        var addressNum = '';
        var aptNum = '';
        var addressStreet1 = '';
        var addressStreet2 = '';
        var addressStreet3 = '';

        const isStreetNumParsed = function(streetNumsParsed){
          if (streetNumsParsed < 0){
            return true;
          }
        }

        for (let i = 0; i < address.length; i++ ) {

           var tempNum = parseInt(address[i]);
           if (tempNum !== 'NaN' && !addressNumParsed){
             addressNum += tempNum.toString();
             streetNumsParsed += .1;
           } else if (tempNum !== 'NaN' && streetNameParsed <= 2 && streetNumsParsed !== 0){
             aptNum += tempNum.toString();

           } else if (address[i] === ' ' && streetNameParsed == 2.5){
             endI = address[i];
             var addressStreet3 = address.slice(startI, endI);
             streetNameParsed = 3;
            addressNumParsed = isStreetNumParsed(streetNameParsed);

           } else if (address[i] === ' ' && streetNameParsed == 2){
             startI = address[i];
             streetNameParsed = 2.5;

           } else if (address[i] === ' ' && streetNameParsed == 1.5){
             endI = address[i];
             var addressStreet2 = address.slice(startI, endI);
             streetNameParsed = 2;
             addressNumParsed = isStreetNumParsed(streetNameParsed);

           } else if (address[i] === ' ' && streetNameParsed == 1){
             startI = address[i];
             streetNameParsed = 1.5;

           } else if (address[i] === ' ' && streetNameParsed == 0.5){
             endI = address[i];
             var addressStreet1 = address.slice(startI, endI);
             streetNameParsed = 1;
            addressNumParsed = isStreetNumParsed(streetNameParsed);

           } else if (address[i] === ' ' && streetNameParsed == 0){
             startI = address[i + 1];
             streetNameParsed = 0.5;
             addressNumParsed = isStreetNumParsed(streetNameParsed);
           }
       }

       var parsedStreetAddress = ''; // TODO: have to piece parts back together in original order
       return parsedStreetAddress;
};
