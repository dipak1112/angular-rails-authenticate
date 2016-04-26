 // angular.module('app')
 //    .controller('SignUpCtrl', function ($scope, config, UserService,$http, $modal, $location, $stateParams) {
 //    	$scope.login = function(){
 //    		alert('hi');
 //    	}

 //    })


 window.SignUpCtrl = ['$scope', '$http', '$location', 'UserService', function($scope, $http, $location, UserService) {
//     console.log("In SignUpCtrl");
//     $scope.message = "hello from me, I'm the angularController SiteCtrl";

     $scope.login = function() {

     	alert('hi');
//         $scope.authError = null;

//         //Attempt Login
//         console.log('----1----' + $scope.email)
//         console.log('----2----' + $scope.user.email)

//         // if($scope.user.email == 'dipak@yopmail.com' && $scope.user.password == 'test1234'){
//         // 	alert('success');
//         // 	$location.path('/info');
//         // }else{
//         // 	alert('failure')
//         // }
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
//         security.login($scope.user.email, $scope.user.password).then(function(loggedIn) {
//             if ( !loggedIn) {
//                 $scope.authError = 'Credentials are not valid';
//             }
//         }, function(x) {
//             // problem with request to server
//             $scope.authError = 'Login Server offline, please try later';
//         });


     }
}];
