var express = require("express");
var app = express();
var request = require("request");

app.get("/results", function(req, res) {
	request("https://jsonplaceholder.typicode.com/users", function(error, response, body) {
		if(!error && response.statusCode == 200) {
			var results = JSON.parse(body);
			res.send(results[0]);
		}
	});
});

app.listen(process.env.PORT , process.env.IP, function() {
	console.log("Server is listening...");
});
