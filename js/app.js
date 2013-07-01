var helper = (function() {
  return {
    clientId :'532968905698.apps.googleusercontent.com',
    BASE_API_PATH: 'plus/v1/',
    apiBase: '/api',
    authResult: '',
    user: '',
    mode: 'awesome',

    /**
     * Hides the sign in button and starts the post-authorization operations.
     *
     * @param {Object} authResult An Object which contains the access token and
     *   other authentication information.
     */
    onSigninCallback: function(authResult) {
        if (authResult['access_token']) {
          console.log("Result from sign-in:");
          console.log(authResult);

          // Setup the base url for API calls
          helper.authResult = authResult;

          // Success.
          // Hide the sign-in button
          $('#gConnect').hide();
		  $('#gConnect2').hide();
		  $('#gConnect3').hide();
		  $('#gConnect4').show();
		  $('#gConnect5').hide();
		  $('#gConnect6').hide();
		  $('#gConnect7').show();
		  $('#gConnect8').show();		  

          // Reflect the user profile
          gapi.client.load('plus','v1', function(){
            helper.connect();
          });

         /* helper.mode = '' document.URL.substring(document.URL.indexOf('#') + 1);
          if (helper.mode.indexOf('/') > 0){
            helper.mode = 'good';
          }*/

        } else if (authResult['error']) {
          // You can handle various error conditions here
        }
    },

    /**
     * Calls the /api/connect endpoint to connect the user with the server.
     *
     * @param {Object} token An Object which contains the access token and
     *   other authentication information.
     */
    connect: function(){
      gapi.client.plus.people.get({userId:'me'}).execute(
        function(result) {
          helper.user = result;
          $('#profileArea').hide();
          $('#msg').hide();

          if (helper.mode == 'good'){
            $('#profileArea').html('Signed in as ' + helper.user.displayName + '!')
          }else{
            var html = helper.getProfileHTML(result);
            $('#profileArea').html(html);
          }         
          if (helper.mode == 'awesome'){
            $('#profileArea').css('margin-top', '0px');
            $('#profileArea' ).show();
            $('#profileArea' ).effect( 'bounce', null, 500, null);
          }
          setTimeout("$('#disconnect').show()", 600);

          $('#authButtons').show();
        }
      );
    },

    /**
     * Gets HTML markup representing a user's profile
     *
     * @param {Object} The user object.
     */
    getProfileHTML: function(user){
      var html = '<table><td><a target="_blank" href="' + user.url + '">' + '<img src="' +
          user.image.url + '" alt="' + user.displayName + '" title="' +
          user.displayName + '" height="35" />' + '</a></td><td>' + 'Signed in' +
          ' as:<br>' + user.displayName + '</td></tr></table>';
      return html;
    },
  };
})();	
/**
     * Calls the OAuth2 endpoint to disconnect the app for the user.
     */
function  disconnect2() {
      // Revoke the access token.
      $.ajax({
        type: 'GET',
        url: 'https://accounts.google.com/o/oauth2/revoke?token=' +
            gapi.auth.getToken().access_token,
        async: false,
        contentType: 'application/json',
        dataType: 'jsonp',
        success: function(result) {
          console.log('revoke response: ' + result);
          $('#authOps').hide();
          $('#profileArea').empty();          
          $('#authResult').empty();
          $('#authButtons').hide();
          $('#msg').show("slide", null, 250, null);
          $('#gConnect').show();
		  $('#gConnect2').show();
		  $('#gConnect3').show();
		  $('#gConnect4').hide();
		  $('#gConnect5').show();
		  $('#gConnect6').show();
		  $('#gConnect7').hide();
		  $('#gConnect8').hide();
        },
        error: function(e) {
          console.log(e);
        }
      });
    }