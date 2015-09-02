drupal_copysafe_web
===================

Drupal module for Copysafe Web

DESCRIPTION
-----------------------

This module allows you to use Copysafe Web images in Drupal web pages using both plain text and wysiwyg textareas. Embedding is possible in three modes:

*  Demo Mode - displays placeholder image for testing. 
*  Licensed Mode - displays the object tag HTML for encrypted images. 
*  Debugging Mode - displays the object tag HTML in a text area to check ourput.

REQUIREMENTS
---------------------------

* Drupal 7
* cTools module. See http://drupal.org/project/ctools for further information.
* CopySafe Web software to encrypt images. See http://www.artistscope.com

INSTALLATION
------------------------

1. Unzip/upload cTools module to /sites/all/modules.
2. Unzip/upload the Copysafe Web module into /sites/all/modules.
3. Go to Administration » Modules, then enable CopySafe Web module as CopySafe Web module requires cTools module it will ask confirmation to enable cTools module.
4. Go to Configuration » CONTENT AUTHORING - click 'Text Formats'. Click 'configure' button against Full HTML under 'Operations' column. Enable Copysafe Web and Drag it to first in the filter processing order.

CONFIGURATION
----------------------------

* Enable CopySafe Web as above and #4.
* Add Upload Folder and other settings in Administration » Configuration » Media » CopySafe Web » CopySafe Web Settings.

USAGE
-----------

* You can see 'Embed Copysafe Web Image' above the textarea, which can upload files and embed image to the textarea.
* There is 'Embed Options' where you can add file embed options.
* You can also Upload Files at Administration » Configuration » Media » CopySafe Web » CopySafe Web Files.

DEPENDENCIES
---------------------------

* cTools

LICENSING
------------------

This Drupal module is provided for free and "as is" without warranty.

To encrypt images and add copy protection using this module, a license is required for the CopySafe Web software which can be licensed per domain
from http://www.artistscope.com/
