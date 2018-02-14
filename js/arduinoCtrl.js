angular.module('workout').controller('arduinoCtrl', function($rootScope, $location, workoutFactory){

	var ctrl = this;

	ctrl.arduinos = [];
	ctrl.comando = null;
	ctrl.arduinoSelecionado = null;
	ctrl.resposta = null;

	ctrl.buscaArduinos = function(){
		console.log("Buscando lista de arduinos...");
		workoutFactory.buscarArduinos().success( function(lista) {
			ctrl.arduinos = lista;
			console.log("Busca realizada com sucesso");
			console.log(ctrl.arduinos);
		}).error(function(data, status, headers, config) {
			var msgErro = angular.isDefined(data.mensagemErro) ? data.mensagemErro : data;
			console.log('Erro ao tentar buscar arduinos. ' + data);
		});
	};

	ctrl.enviarComando = function(){
		console.log("Enviando comando " + ctrl.comando);
		var objetoEnvio = {
			serial: ctrl.arduinoSelecionado.serial,
			ip: ctrl.arduinoSelecionado.ip,
			dataRegistro: ctrl.arduinoSelecionado.dataRegistro,
			comando: ctrl.comando
		};
		workoutFactory.enviarComando(objetoEnvio).success(function(resposta) {
			console.log("Resposta do comando enviado: "+resposta);
			ctrl.resposta = resposta;
		}).error(function(data, status, headers, config) {
			var msgErro = angular.isDefined(data.mensagemErro) ? data.mensagemErro : data;
			console.log('Erro ao enviar comando. ' + data);
		});
	}
	
	ctrl.voltar = function(){
		console.log("Voltando para tela de inicio");
		$rootScope.telaInicial = true;
		$location.path('/');
	};	

	ctrl.inicializar = function(){
		ctrl.buscaArduinos();
	};

	ctrl.inicializar();
});