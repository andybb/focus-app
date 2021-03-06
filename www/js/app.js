// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('focus.controllers', []);
angular.module('focus.filters', []);
angular.module('focus.services', []);
angular.module('focus.directives', []);

angular.module('focus', ['ionic', 'ngCordova', 'ngDatabase', 'ngIOS9UIWebViewPatch',
  'focus.controllers', 'focus.filters', 'focus.services',
  'focus.directives'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('main', {
      url : '/main',
      templateUrl : 'templates/main.html',
      abstract : true,
      controller: 'MainController'
    })

    .state('main.library', {
      url : '/library',
      views: {
        'mainContent': {
          templateUrl: 'templates/library.html',
          controller: 'LibraryController'
        }
      }
    })

    .state('main.mytraining.addprogram', {
      url: '/add-program',
      views: {
        'mainContent@main': {
          templateUrl: 'templates/add-program.html',
          controller: 'AddProgramController'
        }
      },
      params: {
        'selectedSound': null,
        'selectedCategory': null,
        'addFromLibrary': null
      }
    })

    .state('main.library.chapterinfo', {
      url : '/chapterinfo',
      parent: 'main.library',
      views: {
        'mainContent@main': {
          templateUrl: 'templates/chapter-info.html'
        }
      },
      params: {
        selectedSound: null
      }
    })

    .state('main.mytraining', {
      url : '/mytraining',
      views: {
        'mainContent': {
          templateUrl: 'templates/my-training.html',
          controller: 'MyTrainingController'
        }
      }
    })

    .state('main.mytraining.program', {
      url: '/program',
      cache: false,
      views: {
        'mainContent@main': {
          templateUrl: 'templates/training-program.html',
          controller: 'TrainingProgramController'
        }
      },
      params: {
        'program': null
      }
    })

    .state('main.motivation', {
      url : '/motivation',
      views: {
        'mainContent': {
          templateUrl: 'templates/motivation.html',
          controller: 'MotivationController'
        }
      }
    })

    .state('main.options', {
      url : '/options',
      views: {
        'mainContent': {
          templateUrl: 'templates/options.html'
        }
      }
    })

    .state('main.options.about', {
      url : '/about',
      views: {
        'mainContent@main': {
          templateUrl: 'templates/about.html'
        }
      }
    })

    .state('main.options.olympiatoppen', {
      url : '/olympiatoppen',
      views: {
        'mainContent@main': {
          templateUrl: 'templates/olympiatoppen.html'
        }
      }
    })

    .state('main.options.copyright', {
      url : '/copyright',
      views: {
        'mainContent@main': {
          templateUrl: 'templates/copyright.html'
        }
      }
    })



    $urlRouterProvider.otherwise('/main/mytraining');
})

// preliminary data structure for a program

.config(function(ngdbProvider) {

  var programsRepository = {
    id:        'ID',
    name:      'STRING',
    reminder:  'BOOLEAN',
    times:     'ARRAY',
    played:    'NUMBER',
    duration:  'NUMBER',
    completed: 'BOOLEAN',
    checked:   'OBJECT',
    sound:     'OBJECT'
  };

  ngdbProvider
    .setRepository('newPrograms', programsRepository)
})

.run(function($ionicPlatform, $rootScope) {
  $ionicPlatform.ready(function() {

    moment.locale('nb');
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
