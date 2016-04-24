'use strict';

 angular.module('app')
    .factory('UserService', function ($rootScope,$http,config,$cookieStore,$location) {
        
        
        
        
        var service = {};

        service.Login = Login;
        service.SetCredentials = SetCredentials;
        service.ClearCredentials = ClearCredentials;
        service.SetUserRole = SetUserRole;

        function Login(username, password, callback) {
            
            /* Use this for real authentication
             ----------------------------------------------*/
            $http.post(config + '/sessions', { login: username, password: password })
                .success(function (response) {
                    callback(response);
                })
                .error(function (response){
                    callback(response);
                });

        }

        function SetCredentials(access_token) {
            $rootScope.globals = {currentUser:{access_token:access_token}};
        }
        function SetUserRole(access_token) {
            $http.get(config+"/get_user?access_token="+access_token)
                .success(function(data) {
                    $rootScope.globals.currentUser = { access_token:access_token,role_id:data.user.role.id} ;
                    $cookieStore.put('globals',$rootScope.globals);
                    $rootScope.userRole = $rootScope.globals.currentUser.role_id;
                });
        }
       

        function ClearCredentials() {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
            //$http.defaults.headers.common.Authorization = 'Basic';
        }
        
});
