var app = require("express")();

app.get("/", function(req, res) {
	res.render("home.ejs");
});

app.get("/home/:Thing/", function(req, res) {
	res.render("thing.ejs");
});

app.get("/posts", function(req, res) {
	var posts = [
		{title: "Post 1", author: "Susy"},
		{title: "My adorable pen", author: "Charlie"},
		{title: "what!!", author: "Me!!"}
	];

	res.render("posts.ejs", {posts: posts});
});

app.listen(process.env.PORT || 9000, process.env.IP, function() {
	console.log("Server is listening");
});
