'use strict';

chrome.windows.getCurrent(function (w) {
  chrome.tabs.getSelected(w.id,
    function (response) {
      chrome.tabs.sendMessage(response.id, {msg: "get_mmcore_info"}, function (responseMmcoreInfo) {

        document.querySelector('#mm_tools_popup').style.display = "block";
        document.querySelector('#preloader').style.display = "none";

        var campaignInfo = document.querySelector('#mm_tools_popup .campaignInfo'),
          CGcounterInfo = document.querySelector('#mm_tools_popup .CGcounter');

        var genInfo = responseMmcoreInfo.GenInfo,
          CGcount = responseMmcoreInfo._sid.replace('mmcore.', ''),
          muted = responseMmcoreInfo.muted,
          opc = responseMmcoreInfo.opc,
          qa_tool = responseMmcoreInfo.qa_tool,
          mm_error = responseMmcoreInfo.mm_error,
          cfgID = responseMmcoreInfo.cfgID;

        for (var campName in genInfo) {
          var element = [];

          for (var name in genInfo[campName]) {
            element.push(name);
            element.push(genInfo[campName][name]);
          }

          var span = document.createElement('div');
          span.innerHTML = "Campaign: <b>" + campName + "</b> " +
          "<br>";
          campaignInfo.appendChild(span);
        }

        if (CGcount) {
          var div = document.createElement('div');
          div.innerHTML = "CG Request counter: " + CGcount;
          CGcounterInfo.appendChild(div);
        }

        var muteBtn = document.createElement('button');
        if (muted === 0) {
          muteBtn.innerHTML = "Mute";
          muteBtn.onclick = function () {
            chrome.tabs.sendMessage(response.id, {msg: "mute"});
            window.close();
          };
        }
        else {
          muteBtn.innerHTML = "Unmute";
          muteBtn.onclick = function () {
            chrome.tabs.sendMessage(response.id, {msg: "unmute"});
            window.close();
          };
        }
        muteBtn.id = "muteBtn";
        document.querySelector("#mute").appendChild(muteBtn);

        // Install OPC
        if (opc) {
          document.querySelector("#install_OPC .opc span").innerHTML = "Uninstall";
        }
        else {
          document.querySelector("#install_OPC .opc span").innerHTML = "Install";
        }
        document.querySelector("#install_OPC .opc a").addEventListener('click', function () {
          chrome.tabs.sendMessage(response.id, {msg: "OPC_install"});
          window.close();
        });

        // Install QA tool
        if (qa_tool) {
          document.querySelector("#install_OPC .qa_tool span").innerHTML = "Uninstall";
        }
        else {
          document.querySelector("#install_OPC .qa_tool span").innerHTML = "Install";
        }
        document.querySelector("#install_OPC .qa_tool a").addEventListener('click', function () {
          chrome.tabs.sendMessage(response.id, {msg: "qa_tool_install"});
          window.close();
        });

        // Help
        document.querySelector("#help_btn").addEventListener('click', function () {
          chrome.extension.sendRequest({msg: "help_btn"}, function (response) {
            //console.log(response.farewell);
          });
        });

        // mm_error
        if (mm_error.length) {
          document.querySelector("#mm_error").innerHTML = "mm_error: " + mm_error;
          document.querySelector("#mm_error").style.display = "block";
        }

        // Switch to sandbox/production
        if (cfgID === "1") {
          document.querySelector(".switchTo a").innerHTML = "production";
        }
        else if (cfgID === "2") {
          document.querySelector(".switchTo a").innerHTML = "sandbox";
        }

        document.querySelector(".switchTo a").addEventListener('click', function () {
          chrome.tabs.sendMessage(response.id, {msg: "switchTo"});
          window.close();
        });

      });
    });
});

