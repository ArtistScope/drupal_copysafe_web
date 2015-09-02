/**
 * Behavior to add "Insert" buttons.
 */

(function ($) {

  $.fn.insertAtCursorCopysafe = function (tagName) {
    return this.each(function(){
      if (document.selection) {
        //IE support
        this.focus();
        sel = document.selection.createRange();
        sel.text = tagName;
        this.focus();
      } else if (this.selectionStart || this.selectionStart == '0') {
        //MOZILLA/NETSCAPE support
        startPos = this.selectionStart;
        endPos = this.selectionEnd;
        scrollTop = this.scrollTop;
        this.value = this.value.substring(0, startPos) + tagName + this.value.substring(endPos,this.value.length);
        this.focus();
        this.selectionStart = startPos + tagName.length;
        this.selectionEnd = startPos + tagName.length;
        this.scrollTop = scrollTop;
      } else {
        this.value += tagName;
        this.focus();
      }
    });
  };

  Drupal.behaviors.copysafewebfilelink = {
    attach: function(context) {
      // Add the click handler to the insert button.
      if(!(typeof(Drupal.settings.copysafe_web_protection) == 'undefined')) {
        for(var key in Drupal.settings.copysafe_web_protection.buttons) {
          $("." + key, context).click(insert);
        }
      }

      function insert() {
        var field = "[copysafe_web_protection name='" + $(this).html() + "'";
        for (var key in Drupal.settings.copysafe_web_protection.values) {
          field += " ";
          field += key + "='" + Drupal.settings.copysafe_web_protection.values[key] + "' ";
        }
        field += "]";
        $('#' + Drupal.settings.copysafe_web_protection.clicked).insertAtCursorCopysafe(field);
        Drupal.CTools.Modal.dismiss();
        return false;
      }
    }
  };

  /**
   * Behavior to add "Custom Insert" buttons.
   */
  Drupal.behaviors.copysafewebcustominsert = {
    attach: function(context) {

      // Add the click handler to the insert button.
      $("#edit-insertcode", context).click(insertcode);

      function insertcode() {
        var capture = "capture='" + 0 + "' ";
        var keyboard = "keyboard='" + 0 + "' ";
        var menus = "menus='" + 0 + "' ";
        var remote = "remote='" + 0 + "' ";

        var height = "height='" + $('#edit-height').val() + "' ";
        var width = "width='" + $('#edit-width').val() + "' ";
        var border = "border='" + $('#edit-bordersize').val() + "' ";
        var bordercolor = "border_color='" + $('#edit-bordercolor').val() + "' ";

        if ($('#edit-prevent-capture').is(':checked') == true) {
          var capture = "capture='" + 1 + "' ";
        }

        if ($('#edit-prevent-keyboard').is(':checked') == true) {
          var keyboard = "keyboard='" + 1 + "' ";
        }

        if ($('#edit-prevent-menus').is(':checked') == true) {
          var menus = "menus='" + 1 + "' ";
        }

        if ($('#edit-prevent-remote').is(':checked') == true) {
          var remote = "remote='" + 1 + "' ";
        }

        var textcolor = "text_color='" + $('#edit-textcolor').val() + "' ";
        var loading = "loading_message='" + $('#edit-loading').val() + "' ";
        var hyperlink = "hyperlink='" + $('#edit-hyperlink').val() + "' ";
        var target = "target='" + $('#edit-target').val() + "' ";

        var field = "[copysafe_web_protection name='" + $('#edit-filename').val() + "' ";
        field += width + height + border + bordercolor + capture + keyboard + menus + remote + textcolor + loading + hyperlink + target;
        field += "]";
        $('#' + Drupal.settings.copysafe_web_protection.clicked).insertAtCursorCopysafe(field);
        Drupal.CTools.Modal.dismiss();
      }
    }
  };
})(jQuery);
