var express = require("express");
var app = express(); 

app.get("/", function(req, res) {
	res.send("Hi there!");
});

app.get("/bye", function(req, res) {
	res.send("bye");
	console.log("someone made a request.");
});

app.get("/dog", function(req, res) {
	res.send("MEOW");
});

app.listen(process.env.PORT || 9000, process.env.IP, function() {
	console.log("Server has started!! " );
});
