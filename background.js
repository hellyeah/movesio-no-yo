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

var makeMoves = function() {
    Parse.initialize("JktiaCaTnoBYASV7iJIggzC6fZnV1IypMftVuxLG", "vdQEeIP7ZU6iC0oDH9O5yif3OElYsXJTYXKZUahu");
    var TestObject = Parse.Object.extend("TestObject");
    var testObject = new TestObject();
    testObject.save({foo: "bar"}).then(function(object) {
      alert("yay! it worked");
    });
    console.log('making moves');
    chrome.extension.getBackgroundPage().console.log('Made Moves');
// Here, do what ever you want
//test parse
};

//loadScript("https://parse.com/downloads/javascript/parse-1.3.1.min.js", makeMoves);

/*
loadScript("https://parse.com/downloads/javascript/parse-1.3.1.min.js", makeMoves(){

});
*/


// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!
  console.log(tab.url);
  loadScript("https://parse.com/downloads/javascript/parse-1.3.1.min.js", makeMoves);
  chrome.tabs.executeScript({
    code: 'document.body.style.backgroundColor="red"'
  });
});


