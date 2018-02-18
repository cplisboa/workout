angular.module('workout').factory('treinoFactory', function($http, workoutServer) {
	var baseUrl = workoutServer + '/treino';
	var treinoFactory = {};

	treinoFactory.buscaTreinos = function() {
		var parametros = "";
		return $http.get(baseUrl, {
			params : parametros
		});
	};
	
	return treinoFactory;

});