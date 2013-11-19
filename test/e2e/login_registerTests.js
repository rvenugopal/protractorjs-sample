var util = require('util');
var protractor = require('protractor');
//require('protractor/jasminewd');

describe('Login-Registration-Forgot Password workflow', function() {
  var ptor = protractor.getInstance();
  var timeoutVal = 10000;
  var redirectSleepTime = 500;

  beforeEach(function () {
      ptor.manage().deleteAllCookies();
  });

  
  describe('Login Page ->', function() {

   beforeEach(function () {
        ptor.get('/auth.html#/login');
        ptor.manage().deleteAllCookies();
      });

    
    it('Initial state should be all empty', function() {
      expect(ptor.getCurrentUrl()).toContain("login");

      ptor.findElement(protractor.By.input("login.email")).getText().then(function(text) {
          expect(text).toEqual('');
        });
      ptor.findElement(protractor.By.model("login.email")).getText().then(function(text) {
          expect(text).toEqual('');
        });
      ptor.findElement(protractor.By.input("login.password")).getText().then(function(text) {
          expect(text).toEqual('');
        });

      ptor.findElement(protractor.By.name("loginBtn")).isEnabled().then(function(value){
        expect(value).toBe(false);
      });

      ptor.findElement(protractor.By.name("loginFormErrors")).isDisplayed().then(function(value){
        expect(value).toBe(false);
      });

      ptor.findElements(protractor.By.className("error")).then(function(errorDivs){
        expect(errorDivs.length).toBe(3);  
        for(var counter = 0; counter < errorDivs.length; counter++) {
          expect(errorDivs[counter].isDisplayed()).toBe(false);
        }
      });
            
    }, timeoutVal);

  
    it('Should be able to goto forgot password page', function() {
      expect(ptor.getCurrentUrl()).toNotContain("forgotpassword");
      ptor.findElement(protractor.By.linkText("I forgot my password")).click();
      expect(ptor.getCurrentUrl()).toContain("forgotpassword");

    }, timeoutVal);
  
    it('Should be able to goto register page', function() {
      expect(ptor.getCurrentUrl()).toNotContain("register");

      ptor.findElement(protractor.By.linkText("I want to register")).click();
      expect(ptor.getCurrentUrl()).toContain("register");

    }, timeoutVal);

    it('Ensure Login button gets enabled with valid email/pwd.', function() {
     
      ptor.findElement(protractor.By.name("loginBtn")).isEnabled().then(function(value){
        expect(value).toBe(false);
      });

      ptor.findElement(protractor.By.model("login.email")).sendKeys('abc@def.com'); //Valid email format
      ptor.findElement(protractor.By.model("login.password")).sendKeys('12345678'); //Valid email format
      

      ptor.findElement(protractor.By.name("loginFormErrors")).isDisplayed().then(function(value){ //Only for server side errors
        expect(value).toBe(false);
      });

      ptor.findElement(protractor.By.name("loginBtn")).isEnabled().then(function(value){
        expect(value).toBe(true);
      });
 
    }, timeoutVal);

    it('Ensure appropriate error message shows up when invalid input is sent to server', function() {
      ptor.findElement(protractor.By.model("login.email")).sendKeys('abc@def.com'); //Valid email format
      ptor.findElement(protractor.By.model("login.password")).sendKeys('12345678'); //Valid email format
      ptor.findElement(protractor.By.name("loginBtn")).isEnabled().then(function(value){
        expect(value).toBe(true);
      });

      
      ///Now click button and verify state afterwards
      ptor.findElement(protractor.By.name("loginBtn")).click(); ///Action


      ptor.findElement(protractor.By.name("loginFormErrors")).isDisplayed().then(function(value){ //Only for server side errors
        expect(value).toBe(true);
      });
      ptor.findElement(protractor.By.name("loginFormErrors")).getText().then(function(text) {
          expect(text).toContain('No such email/password exists in our system');
        });
      
       
    }, timeoutVal);
    
    describe('Should be able to successfully login and goto home page after login ->', function(){
      var driver = ptor.driver;
      beforeEach(function () {
        ptor.findElement(protractor.By.model("login.email")).sendKeys('test@runner.com'); //Valid email format
        ptor.findElement(protractor.By.model("login.password")).sendKeys('12345678'); //Valid email format

        ///Now click button and verify state afterwards
        ptor.findElement(protractor.By.name("loginBtn")).click(); ///Action
        
      });
      
      it('Ensure that user is sent logged in when appropriate credentials are passed', function() {
          ptor.sleep(redirectSleepTime); ///Only necessary for chrome
          expect(ptor.getCurrentUrl()).toBe(ptor.baseUrl + '/');

          validateSessionCookie();
          validateLogoutSequence();
          

      }, timeoutVal);

    });  


  }); // End of Login Page describe



  describe('Registration Page ->', function() {

   beforeEach(function () {
        ptor.get('/auth.html#/register');
      });


   it('Should be able to have proper initial state', function() {
        expect(ptor.getCurrentUrl()).toContain("register");
        expect(ptor.getCurrentUrl()).toNotContain("login");

        ptor.findElement(protractor.By.linkText("Back to login")).click();
        expect(ptor.getCurrentUrl()).toContain("login");

    }, timeoutVal);


   it('Ensure Register button gets enabled with valid email/pwd and password confirmation', function() {
     
      ptor.findElement(protractor.By.css('button[type="submit"]')).isEnabled().then(function(value){
        expect(value).toBe(false);
      });

      ptor.findElement(protractor.By.model("register.email")).sendKeys('test@testrunner.com'); //Valid email format
      ptor.findElement(protractor.By.css('button[type="submit"]')).isEnabled().then(function(value){ // other fields not valid
        expect(value).toBe(false);
      });
  
      ptor.findElement(protractor.By.model("register.password")).sendKeys('12345678'); //Valid email format
      ptor.findElement(protractor.By.css('button[type="submit"]')).isEnabled().then(function(value){ // other fields not valid
        expect(value).toBe(false);
      });
      ptor.findElement(protractor.By.model("register.password_confirmation")).sendKeys('12345678'); //Same email
      ptor.findElement(protractor.By.css('button[type="submit"]')).isEnabled().then(function(value){ // other fields not valid
        expect(value).toBe(true);
      });
 
    }, timeoutVal);


    it('Ensure that appropriate error shows up for email which is already registered', function() {
     

      ptor.findElement(protractor.By.css('button[type="submit"]')).isEnabled().then(function(value){
        expect(value).toBe(false);
      });

      ptor.findElement(protractor.By.model("register.email")).sendKeys('test@runner.com'); //Valid email format
      ptor.findElement(protractor.By.css('button[type="submit"]')).isEnabled().then(function(value){ // other fields not valid
        expect(value).toBe(false);
      });
  
      ptor.findElement(protractor.By.model("register.password")).sendKeys('12345678'); //Valid email format
      ptor.findElement(protractor.By.css('button[type="submit"]')).isEnabled().then(function(value){ // other fields not valid
        expect(value).toBe(false);
      });
      ptor.findElement(protractor.By.model("register.password_confirmation")).sendKeys('12345678'); //Same email
      ptor.findElement(protractor.By.css('button[type="submit"]')).isEnabled().then(function(value){ // other fields not valid
        expect(value).toBe(true);
      });

      ///Now verify that we are not in an error state
      ptor.findElement(protractor.By.name("registerFormErrors")).isDisplayed().then(function(value){ //Only for server side errors
        expect(value).toBe(false);
      });
      ptor.findElement(protractor.By.css('button[type="submit"]')).click(); //Action

      ptor.findElement(protractor.By.name("registerFormErrors")).isDisplayed().then(function(value){ //Only for server side errors
        expect(value).toBe(true);
      });
      ptor.findElement(protractor.By.name("registerFormErrors")).getText().then(function(text) {
          expect(text).toContain('User exists. Please click forgot password');
        });

    }, timeoutVal);


    describe('Should be able to successfully register and goto home page after login ->', function(){
      var driver = ptor.driver;
      beforeEach(function () {
        var timeHack = new Date();
        var regEmail = 'test__' + timeHack.valueOf().toString() + '@runner.com';
        //console.log(regEmail);
        ptor.findElement(protractor.By.model("register.email")).sendKeys(regEmail); //Valid email format
        ptor.findElement(protractor.By.model("register.password")).sendKeys('12345678'); //Valid email format
        ptor.findElement(protractor.By.model("register.password_confirmation")).sendKeys('12345678'); //Valid email format

        ///Now click button and verify state afterwards
        ptor.findElement(protractor.By.css('button[type="submit"]')).click(); //Action
        
      });
      
      it('Ensure that user is sent logged in when appropriate credentials are passed', function() {
          ptor.sleep(redirectSleepTime); ///Only necessary for chrome
          expect(ptor.getCurrentUrl()).toBe(ptor.baseUrl + '/');

          validateSessionCookie();
          validateLogoutSequence();

      }, timeoutVal);

    });  



  }); // End of Register Page describe


  describe('Forgot Password Page ->', function() {

   beforeEach(function () {
        ptor.get('/auth.html#/forgotpassword');
      });

   it('Initial state should be all empty', function() {
     
      ptor.findElement(protractor.By.model("forgotPwd.email")).getText().then(function(text) {
          expect(text).toEqual('');
        });
      
      ptor.findElement(protractor.By.name("forgotPwdBtn")).isEnabled().then(function(value){
        expect(value).toBe(false);
      });

      ptor.findElement(protractor.By.name("forgotPwdFormErrors")).isDisplayed().then(function(value){
        expect(value).toBe(false);
      });

      ptor.findElements(protractor.By.className("error")).then(function(errorDivs){
        expect(errorDivs.length).toBe(2);  
        for(var counter = 0; counter < errorDivs.length; counter++) {
          expect(errorDivs[counter].isDisplayed()).toBe(false);
        }
      });
            
    }, timeoutVal);


   it('Should be able to have proper initial state', function() {
        expect(ptor.getCurrentUrl()).toContain("forgotpassword");
        expect(ptor.getCurrentUrl()).toNotContain("login");
        expect(ptor.getCurrentUrl()).toNotContain("register");

        ptor.findElement(protractor.By.linkText("Back to login")).click();
        expect(ptor.getCurrentUrl()).toContain("login");

    }, timeoutVal);


   it('Ensure Send button gets enabled with valid email', function() {
     
      ptor.findElement(protractor.By.name("forgotPwdBtn")).isEnabled().then(function(value){
        expect(value).toBe(false);
      });

      ptor.findElement(protractor.By.model("forgotPwd.email")).sendKeys('abc@def.com'); //Valid email format
      
      ptor.findElement(protractor.By.name("forgotPwdFormErrors")).isDisplayed().then(function(value){ //Only for server side errors
        expect(value).toBe(false);
      });

      ptor.findElements(protractor.By.className("error")).then(function(errorDivs){
        for(var counter = 0; counter < errorDivs.length; counter++) {
          expect(errorDivs[counter].isDisplayed()).toBe(false);
        }
      });

      //After addinv valid email
      ptor.findElement(protractor.By.name("forgotPwdBtn")).isEnabled().then(function(value){
        expect(value).toBe(true); // Button is now enabled
      });
      ptor.findElement(protractor.By.name("forgotPwdBtn")).click();
      ptor.findElement(protractor.By.name("forgotPwdFormErrors")).isDisplayed().then(function(value){ //Only for server side errors
        expect(value).toBe(true);
      });

      ptor.findElement(protractor.By.name("forgotPwdFormErrors")).getText().then(function(text) {
          expect(text).toContain('User not found');
        });
            
    }, timeoutVal);

  }); //End of ForgotPassword describe

  function validateLogoutSequence() {
    ///The logout button is not visible.  So need to click dropdown first
    //ptor.findElement(protractor.By.css("#myAccount > a")).click(); 
    //ptor.findElement(protractor.By.css('#myAccount li[data-ng-controller="LogoutCtrl"] a')).click();
    ptor.findElement(protractor.By.css('input[type="Button"]')).click();
    ptor.sleep(redirectSleepTime); ///Only necessary for chrome
    expect(ptor.getCurrentUrl()).toBe(ptor.baseUrl + '/auth.html#/login');

  }

  function validateSessionCookie() {
     ptor.manage().getCookie('MY_SESSION').then(function(cookie) {
        expect(cookie.value).toContain('SOMETHING_ELSE');
        expect(cookie.value.length).toBeGreaterThan(25);
      });
  }

});



