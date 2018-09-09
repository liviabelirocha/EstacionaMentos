var redir_global = true; //Variável para controle de redirecionamentos

/* LISTA DE FUNÇÕES:
- [33] logout(): Logout sem redirecionamento, usado no site
- [42] navLog(): Altera o botão de login da navbar do site para logout e vice versa
- [58] Revelar(div): Deixar uma div visível ou invisível, usado na área de login para ocultar forms
- [67] login(): Recebe dados do form de login da área de login e realiza autenticação por Firebase
- [123] resetPass(): Recebe email e envia um link para alterar a senha do usuário
- [157] register(): Recebe dados do form de cadastro e cadastra um novo usuário pelo Firebase
- [234] redirectAuth(local): Impede que a área de login seja acessada após atenticação por redirecionamento
- [246] logoutRed(local): Logout com redirecionamento, botão sair da área do usuário
- [256] watchAuth(): Impede acesso a página do usuário sem o login
- [271] changeName(): Insere nome do usuário atual na página
- [282] createRequest(): Cria uma nova reserva no banco de dados
- [312] showRequests(): Mostra reservas do usuário na página
- [362] atualizeData(caminho, retorno): Busca um dado no banco de dados a partir do 'caminho' e modifica o 'retorno' na página
- [369] timeFinal(caminho): Gera o tempo decorrida da reserva pelo usuário










 */

//SITE:

//Função para logout (sem redirecionamento):
function logout() {
    firebase.auth().signOut().then(function () {
        location.reload();
    }).catch(function (error) {
        alert("Erro inesperado:" + error.code + ". Entre em contato.")
    });
}

//Função para intereção da navbar do site e estado de autenticação
function navLog() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            //Usuário logado
            document.getElementById('logout').style.display = 'block';
            document.getElementById('linkUser').style.display = 'block';
        } else {
            //Usuário deslogado
            document.getElementById('login').style.display = 'block';
        }
    });
}

//AREA DE LOGIN:

//Função para os botões 'entrar' e 'cadastrar' da área de login
function Revelar(div) {
    var display = document.getElementById(div).style.display;
    if (display == "none")
        document.getElementById(div).style.display = 'block';
    else
        document.getElementById(div).style.display = 'none';
}

//Função para login
function login() {
    //Variáveis:
    var emailInputE = document.getElementById('emailInputEnter');
    var passInputE = document.getElementById('passInputEnter');

    //Fazendo login:
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(function () {

            firebase.auth().signInWithEmailAndPassword(emailInputE.value, passInputE.value).then(function () {
                //Caso de login de add:
                const user = firebase.auth().currentUser; //Variável para inicializar user do firebase
                if (user.email === "appestacionamentos@gmail.com") {
                    location.href = "adm.html";
                }
                //Login usuário:
                else {
                    location.href = "user.html";
                }
            }).catch(function (error) {
                var errorCode = error.code;
                //Caso em que um campo foi deixado em branco
                if (emailInputE.value == "") {
                    document.getElementById('invalidEmailEnter').style.display = 'block';
                    document.getElementById('invalidEmailEnter').innerHTML = "Digite seu email";
                }
                else if (passInputE.value == "") {
                    document.getElementById('invalidPassEnter').style.display = 'block';
                    document.getElementById('invalidPassEnter').innerHTML = "Digite sua senha";
                }
                //Caso em que email não possui cadastro
                else if (errorCode === 'auth/user-not-found') {
                    document.getElementById('invalidEmailEnter').style.display = 'block';
                    document.getElementById('invalidEmailEnter').innerHTML = "Este email não está cadastrado";
                }
                //Caso em que a senha é inválida
                else if (errorCode === 'auth/wrong-password') {
                    document.getElementById('invalidPassEnter').style.display = 'block';
                    document.getElementById('invalidPassEnter').innerHTML = "Senha inválida";
                }
                //Caso em que email é inválido
                else if (errorCode === 'auth/invalid-email') {
                    document.getElementById('invalidEmailEnter').style.display = 'block';
                    document.getElementById('invalidEmailEnter').innerHTML = "Digite seu email corretamente";
                }
                //Casos inesperados
                else {
                    document.getElementById('enterAlert').className += ' alert-danger'
                    document.getElementById('textAlertEnter').innerHTML = "<strong>Erro inesperado: '" + errorCode + "'.</strong> Entre em contato."
                    document.getElementById('enterAlert').style.display = 'block';
                }
            })
        });
};

