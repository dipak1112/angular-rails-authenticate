var app;
app = angular.module('app', ['ui.bootstrap','security','app.services', 'app.controllers','app.filters','app.directives', 'ngCookies']);
app.constant('config', 'http://localhost:3000/api/v1')
  
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
    controller: 'LoginCtrl',
    templateUrl: ASSETS['signup']
  }).
  when('/login', {
    controller: 'LoginCtrl',
    templateUrl: ASSETS['login']
  }).
  when('/logout', {
    controller: 'LoginCtrl',    
  }).
  otherwise({
    redirectTo:'/'
  });
}]);

angular.module('app').run(['$rootScope', '$location', 'UserService', '$cookieStore', '$http', 'security', function($rootScope, $location, UserService, $cookieStore, $http, security) {
  
  //security.requestCurrentUser();

  $rootScope.globals = $cookieStore.get('globals') || {};
  
  if ($rootScope.globals.currentUser) {
    $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; 
  }

  $rootScope.$on('$locationChangeStart', function (event, next, current) {

    var restrictedPage = $.inArray($location.path(), ['/info', '/signup', '/login']) === -1;
    var loggedIn = $rootScope.globals.currentUser;
    
    if (restrictedPage && !loggedIn) {
      $location.path('/login');
    }
  });

}]);

app.config(function($httpProvider) {
  $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');

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