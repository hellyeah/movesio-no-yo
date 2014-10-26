
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

Parse.Cloud.define("validateEmail", function(request, response) {
    Parse.Cloud.httpRequest({
        url: 'https://api.mailgun.net/v2/address/validate',
        params: {
            address: request.params.email,
            //address : "dave@hackmatch.com",
            api_key: 'pubkey-70yfqdibeeabn9oa7sc-nmtyo5gfi9z4'
            //eventually this will be request.address
        },
      success: function(httpResponse) {
        console.log(httpResponse.text);
        response.success(httpResponse.text);
      },
      error: function(httpResponse) {
        console.error('Request failed with response code ' + httpResponse.status);
        response.error('Request failed with response code ' + httpResponse.status);
      }
    });
});




//does combination in cloud code
Parse.Cloud.define("returnEmail", function(request, response) {
    //request.website, request.firstname, request.lastname
    //combinations
    Parse.Cloud.httpRequest({
      url: 'http://www.parse.com/',
      success: function(httpResponse) {
        console.log(httpResponse.text);
        response.success(httpResponse.text);
      },
      error: function(httpResponse) {
        console.error('Request failed with response code ' + httpResponse.status);
        response.error('Request failed with response code ' + httpResponse.status);
      }
    });
})


