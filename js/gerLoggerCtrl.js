angular.module('workout').controller('gerLoggerCtrl', function($rootScope, $location){

	var ctrl = this;

	ctrl.msg = "";
	ctrl.logger = {
		id: "",
		ip: "",
		arbitro: ""
	};

	ctrl.listaArbitros = [];

	ctrl.buscaArbitros = function(){
		console.log("No futuro busca");
		/*
		pokerFactory.getJogador().success( function(dados){
			console.log(dados);
			ctrl.jogadores = dados;
			ctrl.msg = '';

		}).error(function(response,status) {
			console.log("Erro buscando dados: ");
			ctrl.msg = "Erro buscando dados";
		}); */
	};

	ctrl.cadastra = function(){		
		ctrl.listaArbitros.push(ctrl.logger);
		ctrl.logger = {};

	};

	ctrl.voltar = function(){
		console.log("Voltando para tela de inicio");
		$rootScope.telaInicial = true;
		$location.path('/');
	};	

});