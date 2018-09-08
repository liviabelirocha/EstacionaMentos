/*var user = firebase.auth().currentUser; //Variável para inicializar user do firebase
var logoutButton = document.getElementById("logout");
var testUser = true

logoutButton.addEventListener('click', function (){
    testUser = false
    firebase.auth().signOut().then(function () {
        location.href = "home.html";
    }).catch(function (error) {
        alert("Erro inesperado:" + error.code + ". Entre em contato.")
    });
})

firebase.auth().onAuthStateChanged(function (user) {
    if (user == null && testUser) {
        //Caso de acesso a página sem login
        alert("Acesso negado! Realize o login.")
        location.href = "login.html";
    } else if (user.email != "appestacionamentos@gmail.com") {
        alert("Você não tem permissão para acessar esta página!")
        location.href = "user.html";
    }
});*/

//As funções abaixo serão movidas para 'app.js'

//Função para impedir acesso a página por outros usuários
function admBlock() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user.email != "appestacionamentos@gmail.com") {
            alert("Você não tem permissão para acessar esta página!");
            location.href = "user.html";
        }
    })
}

function showAllRequests() {
    //Buscando informs usuário atual:
    var requestList = document.getElementById('requestList');
	
    //Buscando reservas:
    firebase.database().ref('requests').on('value', function (snapshot) {
		var cont = 0; //Contador para percorrer todos as reservas existentes
		snapshot.forEach(function (values) {
			values = values.val();
			let key = Object.keys(snapshot.val())[cont]; //Pega a key da reserva pelo contador
			//Criando itens para tabela a partir dos dados da reserva:
			var corpo = document.createElement("tbody");
			var linha = document.createElement("tr");
			
			var ativar = document.createElement("button");
			ativar.className = "btn btn-success btn-sm check";
			ativar.innerHTML = 'Ativar';
			
			ativar.onclick = function(event){
			    var dataInicio = new Date().getTime();
				firebase.database().ref('requests/' + key).update({
					inicioMS: dataInicio,
					status: "ativo"
				});
				location.href = "adm.html";
			};
		
			linha.appendChild(ativar);
			
			var veiculoItem = document.createElement("td");
			veiculoItem.innerHTML = values['veiculo'];
			linha.appendChild(veiculoItem);
			
			var emailItem = document.createElement("td");
			emailItem.innerHTML = values['proprietario']
			linha.appendChild(emailItem);

			var boardItem = document.createElement("td");
			boardItem.innerHTML = values['placa'];
			linha.appendChild(boardItem);

			var horarioItem = document.createElement("td");
			horarioItem.innerHTML = values['horario'];
			linha.appendChild(horarioItem);
			
			if (values['status'] == "inativo"){
				var timeItem = document.createElement("td");
				timeItem.innerHTML = "--";
				linha.appendChild(timeItem);

				var priceItem = document.createElement("td");
				priceItem.innerHTML = "--";
				linha.appendChild(priceItem);
			}else{
				var timeItem = document.createElement("td");
				timeItem.innerHTML = timeFinal(values['inicioMS']);
				linha.appendChild(timeItem);

				var priceItem = document.createElement("td");
				priceItem.innerHTML = preco(values);
				linha.appendChild(priceItem);
			}
			
			var parar = document.createElement("button");
			parar.className = "btn btn-danger btn-sm check";
			parar.innerHTML = 'Parar';
			
			parar.onclick = function(event){
				
			}
			
			linha.appendChild(parar);
			
			//Motando tabela:
			corpo.appendChild(linha);
			requestList.appendChild(corpo);

			cont ++; //Adiciona mais ao contador para cada reserva para buscar nova chave
		});
	});
}

function timeFinal(dataInicio){
	var dataAtualizada = new Date().getTime();
	var tempoDecorridoHoras = dataAtualizada - dataInicio;
	tempoDecorridoHoras = tempoDecorridoHoras/3600000;
	var tempoDecorridoMinutos = tempoDecorridoHoras%1*60;
	var hora = ((tempoDecorridoHoras < 10) ? "0" : "") +
		Math.floor(tempoDecorridoHoras) + 
		":" + 
		((tempoDecorridoMinutos < 10) ? "0" : "") + 
		Math.floor(tempoDecorridoMinutos);
	return hora;
} 

function preco(values){
	var horas = parseInt(timeFinal(values["inicioMS"]).split(":")[0]);
	var valor = 0;
	if (values["veiculo"] == "moto"){
		valor = 2 * (horas+1);
		valor = "R$" + valor + ",00"
	}
	if (values["veiculo"] == "carro"){
		valor = 4 * (horas+1);
		valor = "R$" + valor + ",00"
	}
	if (values["veiculo"] == "grande porte"){
		valor = 6 * (horas+1);
		valor = "R$" + valor + ",00"
	}
	return valor;
}