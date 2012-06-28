// ==UserScript==
// @id             www.neilsmithline.com-40efcea0-d49a-564f-a845-37fc2faa7ee01@scriptish
// @name           Timely Google Search: Last Year
// @version        0.0.1
// @namespace      com.neilsmithline
// @author         Neil Smithline http://www.neilsmithline.com
// @developer      Neil Smithline http://www.neilsmithline.com
// @description    Make Google searches default to current year rather than forever
// @updateURL      https://raw.github.com/Neil-Smithline/UserScripts/master/timely-google-search-year.user.js 
// @supportURL     https://github.com/Neil-Smithline/UserScripts/issues
// @domain         www.google.com 
// @include        https?://www.google.com/search/.*q=*
// @exclude        *&tbs=qdr*
// @run-at         document-start
// ==/UserScript==

function set_time_restriction (timeString) {
    document.location = document.location + "&tbs=qdr:" + timeString;
    // GM_notification("Google search restricted to previous 12 months.");
}

set_time_restriction(GM_getValue("timeSpan", "y"));
