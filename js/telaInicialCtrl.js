angular.module('workout').controller('telaInicialCtrl', function($scope, $location, $rootScope, $routeParams) {
	console.log("Controller do indice carregado");
	var ctrl = this;
	$rootScope.telaInicial = true;

	ctrl.cadastrarWorkout = function(){
 	     $rootScope.telaInicial = false;
 	     //ctrl.telaInicial = false;
 	     $location.path('/cadastraWorkout');
	};

	ctrl.gerenciarLogger = function(){ 	     
		$rootScope.telaInicial = false;
 	     //ctrl.telaInicial = false;
 	     $location.path('/gerenciarLogger');
	};

	ctrl.atribuirLogger = function(){ 
		$rootScope.telaInicial = false;	     
 	    //ctrl.telaInicial = false;
 	    $location.path('/atribuirLogger');
	};

	ctrl.abreResultados = function(){ 	     
		$rootScope.telaInicial = false;
 	    //ctrl.telaInicial = false;
 	    $location.path('/resultados');
	};
	
	ctrl.abreArduino = function(){ 	     
		$rootScope.telaInicial = false;
 	    //ctrl.telaInicial = false;
 	    $location.path('/arduino');
	};
	

	ctrl.voltar = function(){
		console.log("Voltando para tela de inicio");
		$rootScope.telaInicial = true;
		$location.path('/');
	};

});
