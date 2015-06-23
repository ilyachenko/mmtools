/* global mmcore */
(function () {
  'use strict';

  if (typeof mmcore === 'undefined') {
    return;
  }

  /**
   * Send msg to content script to show the extension icon
   */
  (function () {
    var evt = document.createEvent("CustomEvent");
    evt.initCustomEvent("init_mm_tools", true, true, '');
    document.dispatchEvent(evt);
  }());

  /**
   * Send page data for popup page
   */
  (function () {
    document.addEventListener('getMmcoreInfo', function (e) {
      var data = {
        GenInfo : mmcore.GenInfo,
        _sid : mmcore._sid
      };
      var evt = document.createEvent("CustomEvent");
      evt.initCustomEvent("sendMmcore", true, true, data);
      document.dispatchEvent(evt);
    });
  }());


  /**
   * @description HTML5 notification. Using in "SetAction wrapper" now.
   * @param str
   */
  function notifyMe(str) {
    if(localStorage.getItem('muted')) {
      return false;
    }

    var logoImgSrc = document.getElementById('mm_tools_logo').src;

    if (!Notification) {
      alert('Please us a modern version of Chrome, Firefox, Opera or Firefox.');
      return;
    }

    if (Notification.permission !== "granted")
      Notification.requestPermission();

    var notification = new Notification(location.host, {
      icon: logoImgSrc,
      body: str
    });

    notification.onclick = function () {
      //window.open("http://stackoverflow.com/a/13328397/1269037");
    };

    setTimeout(function () {
      notification.close();
    }, 4000);
  }

  /**
   * SetAction wrapper
   */
  (function () {
    'use strict';
    var _SetAction = mmcore.SetAction;

    mmcore.SetAction = function () {
      /**
       * Overridden by mmtools chrome extension.
       * Disable it for use native method.
       */
      var str = '';
      if (typeof arguments[0] !== "undefined") {
        str += arguments[0] + ": ";
      }
      if (typeof arguments[1] !== "undefined") {
        str += arguments[1] + "\n";
      }
      if (typeof arguments[2] !== "undefined" && arguments[2] !== "") {
        str += "Attr: " + arguments[2];
      }
      notifyMe(str);
      _SetAction.apply(mmcore, arguments);
    };
  }());


}());
