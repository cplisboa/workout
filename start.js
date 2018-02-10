var express = require('express');
var bodyParser = require('body-parser');
var net = require('net');
var db = require("./db.js");

var app = express();

app.use(express.static('./'));
app.use(express.static('/js'));
app.use(express.static('/views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.route('/workout').post( function(req, res){
	res.contentType('application/json');
	console.log("Realizado post em workout");
	console.log(req.body);

	console.log("Realizando insert no mongo")
	
	var conn = db.Mongoose.connection;
	conn.on('error', console.error.bind(console, 'connection error:'));
	conn.once('open', function() {
  		console.log("Conectado no mongodb. Schema Workout");
  		var Workout = db.Mongoose.model('workoutcollection', db.WorkoutSchema, 'workoutcollection');
		var work = new Workout({numero: req.body.numero, exercicios: req.body.exercicios});
		work.save(function (err) {
  			if (err) {
    			console.log(err);
  			} else {
    			console.log('Insert realizado');
  			}
		});
	});


	console.log("---------------------");
	res.send(req.body);
});
		
/* GET workoutList page. */
app.get('/workout', function(req, res) {
   console.log("Recuperando lista de workouts");

   db.Workout.find(function (err, workouts) {
		if (err) 
			return console.error(err);
		for(i=0; i<workouts.length;i++){
			console.log(workouts[i]);
		}
  		console.log(workouts);
	});

   res.send("Trabalho feito");
/*
   var Workouts = db.Mongoose.model('workoutcollection', db.WorkoutSchema, 'workoutcollection');
   Workouts.find({}).lean().exec(
      function (e, docs) {
         res.render('workoutlist', { "workoutlist": docs });
   });*/
});

app.listen(3000, function () {
    console.log('Servidor node escutando na porta 3000!');
    clients = [];

    //Iniciando socket de comunicação com o arduino
    net.createServer(function(socket) {

	  	//Identificando o client que conectou
	  	socket.name = socket.remoteAddress + ":" + socket.remotePort;
	  	console.log("conectou o client "+socket.name);

	    // Send a nice welcome message and announce
	  	socket.write("Seja bem vindo " + socket.name + "\n");
	  	broadcast(socket.name + " entrou nochat\n", socket);

	    // Handle incoming messages from clients.
	    socket.on('data', function (data) {
	        broadcast(socket.name + "> " + data, socket);
	    });

	    // Remove the client from the list when it leaves
	    socket.on('end', function () {
	        clients.splice(clients.indexOf(socket), 1);
	        broadcast(socket.name + " deixou o chat chat.\n");
	    });
	  
	    // Send a message to all clients
	    function broadcast(message, sender) {
	        clients.forEach(function (client) {
	            // Don't want to send it to sender
	            if (client === sender) return;
	            client.write(message);
	        });
	        // Log it to the server output too
	        process.stdout.write(message)
	    }

	}).listen(5000);

	// Put a friendly message on the terminal of the server.
	console.log("Socket server escutando na porta 5000\n");  	

});