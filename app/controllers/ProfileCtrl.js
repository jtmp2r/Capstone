app.controller("myMovieCtrl", function($scope, $location, FirebaseFactory){


	$scope.DeleteMyMovieArrayItem = function(imdbID) {
	    FirebaseFactory.deleteArrayItem(imdbID);
	    $scope.myMangaArray = FirebaseFactory.toWatchListArray;
	  };

})