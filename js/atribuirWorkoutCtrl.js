angular.module('workout').controller('atribuirWorkoutCtrl', function($rootScope, $location, treinoFactory, workoutFactory){

	var ctrl = this;

	ctrl.listaTreinos = null;
	ctrl.arduinos = null;
	ctrl.arduinoSelecionado = null;
	ctrl.team = null;
	
	ctrl.buscaTreinos = function(){
		console.log("Buscando lista de treinos..");
		treinoFactory.buscaTreinos().success( function(lista) {
			ctrl.listaTreinos = lista;
			console.log("Lista de treinos recuperada com sucesso")
		}).error(function(data, status, headers, config){
			ctrl.msg = angular.isDefined(data.mensagemErro) ? data.mensagemErro : data;
			console.log('Erro ao tentar buscar lista de treinos. ' + data);			
		});
	};
	
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
		ctrl.buscaTreinos();
		ctrl.buscaArduinos();
	};
	
	ctrl.enviar = function(treino){
		// Pegar treino e logger e criar um objeto unico para esse envio.
		var loggerTreino = {treino: treino, arduino: ctrl.arduinoSelecionado, team: ctrl.team};		
		console.log("Enviando treino");
		treinoFactory.enviarTreino(loggerTreino);
	};
	
	ctrl.inicializar();	
});