angular.module('workout').controller('ardoOnlineCtrl', function($rootScope, $location, $timeout, workoutFactory){

	var ctrl = this;
	ctrl.listaArduinos = null;
	ctrl.msg = "";

	ctrl.buscaArduinos = function(){
		console.log("Buscando lista de arduinos...");
		workoutFactory.buscarArduinos().success( function(lista) {
			ctrl.listaArduinos = lista;
			$timeout(ctrl.buscaArduinos, 3000);
		}).error(function(data, status, headers, config) {
			var msgErro = angular.isDefined(data.mensagemErro) ? data.mensagemErro : data;
			console.log('Erro ao tentar buscar arduinos. ' + data);
		});
	};
		
	ctrl.inicializar = function(){
		ctrl.buscaArduinos();
	};

	ctrl.inicializar();
});