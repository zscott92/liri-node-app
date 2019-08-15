require("dotenv").config();


var keys = require("./keys.js");

const axios = require("axios");

var inputCriteria = process.argv[3];

if (process.argv[2] == "concert-this") {
  var bandsInTown = "https://rest.bandsintown.com/artists/" + inputCriteria + "/events?app_id=codingbootcamp&date=all";
  axios.get(bandsInTown).then(
    function (response) {
      console.log(JSON.stringify(response.data[1].venue.name));
      console.log(JSON.stringify(response.data[1].venue.city) + ", " + response.data[1].venue.region);
      console.log(JSON.stringify(response.data[0].datetime));
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
}
else if (process.argv[2] == "spotify-this-song" || process.argv[2] == "do-what-it-says") {
  var Spotify = require('node-spotify-api');
  var spotify = new Spotify(keys.spotify);

  if (process.argv[2] == "do-what-it-says") {
    const fs = require("fs");
    fs.readFile("movies.txt", "utf8", function (inputCriteria) {
      console.log(spot(inputCriteria));
    });
  }
  
  spotify.request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
        .then(function spot(inputCriteria) {
          console.log(inputCriteria);
        })
        .catch(function (err) {
          console.error('Error occurred: ' + err);
        });
  }

else if (process.argv[2] == "movie-this") {
  // Grab the movieName which will always be the third node argument.

  // Then run a request with axios to the OMDB API with the movie specified
  var queryUrl = "http://www.omdbapi.com/?t=" + inputCriteria + "&y=&plot=short&apikey=trilogy";

  // This line is just to help us debug against the actual URL.
  console.log(queryUrl);

  axios.get(queryUrl).then(
    function (response) {
      console.log("Title: " + JSON.stringify(response.data.Title));
      console.log("Release Year: " + JSON.stringify(response.data.Year));
      console.log("IMDB Rating: " + JSON.stringify(response.data.imdbRating));
      console.log("Rotten Tomatoes: " + JSON.stringify(response.data.Ratings[1].Value));
      console.log("Country of origin: " + JSON.stringify(response.data.Country));
      console.log("Language: " + JSON.stringify(response.data.Language));
      console.log("Plot: " + JSON.stringify(response.data.Plot));
      console.log("Actors: " + JSON.stringify(response.data.Actors));
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
}
else {
    console.log("Please enter valid command");
  }

