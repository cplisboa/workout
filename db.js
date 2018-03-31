var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/workout', {useMongoClient: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Conectado no banco workout");
});

//MODELO WORKOUT
exports.workoutSchema = new mongoose.Schema({
    id: Number,
    nome: String,
    repeticoes: Number
});
exports.Workout = mongoose.model('Workout', exports.workoutSchema);

//Método para salvar workout
exports.saveWorkout = function(workout){			  
	workout.save(function (err, wkSalvo){
		if(err) return console.error(err);
		console.log("workout salvo");
	});
};

//Método que retorna lista de workouts
exports.buscaWorkouts = function(){
	exports.Workout.find(function(err, lista) {
	    if(err) return console.error(err);
	    console.log("Lista de wks "+lista);
	    return lista;
	});
};

//MODELO TREINO
exports.treinoSchema = new mongoose.Schema({
    nome: String,
    listaExos: [{nome: String, repeticoes: Number}]
});
exports.Treino = mongoose.model('Treino', exports.treinoSchema);

//Método para salvar treino
exports.saveTreino = function(treino){			  
	treino.save(function (err, treinoSalvo){
		if(err) return console.error(err);
		console.log("treino salvo");
	});
};

//Método que retorna lista de treinos
exports.buscaTreinos = function(){
	exports.Treino.find(function(err, lista) {
	    if(err) return console.error(err);
	    console.log("Lista de treinos:");
	    console.log(lista);
	    return lista;
	});
};

//MODELO EXERCICIO
exports.exercicioSchema = new mongoose.Schema({
    nome: String,
    repeticoes: Number
});
exports.Exercicio = mongoose.model('Exercicio', exports.exercicioSchema);

//Método para salvar exo
exports.saveExercicio = function(exercicio){			  
	exercicio.save(function (err, exoSalvo){
		if(err) return console.error(err);
		console.log("exercicio salvo");
	});
};

//Método que retorna lista de workouts
exports.buscaExercicios = function(){
	exports.Exercicio.find(function(err, lista) {
	    if(err) return console.error(err);
	    console.log("Lista de exos "+lista);
	    return lista;
	});
};
