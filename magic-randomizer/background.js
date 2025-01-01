function obtainConfig(callback) {
	browser.storage.local.get({"magic": null}).then(res => callback(res["handles"]));
}

// obtainHandles(console.log);

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.contentScriptQuery == "MagicRandomizerExt") {
			obtainConfig(sendResponse);
			return true;
		}
	}
);