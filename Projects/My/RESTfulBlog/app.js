var bodyParser = require("body-parser"),
expressSanitizer = require("express-sanitizer"),
methodOverride = require("method-override"),
mongoose = require("mongoose"),
express = require("express"),
app = express();
//app config
mongoose.connect("mongodb://localhost:27017/restful_blog", {useNewUrlParser: true,useUnifiedTopology: true
});
mongoose.set('useFindAndModify', false);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

//Mongoose/Model config
var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);

//Blog.create({
//	title: "test Blog",
//	image: "https://images.unsplash.com/photo-1584910542337-52ed58a83f41?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
//	body: "Hello now go work",
//});


//Restful routes

app.get("/", function(req, res) {
	res.redirect("/blogs");
});
//index route
app.get("/blogs", function(req, res) {
	Blog.find({}, function(err, blogs) {
		if(err) {
			console.log("ERROR!");
		} else {
			res.render("index.ejs", {blogs: blogs});
		}
	});
});

//New Route
app.get("/blogs/new", function(req, res) {
	res.render("new.ejs");
});
//Create route
app.post("/blogs", function(req, res) {
	//create blog
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.create(req.body.blog, function(err, newBlog) {
		if(err) {
			res.render("new");
		} else {
			res.redirect("/blogs");
		}
	});
});

//SHOW route
app.get("/blogs/:id", function(req, res) {
	Blog.findById(req.params.id, function(err, foundBlog) {
		if(err){
			res.redirect("/blogs");
		} else {
			res.render("show.ejs", {blog: foundBlog});
		}
	});
});

//Edit route
app.get("/blogs/:id/edit", function(req, res) {
	Blog.findById(req.params.id, function(err, foundBlog) {
		if(err) {
			res.redirect("/blogs");
		} else {
		res.render("edit.ejs", {blog: foundBlog});
		}
});
});

//Update route
app.put("/blogs/:id", function(req, res) {
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog) {
		if(err) {
			res.redirect("/blogs");
		} else {
			res.redirect("/blogs/" + req.params.id);
		}
	});
});

//DELETE route
app.delete("/blogs/:id", function(req, res) {
	Blog.findByIdAndRemove(req.params.id, function(err) {
		if(err) {
			res.redirect("/blogs");
		} else {
			res.redirect("/blogs");
		}
	});
});


//Creating Server 
app.listen(process.env.PORT || 9000, process.env.IP, function() {
	console.log("Server is listening...");
});
