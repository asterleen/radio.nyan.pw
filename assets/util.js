/********************************************************
	             Status Save Functions
********************************************************/

// Check for Local Storage Availability
function isLSAvailable()
{
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}

// Get Saved Value
function getVal(key)
{
	return (localStorageAvailable) ? localStorage[key] : getCookie(key);
}

// Save a Value
function setVal(key, val)
{
	if (localStorageAvailable)
		localStorage[key] = val;
	else
	{
		setCookie(key, 'sasai_lalka', {expires:-1});
		setCookie(key, val, {expires:31536000000});
	}
}

// Cookie fallback if LocalStorage won't be available.
function getCookie(name)
{
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : null;
}

function setCookie(name, value, options)
{
    options = options || {};
    var expires = options.expires;
    if (typeof expires == "number" && expires)
    {
        var d = new Date();
        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString)
    {
        options.expires = expires.toUTCString();
    }
    value = encodeURIComponent(value);
    var updatedCookie = name + "=" + value;
    for (var propName in options)
    {
        updatedCookie += "; " + propName;
        var propValue = options[propName];
        if (propValue !== true)
        {
            updatedCookie += "=" + propValue;
        }
    }

    document.cookie = updatedCookie;
}
