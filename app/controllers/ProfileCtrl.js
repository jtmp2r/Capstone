app.controller("ProfileCtrl", function($scope, $location, FirebaseFactory, MangaFactory){


	$scope.deleteArrayItem = function(mangaID) {
	    FirebaseFactory.deleteArrayItem(mangaID);
	    $scope.myMangaArray = FirebaseFactory.toMyListArray;
	  };

})