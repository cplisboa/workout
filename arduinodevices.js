var dgram = require('dgram');
var PORT = 4210;

//exports.podeEnviar = true;
exports.clients = [
	{
		serial: "DUMMY-DUMMY",
		ip: "192.168.0.13",
		dataRegistro: Date()
	}		
];

exports.equipamentosRegistrados = function() {
	return exports.clients;
}

//Atualiza arduino com execução da prova
exports.updateArduino = function(ip, status, exo, repeticoes, tempo){
	exports.clients.forEach(function (ardo) {
		if(ardo.ip.toString() == ip.toString){
			ardo.status = status;
			ardo.exo = exo;
			ardo.repeticoes = repeticoes;
			ardo.tempo = tempo;
			console.log("Arduino "+ip+" atualizado com execução da prova.");
		}
	});	
}

exports.findDevice = function(serial){
	var ip = null;
	console.log(exports.clients);
	console.log("Serial para buscar: "+serial);
	exports.clients.forEach(function (client) {
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
	//Apenas inicio da comunicação. Restante ocorre no start.js na recepção de mensagens	
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