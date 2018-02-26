var express = require('express');
var bodyParser = require('body-parser');
var net = require('net');
var arduino = require("./arduinodevices.js");
var db = require("./db.js");
var app = express();

app.use(express.static('./'));
app.use(express.static('/js'));
app.use(express.static('/views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var PORTA_UDP = 41234;

app.route('/treino').get( function(req,res) {
	console.log("Buscando lista de treinos.");
    db.Treino.find(function (err, treinos) {
		if (err) return console.error(err);
  		res.send(treinos);
    });		
});

app.route('/treino').post( function(req,res) {
	console.log("Enviar treino para o arduino");
	arduino.enviaTreino(req.body.treino, req.body.arduino, req.body.team);
	res.send("Comando enviado para arduino");
});


app.route('/workout').post( function(req, res){
	res.contentType('application/json');
	console.log("Realizado post em workout (TREINO)");
	console.log(req.body);

	treino = new db.Treino(req.body);
	db.saveTreino(treino);
	res.send("Treino Salvo com sucesso");
});

app.get("/equipamentos", function(req,res) {
	console.log("Recuperando lista de equipamentos registrados");
	var lista = arduino.equipamentosRegistrados();
	res.send(lista);
});

app.route('/comando').post( function(req, res){
	res.contentType('application/json');
	console.log(req.body);	

	//Enviando comando por UDP
	arduino.send(req.body.ip,req.body.comando);
	res.send("comando enviado com sucesso");
});

		
/* GET workoutList page. */
app.get('/workout', function(req, res) {
   console.log("Recuperando lista de workouts");
   
   db.Workout.find(function (err, workouts) {
		if (err) return console.error(err);
  		console.log(workouts);
  		res.send(workouts);
   });	    
});

app.listen(3000, function () {
	const dgram = require('dgram');
	const server = dgram.createSocket('udp4');

	server.on('error', (err) => {
	  console.log("server error:\n${err.stack} ");
	  console.log("erro;")
	  server.close();
	});

	server.on('message', (msg, rinfo) => {
    	console.log("Mensagem recebida do IP " + rinfo.address + " - "+msg)
    	var dados = msg.toString().split(" "); 
    	if(dados[0]=='hey'){
	    	console.log("Adicionando equipamento na lista de dispositivos disponíveis.");
	    	arduino.addDevice({serial:dados[1], ip:dados[2], dataRegistro: Date()});
    	} else {
    		console.log("Comando desconhecido "+msg)
    	}
    	arduino.podeEnviar = true;
	});

	server.on('listening', () => {
		const address = server.address();
		console.log("server listening "+address.address+":"+address.port);
	});

	server.bind(PORTA_UDP);
	console.log("Servidor WEB escutando a porta 3000\n");
	console.log("Socket UDP escutando na porta " + PORTA_UDP + "\n");	
});
