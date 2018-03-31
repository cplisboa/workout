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
treino = null;

app.route('/treino').get( function(req,res) {
	console.log("Buscando lista de treinos.");
    db.Treino.find(function (err, treinos) {
		if (err) return console.error(err);
  		res.send(treinos);
    });		
});

app.route('/treino').post( function(req,res) {
	console.log("Enviar treino para o arduino");
	treino = req.body;
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
    	}
    	
    	if(dados[0] == 'wtn' && dados[1] == 'team'){
    		console.log("....  Arduino quer nome do time");
    		arduino.send(treino.arduino.ip, treino.team.toString());
    	}
    	
    	if(dados[0] == 'team' && dados[1] == 'num'){
    		console.log("....  Enviar workout");
    		arduino.send(treino.arduino.ip, "wrkt");
    	}
    	
    	if(dados[0] == 'wtn' && dados[1] == 'wrkt'){
    		console.log("....  Enviar numero do workout");
    		arduino.send(treino.arduino.ip, treino.treino.nome.toString());
    	}    	    	
    	
    	if(dados[0]=='wrkt' && dados[1]=='num'){
    		console.log("....  Arduino aceitou comando wrkt");
    		arduino.send(treino.arduino.ip,"qntex");
    	}
    	
    	if(dados[0]=='wtn' && dados[1]=='qntex'){
    		console.log("....  Arduino quer quantidade do qntex");
    		arduino.send(treino.arduino.ip,treino.treino.listaExos.length.toString());
    	}
    	
    	if(dados[0]=='qntex' && dados[1]=='num'){
    		console.log("....  Arduino aceitou qntex");
    		arduino.send(treino.arduino.ip,"task");
    	}
    	
    	if(dados[0] == 'task'){
    		console.log("....  Arduino quer a task #"+dados[1]);
    		arduino.send(treino.arduino.ip,treino.treino.listaExos[dados[1]].nome);
    	}
    	
    	if(dados[0] == 'idok'){
    		console.log("....  id ok.Enviar repetições do exo #"+dados[1]);
    		arduino.send(treino.arduino.ip,treino.treino.listaExos[dados[1]].repeticoes.toString());
    	}
    	
    	if(dados[0] == 'repetok'){
    		console.log("....  Arduino aceitou repetições #"+dados[1]);
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
