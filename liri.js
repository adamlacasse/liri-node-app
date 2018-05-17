require('dotenv').config();
var keys = require('./keys.js');


function getTweets(){
  var Twitter = require('twitter'); 
  var client = new Twitter(keys.twitter);
    
  var params = {screen_name: 'AwlUnh'};
  client.get('statuses/home_timeline', params, function(error, tweets, response) {
    if (!error) {
      console.log("Here are the tweets:");
      for(i =0; i < tweets.length; i++){
        console.log(`Tweeted: "${tweets[i].text}" on ${tweets[i].created_at}`);
      }
    } else {console.log(`Error is: ${error}`)}
  });
} // end of getTweets

var getArtistNames = function(artist) {
  return artist.name;
}

function getSpotify(songName){
  var Spotify = require('node-spotify-api');
  var spotify = new Spotify(keys.spotify);
  
  spotify.search({ 
    type: 'track', query: songName }, function(error, data) {
    if (error) {
        console.log(`Error is: ${error}`);
        return;
    }
    else if (data.tracks.items == null || data.tracks.items == " "){
      // songName = "The Sign";
      console.log("it's null-ish");
    } else {
        var songs = data.tracks.items; 
        for (let i = 0; i < songs.length; i++) {
            console.log (i);
            console.log(`Artist(s): ${songs[i].artists.map(getArtistNames)}`);
            console.log(`Song Name: ${songs[i].name}`);
            console.log(`Preview URL: ${songs[i].preview_url}`);
            console.log(`Album: ${songs[i].album.name}`);
            console.log('-------------------------------------------');
        }
      }
  });
} // end of getSpotify


var userPicks = function (value1, value2) {
  switch (value1) {
    case 'my-tweets':
      getTweets();
      break;
    case 'spotify-this-song': 
      getSpotify(value2);  
      break;
    case 'movie-this' :
      getMovie(value2);
      break; 
    case 'do-what-it-says':
      doWhatItSays(); 
      break;
    default:
      console.log('liri does not know that');  
  }
} // end of userPicks

userPicks(process.argv[2], process.argv[3]);

