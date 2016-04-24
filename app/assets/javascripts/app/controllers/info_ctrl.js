window.InfoCtrl = ['$scope','Info', function($scope, Info) {
  $scope.message = "Welcome";
  $scope.info = Info.get();
}];