//Função para recuperar senha (Área de Login)
function resetPass() {
    var auth = firebase.auth(); //Variável para inicializar firebase
    var emailInputE = document.getElementById('emailInputEnter'); //variável para email
    auth.sendPasswordResetEmail(emailInputE.value).then(function () {
        // Enviando email e notificando na janela.
        document.getElementById('enterAlert').className += ' alert-success'
        document.getElementById('textAlertEnter').innerHTML = "<strong>Link de recuperação criado!</strong> Verifique seu email."
        document.getElementById('enterAlert').style.display = 'block';
    }).catch(function (error) {
        var errorCode = error.code; //Variável de controle de erros
        if (emailInputE.value == "") {
            document.getElementById('invalidEmailEnter').style.display = 'block';
            document.getElementById('invalidEmailEnter').innerHTML = "Digite seu email";
        }
        //Caso em que email não possui cadastro
        else if (errorCode === 'auth/user-not-found') {
            document.getElementById('invalidEmailEnter').style.display = 'block';
            document.getElementById('invalidEmailEnter').innerHTML = "Este email não está cadastrado";
        }
        //Caso em que email é inválido
        else if (errorCode === 'auth/invalid-email') {
            document.getElementById('invalidEmailEnter').style.display = 'block';
            document.getElementById('invalidEmailEnter').innerHTML = "Digite seu email corretamente";
        }
        //Casos inesperados
        else {
            document.getElementById('enterAlert').className += ' alert-danger'
            document.getElementById('textAlertEnter').innerHTML = "<strong>Erro inesperado: '" + errorCode + "'.</strong> Entre em contato."
            document.getElementById('enterAlert').style.display = 'block';
        }
    });
};

//Função de cadastro
function register() {
    //Variáveis:
    var nameInput = document.getElementById('nameInput');
    var emailInput = document.getElementById('emailInput');
    var passwordInput = document.getElementById('passwordInput');
    var emailTest = document.getElementById('emailTest');
    var passTest = document.getElementById('passTest');

    //verificando se formulário de cadastro é válido
    if (nameInput.value == "")
        document.getElementById('nullName').style.display = 'block';
    else if (emailInput.value == "")
        document.getElementById('nullEmail').style.display = 'block';
    else if (passwordInput.value == "")
        document.getElementById('nullPass').style.display = 'block';
    else if (passwordInput.value.length < 8)
        document.getElementById('nullPass2').style.display = 'block';
    else if (emailInput.value != emailTest.value)
        document.getElementById('invalidEmail').style.display = 'block';
    else if (passwordInput.value != passTest.value)
        document.getElementById('invalidPass').style.display = 'block';
    //Criando conta:
    else {

        firebase.auth().createUserWithEmailAndPassword(emailInput.value, passwordInput.value).then(function () {
            function writeUserData(userId, name, email, passaword, imageUrl) {
                firebase.database().ref('users/' + userId).set({
                    username: name,
                    email: email,
                    passaword: passaword,
                    profile_picture: imageUrl,
                    status: 'first'
                });
            };

            var user = firebase.auth().currentUser;

            //Criando dado de usuário no banco
            writeUserData(user.uid, nameInput.value, emailInput.value, passwordInput.value, "nulo");

            user.sendEmailVerification().then(function () {
                // Enviando email de confirmação de cadastro.
                document.getElementById('inputAlert').className += ' alert-success'
                document.getElementById('textAlert').innerHTML = "<strong>Conta criada com sucesso!</strong> Verifique seu email."
                document.getElementById('inputAlert').style.display = 'block';
                document.getElementById('submitButton').style.display = 'none';
            }).catch(function () {
                //Caso ocorra um erro
                document.getElementById('inputAlert').className += ' alert-danger'
                document.getElementById('textAlert').innerHTML = "<strong>Erro inesperado.</strong> Não foi possível verificar este email."
                document.getElementById('inputAlert').style.display = 'block';
                user.delete();
            });

            //Realizando logout
            firebase.auth().signOut();

        }).catch(function (error) {
            //Caso de cadastro de conta já existente:
            if (error.code === "auth/email-already-in-use") {
                document.getElementById('nullEmail1').style.display = 'block';
            }
            //Casos de email em fomato inválido:
            else if (error.code == "auth/invalid-email") {
                document.getElementById('nullEmail').style.display = 'block';
            }
            //Casos de erros inesperados:
            else {
                document.getElementById('inputAlert').className += ' alert-danger'
                document.getElementById('textAlert').innerHTML = "<strong>Erro inesperado: '" + error.code + "'</strong> Entre em contato."
                document.getElementById('inputAlert').style.display = 'block';
            }
        })
    }
};

//Função para redirecionamento em caso usuário ja esteja autenticado
function redirectAuth() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user.email === 'appestacionamentos@gmail.com') {
            location.href = 'adm.html';
        } else {
            location.href = 'user.html';
        }
    })
};

