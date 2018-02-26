var dgram = require('dgram');
//var sleep = require('sleep');
var PORT = 4210;

exports.podeEnviar = true;
exports.clients = [
	{
		serial: "aaaaOOO",
		ip: "192.168.0.13",
		dataRegistro: Date()
	}		
];

exports.equipamentosRegistrados = function() {
	return exports.clients;
}

exports.findDevice = function(serial){
	var ip = null;
	console.log(exports.clients);
	console.log("Serial para buscar: "+serial);
	exports.clients.forEach(function (client) {
		console.log("serial do client x "+client.serial)
	    if (client.serial.toString() == serial.toString()){
	    	console.log("Achou!");
	    	ip = client.ip;	      
	    }
	});
	return ip;
	
};

exports.addDevice = function(device){
	console.log("dispositivo para adicionar. "+device.serial+":"+device.ip+":"+device.dataRegistro);
	exports.clients.push(device);	
	
};

exports.enviaTreino = function(treino, arduino, team){
	console.log("Enviando treino por UDP");
	exports.send(arduino.ip, "team");
	exports.send(arduino.ip, team.toString());
	exports.send(arduino.ip, "wrkt");
	exports.send(arduino.ip, treino.nome.toString());
	exports.send(arduino.ip, "qntex");
	exports.send(arduino.ip, treino.listaExos.length.toString());
	exports.send(arduino.ip, "task");

	for(var i=0; i<treino.listaExos.length; i++){
		exports.send(arduino.ip, treino.listaExos[i].nome);
		exports.send(arduino.ip, treino.listaExos[i].repeticoes.toString());
	}
};

exports.send = function(ip, msg){	
	const dgram = require('dgram');
	const message = Buffer.from(msg);
	const client = dgram.createSocket('udp4');
	client.send(message, PORT, ip, (err) => {
	  client.close();
	  console.log('UDP message sent to ' + ip +':'+ PORT + " "+msg);
	});		
};

