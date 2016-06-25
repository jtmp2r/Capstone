"use strict";
app.factory("MangaFactory", function($q, $http){

  return {
    //Function to grab data from (json) Manga API
    getMangaApi: function(){
      let manga = [];
      return $q(function(resolve, reject){
        $http.get(`./data/manga.json`)
          .success(function(mangaJson){
            console.log("manga", mangaJson)
            let mangaObject = mangaJson.Find;
            // mangaObject = mangaJson.Find;
            Object.keys(mangaObject).forEach(function(key){
              manga.push(mangaObject[key]);
            });
            resolve(manga);
          })
          .error(function(error){
            reject(error);
          });
      });
    }



  };
});