//AREA DO USUÁRIO:
//Função de logout (com redirecionamento)
function logoutRed(local) {
    redir_global = false;
    firebase.auth().signOut().then(function () {
        location.href = local;
    }).catch(function (error) {
        alert("Erro inesperado:" + error.code + ". Entre em contato.")
    });
};

//Função para observar o estado de autenticação na página
function watchAuth() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user == null && redir_global) {
            //Caso de acesso a página sem login
            alert("Acesso negado! Realize o login.")
            location.href = "login.html";
        }
        else {
            changeName();
            showRequests();
        }
    });
}

//Função para inserir nome do usuário atual na página (usada após fim da autenticação)
function changeName() {
    //Pegando id do usuário atual:
    var user = firebase.auth().currentUser;

    //Pegando nome no banco de dados e modificando na página:
    firebase.database().ref('users/' + user.uid + '/username').once('value').then(function (snapshot) {
        document.getElementById('displayName').innerHTML = snapshot.val();
    });
}

//Função para realizar reserva na área do administrador

function createRequest() {
    //Buscando informs usuário atual:
    var user = firebase.auth().currentUser;

    //Valores do pedido
    var place = document.getElementById('place').value;
    var board = document.getElementById('board').value;
    var car = document.getElementById('car').value;
    var dataInicio = new Date().getTime();

    //Gerando uma id para pedido:
    var requestKey = firebase.database().ref().child('requests').push().key;

    //Atualizando banco de dados
    firebase.database().ref('requests/' + requestKey).update({
        proprieterio: user.email,
        inicioMS: dataInicio,
        veiculo: car,
        placa: board,
        local: place,
        status: 'ativo'
    });
	
	var update = {};
	update[requestKey] = requestKey;
	
    firebase.database().ref('users/' + user.uid + '/requests/').update(update);
    location.href = "user.html";
} 

//Função para realizar reserva na área do usuário

function reservaVaga(){
	//Buscando informs usuario atual
	var user = firebase.auth().currentUser;
	
	//Valores do pedido
    var board = document.getElementById('board').value;
    var car = document.getElementById('car').value;
	var data = document.getElementById('data').value;
	var hora = document.getElementById('hora').value
	
	var horario = (data + " " + "-" + " " + hora);
	
	//Gerando uma id para pedido
	var requestKey = firebase.database().ref().child('requests').push().key;
	
	//Atualizando banco de dados
	firebase.database().ref('requests/' + requestKey).update({
		proprietario: user.email,
		veiculo: car,
		horario: horario,
		placa: board,
		status: "inativo",
		tempo: "--",
		preço: "--",
		tempoFinal: "--",
		precoFinal: "--",
	});
	
	var update = {};
	update[requestKey] = requestKey;
	firebase.database().ref('users/' + user.uid + '/requests/').update(update);
    location.href = "user.html";
}

//Mostrando lista de reservas na página do usuário
function showRequests() {
    //Buscando informs usuário atual:
    var user = firebase.auth().currentUser;
    var requestList = document.getElementById('requestList');
	
    //Buscando reservas:
    firebase.database().ref('users/' + user.uid + '/requests').on('value', function (snapshot) {
			for(key in snapshot.val()){
			document.getElementById('requestDefault').innerHTML = ''; //Limpando campo da lista
			var caminho = 'requests/' + key +'/'; //Chave para caminho da reserva
			
			firebase.database().ref(caminho).on('value', function (values){
				values = values.val();
				//Criando itens para tabela a partir dos dados da reserva:
				var corpo = document.createElement("tbody");
				var linha = document.createElement("tr");

				var veiculoItem = document.createElement("td");
				veiculoItem.innerHTML = values['veiculo'];
				linha.appendChild(veiculoItem);

				var boardItem = document.createElement("td");
				boardItem.innerHTML = values['placa']
				linha.appendChild(boardItem);
				
				var horarioItem = document.createElement("td");
				horarioItem.innerHTML = values['horario'];
				linha.appendChild(horarioItem);
				
				if (values['status'] == "inativo"){
					var timeItem = document.createElement("td");
					timeItem.innerHTML = values['tempoFinal'];
					linha.appendChild(timeItem);

					var priceItem = document.createElement("td");
					priceItem.innerHTML = values['precoFinal'];
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

				//Motando tabela:
				corpo.appendChild(linha);
				requestList.appendChild(corpo);
				})	
		}
    })
}

//Função para buscar dado no banco de dados e enviar para página
function atualizeData(caminho, retorno) {
    firebase.database().ref(caminho).on('value', function (snapshot) {
        retorno.innerHTML = snapshot.val();
    })
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

/* FAZER/CONSERTAR:
- Integrar página do adm
- Funções de controle do adm
- Mudar função de reserva do usuário
- Fazer mapa gráfico
*/