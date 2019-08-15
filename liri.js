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
      let artist = data.tracks.items[0].artists[0].name;
      let songName = data.tracks.items[1].name;
      let spotifyURL = data.tracks.items[0].external_urls.spotify;
      let albumName = data.tracks.items[1].album.name;
      
    let artistString = "artist: " + artist;
    let songString = "song name: " + songName;
    let urlString = "spotify url: " + spotifyURL;
    let albumString = "album: " + album;

    console.log(albumString);
    console.log(songString);
    console.log(urlString);
    console.log(albumString);
      
    let spotifyArray = [artistString, songString, urlString, albumString];

      fs.appendFile("log.txt", spotifyArray, function(err) {
        if (err) {
          return console.log(err);
        }
        console.log(spotifyArray);
      });   
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

      let venueName = response.data[0].venue.name;
      let city = response.data[0].venue.city;
      let state = response.data[0].venue.region;
      let country = response.data[0].venue.country;
      let date = response.data[0].datetime;

      let artistName = inputCriteria + "";
      let venueString = "Will be playing live at: " + venueName;
      let addressString = "Located in " + city + ", " + state + ". " + country;
      let dateStringFormat = "On " + date;

      console.log(artistName);
      console.log(venueString);
      console.log(addressString);
      console.log(dateStringFormat);

      let bandInfoArray = [artistName, venueString, addressString, dateStringFormat];

      fs.appendFile("log.txt", bandInfoArray, function (err) {
        if (err) {
          return console.log(err);
        }
        console.log(bandInfoArray);
      });   
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

        let titleString = "Title: " + JSON.stringify(response.data.Title);
        let releaseYearString = "Release Year: " + JSON.stringify(response.data.Year);
        let imdbString = "IMDB Rating: " + JSON.stringify(response.data.imdbRating);
        let rottenTomString = "Rotten Tomatoes: " + JSON.stringify(response.data.Ratings[1].Value);
        let countryString = "Country of origin: " + JSON.stringify(response.data.Country);
        let languageString = "Language: " + JSON.stringify(response.data.Language);
        let plotString = "Plot: " + JSON.stringify(response.data.Plot);
        let actorsString = "Actors: " + JSON.stringify(response.data.Actors);

        console.log(titleString);
        console.log(releaseYearString);
        console.log(imdbString);
        console.log(rottenTomString);
        console.log(countryString);
        console.log(languageString);
        console.log(plotString);
        console.log(actorsString);

        let movieArray = [titleString, releaseYearString, imdbString, rottenTomString, countryString, languageString, plotString, actorsString];

        fs.appendFile("log.txt", movieArray, function (err) {
          if (err) {
            return console.log(err);
          }
          console.log(movieArray);
        }); 

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
    console.log("Please enter valid command. Try again.");
  }


