  /* TODO:
      toggle back and forth between employees when modal window open
      search/filter
      re-factor to use arrow functions and .filter() .map()
  */

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

// module for displaying data as html employee directory
var displayData = (function(exports){

  // combine first and last name objects values into 1 string
  exports.combineProNoun = function(firstWord, space, secondWord){
    return firstWord.concat(space, secondWord);
  };

  // parsed date of birth into format, MM/DD/YYY. like, 01/11/1990
  exports.getDOB = function(employeeDOB){
    rawDob = new Date(employeeDOB);
    const dayofMonth = rawDob.getDate();
    const month = rawDob.getMonth() + 1;
    const fullYear = rawDob.getFullYear();
    const parsedDob = `${month}/${dayofMonth}/${fullYear}`;
    return parsedDob;
  };

  // create a div, insert employee's basic info
  exports.makeEmployeeDiv = function(employee, index){

    const directory = document.createElement('div');

    const employeeBasicInfoDiv = document.createElement('div');
    employeeBasicInfoDiv.className = 'col-4 userBox';
    employeeBasicInfoDiv.id = `userBox-${index}`

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
    employeeFNameLName.textContent = exports.combineProNoun(employee.name.first, ' ', employee.name.last);
    employeeEMail.textContent = employee.email;
    employeeLocation.textContent = employee.location.city;
    employeeBasicInfoUl.appendChild(employeeFNameLName);
    employeeBasicInfoUl.appendChild(employeeEMail);
    employeeBasicInfoUl.appendChild(employeeLocation);
    employeeBasicInfoDiv.appendChild(employeeImg);
    employeeBasicInfoDiv.appendChild(employeeBasicInfoUl);

    return employeeBasicInfoDiv;
  };

  // add 1 div with basic info for each employee
  exports.makeEmployeeDirectory = function(employees){
    let employeeDirectory = document.getElementById('rowDirectory');
    employees.forEach(function(employee, index){
      employeeDirectory.appendChild( exports.makeEmployeeDiv(employee, index));
      });

    // controls to toggle back and forth between employees
    // document.querySelectorAll('nextEmployee').forEach(function(item, index){
    //   item.addEventListener('click', function(e){
    //     show next employee
    //   });
    // document.querySelectorAll('prevEmployee').forEach(function(item, index){
    //   item.addEventListener('click', function(e){
    //     show next employee
    //   });

    };

  // setup eventlistener for each employee div, to open the modal window
  exports.enableModalWindow = function(employees){

    // selecting html elements for opening and closing modal window
    const modal = document.getElementById('modal-dimMainPage');
    const employeeBoxes = document.getElementsByClassName('col-4');
    const modalWindow = document.getElementById('modal-userBox');
    const closeModalWindow = document.getElementById('closeModalWindow');
    const employeeImg = document.getElementById('modal-avatarImg');
    const employeeName = document.getElementById('name');
    const employeeEmail = document.getElementById('email');
    const employeeLocation = document.getElementById('location');
    const employeeStreetAddress = document.getElementById('streetAddress');
    const employeeCityStateZip = document.getElementById('cityStateZip');
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
        employeeName.textContent = exports.combineProNoun(employees[i].name.first, ' ', employees[i].name.last);
        employeeEmail.textContent = employees[i].email;
        employeeLocation.textContent = employees[i].location.city;
        employeeStreetAddress.textContent = employees[i].location.street;
        employeeCityStateZip.textContent = employees[i].location.city + `, ` + employees[i].location.state  + `, ` + employees[i].location.postcode;
        employeeCellNumber.textContent = employees[i].phone;
        employeeDOB.textContent = exports.getDOB(employees[i].dob.date);
      });
    }

    // eventlistener for close modal window
    closeModalWindow.addEventListener('click', function(e){
      modal.style.display = 'none';
      modalWindow.style.display = "none";
    });
  }

  // display next of prev employee data in modalWindow
  exports.prevNextEmployee = function(employee){
    // call enabledModalWindow, passing index of prev or next employee
  };

  return exports

}(displayData || { }));

// module for search and for displaying search results..
var searchData = (function(exports){

    exports.searchDirectory = function(employees, filteredByTerm){

      const getIndexof = function(value, index, array){
        if (value.name.first === filteredByTerm){
          return array[index];
        } else if (value.name.last === filteredByTerm){
          return array[index];
        } else if (value.login.username === filteredByTerm){
          return array[index];
        }
      };

      return employees.filter(getIndexof);
    };

    // from main app module
    // step 1:
    // after employee directory displayed
    // call createFilteredDirArray, pass in and create a firstName, LastName, EmailAlias array
    // step 2:
    // as search term is typed
    // call searchFilteredDirectory, returning an array containing matchestoSearch
    // step 3:
    // pass matchestoSearch array to makeEmployeeDirectory() function
    // display filtered employees directory
    // step 4:
    // repeat steps 2 and 3 when search submitted
    // step 5:
    // when "reset" is submitted, call makeEmployeeDirectory, passing unfiltered employees array
    // exports.createFilteredDirArray = function(employees, filterByTerm){
    //   // use .filter() on employees, using filterByTerm to return a filtered array
    // };
    //
    // exports.searchFilteredDirectory = function(filteredArray, searchTerm){
    //   // use .reduce() to find and return an with any matches to searchTerm in filtered array
    // };

    return exports

 }(searchData || { } ));

// main app module
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
          employees = getData.fetchResults[0].results;
          displayData.makeEmployeeDirectory(employees);
          displayData.enableModalWindow(employees);
          document.getElementById("searchButton").addEventListener('click', function(e){
            document.getElementById('rowDirectory').innerHTML = ''; 
            let filterByTerm = e.target.previousElementSibling.value.toLowerCase();
            let filteredEmployees = searchData.searchDirectory(employees, filterByTerm);
            displayData.makeEmployeeDirectory(filteredEmployees);
          });

      });
  };

  // wait until html page loads, then get 12 random users
  window.onload = function(e){

    let status = getDirectory('https://randomuser.me/api/?results=12&nat=au,br,ca,ch,de,dk,es,fi,fr,gb,ie,no,nl,nz,us');


  };

}(getData));  // end displayDirectory module
