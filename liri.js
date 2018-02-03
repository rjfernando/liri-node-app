require("dotenv").config();

// variables to capture keys
var keys = require('./keys.js');
// var Spotify = require('spotify');
var Twitter = require('twitter');
var request = require('request');
var fs = require('fs');

// var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var nodeArg = process.argv;
var search = process.argv[2];

var userInput = process.argv[2];
switch (userInput) {
    case 'my-tweets':
        myTweets();
        break;
    case 'spotify-this-song':
        myMusic();
        break;
    case 'movie-this':
        movieData();
        break;
    case 'do-what-it-says':
        followDirections();
        break;
};

//omdb data function
function movieData() {

    var movieSearch;
    
    if (search === undefined) {
        movieSearch = 'Mr. Nobody';
    } else {
        movieSearch = search;
    }

    var queryURL = "http://www.omdbapi.com/?t=" + movieSearch + "&y=&plot=short&apikey=trilogy";

    request('queryURL', function (error, response, body) {

        if (!error && response.statusCode === 200) {
            
            var body = JSON.parse(body);

            console.log("Title: " + body.Title);
            console.log("Year: " + body.Year);
            console.log("IMDB Rating: " + body.imdbRating);
            console.log("Rotten Tomatoes Rating: " + body.tomatoRating);
            console.log("Country Produced: " + body.Country);
            console.log("Language: " + body.Language);
            console.log("Plot: " + body.Plot);
            console.log("Actors: " + body.Actors);

        } else {
            console.log("Error :" + error);
            return;
        }
    });
}

function followDirections() {
    fs.readFile('random.txt', 'utf8', function(error, data){
        if (!error) {
            followDirections = data.split(',');
            spotifyThisSong(followDirectionsResults[0], followDirectionsResults[1]);
        } else {
            console.log('Error occurred' + error);
        }
    });
};