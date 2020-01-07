# CopySafe Web Protection Drupal 8 Module



## Overview
CopySafe Web provides the most secure image protection imaginable. CopySafe Web images cannot be saved, downloaded, copied or captured. Nor can the images stored on the server be used anywhere else except for display on your web pages.



1. Download the module to your local machine as a zip file package. 

2. Unzip the CopySafe Web module into modules/ folder.
 
3. Go to Administration » Modules, then enable CopySafe Web module. 

4. Go to Configuration page. Under “CONTENT AUTHORING” section click “Text Formats”. Click “configure” button against Full HTML (important) under “Operations” column
 
5. Enable " Enable CopySafeWeb tag replacement" filter and Drag it to first in the filter processing order.



## CopySafe Web Drupal Module Modes
There are 3 mode settings to choose from in the module's default settings:
   


* Demo : This option will add a placeholder image at the designated location. 

* Licensed : To use encrypted images created by the CopySafe Web software. 

* Debug : Use this option to check the HTML code that is added. 



## Using the CopySafe Web Drupal Module 


1. Goto Configuration » CopySafe Web screen. 

2. Here, you can upload and embed a CopySafe Web protected image. When inserting a protected image object, the necessary short code is generated and then can be inserted manually into the post editor.
 
3. You can upload new image class files or select from a list of already uploaded class files. After selecting an image class file you can then set the security options to apply to the page such as:

    
   * Enable or disable protection from PrintScreen and screen capture.
    
   * Enable or disable the viewing by computers using remote or virtual connections.
    
   * Enable or disable use of browser menus.
    
   * Enable or disable use of the keyboard.
   

 
*Note: that you can only upload protected image that have a [.class] file module. 

Until you have a CopySafe Web software license and real encrypted images, or if you just want to use this Nuke module in demo mode to add protection from right-mouse click and drag-and-drop, you can use the encrypted image included with the download or this one. While this 20 x 20 pixel image may not be registered for your website on the Internet, it will function on any test server running at localhost. When prompted to upload or select your first image, you use this one to get started.



CopySafe Web encrypted images can be be displayed at their original size (calculated from the file name) or they can be rescaled by setting width and height in the shortcode.