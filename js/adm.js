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
		snapshot.forEach(function (values) {
			values = values.val();
			//Criando itens para tabela a partir dos dados da reserva:
			var corpo = document.createElement("tbody");
			var linha = document.createElement("tr");
			
			var checK = document.createElement("td");
			var check = document.createElement("input");
			check.setAttribute("type", "checkbox");
			check.className = "check";
			check.appendChild(checK);
			linha.appendChild(check);
			
			var veiculoItem = document.createElement("td");
			veiculoItem.innerHTML = values['veiculo'];
			linha.appendChild(veiculoItem);

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

			var statusItem = document.createElement("td");
			statusItem.innerHTML = values['status']
			linha.appendChild(statusItem);
			
			var excluir = document.createElement("button");
			excluir.className = "btn btn-danger";
			excluir.innerHTML = 'Excluir';
			linha.appendChild(excluir)
			
			//Motando tabela:
			corpo.appendChild(linha);
			requestList.appendChild(corpo);
		});
	});
}

