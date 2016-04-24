  var app;
  app = angular.module('app', ['ui.bootstrap','security','app.services', 'app.controllers','app.filters','app.directives', 'ngCookies']);
  
  app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
      $locationProvider.html5Mode(true);
      $routeProvider.

      when('/info', {
          controller: 'InfoCtrl',
          templateUrl: ASSETS['info']
      }).
      when('/info2', {
          controller: 'InfoCtrl',
          templateUrl: ASSETS['info']
      }).
      when('/sites', {
          controller: 'SiteIndexCtrl',
          templateUrl: ASSETS['sites_index']
      }).
      when('/sites/new', {
          controller: 'SiteCreateCtrl',
          templateUrl: ASSETS['sites_form']
      }).
      when('/sites/edit/:editId', {
          controller: 'SiteEditCtrl',
          templateUrl: ASSETS['sites_form']
      }).
      when('/signup', {
          controller: 'SignUpCtrl',
          templateUrl: ASSETS['signup']
      }).
      otherwise({
          redirectTo:'/info'
      });
  }]);

  angular.module('app').run(['$rootScope', '$location', 'UserService', '$cookieStore', '$http', function($rootScope, $location, UserService, $cookieStore, $http) {
  // Get the current user when the application starts
  // (in case they are still logged in from a previous session)
  // security.requestCurrentUser();
   // redirectTo: '/info'
    $rootScope.globals = $cookieStore.get('globals') || {};
    if ($rootScope.globals.currentUser) {
      $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; 
    }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/signup']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/signup');
            }
        });


  }]);


  app.config(function($httpProvider) {
  $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]')
      .attr('content');

  var interceptor = ['$rootScope', '$q', function(scope, $q) {

      function success( response ) {
          return response
      };

      function error( response ) {
          if ( response.status == 401) {
              var deferred = $q.defer();
              scope.$broadcast('event:unauthorized');
              return deferred.promise;
          };
          return $q.reject( response );
      };

      return function( promise ) {
          return promise.then( success, error );
      };

  }];
  $httpProvider.responseInterceptors.push( interceptor );
  });

