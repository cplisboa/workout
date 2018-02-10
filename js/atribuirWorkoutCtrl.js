angular.module('workout').controller('atribuirWorkoutCtrl', function($rootScope, $location){

	var ctrl = this;

	ctrl.voltar = function(){
		console.log("Voltando para tela de inicio");
		$rootScope.telaInicial = true;
		$location.path('/');
	};

});