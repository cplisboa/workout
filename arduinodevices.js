var dgram = require('dgram');

exports.clients = [];

exports.myDateTime = function () {
    return Date();
};

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

var PORT = 33333;
var HOST = '127.0.0.1';

exports.send = function(ip, msg){
	
	const dgram = require('dgram');
	const message = Buffer.from(msg);
	const client = dgram.createSocket('udp4');
	client.send(message, 1111, ip, (err) => {
	  client.close();
	  console.log('UDP message sent to ' + ip +':'+ 1111);
	});	
	
};

