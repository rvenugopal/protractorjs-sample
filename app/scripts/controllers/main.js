'use strict';

angular.module('protractorSampleApp')
  .controller('MainCtrl', function ($scope) {
    
  })
   .controller('LogoutCtrl', ['$scope', '$http',
                   function($scope, $http) {
    $scope.logoutUrl = "/api/auth/logout";
    $scope.logout = function() {
    var postData = {};
        


	$http.post($scope.logoutUrl, postData)
		.success(function(data){
        	window.location.replace("/auth.html#login");
      	}).error(function(data, errorCode){
          	console.log(data);
      	});
   	}    
  }])
;
