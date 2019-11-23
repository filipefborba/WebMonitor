function getLocalStorage() {
	let ls = window.localStorage;
	if (ls.length > 0) {
		browser.runtime.sendMessage({
			id: "webmonitor",
			ls: `${ls.length} items found in Local Storage.`
		});
	} else {
		browser.runtime.sendMessage({
			id: "webmonitor",
			ls: "No items found in Local Storage."
		});
	}
}

getLocalStorage();
