"use strict";
app.factory("MangaFactory", function($q, $http, md5){
  var privateKey = "39f16f13c04cd98c6b6824121336b2c1d1b1e3e6";
  var publicKey = "b7b4da68d37a57d0f23ade928ee7b28c";

  return {
    //Function to grab data from (json) Manga API
    getMangaApi: function(searchTerm){
      let ts = new Date().getTime();
      console.log("search", searchTerm)
      let hash = md5.createHash(ts + privateKey + publicKey);
      console.log('hash', hash, "apikey", publicKey);
      let url = `http://gateway.marvel.com:80/v1/public/comics?title=${searchTerm}`;

      let manga = [];
      return $q(function(resolve, reject){
        url += "&limit="+15+"&apikey="+publicKey+"&ts="+ts+"&hash="+hash;
        console.log("url", url)
        $http.get(url)
          .success(function(mangaJson){
            console.log("manga", mangaJson.data.results)
            let mangaObject = [];
            mangaObject = mangaJson.data.results;
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