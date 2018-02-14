var express = require('express');
var bodyParser = require('body-parser');
var net = require('net');
var arduino = require("./arduinodevices.js");

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
	console.log("Serial recebido: "+req.body.serial);
	
	var ip = arduino.findDevice(req.body.serial);
	console.log("IP encontrado: "+ip);
	if(ip != null){
		console.log("Encontrei dispositivo. Enviando TEAM para dispositivo de IP " + ip);
		
		console.log("Teste enviando msg UDP....");
		arduino.send("teste de mensagem",ip);		
		
		//res.send("Encontrado dispositivo na lista. Podemos enviar informações para ele sim. IP"+ip);
	} else {
		console.log("Nenhum dispositivo com esse IP encontrado, retornando essa informação para a página")
		//res.send("Nenhum dispositivo encontrado na lista de dispositivos que se apresentaram no sistema");
	}
	
	//Realizando envio para determinado equipamento com serial selecionado
	
	
	//res.send(req.body);
});

app.get("/equipamentos", function(req,res) {
	console.log("Recuperando lista de equipamentos registrados");
	var lista = arduino.equipamentosRegistrados();
	res.send(lista);
});

		
/* GET workoutList page. */
app.get('/workout', function(req, res) {
   console.log("Recuperando lista de workouts");
   /*
   db.Workout.find(function (err, workouts) {
		if (err) 
			return console.error(err);
		for(i=0; i<workouts.length;i++){
			console.log(workouts[i]);
		}
  		console.log(workouts);
	});
	*/
    res.send("Trabalho feito");
/*
   var Workouts = db.Mongoose.model('workoutcollection', db.WorkoutSchema, 'workoutcollection');
   Workouts.find({}).lean().exec(
      function (e, docs) {
         res.render('workoutlist', { "workoutlist": docs });
   });*/
});

app.listen(3000, function () {
	const dgram = require('dgram');
	const server = dgram.createSocket('udp4');

	server.on('error', (err) => {
	  console.log(`server error:\n${err.stack}`);
	  server.close();
	});

	server.on('message', (msg, rinfo) => {
		
    	console.log("Mensagem recebida do IP " + rinfo.address + " - "+msg)
    	var dados = msg.toString().split(" ");    	
    	console.log("Adicionando equipamento na lista de dispositivos disponíveis.");
    	arduino.addDevice({"serial":dados[0], "ip":dados[1], "dataRegistro": Date()});    	
	});

	server.on('listening', () => {
		const address = server.address();
		console.log("server listening "+address.address+":"+address.port);
	});

	server.bind(41234);
	// server listening 0.0.0.0:41234
	
	console.log("Socket UDP escutando na porta 41234\n");
	
	//Fazendo mensagem de teste
	arduino.send("192.168.0.149","Envio de msg!!");
	
});
