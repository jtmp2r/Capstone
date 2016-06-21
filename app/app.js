"use strict";

var app = angular.module("MangaApp", ["ngRoute"])
	.constant('firebaseURL', 'https://mangacapstone.firebaseio.com/');

	let isAuth= (AuthFactory) => new Promise ((resolve, reject) =>  {
	  if (AuthFactory.isAuthenticated()){
	    resolve();
	  } else {
	    reject();
	  }
	});

app.config(function($routeProvider) {
  $routeProvider.
  	when("/", {
      templateUrl: "partials/welcome-page.html",
      controller: 
    }).
    when("/manga-list", {
      templateUrl: "partials/welcome-page.html",
      controller: "SearchCtrl"
    }).
    when("/login", {
      templateUrl: "partials/login.html",
      controller: "LoginCtrl"
    }).
    when("/logout", {
      templateUrl: "partials/login.html",
      controller: "LoginCtrl"
    }).
    otherwise('/');


});

	app.run(($location) => {
	let mangaRef = new Firebase('https://mangacapstone.firebaseio.com/')

	mangaRef.onAuth(authData => {
		if(!authData){
			$location.path("/login");
		}
	})
})