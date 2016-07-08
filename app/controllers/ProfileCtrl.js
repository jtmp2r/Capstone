app.controller("ProfileCtrl", function($scope, $location, FirebaseFactory, MangaFactory){
  $scope.mangaArray = [];

  function mangaList(){
  	FirebaseFactory.clearMangaList();
  	FirebaseFactory.getMangaFromFirebase();
    $scope.mangaArray = FirebaseFactory.toListArray;
  }


  $scope.deleteItem = function(id) {
    FirebaseFactory.deleteArrayItem(id);
    $scope.mangaArray = FirebaseFactory.toListArray;
  };

  mangaList();

})


