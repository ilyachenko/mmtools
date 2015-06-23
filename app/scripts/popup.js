'use strict';

chrome.windows.getCurrent(function (w) {
  chrome.tabs.getSelected(w.id,
    function (response) {
      chrome.tabs.sendMessage(response.id, {msg: "getMmcoreInfo"}, function (response) {

        var campaignInfo = document.querySelector('#mm_tools_popup .campaignInfo'),
          CGcounterInfo = document.querySelector('#mm_tools_popup .CGcounter');

        var genInfo = response.GenInfo, CGcount = response._sid.replace('mmcore.', '');

        for (var campName in genInfo) {
          var element = [];

          for (var name in genInfo[campName]) {
            element.push(name);
            element.push(genInfo[campName][name]);
          }

          var span = document.createElement('div');
          span.innerHTML = "Campaign: <b>" + campName + "</b> " +
          "<br>Element: <b>" + element[0] + "</b><br>Variant: <b>" + element[1] + "</b><br>";
          campaignInfo.appendChild(span);
        }

        if (CGcount) {
          var div = document.createElement('div');
          div.innerHTML = "CG Request counter: " + CGcount;
          CGcounterInfo.appendChild(div);
        }


      });
    });
});

