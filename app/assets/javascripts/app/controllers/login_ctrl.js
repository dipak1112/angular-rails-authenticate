window.LoginCtrl = ['$scope', '$http', '$location', 'UserService', 'config', 'security', function($scope, $http, $location, UserService, config, security) {
  
  // Login
  $scope.login = function() {
		UserService.Login($scope.user.email, $scope.user.password, function (response) {
			if (response.success) {
      	UserService.SetCredentials(response.access_token);
      	$location.path('/info');
			}else{
				alert(response.error)
			}
		})
  };

  // Logout
  $scope.logout = function(){  	
  	UserService.Logout($scope.globals.currentUser.access_token, function(response){
  		if(response.success){
  			$location.path('/login')
  		}else{
  			$location.path('/')
  		}  		
  	})
  };

  // Signup 
  $scope.signup = function(){
  	UserService.Signup($scope.user, function(response){
  		if (response.success){
  			$location.path('/login')
  		}else{
  			$location.path('/')
  		}
  	})
  };

  // Clear Form
  $scope.clearForm = function(){
  	$scope.user = {};
  }
}];
