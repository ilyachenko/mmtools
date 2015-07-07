'use strict';

chrome.windows.getCurrent(function (w) {
  chrome.tabs.getSelected(w.id,
    function (response) {
      chrome.tabs.sendMessage(response.id, {msg: "get_mmcore_info"}, function (responseMmcoreInfo) {

        document.querySelector('#mm_tools_popup').style.display = "block";
        document.querySelector('#preloader').style.display = "none";
        document.querySelector('#mm_tools_popup_html_tag').className = "national";

        var campaignInfo = document.querySelector('#campaignInfo'),
          CGcounterInfo = document.querySelector('#CGcounter'),
          pagesList = document.querySelector('#pages');

        var genInfo = responseMmcoreInfo.GenInfo || {},
          CGcount = responseMmcoreInfo._sid.replace('mmcore.', ''),
          muted = responseMmcoreInfo.muted,
          opc = responseMmcoreInfo.opc,
          qa_tool = responseMmcoreInfo.qa_tool,
          mm_error = responseMmcoreInfo.mm_error,
          cfgID = responseMmcoreInfo.cfgID,
          cginfo = responseMmcoreInfo.cginfo;

        if (Object.keys(genInfo).length) {
          var ul = document.createElement('ul');
          campaignInfo.style.display = "block";
          campaignInfo.appendChild(ul);
          for (var campName in genInfo) {
            var element = [];

            for (var name in genInfo[campName]) {
              element.push(name);
              element.push(genInfo[campName][name]);
            }

            var li = document.createElement('li');
            li.title = "Campaign name";
            li.innerHTML = campName;
            ul.appendChild(li);
          }
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
        document.querySelector("#under .help").addEventListener('click', function () {
          chrome.extension.sendRequest({msg: "help_btn"}, function (response) {
            //console.log(response.farewell);
          });
        });

        // Open mmcore page
        document.querySelector("#under .open_mmcore_script").addEventListener('click', function () {
          chrome.tabs.sendMessage(response.id, {msg: "open_mmcore_script"});
          window.close();
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

        // Pages
        if (cginfo) {
          cginfo.forEach(function (v, i) {
            var pageRequestDiv = document.createElement('div');
            pageRequestDiv.className = "request";
            pageRequestDiv.innerHTML = "<span>Request " + (i + 1) + "</span>";
            var ul = document.createElement('ul');
            v.Locations.forEach(function (v, i) {
              var li = document.createElement('li');
              li.innerHTML = '<div style="clear: both;">' + v.Name + '</div><div class="mask">' + v.PageMask + '</div>';
              ul.appendChild(li);
            });
            pageRequestDiv.appendChild(ul);
            pagesList.appendChild(pageRequestDiv);
          });
        }

      });
    });
});

