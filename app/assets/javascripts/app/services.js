angular.module('app.services', ['app.services']);
(function(){
  var app;
  app = angular.module('app.services',['ngResource']);
  
  app.factory('Info', ['$resource',
    function($resource){
      var resource = $resource('/api/v1/info');
      return resource;
    }]);

    app.factory('SignUp', ['$resource', function($resource){
      var resource =  $resource('/api/v1/registrations');
      return resource;
    }]);

    app.factory('Session', ['$resource', function($resource){
      return $resource('/api/v1/sessions');
    }]);

    app.factory('Site', ['$resource',function($resource){
      var resource = $resource('/api/v1/sites/:id',
        {id: '@id'},
        {
          query: { method: 'GET', isArray:true},
          update: {method: 'PUT'},
          delete: { method: 'DELETE'}
        }
      );
      return resource;
    }]);
  })();
