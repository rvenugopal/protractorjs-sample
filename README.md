protractorjs-sample
===================

Sample repository which shows E2E tests using protractor. Flows include login/registration/logout/forgot_password


## Setup
- run 'npm install' to install all dependencies from root directory (this is for the web application)
- run 'bower install'

On first terminal window
- run 'grunt server'  (server is running at port 9000).  This will open up login page

Open second terminal window
- cd to express-rest-api directory (this is for the api)
- run 'npm install'
- run 'node server.js'  (server will be running at port 9011.  grunt-connect-proxy has been configured so that API requests are forwarded to the API application)
- (Optional step) Try the scenarios mentioned under [Login Credentials](#login-scenarios) 

Open third terminal window 
- Follow setup instructions for installing the selenium standalone server along with starting the server at https://github.com/angular/protractor?source=c#appendix-a-setting-up-a-standalone-selenium-server

Open fourth terminal (for running the tests)
- run the command './node_modules/protractor/bin/protractor protractorConf.js'. 
Note: This will run through several E2E tests including the scenario described below

## Login Scenarios
- Logging in with credentials "test@runner.com/12345678" should take you to the logged in page.  Any other credentials will result in error
- Registering in with credentials "test@runner.com/12345678" should result in error.  Any other credentials will result in being taken to the logged in page

