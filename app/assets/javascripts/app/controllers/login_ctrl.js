window.LoginCtrl = ['$scope', '$http', '$location', 'UserService', function($scope, $http, $location, UserService) {
  $scope.login = function() {
		$scope.loginProcess = true;
		UserService.Login($scope.user.email, $scope.user.password, function (response) {
			if (response.success) {
      	UserService.SetCredentials(response.access_token);
      	// UserService.SetUserRole(response.access_token);
      	$scope.loginProcess = false;
      	$location.path('/info');
			}else{
				$scope.loginProcess = false;
				alert(response.error)
			}
		})
  }
}];
