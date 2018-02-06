require("dotenv").config();

// NPM Modules and require
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require('request');
var fs = require('fs');

var nodeArg = process.argv;
var command = process.argv[2];
var search = "";

for (var i = 3; i < nodeArg.length; i++) {
    if (i > 3 && i < nodeArg.length) {
        search = search + '+' + nodeArg[i];
    } else {
        search += nodeArg[i];
    }
}
if (search !== '') {
    var userInput = command + ': ' + search + ',';
}

//----swtich case function--------//

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
        doWhatItSays();
        break;
};

//------my-tweets function--------//

function myTweets() {
    
    var myTweets = new Twitter(keys.twitter);

    myTweets.get('statuses/user_timeline', function(error, tweets, response) {
        
        if (error) {
            console.log('Error occurred: ' + err);
            return;
        
        } else {
            for (var i = 0; i < tweets.length; i++){
                var myTweetResults = '------------------------------------------' + '\r\n' +
                                     '@' + tweets[i].user.screen_name + ': ' +
                                     tweets[i].text + '\r\n' +
                                     tweets[i].created_at + '\r\n';
                console.log(myTweetResults);
            }
        }
    });
}

//-------------spotify-this-song function-------------//

function nameTheSong(search){
        
    var mySpotify = new Spotify(keys.spotify);
        
    var songSearch;

        if (search === undefined){
            songSearch = 'The Sign';
        } else {
            songSearch = search;
        }

    mySpotify.search({ type: 'track', query: 'search' }, function(err, data) {
            
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        
        } else {
            var songInfo = data.tracks.items;

            for (var i = 0; i < 1; i++) {
                if (songInfo[i] !== undefined) {
                    var spotifyResults = 'Artist: ' + songInfo[i].artists[0].name + '\r\n' +
                                         'Song: ' + songInfo[i].name + '\r\n' +
                                         'Album the song is from: ' + songInfo[i].album.name + '\r\n' +
                                         'Preview Url: ' + songInfo[i].preview_url + '\r\n';
                    console.log(spotifyResults);
                }
            }
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

            console.log('Title: ' + body.Title);
            console.log('Year: ' + body.Year);
            console.log('IMDB Rating: ' + body.imdbRating);
            console.log('Rotten Tomatoes Rating: ' + body.tomatoRating);
            console.log('Country Produced: ' + body.Country);
            console.log('Language: ' + body.Language);
            console.log('Plot: ' + body.Plot);
            console.log('Actors: ' + body.Actors);
            console.log('-------------------------------------------------------')

        } else {
            console.log('Error :' + error);
            return;
        }
    });
}

// --------do-what-it-says---------//

function doWhatItSays() {
    fs.readFile('random.txt', 'utf8', function(error, data) {
        if (error){
            console.log(error);
            return;
        }
        console.log(data);
            var saySomething = data.split(',');
    });
};
