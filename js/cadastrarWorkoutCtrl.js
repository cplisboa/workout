angular.module('workout').controller('cadastraWorkoutCtrl', function($rootScope, $location, workoutFactory){

	var ctrl = this;

	ctrl.msg = "";
	ctrl.workout = {
		numero: "",
		exercicios: ""
	};

	ctrl.listaWorkouts = [];

	ctrl.buscaWorkout = function(){
		console.log("Buscando lista de workouts...");
		workoutFactory.buscarWorkouts().success( function(listaWorkout) {
			ctrl.listaWorkouts = listaWorkout;
			console.log("Busca realizada com sucesso");
			console.log(listaWorkout);
		}).error(function(data, status, headers, config) {
			var msgErro = angular.isDefined(data.mensagemErro) ? data.mensagemErro : data;
			console.log('Erro ao tentar salvar solicitação. ' + data);
		});
	};


	ctrl.cadastra = function(){
		console.log("iniciando cadastro de workout")
		var newWorkout = {
			numero: ctrl.workout.numero,
			exercicios: ctrl.workout.exercicios
		};
		
		//ctrl.listaWorkouts.push(newWorkout);

		workoutFactory.salvaWorkout(newWorkout).success( function(resultado){
			console.log(resultado);
		}).error(function(data, status, headers, config) {
			ctrl.msg = "Erro salvando workout ";
		});
		ctrl.workout = {};

		/*
		pokerFactory.salvaJogador(jogador).success( function(){
			console.log("Jogador cadastrado");
			ctrl.msg = "Jogador Cadastrado";
			ctrl.novoJogador = {};
		}).error(function(){
			ctrl.msg = "Erro salvando jogador "+jogador.nome;
		}); */
	};

	ctrl.voltar = function(){
		console.log("Voltando para tela de inicio");
		$rootScope.telaInicial = true;
		$location.path('/');
	};	

	ctrl.inicializar = function(){
		ctrl.buscaWorkout();
	};

	ctrl.inicializar();

/*
	ctrl.redirecionaStats = function(){		
		$rootScope.jogadores = angular.toJson(ctrl.jogadores);
		$location.path('/estatisticas').search({
			encaminhado : 999
		});
	}; */


});