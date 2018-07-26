# TD-Project5

# STATUS OF PROJECT: COMPLETE

    Requirements

          able to get 12 random employees with latin charset only
          able to extract basic info for each
            display as an employee directory
            in grid layout

          modal window
            in modal window, main directory is inactive
            appropriate letters capitalized!
            DOB date parsed and displayed in mm/dd/yyyy format
            can close and open to show each employee's detail info

          hover, active state on employees in main directory,
            removed standard blue focus outline
            black border and right, bottom shading with grey background
            all buttons and userBox's have same styling active and hover state

          structure and style
            matches mock up
            organized css styling
              styles.css - main directory
              modalStyles.css - modal window
            media query styling for modal window
              tested on windows 10: chrome and edge
              tested on macOS, chrome and safari

    EXTRA CREDIT FEATURES

          search filter displays results
            using click event
            when entering text in input field and clicking search button

          search filter also...
            displays search results as user types in input field
            using keyup event

          toggle back and forth between employees in modal window
            using click event
            can display prev or next employee detail info in modal window


# PHASE 1: Project Prep: COMPLETE

    Ready for PHASE 2: required features and functionality

    Download the sample layouts:

      employee_directory.png
      - an example of what the main directory should look like

      employee_overlay.png
      - an example of the overlay providing more detail

      will need to create the entire web layout; HTML, CSS
        in addition to JS for this project.

    Review the Random User Generator documentation.

      Grab the example they provide
      and console.log the data
      so you can see what information you’ll receive
      and start to think about how you’ll access the correct information
       and display it on the page.

      ~/employee_directory_v1/layoutSample

          adapted layout using html and css to match samples
          setup html templates
          need a little more work to integrate html templates

      ~/employee_directory_v1/fetchSample

          using modular approach
          able to fetch 12 results from randomUser.me/api
          able to store results from fetch in a fetchResults array
          able to store the 12 random users in a "employee" array
          reloading page fetch 12 completely different random persons

# PHASE 2: Required Features and Functionality : COMPLETE

  To complete this project, follow the instructions below.
  If you get stuck, ask a question in the community.

  Required Feature 1:

        COMPLETE: Get and display 12 random users

            Using information provided from
            The Random User Generator API, display 12 users,
            along with some basic information for each:
            Image
            First and Last Name
            Email
            City or location

  Required Feature 2:

        Modal window

            When any part of an employee item in the directory is clicked,
            a modal window should pop up with the following details displayed:
              Image
              Name
              Email
              City or location
              Cell Number
              Detailed Address,
                including street name and number,
                state or country, and post code.
              Birthday

            Make sure there’s a way to close the modal window

  Required Feature 3:

         Structure and style

         all ui presentation and visual affects done by css
         only functionality needed to....
          get, display and search data is done via javascript

            The user directory and modal pop up window
            should roughly match the provided mockups.
             Display the users in a grid or table layout

              Complete for

                User directory.

                layout for modal window complete

                add a hover state to the employee items

# PHASE 3: Extra Credit Features: COMPLETE

    To get an "exceeds" rating,
    you can expand on the project in the following ways:

    Feature 1:

        Add a way to filter the directory by name or username.

          To do this, you’ll need to request a random user nationality
           that will only return data in the English alphabet.

           Only data in the English alphabet,
              or latin charset, returned by api call

         Note: you don't have to rely on the API to return search results.
         You'll need to write functionality that ...
         filters results once they already on the page.

    Feature 2:

        Add a way to toggle back and forth
        between employees when the modal window is open.

          Add a way to toggle back and forth
          between employees when the modal window is open.
