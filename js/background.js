chrome.extension.getBackgroundPage().console.log('foo');

//**Initialization**//

//Load JS files
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

var initializeParse = function() {
    //Initialized Parse
    Parse.initialize("endFPswOSsCN37MBloqoBjGvQWpmO6XsvQtV0cZ0", "lQiHSY3tM2hjdFSTEzfxV0dMfHCBT8n82zRwYDfu");
    //Saves test object
    var TestObject = Parse.Object.extend("TestObject");
    var testObject = new TestObject();
    testObject.save({foo: "bar"}).then(function(object) {
      //alert("yay! it worked");
    });
}

loadScript("https://parse.com/downloads/javascript/parse-1.3.1.min.js", initializeParse);

//**REAL FUNCTIONS**//

var getEmailWithURL = function (url) {
    //**crunchbase or team page search by url for founders names
    Parse.Cloud.run('getFoundersEmail', {url: url}, {
      success: function(result) {
        alert(result);
      },
      error: function(error) {
        console.log('failure');
      }
    });
};

var makeMoves = function(url) {
    getEmailWithURL(url);
    chrome.extension.getBackgroundPage().console.log('Made Moves');
};

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed! 
  // tab.url is current url
  chrome.extension.getBackgroundPage().console.log(tab.url);

  var hostname = parseUrl(tab.url).hostname;

  makeMoves(stripSubdomains(hostname));

  chrome.tabs.executeScript({
    //can do something here to tab
    //code: 'document.body.style.backgroundColor="red"'
  });
});

//HELPER FUNCTIONS//

var parseUrl = function (url) {
    var parser = document.createElement('a'),
        searchObject = {},
        queries, split, i;
    // Let the browser do the work
    parser.href = url;
    // Convert query string to object
    queries = parser.search.replace(/^\?/, '').split('&');
    for( i = 0; i < queries.length; i++ ) {
        split = queries[i].split('=');
        searchObject[split[0]] = split[1];
    }
    return {
        protocol: parser.protocol,
        host: parser.host,
        hostname: parser.hostname,
        port: parser.port,
        pathname: parser.pathname,
        search: parser.search,
        searchObject: searchObject,
        hash: parser.hash
    }
};

var numberOfPeriods = function (string) {
  return (string.match(/[.]/g) || []).length;
};

//**doesnt work for .co.uk right now or endings with multiple periods
//could just split the string from the right of 2nd to last period
var stripSubdomains = function (url) {
  if (numberOfPeriods(url) >= 2) {
    //remove one subdomain then call function recursively on that new url
    return stripSubdomains(url.replace(/^[^.]+\./g, ""));
  }
  else {
    return url;
  }
};


