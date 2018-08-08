var car = document.getElementById('car');
var moto = document.getElementById('moto');
var database = firebase.database(); //Referência para banco de dados

var inicio;

//Pegar o horario
function time(){
	var data = new Date();
	var horas = data.getHours();
	var minutos = data.getMinutes();
	var inicioBruto = horas*60 + minutos;
	
	inicio = horas + ":" + minutos;
	
	firebase.database().ref('users/FPOMh7s4XhXdmlG786DxvbXXCwz2').update({
		reserva: inicio
	})
}

var data = new Date();
var horasf = data.getHours();
var minutosf = data.getMinutes();
var horariof = horasf + "+" + minutosf;
var finalBruto = horasf*60 + minutosf;

function atualizarTime(){
	firebase.database().ref('users/FPOMh7s4XhXdmlG786DxvbXXCwz2/reserva').once('value').then(function(snapshot) {
		var reserva = snapshot.val();
		var tempoDecorrido = (finalBruto - reserva)/60;
		tempoDecorrido = tempoDecorrido.toFixed(2);
		tempoDecorrido = tempoDecorrido.toString();
		tempoDecorrido = tempoDecorrido.replace(".", ":");

		firebase.database().ref('users/FPOMh7s4XhXdmlG786DxvbXXCwz2').update({
			total: tempoDecorrido
		})
	});
}