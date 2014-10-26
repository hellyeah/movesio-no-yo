
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
/*
var nameCombos = function () {

}
*/

//Parse.Cloud.run("getCrunchOrg")

Parse.Cloud.define("getFoundersNames", function(request, response) {
    //request.params.domain
    //request.params.
    Parse.Cloud.httpRequest({
        url: 'http://api.crunchbase.com/v/2/organizations',
        params: {
            domain_name: request.params.url,
            user_key : 'e8be743a88105142592646e82ea8fd76',
        },
      success: function(httpResponse) {
        console.log(httpResponse.text);
        var crunchbaseUrlEnding = JSON.parse(httpResponse.text).data.items[0].path;
        //response.success(crunchbaseUrlEnding);

        //response.success(JSON.parse(httpResponse.text).data.items[0]);
        //**searching specific org for founder name
        var crunchbaseUrl = 'http://api.crunchbase.com/v/2/' + crunchbaseUrlEnding;
        //response.success(crunchbaseUrl);
        
            Parse.Cloud.httpRequest({
                url: crunchbaseUrl,
                params: {
                    user_key : 'e8be743a88105142592646e82ea8fd76',
                },
              success: function(httpResponse) {
                console.log(httpResponse.text);                
                //response.success(JSON.parse(httpResponse.text).data.items[0]);
                var foundersName = JSON.parse(httpResponse.text).data.relationships.founders.items[0].name;
                //response.success(JSON.parse(httpResponse.text).data.relationships.founders.items[0].name);
                var foundersFirstName = foundersName.substr(0,foundersName.indexOf(' '));
                var foundersEmail = foundersFirstName+"@"+request.params.url;

                Parse.Cloud.httpRequest({
                    url: 'https://api.mailgun.net/v2/address/validate',
                    params: {
                        address: foundersEmail,
                        //address : "dave@hackmatch.com",
                        api_key: 'pubkey-70yfqdibeeabn9oa7sc-nmtyo5gfi9z4'
                        //eventually this will be request.address
                    },
                  success: function(httpResponse) {
                    console.log(httpResponse.text);
                    //response.success(httpResponse.text);
                    response.success(foundersEmail.toLowerCase());
                  },
                  error: function(httpResponse) {
                    console.error('Request failed with response code ' + httpResponse.status);
                    response.error('Request failed with response code ' + httpResponse.status);
                  }
                });




                //response.success(httpResponse.text);
              },
              error: function(httpResponse) {
                console.error('Request failed with response code ' + httpResponse.status);
                response.error('Request failed with response code ' + httpResponse.status);
              }
            });
        


        //response.success(httpResponse.text);
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


