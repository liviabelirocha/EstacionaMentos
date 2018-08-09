var database = firebase.database(); //Referência para banco de dados
var inicio; 
var final; 
var data = new Date();

//Pegar o horario
function time(){
	var horas = data.getHours(); 
	var minutos = data.getMinutes(); 
	var inicioBruto = horas*60 + minutos; 
	inicio = horas + ":" + minutos; 
	
	//Mandar o horario inicial para o banco de dados
	firebase.database().ref('users/FPOMh7s4XhXdmlG786DxvbXXCwz2').update({
		reservaInicial: inicio,
		reservaMinutos: inicioBruto
	})
}

//Função para cada vez que a pagina é atualizada
function timeFinal(){
	var horasf = data.getHours(); 
	var minutosf = data.getMinutes(); 
	var finalBruto = horasf*60 + minutosf; 
	final = horasf + ":" + minutosf; 
	
	function atualizarTime(){
		//Puxa o tempo inicial em minutos do banco de dados
		firebase.database().ref('users/FPOMh7s4XhXdmlG786DxvbXXCwz2/reservaMinutos').once('value').then(function(snapshot) {
			var reservaMinutos = snapshot.val();
			reservaMinutos = parseFloat(reservaMinutos);
			var tempoDecorrido = finalBruto - reservaMinutos;
			//Caso onde já passou uma hora ou mais
			if (tempoDecorrido >= 60 ){
				tempoDecorrido = tempoDecorrido/60;
			}else{ //Caso onde ainda não passou uma hora
				tempoDecorrido = tempoDecorrido/100;
			}
			tempoDecorrido = tempoDecorrido.toFixed(2); //Coloca duas casas decimais depois da virgula
			tempoDecorrido = tempoDecorrido.toString(); //Transforma o Float em String
			tempoDecorrido = tempoDecorrido.replace(".", ":"); //Substitui o "." por ":"
			
			//Mandar o tempo passado para o banco de dados
			firebase.database().ref('users/FPOMh7s4XhXdmlG786DxvbXXCwz2').update({
				reservaFinal: final,
				total: tempoDecorrido
			})
		});
	}
	atualizarTime();
}

