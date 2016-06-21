app.controller("SearchCtrl", function($scope, $location, OMDBFactory, FirebaseFactory, NavFactory){



  $scope.mangaArray = [];

  $scope.searchBooks = function(searchTerm){
      
      MangaFactory.getMangaFromApi(searchTerm).then(function(mangaObject){
      $scope.mangaArray = mangaObject;
    });
  };


  $scope.deleteArrayItem = function(mangaID) {
      for (var i = 0; i < $scope.mangaArray.length; i++) {
        for (var key in $scope.mangaArray[i] ) {
          if ($scope.mangaArray[i][key] === imdbID) {
            
            FirebaseFactory.postMangaIntoFirebase($scope.mangaArray[i]);
            $scope.mangaArray.splice(i, 1);
            break;
          }
        }
      }
    };

});