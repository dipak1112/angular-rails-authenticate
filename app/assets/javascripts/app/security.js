angular.module('security', ['security.service']);
angular.module('security.service', ['ui.bootstrap.dialog'])
  .factory('security', ['$dialog','$location','Session', '$http', function ($dialog, $location,Session, $http) {
    
    function redirect(url) {
      url = url || '/';
      $location.path(url);
    }

    var service = {
      login: function(email, password) {
        var request = $http.post('/api/v1/sessions', {login: email, password: password});
        return request.then(function(response) {
          service.currentUser = response.data.user;
          if ( service.isAuthenticated() ) {
            $location.path('/info');
          }
        });
      },

      logout: function(redirectTo) {
        $http.delete('/api/v1/logout/'+ service.authToken).then(function() {
          service.currentUser = null;
          redirect(redirectTo);
        });
      },
      
      currentUser: null,

      requestCurrentUser: function() {
        if ( service.isAuthenticated() ) {
          return $q.when(service.currentUser);
        } else {
          return $http.get('/api/v1/current_user').then(function(response) {
            service.currentUser = response.data.user;
            service.authToken = response.data.auth_token;
            return service.currentUser, service.authToken;
          });
        }
      },          

      isAuthenticated: function(){
        return !!service.currentUser;
      }
    };

    return service;
  }]
);