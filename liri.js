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
}


// var Spotify = require('node-spotify-api');
// var spotifyKeys = new Spotify(keys.spotify);

var userPicks = function (value1, value2) {
  switch (value1) {
      case 'my-tweets':
          getTweets();
          break;
      case 'spotify-this-song': 
          getSpotify(value2);  
      case 'movie-this' :
          getMovie(value2); 
      case 'do-what-it-says':
          doWhatItSays(); 
          break;
      default:
      console.log('liri does not know that');  
  }
}

userPicks(process.argv[2], process.argv[3]);

