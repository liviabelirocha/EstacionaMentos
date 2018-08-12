var database = firebase.database(); //Referência para banco de dados
//Função para pegar o horario
function time(){
	var dataInicio = new Date().getTime();
	//Mandar o horario inicial para o banco de dados
	firebase.database().ref('users/FPOMh7s4XhXdmlG786DxvbXXCwz2').update({
		inicioMS : dataInicio
	})
}
//Função para cada vez que a pagina é atualizada
function timeFinal(){ 
	var dataAtualizada = new Date().getTime();
	//Função para calcular a variação do tempo
	function atualizarTime(){
		//Puxa o tempo inicial em minutos do banco de dados
		firebase.database().ref('users/FPOMh7s4XhXdmlG786DxvbXXCwz2/inicioMS').once('value').then(function(snapshot) {
			var dataInicio = snapshot.val();
			dataInicio = parseFloat(dataInicio);
			var tempoDecorrido = dataAtualizada - dataInicio;
			tempoDecorrido = tempoDecorrido/3600000;
			if (tempoDecorrido%3600000 > 60){
				tempoDecorrido = tempoDecorrido + 0.4;
			}
			tempoDecorrido = tempoDecorrido.toFixed(2);
			tempoDecorrido = tempoDecorrido.toString();
			tempoDecorrido = tempoDecorrido.replace(".", ":");
			//Mandar o tempo passado para o banco de dados
			firebase.database().ref('users/FPOMh7s4XhXdmlG786DxvbXXCwz2').update({
				tempoTotal: tempoDecorrido
			})
		});
	}
	atualizarTime();
}