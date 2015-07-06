'use strict';

function showHelp(){
  chrome.tabs.create({'url': chrome.extension.getURL('help.html')}, function (tab) {
    // Tab opened.
  });
}

chrome.runtime.onInstalled.addListener(function (details) {
  //console.log('previousVersion', details.previousVersion);
  //showHelp();
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  //chrome.pageAction.show(tabId);
});

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  if (request.msg == "help_btn") {
    showHelp();
    //sendResponse({farewell: "goodbye"});
  }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    function getIconPath() {
      var path = "images/icon-19.png";
      if (data.mm_error) {
        path = "images/icon-19-error.png";
      }
      else if (data.muted) {
        path = "images/icon-19-muted.png";
      }
      else if (data.cfgID === "1") {
        path = "images/icon-19-sandbox.png";
      }
      return path;
    }

    var data = request.data;

    if (request.msg == "init_mm_tools") {
      var tabId = sender.tab.id;
      chrome.pageAction.setIcon({
        path: getIconPath(),
        tabId: sender.tab.id
      });
      chrome.pageAction.show(tabId);
    }

    if (request.msg === "change_icon") {
      chrome.pageAction.setIcon({
        path: getIconPath(),
        tabId: sender.tab.id
      });
    }
    return true;
  }
);