
angular.module('workout', ['ngRoute'])

.constant('workoutServer', 'http://' + location.host)

.config(function($locationProvider, $routeProvider) {


	$routeProvider.when('/cadastraWorkout', {
		templateUrl : 'views/cadastrarWorkout.html',
		label : 'Cadastra Workout'
			
	}).when('/gerenciarLogger', {
		templateUrl : 'views/gerenciarLogger.html',
		label : 'Gerenciar Logger'						
			
	}).when('/atribuirLogger', {
		templateUrl : 'views/atribuirWorkout.html',
		label : 'Atribuir Logger'

	}).when('/resultados', {
		templateUrl : 'views/resultados.html',
		label : 'Resultados'

	}).when('/', {
		templateUrl : 'views/telaInicial.html',
		label : 'Início'
			
	}).otherwise({
		redirectTo : '/'
	});

	$locationProvider.html5Mode({
		enabled : false,
		requireBase : false,
		rewriteLinks : true
	});

	//$location.path("/");
	//$httpProvider.interceptors.push('httpInterceptor');
	//$httpProvider.interceptors.push('errorInterceptor');
	//$httpProvider.interceptors.push('authInterceptor');

});



