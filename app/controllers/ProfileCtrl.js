app.controller("ProfileCtrl", function($scope, $location, FirebaseFactory, MangaFactory){
  $scope.mangaArray = [];

  function mangaList(){
    $scope.mangaArray = FirebaseFactory.toListArray;
    console.log("My shit", $scope.mangaArray );
  }


  $scope.deleteArrayItem = function(id) {
    FirebaseFactory.deleteToWatchListArrayItem(id);
    $scope.mangaArray = FirebaseFactory.toListArray;
  };


})


