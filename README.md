# TA Application Website
Summary: We are designing a better TA application website with functionalities that include resume hosting, filtering based on different criteria, and customization of the TA application form for each class that will function as the primary way that students seeking TAships communicate with instructors as opposed to emails that make it difficult for professors to keep track of potential candidates.

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
- Symfony integration is still remaining, but we are actively working on it and plan to include it in a future release.


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
