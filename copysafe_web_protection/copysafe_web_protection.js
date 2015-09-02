(function () {
  Drupal.behaviors.copysafe_web_protection_embed = {
    attach: function(context) {
      flag = 0;
      for (var val in Drupal.settings.copysafe_web_protection.embed_options) {
        var wpcsw_plugin_url = Drupal.settings.copysafe_web_protection.embed_options[val]['plugin_url'];
        var wpcsw_upload_url = Drupal.settings.copysafe_web_protection.embed_options[val]['upload_url'];
        var m_bpDebugging = false;
        var m_szMode = Drupal.settings.copysafe_web_protection.embed_options[val]['mode'];
        var m_szClassName = Drupal.settings.copysafe_web_protection.embed_options[val]['name'];
        var m_szImageFolder = Drupal.settings.copysafe_web_protection.embed_options[val]['upload_url'];
        var m_bpKeySafe = Drupal.settings.copysafe_web_protection.embed_options[val]['keyboard'];
        var m_bpCaptureSafe = Drupal.settings.copysafe_web_protection.embed_options[val]['capture'];
        var m_bpMenuSafe = Drupal.settings.copysafe_web_protection.embed_options[val]['menus'];
        var m_bpRemoteSafe = Drupal.settings.copysafe_web_protection.embed_options[val]['remote'];
        var m_bpWindowsOnly = true;
        var m_bpProtectionLayer = false;

        var m_bpChrome = Drupal.settings.copysafe_web_protection.embed_options[val]['chrome'];
        var m_bpFx = Drupal.settings.copysafe_web_protection.embed_options[val]['firefox'];
        var m_bpASPS = Drupal.settings.copysafe_web_protection.embed_options[val]['asps'];
        var m_bpOpera = Drupal.settings.copysafe_web_protection.embed_options[val]['opera'];
        var m_bpSafari = Drupal.settings.copysafe_web_protection.embed_options[val]['safari'];
        var m_bpMSIE = Drupal.settings.copysafe_web_protection.embed_options[val]['msie'];
        var m_szDefaultStyle = "ImageLink";
        var m_szDefaultHeight = Drupal.settings.copysafe_web_protection.embed_options[val]['height'];
        var m_szDefaultWidth = Drupal.settings.copysafe_web_protection.embed_options[val]['width'];
        var m_szDefaultTextColor = Drupal.settings.copysafe_web_protection.embed_options[val]['text_color'];
        var m_szDefaultBorderColor = Drupal.settings.copysafe_web_protection.embed_options[val]['border_color'];
        var m_szDefaultBorder = Drupal.settings.copysafe_web_protection.embed_options[val]['border'];
        var m_szDefaultLoading = Drupal.settings.copysafe_web_protection.embed_options[val]['loading_message'];
        var m_szDefaultLabel = "";
        var m_szDefaultLink = Drupal.settings.copysafe_web_protection.embed_options[val]['hyperlink'];
        var m_szDefaultTargetFrame = Drupal.settings.copysafe_web_protection.embed_options[val]['target'];
        var m_szDefaultMessage = "";

        var m_szLocation = document.location.href.replace(/&/g,'%26');
        var m_szDownloadNo = wpcsw_plugin_url + "download_no.html";
        var m_szDownloadIE = wpcsw_plugin_url + "download_ie.html?ref=" + m_szLocation;
        var m_szDownloadFX = wpcsw_plugin_url + "download_fx.html?ref=" + m_szLocation;
        var m_nV1 = 4;
        var m_nV2 = 7;
        var m_nV3 = 2;
        var m_nV4 = 0;
        var m_szAgent = navigator.userAgent.toLowerCase();
        var m_szBrowserName = navigator.appName.toLowerCase();
        var m_szPlatform = navigator.platform.toLowerCase();
        var m_bNetscape = false;
        var m_bMicrosoft = false;
        var m_szPlugin = "";
        var m_bWin64 = ((m_szPlatform == "win64") || (m_szPlatform.indexOf("win64") != -1) || (m_szAgent.indexOf("win64") != -1));
        var m_bWin32 = ((m_szPlatform == "win32") || (m_szPlatform.indexOf("win32") != -1));
        var m_bWindows = (m_szAgent.indexOf("windows nt") != -1);

        var m_bOpera = ((m_szAgent.indexOf("opera") != -1) && !!(window.opera && window.opera.version) && (m_bpOpera));
        var m_bFx3 = ((m_szAgent.indexOf("firefox/3.") != -1) && (m_szAgent.indexOf("flock") == -1) && (m_szAgent.indexOf("navigator") == -1));
        var m_bFx4 = ((m_szAgent.indexOf("firefox/4.") != -1) && (m_szAgent.indexOf("flock") == -1) && (m_szAgent.indexOf("navigator") == -1));
        var m_bFirefox = ((m_szAgent.indexOf("firefox") != -1) && testCSS("MozBoxSizing") && (!(m_bFx3)) && (!(m_bFx4)) && (m_bpFx));
        var m_bSafari = ((m_szAgent.indexOf("safari") != -1) && Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0 && (m_bpSafari));
        var m_bChrome = ((m_szAgent.indexOf("chrome") != -1) && !!(window.chrome && chrome.webstore && chrome.webstore.install) && (m_bpChrome));
        var m_bASPS = ((m_szAgent.indexOf("artisreader/2") != -1) && (m_bpASPS));

        var m_bNetscape = ((m_bChrome) || (m_bFirefox) || (m_bASPS) || (m_bOpera) || (m_bSafari));
        var m_bMicrosoft = (((m_szAgent.indexOf("msie") != -1) || (m_szAgent.indexOf("trident") != -1)) && (m_bpMSIE));

        if (m_szMode == "debug") {
          m_bpDebugging = true;
        }

        if ((m_bpCaptureSafe == "1") && (m_bpKeySafe == "1")) {
          var cswbody = document.getElementsByTagName("body")[0];
          cswbody.setAttribute("onselectstart", "return false;");
          cswbody.setAttribute("ondragstart", "return false");
          cswbody.setAttribute("onmousedown", "if (event.preventDefault){event.preventDefault();}");
          cswbody.setAttribute("onBeforePrint", "document.body.style.display = '';");
          cswbody.setAttribute("onContextmenu", "return false;");
          cswbody.setAttribute("onClick", "if(event.button == 2||event.button == 3){event.preventDefault();event.stopPropagation();return false;}");
        }
        else if ((m_bpCaptureSafe == "1") && (m_bpKeySafe != "1")) {
          var cswbody = document.getElementsByTagName("body")[0];
          cswbody.setAttribute("onselectstart", "return false;");
          cswbody.setAttribute("ondragstart", "return false");
          cswbody.setAttribute("onBeforePrint", "document.body.style.display = '';");
          cswbody.setAttribute("onContextmenu", "return false;");
          cswbody.setAttribute("onClick", "if(event.button == 2||event.button==3){event.preventDefault();event.stopPropagation();return false;}");
        }

        var arVersion = CopysafeVersionCheck();
        var szNumeric = "" + arVersion[0] + "." + arVersion[1] + "." + arVersion[2];

        if ((m_bWindows) && (m_bMicrosoft)) {
          m_szPlugin = "OCX";
          if ((arVersion[0] < m_nV1) || (arVersion[0] == m_nV1 && arVersion[1] < m_nV2) || (arVersion[0] == m_nV1 && arVersion[1] == m_nV2 && arVersion[2] < m_nV3)) {
            window.location = unescape(m_szDownloadIE);
            document.MM_returnValue = false;
          }
        }
        else if ((m_bWindows) && (m_bNetscape)) {
          m_szPlugin = "DLL";
          if ((arVersion[0] < m_nV1) || (arVersion[0] == m_nV1 && arVersion[1] < m_nV2) || (arVersion[0] == m_nV1 && arVersion[1] == m_nV2 && arVersion[2] < m_nV3)) {
            window.location = unescape(m_szDownloadFX);
            document.MM_returnValue = false;
          }
        }
        else {
          window.location = unescape(m_szDownloadNo);
          document.MM_returnValue = false;
        }

        var output = 'output' + flag;

        if (m_bpDebugging == true) {
          //document.getElementById(output).innerHTML = "UserAgent= " + m_szAgent + "<br>");
          //jQuery('#'+output).html("Browser= " + m_szBrowserName + "<br>");
          //jQuery('#'+output).html("Platform= " + m_szPlatform + "<br>");
          //jQuery('#'+output).html("Referer= " + m_szLocation + "<br>");
        }

        if ((m_szMode == "licensed") || (m_szMode == "debug")) {
          insertCopysafeWeb(m_szClassName, m_szDefaultHeight, m_szDefaultWidth, m_szDefaultBorder, m_szPlugin, wpcsw_plugin_url, output,m_bpProtectionLayer, m_bpKeySafe, m_bpCaptureSafe, m_bpMenuSafe, m_bpRemoteSafe, m_szDefaultTextColor, m_szDefaultBorderColor, m_szDefaultBorder, m_szDefaultLoading, m_szDefaultLink, m_szDefaultTargetFrame, m_szImageFolder, m_bpDebugging);
        }
        else {
          document.getElementById(output).innerHTML = "<img src='" + wpcsw_plugin_url + "images/image_placeholder.jpg' border='0' alt='Demo mode'>";
        }
        flag = flag + 1;
      }
    }
  };

  function testCSS(prop) {
    return prop in document.documentElement.style;
  }

  function CopysafeVersionCheck() {
    var v = typeof document.getElementById != "undefined" && typeof document.getElementsByTagName != "undefined" && typeof document.createElement != "undefined";
    var AC = [0,0,0];
    var x = "";

    if (typeof navigator.plugins != "undefined" && navigator.plugins.length > 0) {

      // Chrome, firefox, mozilla
      navigator.plugins.refresh(false);

      var szDescription = "ArtistScope Plugin 5";
      var szVersionMatch = "Plugin 5 v";

      if (typeof navigator.plugins[szDescription] == "object") {
        x = navigator.plugins[szDescription].description;
        ix = x.indexOf(szVersionMatch);
        if (ix > -1) {
          x = x.slice(ix + szVersionMatch.length);
        } else {
          x = "";
        }
      }
    }
    else if (typeof window.ActiveXObject != "undefined") {

      // Internet explorer
      var y = null;

      try {
        y = new ActiveXObject("ARTISTSCOPE.ArtistScopeCtrl")
        x = y.GetVersion();
      }
      catch (t)
      {
      }
    }

    if (x.length > 0) {
      ix1 = x.indexOf(".");
      ix2 = x.indexOf(".", ix1 + 1);

      if (ix1 != -1 && ix2 != -1) {
        AC[0] = parseInt(x.slice(0, ix1));
        AC[1] = parseInt(x.slice(ix1 + 1, ix2));
        AC[2] = parseInt(x.slice(ix2 + 1));
      }
    }
    return AC;
  }

  function bool2String(bValue) {
    if (bValue == true) {
      return "1";
    } else {
      return "0";
    }
  }

  function paramValue(szValue, szDefault) {
    if (szValue.toString().length > 0) {
      return szValue;
    } else {
      return szDefault;
    }
  }

  function expandNumber(nValue, nLength) {
    var szValue = nValue.toString();
    while (szValue.length < nLength) {
      szValue = "0" + szValue;
    }
    return szValue;
  }

  function escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
   }

  // The copysafe-insert functions
  function insertCopysafeWeb(m_szClassName, szHeight, szWidth, m_szDefaultBorder, m_szPlugin, wpcsw_plugin_url, output, m_bpProtectionLayer, m_bpKeySafe, m_bpCaptureSafe, m_bpMenuSafe, m_bpRemoteSafe, m_szDefaultTextColor, m_szDefaultBorderColor, m_szDefaultBorder, m_szDefaultLoading, m_szDefaultLink, m_szDefaultTargetFrame, m_szImageFolder, m_bpDebugging) {

    szImageName = m_szClassName;

    // Extract the image width and height from the image name (example name: zulu580_0580_0386_C.class)

    var nIndex = szImageName.lastIndexOf('_C.');
    if (nIndex == -1) {
      // Strange filename that doesn't conform to the copysafe standard. Can't render it.
      return;
    }

    if (szHeight == "") {
      var szHeight = szImageName.substring(nIndex - 4, nIndex);
    }

    if (szWidth == "") {
      var szWidth = szImageName.substring(nIndex - 9, nIndex - 5);
    }

    var nWidth = szWidth * 1;
    var nHeight = szHeight * 1;

    // Expand width and height to allow for border
    var nBorder = m_szDefaultBorder * 1;
    var nWidth = nWidth + (nBorder * 2);
    var nHeight = nHeight + (nBorder * 2);
    var textarea = "ta" + output;

    szTextColor = "";
    szBorderColor = "";
    szLoading = "";
    szLink = "";
    szTargetFrame = "";
    szObjectInsert = "type='application/x-artistscope-firefox5' codebase='" + wpcsw_plugin_url + "download_fx.php' ";

    var string = "<ob" + "ject id='CopysafeObject' " + szObjectInsert + " width='" + nWidth + "' height='" + nHeight + "'><param name='KeySafe' value='" + bool2String(m_bpKeySafe) + "' /><param name='CaptureSafe' value='" + bool2String(m_bpCaptureSafe) + "' /><param name='MenuSafe' value='" + bool2String(m_bpMenuSafe) + "' /><param name='RemoteSafe' value='" + bool2String(m_bpRemoteSafe) + "' /><param name='Style' value='ImageLink' /><param name='TextColor' value='" + paramValue(szTextColor, m_szDefaultTextColor) + "' /><param name='BorderColor' value='" + paramValue(szBorderColor, m_szDefaultBorderColor) + "' /><param name='Border' value='" + paramValue(nBorder, m_szDefaultBorder) + "' /><param name='Loading' value='" + paramValue(szLoading, m_szDefaultLoading) + "' /><param name='Label' value='' /><param name='Link' value='" + paramValue(szLink, m_szDefaultLink) + "' /><param name='TargetFrame' value='" + paramValue(szTargetFrame, m_szDefaultTargetFrame) + "' /><param name='Message' value='' /><param name='FrameDelay' value='2000' /><param name='FrameCount' value='1' /><param name='Frame000' value='" + m_szImageFolder + m_szClassName + "' /></ob" + "ject />";

    if (m_bpDebugging == true) {
      jQuery('#' + output).append("<textarea rows='27' cols='80' id= '" + textarea + "'>");
      if ((m_szPlugin == "DLL") || (m_szPlugin == "OCX")) {
        var szObjectInsert = "";
        if (m_szPlugin == "DLL") {
          jQuery('#' + textarea).append(escapeHtml(string));
          if (m_bpProtectionLayer) {
            jQuery('#' + textarea).append(escapeHtml("<param name='ProtectionActivated' value='OnProtectionActivated()' />"));
          }
        }
        else if (m_szPlugin == "OCX") {
          szObjectInsert = "classid='CLSID:46C73251-78A3-43C8-BA64-A18B29314D69'";
          jQuery('#' + textarea).append(escapeHtml(string));
        }
      }
      jQuery('#' + output).append("</textarea>");
    }
    else {
      if ((m_szPlugin == "DLL") || (m_szPlugin == "OCX")) {
        var szObjectInsert = "";
        if (m_szPlugin == "DLL") {
          jQuery('#' + output).html(string);
          if (m_bpProtectionLayer) {
            jQuery('#' + output).append(escapeHtml("<param name='ProtectionActivated' value='OnProtectionActivated()' />"));
          }
        }
        else if (m_szPlugin == "OCX") {
          szObjectInsert = "classid='CLSID:46C73251-78A3-43C8-BA64-A18B29314D69'";
          jQuery('#' + output).html(string);
        }
      }
    }
  }
})(jQuery);
