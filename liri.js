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
    } else {console.log(`the error is: ${error}`)}
  });
} // end of getTweets

var getArtistNames = function(artist) {
  return artist.name;
}

function getSpotify(songName){
  var Spotify = require('node-spotify-api');
  var spotify = new Spotify(keys.spotify);
  
  spotify.search({ 
    type: 'track', query: songName }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
    var songs = data.tracks.items; 
    for (let i = 0; i < songs.length; i++) {
        console.log (i);
        console.log('artist(s): ' + songs[i].artists.map(getArtistNames));
        console.log('song name: ' + songs[i].name);
        console.log('preview song: ' + songs[i].preview_url);
        console.log('album: ' + songs[i].album.name);
        console.log('-------------------------------------------');
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

