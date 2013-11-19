'use strict';

angular.module('myLoginApp', [
  'ui.router',
  'ngResource',
  ])
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise("/login");

     $stateProvider
      .state('business-login', {
        url: "/login",
        templateUrl: "views/account/partials/login.html"
      })
      .state('business-registration', {
        url: "/register",
        templateUrl: "views/account/partials/register.html"
      })
      .state('business-forgotpassword', {
        url: "/forgotpassword",
        templateUrl: "views/account/partials/forgot.html"
      })
      
      
  }])
  .controller('LogoutCtrl', ['$scope', '$http',
                   function($scope, $http) {
      $scope.logoutUrl = "/api/v1/business/authservice/logout";
      $scope.logout = function() {
        var postData = {};

        $http.post($scope.logoutUrl, postData)
          .success(function(data){
             window.location.replace("/auth.html#login");
          }).error(function(data, errorCode){
            // $scope.errorCode = errorCode;
            // $scope.errorMessage = data[0].Message;
            // $scope.login_form.$setPristine();
          });
        
      } 
  }])
  .controller('LoginCtrl', ['$scope', '$http', '$location',
                   function($scope, $http, $location) {
       $scope.formSubmitted = false;
       $scope.loginUrl = "/api/auth/login";
       $scope.errorCode = '';

       $scope.loginForm = function() {
        function clearErrorCodes() {
          $scope.errorCode = '';
          $scope.errorMessage = '';            
        }
       
        clearErrorCodes();
        if ($scope.login_form.$valid) {
          //form is valid
           var postData = {
             "email" : $scope.login.email,
             "password": $scope.login.password
            };

            $http.post($scope.loginUrl, postData)
              .success(function(data){
                 window.location.replace("/");
              }).error(function(data, errorCode){
                  $scope.errorCode = errorCode;
                  $scope.errorMessage = data.message;
                  $scope.login_form.$setPristine();
              });
               
        } else {
          $scope.login_form.formSubmitted = true;
        }

       }
  }])
  .controller('UserRegisterCtrl', ['$scope', '$http', function($scope, $http) {
       $scope.formSubmitted = false;
       $scope.registerUrl = "/api/auth/register";
       //ErrorHandling
       $scope.errorCode = '';

       $scope.submitForm = function() {
        
        function clearErrorCodes() {
          $scope.errorCode = '';
          $scope.errorMessage = '';            
        }

        clearErrorCodes()
        $scope.register_form.formSubmitted = true;
        if ($scope.register_form.$valid) {
          var postData = {
             "email" : $scope.register.email,
             "password": $scope.register.password,
             "password_confirmation": $scope.register.password_confirmation
          };

          $http.post($scope.registerUrl, postData)
              .success(function(data){
                 window.location.replace("/");
              }).error(function(data, errorCode){
                  $scope.errorCode = errorCode;
                  $scope.errorMessage = data.message;
                  $scope.register_form.$setPristine();
              });

        } else {
          $scope.register_form.formSubmitted = true;
        }

       };

  }])
  .controller('ForgotPasswordCtrl', ['$scope', '$http', function($scope, $http) {
       $scope.formSubmitted = false;
       $scope.forgotPwdUrl = "/api/auth/forgot_password";
       
       //ErrorHandling
       $scope.errorCode = '';

       $scope.submitForm = function() {
        
        function clearErrorCodes() {
          $scope.errorCode = '';
          $scope.errorMessage = '';            
        }

        clearErrorCodes();
        if ($scope.forgotPwd_form.$valid) {
          var postData = {
             "email" : $scope.forgotPwd.email
          };
          $http.post($scope.forgotPwdUrl, postData)
              .success(function(data){
                //Todo something here
              }).error(function(data, errorCode){
                  $scope.errorCode = errorCode;
                  $scope.errorMessage = data.message;
                  $scope.forgotPwd_form.$setPristine();
              });
          

        } else {
          $scope.forgotPwd_form.formSubmitted = true;
        }

       }
  }])
  .directive('ngFocus', [function() {
  var FOCUS_CLASS = "ng-focused";
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attrs, ctrl) {
      ctrl.$focused = false;
      element.bind('focus', function(evt) {
        element.addClass(FOCUS_CLASS);
        scope.$apply(function() {ctrl.$focused = true;});
      }).bind('blur', function(evt) {
        element.removeClass(FOCUS_CLASS);
        scope.$apply(function() {ctrl.$focused = false;});
      });
    }
  }
}])
  //From http://stackoverflow.com/questions/17475595/how-can-i-make-a-directive-in-angularjs-to-validate-email-or-password-confirmati/17475596#17475596
  .directive('match', function($parse) {
  return {
    require: 'ngModel',
    link: function(scope, elem, attrs, ctrl) {
      scope.$watch(function() {        
        return $parse(attrs.match)(scope) === ctrl.$modelValue;
      }, function(currentValue) {
        ctrl.$setValidity('mismatch', currentValue);
      });
    }
  };
})
.factory('loginService', ['$cookies', function ($cookies) {
  return {
  IsLoggedIn: function(cookieKey, reqLength, delimiter, minSubCookies, subStringArr, minSubStrLen) {
    var isLoggedIn = false;
    console.log($cookies)

    if ($cookies[cookieKey] == undefined) return false;
    var cookieVal = $cookies[cookieKey];
    if (cookieVal.length < reqLength) return false;
    
    // var isAllSubCookiesPresentCheck = _.every(subStringArr, function(val){
    //   return cookieVal.indexOf(val) > 0;
    // });

    // if (!isAllSubCookiesPresentCheck) return false;

    // var vArr = _.filter(cookieVal.split("\x00"), function(val) { // Server side delimiter for kvp
    //   return (val != undefined) && (val.length > 3) && (val.indexOf(":") > 1); // ": is internal delimiter between key and value"
    // });

    // if (vArr == undefined || vArr.length == 0) return false;
    // var isMinValLengthMet = _.every(vArr, function(val){
    //   var arr = val.split(":");
    //   if (arr.length <= 1) return false;
    //   return arr[1].length > minSubStrLen;
    // });

    // return isMinValLengthMet;    

    return true;      
   }
 }
}]);
  

