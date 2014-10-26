// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
chrome.extension.getBackgroundPage().console.log('foo');

function loadScript(url, callback)
{
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}

var test = function() {
    Parse.initialize("endFPswOSsCN37MBloqoBjGvQWpmO6XsvQtV0cZ0", "lQiHSY3tM2hjdFSTEzfxV0dMfHCBT8n82zRwYDfu");
    var TestObject = Parse.Object.extend("TestObject");
    var testObject = new TestObject();
    testObject.save({foo: "bar"}).then(function(object) {
      //alert("yay! it worked");
    });

    console.log('test');
}

loadScript("https://parse.com/downloads/javascript/parse-1.3.1.min.js", test);

//REAL FUNCTIONS
    
var findNames = function(url) {
    //**THIS**//
    //**crunchbase or team page search by url for founders names
    Parse.Cloud.run('getFoundersNames', {url: url}, {
      success: function(result) {
        alert(result);
        //alert(JSON.parse(result).data.items[0].path);
        //alert(result.data.items[0].path);
        //return "Aaron"
      },
      error: function(error) {
        console.log('failure');
      }
    });
    //return "aaron";
}

var namesCombo = function (firstName, lastName, url) {
    //**COMBINATION OF NAMES**//
    //run combinations of names
    //call function with expected emails
    var testEmail = firstName+"@"+url;
    Parse.Cloud.run('validateEmail', {email: testEmail}, {
      success: function(result) {
        //alert(result);
      },
      error: function(error) {
        console.log('failure');
      }
    });
};

var makeMoves = function(url) {
    //takes just url and gets names
    //either crunchbase or team page
    //**might have to do some parsing to get rid of http://
    //**chain as callback
    findNames(url);
    //**namesCombo("dave", "fontenot", url);

    console.log('making moves');
    chrome.extension.getBackgroundPage().console.log('Made Moves');
// Here, do what ever you want
//test parse
};

var emailCombos = function(email) {
    Parse.initialize("endFPswOSsCN37MBloqoBjGvQWpmO6XsvQtV0cZ0", "lQiHSY3tM2hjdFSTEzfxV0dMfHCBT8n82zRwYDfu");
    Parse.Cloud.run('validateEmail', {email: email}, {
      success: function(result) {
        //alert(result);
      },
      error: function(error) {
        console.log('failure');
      }
    });
}

//loadScript("https://parse.com/downloads/javascript/parse-1.3.1.min.js", emailCombos);

/*
loadScript("https://parse.com/downloads/javascript/parse-1.3.1.min.js", makeMoves(){

});
*/


// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!
  chrome.extension.getBackgroundPage().console.log(tab.url);
  //tab.url is working :D
  //alert(tab.url);
  //loadScript("https://parse.com/downloads/javascript/parse-1.3.1.min.js", emailCombos);
  //loadScript("parse-1.3.1.min.js", makeMoves(tab.url));
  var email = "dave@hackmatch.com";
  //**makeMoves(tab.url);
  makeMoves("producthunt.com");
  //emailCombos(email)
  chrome.tabs.executeScript({
    code: 'document.body.style.backgroundColor="red"'
  });
});


