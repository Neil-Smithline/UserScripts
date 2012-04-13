// ==UserScript==
// @id             www.neilsmithline.com-40efcea0-d49a-564f-a845-37fc2faa7ee02@scriptish
// @name           AMO: Up Top Version Info
// @version        0.0.0.1
// @namespace      com.neilsmithline
// @author         Neil Smithline
// @description    Show version information at the top of AMO add-on pages.
// @include        https://addons.mozilla.org/en*/*/addon/*
// @exclude        
// @run-at         document-end
// ==/UserScript==

function foo () {
  var info_all = document.getElementsByClassName("info").item(0).cloneNode();
  var info = info_all.getElementsByTagName("H3")[0];
  var install = document.getElementsByClassName("install-shell").item(0);
  
  install.appendChild(info);

  var style = document.createAttribute("style");
  style.nodeValue = "width:400px;margin-top:3px;float:right;border:3px solid #489615;padding:6px;background-color: #EEFFEE;";
  info.attributes.setNamedItem(style);
 } 
foo();

