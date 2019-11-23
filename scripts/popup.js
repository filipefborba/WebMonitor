// // function getConnections() {
// // 	browser.runtime.sendMessage(
// // 		{ connections: "Send me the connections, background.js!" },
// // 		function(response) {
// // 			console.log(response.tabName);
// // 			document.getElementById("website").innerHTML = response.tabName;
// // 			document.getElementById(
// // 				"external-connections"
// // 			).innerHTML = `${response.third_party_connections} / ${response.total_connections}`;
function updatePopup() {
	document.getElementById("website").innerHTML = "Website: --";
	document.getElementById("external-connections").innerHTML =
		"Calculating...";
	document.getElementById("cookies").innerHTML = "Calculating...";
	document.getElementById("local-storage").innerHTML = "Calculating...";
	browser.runtime.sendMessage({ id: "popup" }, function(response) {
		document.getElementById(
			"website"
		).innerHTML = `Website: ${response.site_title}`;
		document.getElementById(
			"external-connections"
		).innerHTML = `${response.third_party_connections} / ${response.total_connections}`;
		document.getElementById("cookies").innerHTML = response.total_cookies;
		document.getElementById("local-storage").innerHTML =
			response.total_local_storage;
	});
}

document.addEventListener("DOMContentLoaded", function(event) {
	updatePopup();
});
