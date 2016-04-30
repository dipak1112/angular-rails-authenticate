'use strict';
  angular.module('app')
    .factory('UserService', function ($rootScope,$http,config,$cookieStore,$location) {        
      var service               = {};
      service.Login             = Login;
      service.Logout            = Logout;
      service.Signup            = Signup;
      service.SetCredentials    = SetCredentials;
      service.ClearCredentials  = ClearCredentials;
      service.isAuthenticated   = isAuthenticated;

      return service;

      function Login(username, password, callback) {
        $http.post(config + '/sessions', { login: username, password: password })
        .success(function (response) {
          callback(response);
        })
        .error(function (response){
          callback(response);
        });
      };

      function Logout(access_token, callback){
        $http.delete(config + '/logout/' + access_token)
        .success(function(response){
          ClearCredentials()
          callback(response)
        }).error(function(response){          

        });
      };

      function Signup(user, callback){
        $http.post(config + '/registrations', {user})
        .success(function(response){
          console.log(response)
          callback(response);
        })
        .error(function(response){
          callback(response);
        });
      };

      function SetCredentials(access_token) {
        $http.get(config+"/current_user?access_token="+access_token)
        .success(function(response) {
          $rootScope.globals.currentUser = response;
          $cookieStore.put('globals',$rootScope.globals);
        });
      }
     
      function ClearCredentials() {
        $rootScope.globals = {};
        $cookieStore.remove('globals');
      }

      function isAuthenticated() {
        return !!$rootScope.globals.currentUser
      }
    });
