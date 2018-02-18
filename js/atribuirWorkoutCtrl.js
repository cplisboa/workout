angular.module('workout').controller('atribuirWorkoutCtrl', function($rootScope, $location, treinoFactory){

	var ctrl = this;

	ctrl.listaTreinos = null;
	
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
	
	ctrl.voltar = function(){
		console.log("Voltando para tela de inicio");
		$rootScope.telaInicial = true;
		$location.path('/');
	};

	ctrl.inicializar = function(){
		ctrl.buscaTreinos();
	};
	
	ctrl.inicializar();	
});