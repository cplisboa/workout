angular.module('workout').controller('resultadosCtrl', function($rootScope, $location){

	var ctrl = this;


	ctrl.listaResultados = [];

	ctrl.voltar = function(){
		console.log("Voltando para tela de inicio");
		$rootScope.telaInicial = true;
		$location.path('/').search({telaInicial: true});
		//var param1= $routeParams.param1;

	};

});