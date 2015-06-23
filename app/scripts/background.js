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
      return true;
    }
  }
);