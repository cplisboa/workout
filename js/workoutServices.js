angular.module('workout').factory('workoutFactory', function($http, workoutServer) {
	var baseUrl = workoutServer + '/workout';
	var workoutFactory = {};

	workoutFactory.buscarWorkouts = function() {
		var parametros = "";
		return $http.get(baseUrl, {
					params : parametros
				});
	};
	
	workoutFactory.buscarArduinos = function() {
		var parametros = "";
		return $http.get(baseUrl, {});
	};

	workoutFactory.salvaWorkout = function(workout) {
		return $http.post(baseUrl, workout);
	}; 
	
	return workoutFactory;

});