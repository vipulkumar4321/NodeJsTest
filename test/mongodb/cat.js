var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/cat_app", {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

var catSchema = new mongoose.Schema({
	name: String,
	age: Number,
	temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

Cat.find({}, function(err, cats){
		if(err) {
			cosole.log("Error message!!!");
			console.log(err);
		} else {
			console.log("All the cats…");
			console.log(cats);
		}
});
