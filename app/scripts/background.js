'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  //chrome.pageAction.show(tabId);
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.msg == "init_mm_tools") {
      var tabId = sender.tab.id;
      chrome.pageAction.show(tabId);
      if (request.muted) {
        chrome.pageAction.setIcon({
          path: "images/icon-19-muted.png",
          tabId: sender.tab.id
        });
      }
      return true;
    }

    if (request.msg === "change_icon") {
      var path = "images/icon-19.png";
      if (request.muted === 1){
        path = "images/icon-19-muted.png";
      }

      chrome.pageAction.setIcon({
        path: path,
        tabId: sender.tab.id
      });

      return true;
    }
  }
);