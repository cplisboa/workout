var dgram = require('dgram');
var PORT = 4210;

//exports.clients = [];

//Começando lista de devices não zerados
exports.clients = [
	{
		serial: "aaaa",
		ip: "192.168.0.5",
		dataRegistro: Date()
	},
	{
		serial: "bbbb",
		ip: "192.168.0.8",
		dataRegistro: Date()
	},
	{
		serial: "cccc",
		ip: "192.168.0.13",
		dataRegistro: Date()
	}		
];

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

exports.send = function(ip, msg){
	
	const dgram = require('dgram');
	const message = Buffer.from(msg);
	const client = dgram.createSocket('udp4');
	client.send(message, PORT, ip, (err) => {
	  client.close();
	  console.log('UDP message sent to ' + ip +':'+ PORT + " "+msg);
	});		
};

