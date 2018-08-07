var car = document.getElementById('car');
var moto = document.getElementById('moto');
var database = firebase.database(); //Referência para banco de dados

//Pegar o horario
function time(){
	var data = new Date();
	var horas = data.getHours();
	var minutos = data.getMinutes();
	
	var horario = document.getElementById('horario');
	horario.innerHTML = horas + ":" + minutos;
}

