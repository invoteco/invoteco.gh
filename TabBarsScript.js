
var isFading = true; //Определяет, должен-ли контент появляться постепенно.
var n = 7;//Количество вкладок

function IsCookieEnabled() {
    if (typeof (navigator.cookieEnabled) != "undefined") {
        return navigator.cookieEnabled;
    } else {
        var tmpCookie = "testCookieForCheck";
        SetCookie(tmpCookie, "1");
        if (GetCookie(tmpCookie) != null) {
            DeleteCookie(tmpCookie);
            return true;
        }
        return false;
    }
}

function getCookie(name) {
    var cookie = " " + document.cookie;
    var search = " " + name + "=";
    var setStr = null;
    var offset = 0;
    var end = 0;
    if (cookie.length > 0) {
        offset = cookie.indexOf(search);
        if (offset != -1) {
            offset += search.length;
            end = cookie.indexOf(";", offset)
            if (end == -1) {
                end = cookie.length;
            }
            setStr = unescape(cookie.substring(offset, end));
        }
    }
    return (setStr);
}

function setCookie(name, value, expires, path, domain, secure) {
    document.cookie = name + "=" + escape(value) +
        ((expires) ? "; expires=" + expires : "") +
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain : "") +
        ((secure) ? "; secure" : "");
}

function restoreState(tabbarnumber, tabscount, tabprefix, divprefix, cookiename) {
    isCookieSupport = false;
    isCookieSupport = IsCookieEnabled();
    if (isCookieSupport == true) {
        var c = getCookie(cookiename);
        if ((c == "undefined") || (c == null)) {
            c = tabprefix + "0";
        } else {
            c = getCookie(cookiename).toString();
        }
        setTabState(tabbarnumber, c, true)
        setContent(tabbarnumber, tabscount, tabprefix, divprefix);

    } else {
        alert('Cookie не поддерживаются.');
    }
}

function stringIdTonumber(stringId) {
    stringId = stringId.slice(stringId.length - 4); //tabBar0_tab0 --> tab0
    var pos = stringId.length - 1;
    return parseInt(stringId.charAt(pos), 10);
}

function numberIdToStringId(tabprefix, numberId) {
    return tabprefix + numberId.toString();
}


function getTabState(tabbarnumber, tabprefix, i){
    var tab = (document.all) ? document.all(tabprefix + i.toString()) : document.getElementById(tabprefix + i.toString());
    var state = false;
    if (tab.className == 'ATab' + i.toString()) {
        state = true;
    } else { state = false };
    return state;
}

function setTabState(tabbarnumber, sid, state) {
    var tab = (document.all) ? document.all(sid) : document.getElementById(sid);  
    if (state == true) {
        tab.className = "ATab" + tabbarnumber.toString();
    } else {
        tab.className = "ITab" + tabbarnumber.toString();
    }
}

// getTabState(1, 'tabBar1_tab', 0)

function changeState(tabbarnumber, tabscount, elemID, tabprefix, divprefix) {
    var nid = stringIdTonumber(elemID);
    for (var i = 0; i < tabscount; i++) {
        if (i == nid) {
            setTabState(tabbarnumber, numberIdToStringId(tabprefix, i), true);
        } else {
            setTabState(tabbarnumber, numberIdToStringId(tabprefix, i), false);
        }
    }
    setContent(tabbarnumber, tabscount, tabprefix, divprefix);
}

function setContent(tabbarnumber, tabscount, tabprefix, divprefix) {
    for (var i = 0; i < tabscount; i++) {
        var tab = (document.all) ? document.all(tabprefix + i.toString()) : document.getElementById(tabprefix + i.toString());
        if (tab.className == ("ITab" + tabbarnumber.toString())) {
            var div = (document.all) ? document.all(divprefix + i.toString()) : document.getElementById(divprefix + i.toString());
            if (isFading) { fade(divprefix + i.toString(), 100, 0, 1200); }

            div.className = "IContent" + tabbarnumber.toString();
        } else {
            var div1 = (document.all) ? document.all(divprefix + i.toString()) : document.getElementById(divprefix + i.toString());
            if (isFading) { fade(divprefix + i.toString(), 0, 100, 1200); }
            div1.className = "AContent" + tabbarnumber.toString();
        }
    }
}

function setOpacity(eID, opacityLevel) {
    var eStyle = document.getElementById(eID).style;
    eStyle.opacity = opacityLevel / 100;
    eStyle.filter = 'alpha(opacity=' + opacityLevel + ')';
}

function fade(eID, startOpacity, stopOpacity, duration) {
    var speed = Math.round(duration / 100);
    var timer = 0;
    if (startOpacity < stopOpacity) {
        for (var i = startOpacity; i <= stopOpacity; i++) {
            setTimeout("setOpacity('" + eID + "'," + i + ")", timer * speed);
            timer++;
        }
        return;
    }
    for (var i = startOpacity; i >= stopOpacity; i--) {
        setTimeout("setOpacity('" + eID + "'," + i + ")", timer * speed);
        timer++;
    }
}