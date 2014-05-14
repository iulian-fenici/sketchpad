<?php

if ($_SERVER["SERVER_NAME"] !== "localhost") {
	echo "run on localhost";
	exit;
}

function BrowserManager() { // updates browser versions (parses data from wikipedia)
	$urls = Array(
		'IE'=>Array('Internet_Explorer', 'http://www.microsoft.com/windows/internet-explorer/default.aspx', 'http://ie.microsoft.com/testdrive/'),
		'Chrome'=>Array('Google_Chrome', 'http://www.google.com/chrome', 'http://www.google.com/landing/chrome/beta/'),
//		'Chromium'=>Array('Chromium_(web_browser)', 'http://code.google.com/chromium/'),
		'Firefox'=>Array('Firefox', 'http://www.mozilla.com/firefox/', 'http://www.mozilla.com/en-US/firefox/all-beta.html'),
		'Safari'=>Array('Safari_(web_browser)', 'http://www.apple.com/safari/download/'),
		'Opera'=>Array('Opera_(web_browser)', 'http://www.opera.com/download/', 'http://www.opera.com/browser/next/'),
//		'Camino'=>Array('Camino', 'http://caminobrowser.org/', 'http://preview.caminobrowser.org/'),
//		'Konqueror'=>Array('KDE_Software_Compilation_4', 'http://www.kde.org/download/'),//
//		'Flock'=>Array('Flock_(web_browser)', 'http://www.flock.com/', 'http://www.flock.com/beta/download'),
//		'SeaMonkey'=>Array('SeaMonkey', 'http://www.seamonkey-project.org/'), 
//		'Songbird'=>Array('Songbird_(software)', 'http://getsongbird.com/download/'),
//		'Flash'=>Array('Adobe_Flash', 'http://get.adobe.com/flashplayer/'),
//		'IECanvas'=>Array('IECanvas', 'http://get.jumis.com/iecanvas/', 'http://get.jumis.com/iecanvas/beta/')
	);
	$z = Array();
	function parseVersion($browser, $type) {
		$browser = str_replace(Array("_(web_browser)", "_(software)"), "", $browser);
		$url = "http://en.wikipedia.org/w/index.php?title=Template:Latest_{type}_software_release/{browser}&action=edit";
		$url = str_replace(Array("{type}", "{browser}"), Array($type, $browser), $url);
		$session = curl_init($url);
		curl_setopt($session, CURLOPT_USERAGENT, "VersionManager (http://mudcu.be/)");
		curl_setopt($session, CURLOPT_FOLLOWLOCATION, true); 
		curl_setopt($session, CURLOPT_RETURNTRANSFER, true);
		$file = curl_exec($session);
		curl_close($session);
		$text = explode($type == "preview" ? "{{LPR" : "{{LSR", $file);
		$os_find = Array("Mac OS X", " dev build");
		$os_replace = Array("MacOSX", "");
		if($text[1] && $text = $text[1]) {
			$text = strip_tags(htmlspecialchars($text));
			if (strpos($text, 'release version')) {
				$text = substr($text, strpos($text, 'release version = ') + 18);
			} else {
				$text = substr($text, strpos($text, 'release_version = ') + 18);
			}
			$text = trim(substr($text, 0, strpos($text, "|")));
			if (trim($text) == "none") return "";
				if (strpos($text, "Beta")) { // Opera
				$ver = substr($text, 0, strpos($text, " ")) . "b";
				$tmp = explode("Build ", $text);
				$text = Array();
				foreach($tmp as $key=>$value) {
					$value = preg_replace('/[\[\]]/i', '', $value);
					$value = preg_split('/[()]/i', $value);
					$key = str_replace($os_find, $os_replace, $value[1]); 
					if(strpos($key, ",")) { // stacked object
						$key = explode(",", $key);
						foreach($key as $k=>$v)
							$text[trim($v)] = $ver . trim($value[0]);
					}
					else if($key)
						$text[$key] = $ver . trim($value[0]);
				}
				return $text;
			}
			if (strpos($text, "&"))
				$text = trim(substr($text, 0, strpos($text, "&")));
			if (strpos($text, "["))
				$text = trim(substr($text, 0, strpos($text, "[")));
			if (strpos($text, ",")) { // multiple versions
				$tmp = explode(", ", $text);
				$text = Array();
				foreach($tmp as $key=>$value) {
					$value = preg_split('/[()]/i', $value);
					$text[str_replace($os_find, $os_replace, $value[1])] = trim($value[0]);
				}
			}
			return $text;
		}
		else // no version available
			return "";
	};
	foreach($urls as $key=>$value) {
		// find stable release
		$z[$key] = Array(
			"wikipedia"=>$value[0],
			"stable"=>null,
			"preview"=>null
		);
		if($beta = parseVersion($value[0], "preview")) {
			$z[$key]["preview"]["ver"] = $beta;
			$z[$key]["preview"]["url"] = $value[2] ? $value[2] : $value[1];
		}
		if($stable = parseVersion($value[0], "stable")) {
			$z[$key]["stable"]["ver"] = $stable;
			$z[$key]["stable"]["url"] = $value[1];
		}	
	}	
	return json_encode($z);
}

echo BrowserManager();

?>