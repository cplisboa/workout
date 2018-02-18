
var bd = require('./db.js');

wk1 = new bd.Workout({id: 33, nome: "Cleo", repeticoes: 55});
bd.saveWorkout(wk1);
console.log("Wk1 adicionado"+wk1);

lista = bd.buscaWorkouts();
console.log("Lista atual "+lista);
