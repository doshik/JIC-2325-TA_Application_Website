# TA Application Website
Summary: The current TA application website at Georgia Tech has a number of shortcomings that make the process frustrating for both students and professors. Students are left in the dark regarding their application status after they submit, and professors have no way of customizing the application to fit their needs. This project aims to develop a new TA application website that streamlines the TA hiring process for professors and provides an easy-to-use platform for students to apply for TA positions. The website will offer a user-friendly interface and incorporate advanced functionality to help ensure that the most qualified applicants are selected for each position.

## Installation Guide

### Pre-requisites:
Before beginning the installation process, please ensure that your system meets the following requirements:

* Operating System: Windows, macOS, or Linux
* Node.js v14 or later
* MongoDB v4.2 or later
* Docker

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
3. Create a `.env` file in the `frontend` directory and add the following environment variables:
   `REACT_APP_API_URL=http://127.0.0.1:PORT`
   Specify the `PORT` where the backend will run, which corresponds to what you will set in the `backend` `.env`.
4. Navigate to the `/frontend` directory and run the following commands to get the static files to serve.
```
npm install
npm run build
```
5. Navigate to the `/backend` directory and run the following commands to install the dependencies needed for the backend. 
```
export NODE_ENV=production
npm install --production
```
6. Create a `.env` file in the `backend` directory and specify the following environment variables:
```
mongoURI=MONGO_URI
PORT=PORT
CLIENT_URL=localhost:PORT
ACCESS_TOKEN_SECRET=SECRET
MAIL_USERNAME=email@email.com
MAIL_PASSWORD=EMAIL_PASSWORD
MAIL_PORT=587
MAIL_HOST=SMTP_HOST
S3_ENDPOINT=S3_ENDPOINT
S3_ACCESS_KEY=AWS_ACCESS_KEY
S3_SECRET_KEY=AWS_SECRET_KEY
```
Set the `mongoURI` to point to your `MongoDB` instance. \
Set the `MAIL_USERNAME` and `MAIL_PASSWORD` to the email and corresponding password to use to send status emails, 
and set the `MAIL_HOST` to the email service you are using, for example, `smtp.office365.com` or `smtp.gmail.com`.
We recommend using [ethereal.email](https://ethereal.email/) for testing the email feature, so no emails are actually sent.
Finally, `587` is the port now used by most SMTP services with TSL encryption, so you most likely won't need to change this setting. \
We use an S3 bucket to store file attachments and profile pictures. You will then need to set your `S3_ENDPOINT` and your `access_key` and `secret_key` 
from your AWS account. More information about doing this locally can be seen below in setting up Docker.

### Docker:
1. You can use [MinIO](https://hub.docker.com/r/minio/minio) to simulate an S3 bucket. The default environmental variables if you do this can then be set as:
```
S3_ENDPOINT=https://localhost:9000
S3_ACCESS_KEY=minio
S3_SECRET_KEY=minio123
```
2. In the root directory of this app, run the following commands.
```
docker-compose build
docker-compose up
```


### Running Locally:
1. Make sure you have followed all the steps in the Build Instructions.
2. Navigate to the `/frontend` directory and run `npm run build` to get the latest build of the app.
3. Navigate to the `/backend` directory and run `npm start` to start the `backend`.
4. The app should now be running!

#### View instructions:
1. Open your preferred web browser.
2. Navigate to `http://127.0.0.1`.

### Troubleshooting:
If you encounter any issues during installation or running the software, try the following steps:

* Make sure that your system meets the pre-requisites listed above and you have the relevant software installed.
* Make sure you have followed all of the instructions for building and running above.
* Check that all the dependencies have been installed correctly by running `npm install` in the `frontend` directory and `backend` directory.
* Make sure you have the latest build by running `npm run build` in the `/frontend/` directory.
* Make sure the server is running! You should see `Server is running on port: PORT` with the port you set in the terminal where you ran `npm start`. Also, make sure your ports match in both your frontend and backend `.env` files.
* Make sure that your MongoDB server is configured correctly and you are entering the `mongoURI` correctly. 
* If all your courses and applications seem to have disappeared, even though they are in the database, your JWT token may have expired. Just log back in, and this should be resolved.
* If file attachments aren't being saved or you cannot see profile pictures, you may need to configure your S3 bucket settings. Make sure the associated environment variables are set correctly, or follow the Docker instructions for local S3 simulation.
* If you cannot access [apply2ta.cc.gatech.edu](apply2ta.cc.gatech.edu), make sure you are either on a campus network or the campus VPN. If you are connected to eduroam and are having issues, you may still need to use the campus VPN. You can read more about the campus VPN [here](https://gatech.service-now.com/home?id=kb_article_view&sysparm_article=KB0026837).
* Similarly, you may need the VPN client in order to access the site's Plesk Control Panel. If you see `SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON` when trying to open the control panel, this is your problem. Log in to [vpn.gatech.edu](https://vpn.gatech.edu/) and download the VPN client for your OS. For a step-by-step guide, you can follow these articles for [Windows](https://gatech.service-now.com/home?id=kb_article_view&sysparm_article=KB0026742), [macOS](https://gatech.service-now.com/home?id=kb_article_view&sysparm_article=KB0026743), [Ubuntu](https://gatech.service-now.com/home?id=kb_article_view&sysparm_article=KB0028027), and [Chrome OS](https://gatech.service-now.com/home?id=kb_article_view&sysparm_article=KB0026749). 
* Check the console output for any error messages.



## Release Notes

## Version 1.0.0:

### New Features:
- Added new question types (File Attachment, Multiselect, Select) to application templates.
- Allow professors to sort and filter applications by Year, GPA, Courses Taking, Courses Taken, and Major.
- Allow professors to write and save notes on each application.
- Added paging to professor's application table.
- Professor dashboard now displays semesters which can be then selected to display courses.
- Added single login functionality.
- Added profile pictures for students.
- Added automatic email updates to students after a status change has been made on their application.

### Bug Fixes:
- Completed applications no longer use the current application template set for the course, but the application template that it was submitted with.

### Known Issues:
- PHP Symfony Migration may still be necessary at some point.
- There is no way to create a new account in the website.
- Semesters and courses are being added manually to the database and there is no way for courses to be added in the website.
- There is no way for students to unsubscribe from emails.
- More confirmation dialogs are needed for important actions, such as deleting an application template, changing the status of an application, or submitting an application.
- May need to give a warning or log out the user when their JWT token has expired.
- One student can apply many times for one course. This is useful for testing, but may need to be changed in the future.

### Future Work:
- Various third-party integrations depending on Georgia Tech approval: GT SSO, GT Canvas, MS Bookings, and MS Teams.
- Account pages for professors or students to change any settings as needed.
- Add functionality for professors while viewing a student's application, such as changing status or viewing and editing notes.
- Add a point ranking to applications for professors or an applicant ranking page.

## Version 0.5.0:

### New Features:
- Frontend/Backend: Removed all hardcoded data. All data displayed on the app is now served by the backend, providing more flexibility and dynamic content.
- Frontend: Allow professors to filter the courses to view by semester, providing a more efficient way to manage their courses.
- Frontend: Added professor view of application submission, providing professors with easy access to the TA applications for their courses.
- Frontend: Completed professor interview scheduling page, providing a streamlined way for professors to schedule interviews with TA candidates.
- Frontend: Added interview cancel functionality, providing users with more options when scheduling interviews. 
- Backend: Completed functionality for application saving and submission.

### Bug Fixes:
- Frontend: "/" route now redirects to the login page, improving the security and user experience of the website.
- Frontend: Added autoreload for the page to show a submitted application when students submit an application, ensuring that the application is displayed without the need for the page to be manually refreshed.

### Known Issues:
- Autoreload for interview scheduling still needs to be implemented, but we are actively working on it and plan to include it in a future release.
- There is still potentially need for Symfony integration. 
- Professors can delete application templates that are attached to an active course.
- There is no submission validation for applications and application templates.


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
