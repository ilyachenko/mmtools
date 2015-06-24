/* global mmcore */
(function () {
  'use strict';

  if (typeof mmcore === 'undefined') {
    return;
  }

  var prefix = "mm_tools_ext_";

  /**
   * Send msg to content script to show the extension icon
   */
  (function () {
    var evt = document.createEvent("CustomEvent");
    evt.initCustomEvent("init_mm_tools", true, true, { muted: mmcore.GetCookie(prefix + 'muted', 1).length });
    document.dispatchEvent(evt);
  }());

  /**
   * Event listeners from popup
   */
  (function () {
    /**
     * Send page data to popup
     */
    document.addEventListener(prefix + 'get_mmcore_info', function (e) {
      var data = {
        GenInfo: mmcore.GenInfo,
        _sid: mmcore._sid,
        muted: mmcore.GetCookie(prefix + 'muted', 1).length
      };
      var evt = document.createEvent("CustomEvent");
      evt.initCustomEvent("sendParentData", true, true, data);
      document.dispatchEvent(evt);
    });

    /**
     * Mute/unmute notifications
     */
    var change_icon_handler = function(state){
      var evt = document.createEvent("CustomEvent");
      evt.initCustomEvent("change_icon", true, true, {muted: state});
      document.dispatchEvent(evt);
    };

    document.addEventListener(prefix + 'mute', function (e) {
      mmcore.SetCookie(prefix + 'muted', 1, 360, 1);
      change_icon_handler(1);
    });

    document.addEventListener(prefix + 'unmute', function (e) {
      mmcore.SetCookie(prefix + 'muted', 0, -1, 1);
      change_icon_handler(0);
    });
  }());

  /**
   * @description HTML5 notification. Using in "SetAction wrapper" now.
   * @param str
   */
  function notifyMe(str) {
    if (mmcore.GetCookie(prefix + 'muted', 1).length !== 0) {
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
