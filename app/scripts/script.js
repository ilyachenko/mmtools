/* global mmcore */
(function () {
  'use strict';

  if (typeof mmcore === 'undefined') {
    return;
  }

  var prefix = "mm_tools_ext_";
  var logo = 'data:image/png;base64,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';

  function getData() {
    return {
      GenInfo: mmcore.GenInfo,
      _sid: mmcore._sid,
      muted: mmcore.GetCookie(prefix + 'muted', 1).length,
      cfgID: mmcore.GetCookie("cfgID", 0),
      opc: mmcore.GetCookie('opc.enabled'),
      qa_tool: mmcore.GetCookie('mmcore.un', 1).length,
      mm_error: typeof mm_error === "undefined" ? "" : mm_error.trim()
    };
  }

  function decorate(initial, decorate_before, decorate_after) {
    return function () {
      var initial_call_result;

      if (typeof decorate_before === 'function') {
        decorate_before.apply(this, arguments);
      }
      initial_call_result = initial.apply(this, arguments);
      if (typeof decorate_after === 'function') {
        decorate_after.apply(this, arguments);
      }
      return initial_call_result;
    };
  }

  /**
   * Send msg to content script to show the extension icon
   */
  (function () {
    var evt = document.createEvent("CustomEvent");
    evt.initCustomEvent("init_mm_tools", true, true, getData());
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
      var evt = document.createEvent("CustomEvent");
      evt.initCustomEvent("sendParentData", true, true, getData());
      document.dispatchEvent(evt);
    });

    /**
     * Mute/unmute notifications
     */
    var change_icon_handler = function (state) {
      var evt = document.createEvent("CustomEvent");
      evt.initCustomEvent("change_icon", true, true, getData());
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

    document.addEventListener(prefix + 'OPC_install', function (e) {
      if (mmcore.GetCookie('opc.enabled')) {
        mmcore.SetCookie('opc.enabled', '', -1);
        location.reload();
      } else {
        mmcore.SetCookie('cfgID', 1, 90);
        mmcore.OPC_install();
      }
    });

    document.addEventListener(prefix + 'qa_tool_install', function (e) {
      if (mmcore.GetCookie('mmcore.un')) {
        mmcore.SetCookie('mmcore.un', '', -1, 1);
        location.reload();
      } else {
        mmcore.SetCookie('mmcore.un', 'qa', 1, 1);
        mmcore.SetCookie('cfgID', 1, 90);
        location.reload();
      }
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

    //var logoImgSrc = document.getElementById('mm_tools_logo').src;

    if (!Notification) {
      alert('Please us a modern version of Chrome');
      return;
    }

    if (Notification.permission !== "granted")
      Notification.requestPermission();

    var notification = new Notification(str, {
      icon: logo
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

    function actionNotification() {
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
    }

    /**
     * Overridden by mmtools chrome extension.
     * Disable it for use native method.
     */
    mmcore.SetAction = decorate(mmcore.SetAction, actionNotification, false);
    mmcore.$Action = decorate(mmcore.$Action, actionNotification, false);

  }());


}());
