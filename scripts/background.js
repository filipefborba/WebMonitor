var third_party_connections = 0;
var total_connections = 0;
var total_cookies = "Calculating...";
var total_local_storage = "Calculating...";
var site_title = "";

// Helpers
function getActiveTab() {
	return browser.tabs.query({ active: true, currentWindow: true });
}

// Update when the tab is updated
browser.tabs.onUpdated.addListener(cookieUpdate);

// Update when the tab is activated
browser.tabs.onActivated.addListener(cookieUpdate);

// -------------------------------------------------------------------

// Get Connections
function handleConnections(request) {
	console.log(request);
	if (!request.url.includes(window.location.hostname)) {
		third_party_connections++;
		total_connections++;
	} else {
		total_connections++;
	}
}

browser.webRequest.onBeforeRequest.addListener(handleConnections, {
	urls: ["<all_urls>"]
});

// -------------------------------------------------------------------

// Get cookies and send to popup.js
function cookieUpdate() {
	getActiveTab().then(tabs => {
		// get any previously set cookie for the current tab
		site_title = tabs[0].title;
		var gettingAll = browser.cookies.getAll({ url: tabs[0].url });
		gettingAll.then(cookies => {
			if (cookies.length > 0) {
				total_cookies = `${cookies.length} items found in Local Storage.`;
			} else {
				total_cookies = "No items found in Cookies.";
			}
		});
	});
}

// -------------------------------------------------------------------

// Local Storage
function handleMessage(request, sender, sendResponse) {
	if (request.id == "webmonitor") {
		total_local_storage = request.ls;
	} else if (request.id == "popup") {
		let response = {
			id: "background",
			site_title,
			third_party_connections,
			total_connections,
			total_cookies,
			total_local_storage
		};

		sendResponse(response);

		site_title = "";
		third_party_connections = 0;
		total_connections = 0;
		total_cookies = "Calculating...";
		total_local_storage = "Calculating...";
	}

	return true;
}

// Message listener
browser.runtime.onMessage.addListener(handleMessage);

// ------------------------------------------------------------------------------------
