# TD-Project5

# TODO: STATUS OF PROJECT

    bug: some city names are more than 1 word
      need to capitalize first letter of each word of multiple-word city name

    Modal window, hover affect,

    toggle back and forth between employees when modal window open

    search/filter

    promise.resolve and promise reject
     to keep promise from logging fetch status to console

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

# PHASE 2: Required Features and Functionality

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

        UP NEXT: Create a modal window

            When any part of an employee item in the directory is clicked,
            a modal window should pop up with the following details displayed:
            Image
            Name
            Email
            City or location
            Cell Number
            Detailed Address,
            including street name and number, state or country, and post code.
            Birthday
            Make sure there’s a way to close the modal window

  Required Feature 3:

        50%: Structure and style

            The user directory and modal pop up window
            should roughly match the provided mockups.
             Display the users in a grid or table layout

              Complete for
                User directory.

              Up next for ....
                Model pop-up.
                Add a hover state to the employee items

# PHASE 3: Extra Credit Features

    To get an "exceeds" rating,
    you can expand on the project in the following ways:

    Feature 1:

        Add a way to filter the directory by name or username.

          To do this, you’ll need to request a random user nationality
           that will only return data in the English alphabet.

         Note: you don't have to rely on the API to return search results.
         You'll need to write functionality that ...
         filters results once they already on the page.

    Feature 2:

        Add a way to toggle back and forth
        between employees when the modal window is open.

          Add a way to toggle back and forth
          between employees when the modal window is open.
