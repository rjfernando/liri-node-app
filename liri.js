require("dotenv").config();

// variables to capture keys
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require('request');
var fs = require('fs');

var client = new Twitter(keys.twitter);

var nodeArg = process.argv;
var command = process.argv[2];
var search = process.argv[3];

for (var i = 4; i < nodeArg.length; i++) {
    search += '+' + nodeArg[i];
}

switch (command) {
    case 'my-tweets':
        myTweets();
        break;
    case 'spotify-this-song':
        nameTheSong();
        break;
    case 'movie-this':
        movieData();
        break;
    case 'do-what-it-says':
        followDirections();
        break;
};

//-------------spotify-this-song function-------------//

function nameTheSong(){
        
        var mySpotify = new Spotify(keys.spotify);
        
        var songSearch;

        if (search === undefined){
            songSearch = 'The Sign';
        } else {
            songSearch = search;
        }

        mySpotify.search({ type: 'track', query: 'song' }, function(err, data) {
            
            if ( !err ) {
                var songInfo = data.tracks.items;
				for (var i = 0; i < 1; i++) {
					if (songInfo[i] != undefined) {
						var spotifyResults = 
						"Artist: " + songInfo[i].artists[0].name + "\r\n" +
						"Song: " + songInfo[i].name + "\r\n" +
						"Album the song is from: " + songInfo[i].album.name + "\r\n" +
						"Preview Url: " + songInfo[i].preview_url + "\r\n";
						
						console.log(spotifyResults);
                    }
                }
            } else {
                console.log('Error occurred: ' + err);
                return;
            }   
        });
    }

//--------movie-this function----------//

function movieData() {

    var movieSearch;

    if (search === undefined) {
        movieSearch = 'Mr.Nobody';
    } else {
        movieSearch = search;
    }

    // var queryUrl = "https://www.omdbapi.com/?t=" + movieSearch + "&y=&plot=short&apikey=trilogy&r=json&tomatoes=true";

    request("https://www.omdbapi.com/?t=" + movieSearch + "&y=&plot=short&apikey=trilogy&r=json&tomatoes=true", function (error, response, body) {

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
            console.log('Error :' + error);
            return;
        }
    });
}

// --------do-what-it-says---------//

function followDirections() {
    fs.readFile('random.txt', 'utf8', function (error, data) {
        if (!error) {
            followDirections = data.split(',');
            nameTheSong(followDirectionsResults[0], followDirectionsResults[1]);
        } else {
            console.log('Error occurred' + error);
        }
    });
}