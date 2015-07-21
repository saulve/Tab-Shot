//Indicator is used to give a unique url for the tab
var indicator = 0;
// Listen for a click on the camera icon. On that click, take a screenshot.
chrome.browserAction.onClicked.addListener(function() {

  chrome.tabs.captureVisibleTab(function(screenshotUrl) {
    indicator++;
    var tabUrl = chrome.extension.getURL('screenshot.html?id=' + indicator);
    
    chrome.tabs.onUpdated.addListener(function() {
    
    //Look through the views and find the one with the correct url
    //then set it's img source to the screenshot url
      
      var views = chrome.extension.getViews();
      for (var i = 0; i < views.length; i++) {
        //If there is a tab with such url, then pass in the screenshot url
        //to setUrl() method
        if (views[i].location.href == tabUrl) {
          views[i].setUrl(screenshotUrl);
          break;
        }
      }
    });
    //Create the new tab
    chrome.tabs.create({url: tabUrl}, function() {
    });
   
  });
});
