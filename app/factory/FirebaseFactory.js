"use strict";

app.factory("FirebaseFactory", function($q, $http, AuthFactory, firebaseURL){

  return {

    toWatchListArray:[],

    getMangaFromFirebase : function() {
      let user = AuthFactory.getUser();

      return $q( (resolve, reject) => {
        $http.get(`${firebaseURL}manga.json?orderBy="uid"&equalTo="${user.uid}"`)
          .success( (returnObject) => {
            resolve(returnObject);
        }).then( (returnObject) => {
          Object.keys(returnObject.data).forEach( (key) => {
            if (returnObject.data[key].userRating === "notRated") {
              returnObject.data[key].id = key;
              this.updateMangaToWatchList(returnObject.data[key]);
            } else {
              returnObject.data[key].id = key;
            }
          });
        });
      });
    },

    putManga: function (manga) {
      return $q(function(resolve,reject){
          $http.put(`${firebaseURL}movies/${manga.id}.json`, manga)
          .success(function(response){
              resolve(response);
          });
      });
    },

    postManga: function (movie) {
      let user = AuthFactory.getUser();
      return $q(function(resolve,reject){
          $http.post(`${firebaseURL}/manga.json`,
              JSON.stringify({
                  Title: manga.t,
                  mangaID: manga.i,
                  Poster: manga.im,
                  uid:  user.uid
              }))
          .success(function(response){
              resolve(response);
          });
      });
    }

    // deleteArrayItem: function(sentID) {
    //   return $q((resolve,reject) => {
    //       $http.delete(`https://ng-bg-mh.firebaseio.com/movies/${sentID}.json`)
    //       .success((response)=>{
    //           resolve(response);
    //       });
    //   }).then( () => {
    //     for (var i = 0; i < this.toWatchListArray.length; i++) {
    //       for (var key in this.toWatchListArray[i] ) {
    //         if (this.toWatchListArray[i][key] === sentID) {
    //           this.toWatchListArray.splice(i, 1);
    //           break;
    //         }
    //       }
    //   }




  }
});
