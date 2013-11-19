'use strict';

angular.module('protractorSampleApp', [
  'ui.router',
  'ngResource',
  'ngCookies',
  'myLoginApp',
  ])
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state('home', {
        url: "/",
        templateUrl: "views/main.html",
        controller: 'MainCtrl'
      })

  }])
   .run(['$rootScope', '$location', '$q', '$timeout', 'loginService', 
              function ($rootScope, $location, $q, $timeout, loginService) {
    
    var IsLoggedIn = loginService.IsLoggedIn("MY_SESSION", 25);
    if (!IsLoggedIn) {
      window.location.href = "/auth.html#/login";
    }
   
  }])
