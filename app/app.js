"use strict";

var app = angular.module("MangaApp", ["ngRoute"])


app.config(function($routeProvider) {
  $routeProvider.
    when("/", {
      templateUrl: "partials/welcome-page.html",
      controller: "SearchCtrl.js"
    }).
    when("/", {
      templateUrl: "",
      controller: ""
    }).
});