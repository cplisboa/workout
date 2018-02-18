angular.module('workout').controller('cadastraWorkoutCtrl', function($rootScope, $location, workoutFactory){

	var ctrl = this;
	ctrl.msg = "";
	ctrl.listaExos = ["ABDOMINAL", "FLEXÕES", "BARRA FIXA", "AGACHAMENTO", "ESTEIRA", "STEP"];
	ctrl.listaWorkouts = [];
	
	ctrl.addExo = function(){
		ctrl.listaWorkouts.push({nome: ctrl.exo, repeticoes: ctrl.qtdade});
	}
	
	

	ctrl.buscaWorkout = function(){
		console.log("Buscando lista de workouts...");
		workoutFactory.buscarWorkouts().success( function(listaWorkout) {
			//ctrl.listaWorkouts = listaWorkout;
			console.log("Busca realizada com sucesso");
			console.log(listaWorkout);
		}).error(function(data, status, headers, config) {
			ctrl.msg = angular.isDefined(data.mensagemErro) ? data.mensagemErro : data;
			console.log('Erro ao tentar salvar solicitação. ' + data);
		});
	};


	ctrl.cadastra = function(){
		console.log("iniciando cadastro de workout")
		var newWorkout = {
			nome: ctrl.nome,
			listaExos: ctrl.listaWorkouts
		};
	
		workoutFactory.salvaWorkout(newWorkout).success( function(resultado){
			console.log(resultado);
			ctrl.msg = resultado;
			ctrl.limpaForm();
		}).error(function(data, status, headers, config) {
			ctrl.msg = "Erro salvando workout ";
			ctrl.limpaForm();
		});
	}
	
	ctrl.limpaForm = function(){
		ctrl.nome=null;
		ctrl.listaWorkouts=[];
		ctrl.exo = null;
		ctrl.qtdade=null;
	}

	ctrl.voltar = function(){
		console.log("Voltando para tela de inicio");
		$rootScope.telaInicial = true;
		$location.path('/');
	};	

	ctrl.inicializar = function(){
		ctrl.buscaWorkout();
	};

	ctrl.inicializar();
});