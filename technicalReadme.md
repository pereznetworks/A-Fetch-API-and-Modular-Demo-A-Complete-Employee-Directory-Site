# Technical Readme
  - so this will eventually be a kind of a code review

## Features and Functionality

### Results from Fetch API

- able to get 12 random s with latin charset only
- able to extract basic info for each
  - display as an  directory
  - in grid layout

### modal window

  - in modal window, main directory is inactive
  - appropriate letters capitalized!
  - DOB date parsed and displayed in mm/dd/yyyy format
  - can close and open to show each 's detail info

### hover, active state on s in main directory

  - customized focus outline
  - black border and right, bottom shading with grey background
  - all buttons and userBox's have same styling active and hover state

### structure and style
  - matches mock up
    - see employee_directory_v1 for samples
  - organized css styling
    - styles.css - main directory
    - modalStyles.css - modal window
    - media query styling for modal window
    - tested on windows 10: chrome and edge
    - tested on macOS, chrome and safari

### search filter displays results
  - using click event
  - when entering text in input field and clicking search button

### live search filter ...
  - displays search results as user types in input field using keyup event

### move back and forth between employees in modal window
  - using click event
  - can display prev or next employee detail info in modal window

## PHASE 1: Project Prep:

### Download the sample layouts:

  - employee_directory.png
    - an example of what the main directory should look like

  - employee_overlay.png
    - an example of the overlay providing more detail

  - will need to create the entire web layout; HTML, CSS
    - in addition to JS for this project.

### Review the Random User Generator documentation.

  - Grab the example they provide
    - and console.log the data
    - so you can see what information you’ll receive
    - start to think about how you’ll access the correct information
    - and how to display it on the page.


  - from employee_directory_v1/layoutSample

    - adapted layout using html and css to match samples
    - setup html templates
    - integrate html templates


  - from ~/employee_directory_v1/fetchSample

    - use the modular pattern
    - fetch 12 results from randomUser.me/api
    - store results from fetch in a fetchResults array
    - store the 12 random users in a "employee" array
    - reloading page fetch 12 completely different random persons

## PHASE 2: Required Features and Functionality

### Get and display 12 random users

  - Using information provided from the random user generator api, display 12 users,
  - along with some basic information for each:
    - Image
    - First and Last Name
    - Email
    - City or location

  - test that the fetch api code works with no bugs

### Use a Modal window

  - When any part of an employee item in the directory is clicked,
    - a modal window should pop up with the following details
      - Image of person
      - Name
      - Email
      - City or location
      - Cell Number
      - Detailed Address,
        - including street name and number, state or country, and post code.
        - Birthday

  - Make sure there’s a way to close the modal window

  - make sure there are no bugs

### Structure and style

  - all ui presentation and visual affects done by css


  - only functionality needed to get, display and search data is done via javascript


  - The user directory and modal pop up window should:   
    - roughly match the provided mockups.
    - Display the users in a grid or table layout


  - implement and test UI with:  
    - Employee directory.
    - layout for modal window
    - add a hover state to the employee items

  - again, make sure there are no bugs

## PHASE 3: Advanced Features

### filter the directory by name or employee name.

  - To do this, you’ll need to request a random user nationality
  - that will only return data in the English alphabet.

  - Only data in the English alphabet, or latin charset, should be returned by the api call

  -  Note: you don't have to rely on the API to return search results.

  - You'll need to write functionality that ...
  - filters results once they already on the page.

  - again, test and fix all bugs

### browse details with-in the modal window.

  - browse employee details while still in the modal window is open.

  - test and fix all bugs

#### [Back to Project Home](README.md) - [Back to Top](technicalReadme.md#technical-readme)
