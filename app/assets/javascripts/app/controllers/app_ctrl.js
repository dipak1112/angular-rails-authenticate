window.AppCtrl = ['$rootScope', '$scope','security', 'UserService', function($rootScope, $scope, security, UserService) {
  $scope.isAuthenticated = UserService.isAuthenticated;
	
	$scope.$watch(function() {		
    return $rootScope.globals.currentUser;
  }, function(currentUser) {
    $scope.currentUser = currentUser
  });
}];

