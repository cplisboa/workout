angular.module('workout').controller('arduinoCtrl', function($rootScope, $location, workoutFactory){

	var ctrl = this;

	ctrl.arduinos = [];

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