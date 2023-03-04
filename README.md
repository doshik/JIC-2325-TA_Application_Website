# TA Application Website
Summary: We are designing a better TA application website with functionalities that include resume hosting, filtering based on different criteria, and customization of the TA application form for each class that will function as the primary way that students seeking TAships communicate with instructors as opposed to emails that make it difficult for professors to keep track of potential candidates.

## Release Notes

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
