// ==UserScript==
// @id             www.neilsmithline.com-amo-up-top-version-info@scriptish
// @name           AMO: Up Top Version Info
// @version        0.0.0.1
// @namespace      com.neilsmithline
// @author         Neil Smithline
// @description    Show version information at the top of AMO add-on pages.
// @include        https?://addons.mozilla.org/[^/]+/[^/+]/addon/[^/]+/?
// @exclude
// @run-at         document-idle
// ==/UserScript==

// The "theme" constructor.
function theme(printName, borderColor, backgroundColor) {
    this.printName = printName;
    this.borderColor = borderColor;
    this.backgroundColor = backgroundColor;
}

// Sets current theme based on keyword. Currently only built-in themes
// are supported.
function chooseTheme(themeKeyword) {
    switch (themeKeyword) {
    case "green":
        return (new theme("Green Theme", "#489615", "#EEFFEE"));
        break;
    case "blue":
        return (new theme("Blue Theme", "#79A2D8", "#DDEEFF"));
        break;
    case "red":
        return (new theme("Red Theme", "#D65555", "#FFEEEE"));
        break;
    case "gray":
        return (new theme("Gray Theme", "#777777", "#EEEEEE"));
        break;
    default:
        alert("Unknown theme " + themeKeyword + ". Using the Blue Theme instead.");
        return (chooseTheme("blue"));
    }
}

// Based on code from http://bit.ly/J9NJgy.
function getElementWidth (element) {
    if (typeof element.clip !== "undefined") {
        return element.clip.width;
    } else {
        if (element.style.pixelWidth) {
            return element.style.pixelWidth;
        } else {
            return element.offsetWidth;
        }
    }
}


var extra_space = 50;       // Space to avoid a crowded look or CSS overflow
var width_minimum = 150;    // Minimum width we'll allow

// Duplicate the version info at the top of the page and theme it
// based on the theme Object parameter.
function duplicateVersionInfo (curTheme) {
    // Duplicate version "info" next to "install" button
    var info_all = document.getElementsByClassName("info").item(0).cloneNode();
    var info = info_all.getElementsByTagName("H3")[0];
    var install_shell = document.getElementsByClassName("install-shell")[0];
    var button = install_shell.getElementsByClassName("install")[0];

    // Insert the version info
    install_shell.insertBefore(info, button);

    // Calculate the width for the install info
    var total_width = getElementWidth(install_shell);
    var button_width = getElementWidth(button);

    // We leave extra_space pixels for padding and to prevent things
    // looking crowded and then use all the remaining space with a
    // minimum of width_minimum.
    var our_width = Math.max(total_width - button_width - extra_space, width_minimum);

    // Stylize the version info with a box based on the theme and the
    // appropriate width
    var style = document.createAttribute("style");
    style.nodeValue = "margin-top:3px; float:right; padding:6px;" +
        "width:" + our_width + "px;" +
        "border:3px solid " + curTheme.borderColor + ";" +
        "background-color: " + curTheme.backgroundColor + ";";
    info.attributes.setNamedItem(style);

    // Our duplicated version info is not getting matched by the same
    // CSS rules that the standard version info uses. We are missing a
    // separator between the release date and the add-on size and a
    // break after the newline size. Rather than monkey with the CSS
    // code we just tweak the HTML to produce the right output.
    var filesize = info.getElementsByClassName("filesize").item(0);
    var parent = filesize.parentNode;

    // Insert the separator.
    var separator = document.createTextNode(" - ");
    parent.insertBefore(separator, filesize);

    // Insert the line break.
    var br = document.createElement("BR");
    parent.appendChild(br);
}

duplicateVersionInfo(chooseTheme("blue"));
