'use strict';

var prefix = "mm_tools_ext_";


/**
 * Injection
 */
var img = document.createElement('img'); // Insert image MM tools logo
img.src = chrome.extension.getURL('images/icon-128.png');
img.id = "mm_tools_logo";
(document.head || document.documentElement).appendChild(img);

var s = document.createElement('script'); // Inject script to page
s.src = chrome.extension.getURL('scripts/script.js');
s.onload = function () {
  this.parentNode.removeChild(this);
};
(document.head || document.documentElement).appendChild(s);

/**
 * Send msg to background page to show the icon
 */
document.addEventListener('init_mm_tools', function () {
  chrome.runtime.sendMessage({msg: "init_mm_tools"});
});

/**
 * Send mmcore info to popup.js
 */
var callbackToPopup = null;
document.addEventListener('sendParentData', function (e) {
  if (callbackToPopup) {
    callbackToPopup(e.detail);
    callbackToPopup = null;
  }
});

/**
 * Translate messages from popup to parent
 */
chrome.extension.onMessage.addListener(
  function (request, sender, sendResponse) {
    callbackToPopup = sendResponse;
    var evt = document.createEvent("CustomEvent");
    evt.initCustomEvent(prefix + request.msg, true, true, '');
    document.dispatchEvent(evt);
  }
);