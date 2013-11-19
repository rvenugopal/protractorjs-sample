protractorjs-sample
===================

Sample repository which shows E2E tests using protractor. Flows include login/registration/logout/forgot_password


## Setup
- run 'npm install' to install all dependencies from root directory (this is for the web application)
- run 'bower install'

On first terminal window
- run 'grunt server'  (server is running at port 9000)

Open second terminal window
- cd to express-rest-api directory (this is for the api)
- run 'npm install'
- run 'node server.js'  (server will be running at port 3001.  grunt-connect-proxy has been configured so that API requests are forwarded to the API application)

Open third terminal window 
- Follow setup instructions for installing the selenium standalone server along with starting at https://github.com/angular/protractor?source=c#appendix-a-setting-up-a-standalone-selenium-server

Open fourth terminal (for running the tests)
run the command './node_modules/protractor/bin/protractor protractorConf.js'
