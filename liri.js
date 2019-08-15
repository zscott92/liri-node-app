require("dotenv").config();


var keys = require("./keys.js");

const axios = require("axios");


const fs = require("fs");

var command = process.argv[2];
var inputCriteria = process.argv[3];

function spot(command, inputCriteria) {
  if (command == "spotify-this-song") {
    var Spotify = require('node-spotify-api');
    var spotify = new Spotify(keys.spotify);

    spotify.search({ type: 'track', query: inputCriteria }, function (err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
 
      console.log(data.tracks.items[0].artists[0].name);
      console.log(JSON.stringify(data.tracks.items[1].name));
      console.log(data.tracks.items[0].external_urls.spotify);
      console.log(data.tracks.items[1].album.name);
    });
  }
}

if (command == "do-what-it-says") {
  fs.readFile("random.txt", "utf8", function (error, data) {
    if (error) {
      return console.log(error);
    }
    var dataArr = data.split(",");
  
    command = dataArr[0].trim();
    inputCriteria = dataArr[1].trim();
    spot(command, inputCriteria);
  });
}
else if (command == "spotify-this-song") {
  spot(command, inputCriteria);
}
else if (command == "concert-this") {
  var bandsInTown = "https://rest.bandsintown.com/artists/" + inputCriteria + "/events?app_id=codingbootcamp&date=all";;
  axios.get(bandsInTown).then(
    function (response) {
      console.log(response.data[0].venue.name);
      console.log(response.data[0].venue.city + ", " + response.data[0].venue.region + ". " + response.data[0].venue.country);
      console.log(JSON.stringify(response.data[0].datetime));
    })

      .catch(function (error) {
        if (error.response) {

          console.log("---------------Data---------------");
          console.log(error.response.data);
          console.log("---------------Status---------------");
          console.log(error.response.status);
          console.log("---------------Status---------------");
          console.log(error.response.headers);
        } else if (error.request) {

          console.log(error.request);
        } else {

          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  }

  else if (command == "movie-this") {

    var queryUrl = "http://www.omdbapi.com/?t=" + inputCriteria + "&y=&plot=short&apikey=trilogy";

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

          console.log("---------------Data---------------");
          console.log(error.response.data);
          console.log("---------------Status---------------");
          console.log(error.response.status);
          console.log("---------------Status---------------");
          console.log(error.response.headers);
        } else if (error.request) {

          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  }
  else {
    console.log("Please enter valid command");
  }


