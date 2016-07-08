"use strict";

app.factory("FirebaseFactory", function($q, $http, AuthFactory, firebaseURL){

  return {

    toListArray:[],
    myMangaArray:[],


    getMangaFromFirebase : function() {
      let user = AuthFactory.getUser();
      return $q( (resolve, reject) => {
        $http.get(`${firebaseURL}?orderBy="uid"&equalTo="${user.uid}"`)
          .success( (returnObject) => {
          Object.keys(returnObject).forEach((key) => {
              returnObject[key].id = key;
              this.updateMangaList(returnObject[key]);
          });
            resolve(returnObject);
        })
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
          console.log("string", manga)
          $http.post(`${firebaseURL}/manga.json`,
              JSON.stringify({
                  title: manga.title,
                  description: manga.description,
                  mangaID: manga.mangaID,
                  uid: user.uid
              }))
          .success(function(response){
              resolve(response);
          });
      });
    },

    clearMangaList: function (){
      this.toListArray.splice(0);
    },

    updateMangaList: function (manga){
        this.toListArray.push(manga);
      },


    updateList: function (manga){
      this.myMangaArray.push(manga);
      console.log("Stuff", this.myMangaArray);
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






