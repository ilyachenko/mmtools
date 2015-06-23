'use strict';

// Insert image MM tools logo
var img = document.createElement('img');
img.src = chrome.extension.getURL('images/icon-128.png');
img.id = "mm_tools_logo";
(document.head || document.documentElement).appendChild(img);

// Inject script to page
var s = document.createElement('script');
s.src = chrome.extension.getURL('scripts/script.js');
s.onload = function () {
  this.parentNode.removeChild(this);
};
(document.head || document.documentElement).appendChild(s);

// Send msg to background page to show the icon
document.addEventListener('init_mm_tools', function () {
  chrome.runtime.sendMessage({msg: "init_mm_tools"});
});

// Send mmcore info to popup.js
var callbackWithMmcore = null;
document.addEventListener('sendMmcore', function (e) {
  if(callbackWithMmcore){
    callbackWithMmcore(e.detail);
    callbackWithMmcore = null;
  }
});

chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse){
    if(request.msg === "getMmcoreInfo"){
      callbackWithMmcore = sendResponse;
      var evt = document.createEvent("CustomEvent");
      evt.initCustomEvent("getMmcoreInfo", true, true, '');
      document.dispatchEvent(evt);
    }
  }
);