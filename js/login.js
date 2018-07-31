var nome = document.getElementById("validationCustom01");
var email = document.getElementById("exampleInputEmail1");
var senha = document.getElementById("exampleInputPassword1");
var submeterCadastro = document.getElementById("submeterCadastro");
var database = firebase.database();
//variáveis de inputs e botões

//ação ao clicar no botão de submeter cadastro
function writeUserData(nome, email, senha,) {
    firebase.database().ref('users/' + userId).set({
      username: nome,
      email: email,
      senha : senha
    });
  }

//Função para os botões 'entrar' e 'cadastrar' da área de login
function Revelar(div) {
    var display = document.getElementById(div).style.display;
    if(display == "none")
        document.getElementById(div).style.display = 'block';
    else
        document.getElementById(div).style.display = 'none';
}