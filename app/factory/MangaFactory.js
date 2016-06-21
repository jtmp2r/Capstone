"use strict";

app.factory("MangaFactory", function($q, $http){

  return {
    //Function to grab data from (json) Manga API
    getMangaFromApi : function(searchTerm){

      let manga = [];

      return $q(function(resolve, reject){
        $http.get(`https://www.mangaeden.com/api/list/0/${searchTerm}&y=&type=&r=json`)
          .success(function(mangaJson){
            let mangaObject = [];
            moviesObject = mangaJson.Search;
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