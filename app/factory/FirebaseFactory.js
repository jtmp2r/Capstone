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
          Object.keys(returnObject.data).forEach((key) => {
            if (returnObject.data[key].userRating === "nothing") {
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
      return $q(function(resolve, reject){
          $http.put(`${firebaseURL}manga/${manga.id}.json`, manga)
          .success(function(response){
              resolve(response);
          });
      });
    },

    postManga: function (manga) {
      let user = AuthFactory.getUser();
      return $q(function(resolve, reject){
          $http.post(`${firebaseURL}/manga.json`,
              JSON.stringify({
                  Title: manga.Title,
                  Author: manga.Author,
                  mangaID: manga.id,
                  Genre: manga.Genre,
                  Poster: manga.Poster,
                  userRating: "nothing",
                  uid:  user.uid
              }))
          .success(function(response){
              resolve(response);
          });
      });
    },

    deleteArrayItem: function(sentID) {
      return $q((resolve,reject) => {
          $http.delete(`${firebaseURL}/manga/${sentID}.json`)
          .success((response)=> {
              resolve(response);
          });
      }).then( () => {
        for (var i = 0; i < this.toMyListArray.length; i++) {
          for (var key in this.toMyListArray[i] ) {
            if (this.toMyListArray[i][key] === sentID) {
              this.toMyListArray.splice(i, 1);
              break;
            }
          }
        }
      })
    }
  }
});
