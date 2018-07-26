
// module for fetch api function calls
var getData = (function(exports){

  // variables to store fetch results
  var exports = {
    fetchResults:[]
  }

  // checking the status of the response to fetch api get request
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
    employeeBasicInfoDiv.className = 'col-3 userBox';
    employeeBasicInfoDiv.id = `userBox-${index}`

    const employeeImgLi = document.createElement('li');
    employeeImgLi.className = 'img-li';
    const employeeImg = document.createElement('img');
    employeeImg.className = 'avatarImg';
    employeeImgLi.appendChild(employeeImg);

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
    employeeBasicInfoUl.appendChild(employeeImgLi);
    employeeBasicInfoUl.appendChild(employeeFNameLName);
    employeeBasicInfoUl.appendChild(employeeEMail);
    employeeBasicInfoUl.appendChild(employeeLocation);
    employeeBasicInfoDiv.appendChild(employeeImg);
    employeeBasicInfoDiv.appendChild(employeeBasicInfoUl);

    document.getElementById('iftakingTooLong').style.display='none';

    return employeeBasicInfoDiv;
  };

  // add 1 div with basic info for each employee
  exports.makeEmployeeDirectory = function(employees){
    let employeeDirectory = document.getElementById('rowDirectory');
    employees.forEach(function(employee, index){
      employeeDirectory.appendChild( exports.makeEmployeeDiv(employee, index));
      });
    };

  // setup eventlistener for each employee div, to open the modal window
  exports.enableModalWindow = function(employees){

    // set index of employee being displayed
    let currentIndex = 0;

    // selecting html elements for opening and closing modal window
    const modal = document.getElementById('modal-dimMainPage');
    const employeeBoxes = document.getElementsByClassName('col-3');
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

    // display modal and add basic and contact info from employee div clicked on
    const displayDetailInfo = function(employees, i){
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
    };

    // eventlistener for each employee div
    // to display detail info in modal window
    for (let i = 0; i < employeeBoxes.length; i++){
      employeeBoxes[i].addEventListener('click', function(e){
        // const employees = getData.fetchResults[0].results;
        currentIndex = i;
        displayDetailInfo(employees, currentIndex);
      });
    }

    // eventlistener for close modal window
    closeModalWindow.addEventListener('click', function(e){
      modal.style.display = 'none';
      modalWindow.style.display = "none";
    });

    // controls to toggle back and forth between employees
    document.querySelector('#nextModalWindow').addEventListener('click', function(e){
         if (currentIndex == employees.length - 1){
          currentIndex = 0;
         } else {
         currentIndex++;
         }
         displayDetailInfo(employees, currentIndex);
      });

    document.querySelector('#prevModalWindow').addEventListener('click', function(e){
         if (currentIndex == 0){
          currentIndex = 11;
         } else {
         currentIndex--;
         }
         displayDetailInfo(employees, currentIndex);
      });
  };

  return exports

}(displayData || { }));

// module for search and for displaying search results..
var searchData = (function(exports){

    // method for searching directory
    // implemented: filter by any char in first or last name
    exports.searchDirectory = function(employees, filteredByTerm){

      const getIndexof = function(value, index, array){
        if (value.name.first === filteredByTerm || value.name.first.includes(filteredByTerm)){
          return array[index];
        } else if (value.name.last === filteredByTerm || value.name.last.includes(filteredByTerm)){
          return array[index];
        }
      };
      // returns array of any matches to filteredByTerm
      return employees.filter(getIndexof);
    };

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
          document.getElementById("searchInput").addEventListener('keyup', function(e){
            document.getElementById('rowDirectory').innerHTML = '';
            let filterByTerm = e.target.value.toLowerCase();
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
