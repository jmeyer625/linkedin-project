var OAuth = require('oauth');

module.exports = {
  request: function() {
    var OAuth2 = OAuth.OAuth2;    
     var linkedinConsumerKey = '75h3mgw87i5orn';
     var linkedinConsumerSecret = 'XXmye7LKyeA4ftuI';
     var oauth2 = new OAuth2(server.config.keys.linkedin.consumerKey,
       linkedinConsumerSecret, 
       'https://api.twitter.com/', 
       null,
       'oauth2/token', 
       null);
     oauth2.getOAuthAccessToken(
       '',
       {'grant_type':'client_credentials'},
       function (e, access_token, refresh_token, results){
       console.log('bearer: ',access_token);
      })
}}

// var OAuth2 = OAuth.OAuth2;    
//      var linkedinConsumerKey = '75h3mgw87i5orn';
//      var linkedinConsumerSecret = 'XXmye7LKyeA4ftuI';
//      var oauth2 = new OAuth2(server.config.keys.twitter.consumerKey,
//        linkedinConsumerSecret, 
//        'http://api.linkedin.com/v1/people/~', 
//        null,
//        'oauth2/token', 
//        null);
//      oauth2.getOAuthAccessToken(
//        '',
//        {'grant_type':'client_credentials'},
//        function (e, access_token, refresh_token, results){
//        console.log('bearer: ',access_token);