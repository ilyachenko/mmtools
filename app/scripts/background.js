'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  //chrome.pageAction.show(tabId);
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    function getIconPath(){
      var path = "images/icon-19.png";
      if (data.muted) {
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