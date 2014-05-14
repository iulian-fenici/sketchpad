/*
	Modernizr.upgrade({
		message: "This app uses features not available in your browser.<br>Please consider upgrading:",
		browsers: "C21,F17"
	});
*/

if (typeof(Modernizr) === "undefined") Modernizr = {};

Modernizr.upgrade = function(conf) {
	if (typeof(conf) === "string") conf = { message: conf };
	///
	var browsers = {
		"Chrome": {
			"description": "Runs websites and applications with lightning speed.",
			"stable": {
				"ver": "29",
				"url": "http://www.google.com/chrome"
			}
		},
		"Firefox": {
			"description": "Firefox is free and made to help you get the most out of the web.",
			"stable": {
				"ver": "24",
				"url": "http://www.mozilla.com/firefox/"
			}
		},
		"Safari": {
			"description": "Browse the web in smarter, more powerful ways.",
			"stable": {
				"ver": "6",
				"url": "http://www.apple.com/safari/download/"
			}
		},
		"Opera": {
			"description": "Secure, powerful and easy to use, with excellent privacy protection.",
			"stable": {
				"ver": "12",
				"url": "http://www.opera.com/download/"
			}
		},
		"IE": {
			"description": "Designed to help you take control of your privacy and browse with confidence.",
			"stable": {
				"ver": "10",
				"url": "http://www.microsoft.com/windows/internet-explorer/default.aspx"
			}
		}
	};
	//////
	var head = document.getElementsByTagName("head")[0];
	var css = document.createElement("link");
	css.rel = "stylesheet";
	css.type = "text/css";
	css.media = "screen";
	css.href = "./inc/BrowseHappier/upgrade.css";
	head.appendChild(css);
	//////
	var container = document.createElement("div");
	container.id = "browser-upgrade";
	var ul = document.createElement("ul");
	///
	var support = conf.browsers;
	if (typeof(support) === "string") {
		var tmp = support.split(",");
		var support = {};
		for (var n = 0; n < tmp.length; n ++) {
			var item = tmp[n];
			support[item.substr(0, 1)] = item.substr(1);
		}
	}
	///
	var count = 0;
	for (var key in browsers) {
		if (!support[key[0]]) continue;
		var browser = browsers[key];
		var li = document.createElement("li");
		li.id = "sprite-" + key.toLowerCase();
		var a = document.createElement("a");
		a.href = browser.stable.url;
		a.target = "_blank";
		a.title = key;
		var div = document.createElement("div");
		div.className = "icon";
		a.appendChild(div);
		var h2 = document.createElement("h2");
		h2.innerHTML = key;
		div.appendChild(h2);
		var p = document.createElement("p");
		p.className = "version";
		p.innerHTML = "Version: <strong>"+browser.stable.ver+"</strong>";
		a.appendChild(p);
		var p = document.createElement("p");
		p.className = "info";
		p.innerHTML = "&ldquo;" + browser.description + "&rdquo;";
		a.appendChild(p);
		li.appendChild(a);
		ul.appendChild(li);
		count ++;
	}
	ul.style.width = count * 191 + "px";
	///
	var h2 = document.createElement("h2");
	h2.className = "header";
	h2.innerHTML = conf.message || "Please upgrade your browser to view this website";
	container.appendChild(h2);
	container.appendChild(ul);
	document.body.appendChild(container);
};