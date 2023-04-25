# TA Application Website
Summary: The current TA application website at Georgia Tech has a number of shortcomings that make the process frustrating for both students and professors. Students are left in the dark regarding their application status after they submit, and professors have no way of customizing the application to fit their needs. This project aims to develop a new TA application website that streamlines the TA hiring process for professors and provides an easy-to-use platform for students to apply for TA positions. The website will offer a user-friendly interface and incorporate advanced functionality to help ensure that the most qualified applicants are selected for each position.

## Installation Guide

### Pre-requisites:
Before beginning the installation process, please ensure that your system meets the following requirements:

* Operating System: Windows, macOS, or Linux
* Node.js v14 or later
* MongoDB v4.2 or later

### Dependent libraries:
Our MERN app has the following dependencies that must be installed manually:
* Express.js
* React.js
* Node.js
* Mongoose
* Axios
* NPM

### Build Instructions/Install of Actual Application
To download this project, please follow these steps:
1. Click on the "Code" button and select "Download ZIP".
2. Extract the downloaded ZIP file to your desired directory.
3. Navigate to the `/frontend` directory and run the following commands to get the static files to serve. Note that you will have to set the required environment variables as documented in the next section prior to building the app.
```
npm install
npm run build
```
4. Navigate to the `/backend` directory and run the following commands to start the app in production mode. 
```
export NODE_ENV=production
npm install --production
node app.js
```

### Run Instructions:
1. Navigate to the project's root directory.
2. Navigate to the `/frontend` directory and run the following command to install the client-side dependencies:
```npm install```
3. Create a `.env` file in the `frontend` directory and add the following environment variables:
`REACT_APP_API_URL=http://localhost:PORT`
Specify the PORT where the backend will run, which corresponds to what you will set in the `backend` `.env`. 
4. Navigate to the `\backend` directory and run the following command to install the server-side dependencies:
```npm install```
5. Create a `.env` file in the `backend` directory and specify the following environment variables: 
```
mongoURI = "MONGO_URI"
PORT="PORT"
CLIENT_URL="localhost:PORT"
ACCESS_TOKEN_SECRET="SECRET"
```
Set the `MONGO_URI` to point to your `MongoDB` instance. 
6. Start the `frontend` and  `backend` by running `npm start` in the respective directories. 

#### View instructions:
1. Open your preferred web browser.
2. Navigate to `http://localhost:3000`.
3. The app should now be running.

### Troubleshooting:
If you encounter any issues during installation or running the software, try the following steps:

* Make sure that your system meets the pre-requisites listed above.
* Check that all the dependencies have been installed correctly by running `npm install` in the `frontend` directory and `backend` directory.
* Make sure that your MongoDB server is configured correctly and you are entering the `mongoURI` correctly. 
* Check the console output for any error messages.



## Release Notes

## Version 0.5.0:

### New Features:
- Frontend: Removed all hardcoded data. All data displayed on the app is now served by the backend, providing more flexibility and dynamic content.
- Frontend: Allow professors to filter the courses to view by semester, providing a more efficient way to manage their courses.
- Frontend: Added professor view of application submission, providing professors with easy access to the TA applications for their courses.
- Frontend: Completed professor interview scheduling page, providing a streamlined way for professors to schedule interviews with TA candidates.
- Frontend: Added interview cancel functionality, providing users with more options when scheduling interviews. 

### Bug Fixes:
- Frontend: "/" route now redirects to the login page, improving the security and user experience of the website.
- Frontend: Added autoreload for the page to show a submitted application when students submit an application, ensuring that the application is displayed without the need for the page to be manually refreshed.

### Known Issues:
- Autoreload for interview scheduling still needs to be implemented, but we are actively working on it and plan to include it in a future release.
- There is still potentially need for Symfony integration. 


### Version 0.4.0:
#### New Features
* Frontend - updated Interview Scheduling UI
* Frontend - created course TA Application menu/features 
* Frontend - updated/added features to TA Application Template System
* Frontend - added student TA Application status page and features
* Frontend - replaced placeholder text on login and home screens
* Backend - added more Interview Scheduling functionality, including canceling meetings
* Backend - added course objects and backend functionality for creating/updating/retrieving application data in them
* Backend - migrated professor dashboard to retrieve courses from backend
* Backend - initialized Symphony project 

#### Bug Fixes
* Fixed the application templates from disappearing when saved with a duplicate name
* Fixed routing for buttons throughout website

#### Known Issues
* Data on frontend pages is still partially hard-coded since GT CAS is still a work in progress
* Framework needs to be converted to Symfony
* Application submission process still a work in progress

### Version 0.3.0:
#### New Features
* Frontend - updated UI to model after Buzzport
* Frontend - created top and left nav bars
* Frontend - created FAQs page
* Frontend - created functionality to schedule interviews
* Frontend - updated UI for professor course page
* Frontend - updated UI for student and professor dashboards
* Backend - fixed redux store by making it persistent
* Backend - updated JWT to use cookie instead of authorization header
* Backend - set up CI/CD so merging into main will trigger deployment into our live app

#### Bug Fixes
* We fixed major routing issues with respect to protected routes
* Took client feedback and overhauled UI

#### Known Issues
* Data on frontend pages is still partially hard-coded since GT CAS is still a work in progress

### Version 0.2.0:
#### New Features
* Frontend - created customized TA application form for professors
* Frontend - created page to view application templates
* Frontend - created protected routes that require authentication for access
* Frontend - updated student and professor dashboards to be populated based on backend data
* Frontend - created login page and authentication tokens
* Frontend - added functionality for buttons
* Backend - created test data for both professor and student accoutns
* Backend - added JWT token generation functionality
* Backend - added a route for logging in and signing up 

#### Bug Fixes
* Nothing major to report


#### Known Issues
* Data on frontend pages is still partially hard-coded since GT CAS have not fully been implemented yet

### Version 0.1.0:
#### New Features
* Frontend - added navigation bar and footer
* Frontend - added professor view of course-specific TA applications
* Frontend - added student view of student's TA applications
* Frontend - created default TA application form
* Frontend - created application template creation form
* Frontend - created student and professor dashboards

#### Bug Fixes
* Fixed minor bugs associated with routing in React-Router v6


#### Known Issues
* Data on frontend pages is currently hard-coded since GT SSO and BuzzPort integration have not been implemented yet
