(function ($, Drupal, drupalSettings) {
  Drupal.behaviors.copysafe_web_protection_embed = {
    attach: function (context) {
      //flag = 0;
      for (var val in drupalSettings.copysafe_web_protection.embed_options) {
        var wpcsw_plugin_url = drupalSettings.copysafe_web_protection.embed_options[val]['plugin_url'];
        var wpcsw_upload_url = drupalSettings.copysafe_web_protection.embed_options[val]['upload_url'];
        var m_bpDebugging = false;
        var m_szMode = drupalSettings.copysafe_web_protection.embed_options[val]['mode'];
        var m_szClassName = drupalSettings.copysafe_web_protection.embed_options[val]['name'];
        var m_szImageFolder = drupalSettings.copysafe_web_protection.embed_options[val]['upload_url'];
        var m_bpKeySafe = drupalSettings.copysafe_web_protection.embed_options[val]['keyboard'];
        var m_bpCaptureSafe = drupalSettings.copysafe_web_protection.embed_options[val]['capture'];
        var m_bpMenuSafe = drupalSettings.copysafe_web_protection.embed_options[val]['menus'];
        var m_bpRemoteSafe = drupalSettings.copysafe_web_protection.embed_options[val]['remote'];
        var m_bpWindowsOnly = true;
        var m_bpProtectionLayer = false;

        var m_bpChrome = drupalSettings.copysafe_web_protection.embed_options[val]['chrome'];
        var m_bpFx = drupalSettings.copysafe_web_protection.embed_options[val]['firefox'];
        var m_bpASPS = drupalSettings.copysafe_web_protection.embed_options[val]['asps'];
        var m_min_versionASPS = drupalSettings.copysafe_video_protection.embed_options[val]['artisbrowser_min_version'];
        var m_bpOpera = drupalSettings.copysafe_web_protection.embed_options[val]['opera'];
        var m_bpSafari = drupalSettings.copysafe_web_protection.embed_options[val]['safari'];
        var m_bpMSIE = drupalSettings.copysafe_web_protection.embed_options[val]['msie'];
        var m_szDefaultStyle = "ImageLink";
        var m_szDefaultHeight = drupalSettings.copysafe_web_protection.embed_options[val]['height'];
        var m_szDefaultWidth = drupalSettings.copysafe_web_protection.embed_options[val]['width'];
        var m_szDefaultTextColor = drupalSettings.copysafe_web_protection.embed_options[val]['text_color'];
        var m_szDefaultBorderColor = drupalSettings.copysafe_web_protection.embed_options[val]['border_color'];
        var m_szDefaultBorder = drupalSettings.copysafe_web_protection.embed_options[val]['border'];
        var m_szDefaultLoading = drupalSettings.copysafe_web_protection.embed_options[val]['loading_message'];
        var m_szDefaultLabel = "";
        var m_szDefaultLink = drupalSettings.copysafe_web_protection.embed_options[val]['hyperlink'];
        var m_szDefaultTargetFrame = drupalSettings.copysafe_web_protection.embed_options[val]['target'];
        var m_szDefaultMessage = "";

        var m_szLocation = document.location.href.replace(/&/g, '%26');
        var m_szDownloadNo = wpcsw_plugin_url + "download_no.html";
        var m_szDownload = wpcsw_plugin_url + "download.html?ref=" + m_szLocation;
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
        var m_bASPS = (((m_szAgent.indexOf("artisreader") != -1) || (m_szAgent.indexOf("artisbrowser") != -1)) && (m_bpASPS));

        var m_bNetscape = ((m_bChrome) || (m_bFirefox) || (m_bASPS));
        var m_bMicrosoft = (((m_szAgent.indexOf("msie") != -1) || (m_szAgent.indexOf("trident") != -1)) && (m_bpMSIE));

        if ((m_bWindows) && (m_bMicrosoft)) {
          m_szPlugin = "OCX";
        }
        else if ((m_bWindows) && (m_bNetscape)) {
          m_szPlugin = "DLL";
        }

        if (m_szMode === "debug") {
          m_bpDebugging = true;
        }
        // In case it's windows and browser not artisbrowser.
        if ((m_bWindows) && !(m_bASPS) && !(m_bpDebugging)) {
          window.location = unescape(m_szDownload);
          document.MM_returnValue = false;
        }

        // Not windows.
        if (!m_bWindows) {
          window.location = unescape(m_szDownloadNo);
          document.MM_returnValue = false;
        }

        // Version check.
        if ((m_bWindows) && (m_bASPS)) {
          // Get the artisBrowser version.
          var arVersion = get_artisBrowser_version();
          var szNumeric = "" + arVersion[0] + "." + arVersion[1];
          if (versionCompare(szNumeric, m_min_versionASPS) < 0) {
            window.location = unescape(m_szDownload);
            document.MM_returnValue = false;
          }
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

        //var output = 'output' + flag;
        var output = drupalSettings.copysafe_web_protection.embed_options[val]['outputid'];

        // if (m_bpDebugging == true) {
        //document.getElementById(output).innerHTML = "UserAgent= " +
        // m_szAgent + "<br>"); jQuery('#'+output).html("Browser= " +
        // m_szBrowserName + "<br>"); jQuery('#'+output).html("Platform= " +
        // m_szPlatform + "<br>"); jQuery('#'+output).html("Referer= " +
        // m_szLocation + "<br>");
        // }

        if ((m_szMode == "licensed") || (m_szMode == "debug")) {
          insertCopysafeWeb(m_szClassName, m_szDefaultHeight, m_szDefaultWidth, m_szDefaultBorder, m_szPlugin, wpcsw_plugin_url, output, m_bpProtectionLayer, m_bpKeySafe, m_bpCaptureSafe, m_bpMenuSafe, m_bpRemoteSafe, m_szDefaultTextColor, m_szDefaultBorderColor, m_szDefaultBorder, m_szDefaultLoading, m_szDefaultLink, m_szDefaultTargetFrame, m_szImageFolder, m_bpDebugging);
        }
        else {
          document.getElementById(output).innerHTML = "<img src='" + wpcsw_plugin_url + "images/image_placeholder.jpg' border='0' alt='Demo mode'>";
        }
        //flag = flag + 1;
      }
    }
  };

  function testCSS(prop) {
    return prop in document.documentElement.style;
  }

  /**
   * Function to get browser version.
   * @returns {number[]}
   */
  function get_artisBrowser_version() {
    var uMatch = navigator.userAgent.match(/ArtisBrowser\/(.*)$/), ffVersion;
    if (uMatch && uMatch.length > 1) {
      ffVersion = uMatch[1].split(' ')[0];
    }
    var AC = [0, 0], ix1 = 0, ix2 = 0;
    if (ffVersion.length > 0) {
      ix1 = ffVersion.indexOf(".");
      ix2 = ffVersion.indexOf(".", ix1 + 1);
      if (ix1 != -1 && ix2 != -1) {
        AC[0] = parseInt(ffVersion.slice(0, ix1));
        AC[1] = parseInt(ffVersion.slice(ix1 + 1, ix2));
        // AC[2] = parseInt(ffVersion.slice(ix2 + 1));
      }
    }
    return AC;
  }

  /**
   * Compares two software version numbers (e.g. "1.7.1")
   *
   * @param v1
   * @param v2
   * @param options
   * @returns {number}
   * <ul>
   *    <li>0 if the versions are equal</li>
   *    <li>a negative integer iff v1 < v2</li>
   *    <li>a positive integer iff v1 > v2</li>
   *    <li>NaN if either version string is in the wrong format</li>
   * </ul>
   */
  function versionCompare(v1, v2, options) {
    var lexicographical = options && options.lexicographical,
      zeroExtend = options && options.zeroExtend,
      v1parts = v1.split('.'),
      v2parts = v2.split('.');

    function isValidPart(x) {
      return (lexicographical ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(x);
    }

    if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
      return NaN;
    }

    if (zeroExtend) {
      while (v1parts.length < v2parts.length) {
        v1parts.push("0");
      }
      while (v2parts.length < v1parts.length) {
        v2parts.push("0");
      }
    }

    if (!lexicographical) {
      v1parts = v1parts.map(Number);
      v2parts = v2parts.map(Number);
    }

    for (var i = 0; i < v1parts.length; ++i) {
      if (v2parts.length == i) {
        return 1;
      }
      if (v1parts[i] == v2parts[i]) {
        continue;
      }
      else if (v1parts[i] > v2parts[i]) {
        return 1;
      }
      else {
        return -1;
      }
    }
    if (v1parts.length != v2parts.length) {
      return -1;
    }
    return 0;
  }

  function bool2String(bValue) {
    if (bValue == true) {
      return "1";
    }
    else {
      return "0";
    }
  }

  function paramValue(szValue, szDefault) {
    if (szValue.toString().length > 0) {
      return szValue;
    }
    else {
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

    // Extract the image width and height from the image name (example name:
    // zulu580_0580_0386_C.class)

    var nIndex = szImageName.lastIndexOf('_C.');
    if (nIndex == -1) {
      // Strange filename that doesn't conform to the copysafe standard. Can't
      // render it.
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
})(jQuery, Drupal, drupalSettings);
