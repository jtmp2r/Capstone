app.controller("SearchCtrl", function($scope, $location, MangaFactory, FirebaseFactory){
  $scope.mangaArray = [];

  $scope.searchBooks = function(searchTerm){
      MangaFactory.getMangaApi(searchTerm).then(function(mangaObject){
      $scope.mangaArray = mangaObject;
    });
  };


  $scope.sendMangaItem = function(id) {
      for (var i = 0; i < $scope.mangaArray.length; i++) {
        for (var key in $scope.mangaArray[i] ) {
          if ($scope.mangaArray[i][key] === $scope.mangaArray[i].id) {
            console.log("key", $scope.mangaArray[i][key])
            FirebaseFactory.putManga($scope.mangaArray[i]);
            $scope.mangaArray.splice(i, 1);
            break;
          }
        }
      }
    };

});