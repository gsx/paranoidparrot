chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.create({ "url": "loader.html" });
});
