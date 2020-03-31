var app = require("express")();

app.get("/", function(req, res) {
	res.send("Vips");
});

app.get("/speak/:animal", function(req, res) {
	var animal = req.params.animal.toLowerCase();
	var sounds = {
		pig: "Oink",
		cow: "Moo",
		dog: "Woof Woof!!"
	}
	var sound = sounds[animal];
	res.send("The " + animal + " says " + sound );
});

app.get("/repeat/:message/:times", function(req, res) {
	var times = Number(req.params.times);
	var message = req.params.message;
	var result = "";
	var count = 0;
	for(var i=0; i<times; i++) {
		result += message + " ";
		count++;
		if(count%50 === 0) {
			result += "\n";
		}
	}
	res.send(result);
});

app.get("*", function(req, res){
	res.send("Worng meassage...what are you doing with your life...");
});

app.listen(process.env.PORT || 9000, process.env.IP, function() {
	console.log("Server started");
});
