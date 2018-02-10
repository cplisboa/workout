var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/workout', {useMongoClient: true});
mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Conectado no mongodb. Schema Workout");
});

var workoutSchema = new mongoose.Schema({
    id: Number,
    nome: String,
    repeticoes: Number
});


var Workout = mongoose.model('Workout', workoutSchema);
 
module.exports = { Mongoose: mongoose, WorkoutSchema: workoutSchema, Workout: Workout };