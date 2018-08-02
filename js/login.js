var submitButton = document.getElementById('submitButton');
var sendButton = document.getElementById('sendButton');
//Variáveis para os botões de envar cadastro e enviar login de entrada

//Função para os botões 'entrar' e 'cadastrar' da área de login
function Revelar(div) {
    var display = document.getElementById(div).style.display;
    if (display == "none")
        document.getElementById(div).style.display = 'block';
    else
        document.getElementById(div).style.display = 'none';
}

//Formulário para login de entrada
sendButton.addEventListener('click', function () {
    //Variáveis:
    var emailInputE = document.getElementById('emailInputEnter');
    var passInputE = document.getElementById('passInputEnter');

    //Fazendo login:
    firebase.auth().signInWithEmailAndPassword(emailInputE.value, passInputE.value).then(function () {
        location.href="user.html";
    }).catch(function (error) {
        var errorCode = error.code;
        //Caso em que email não possui cadastro
        if (errorCode === 'auth/user-not-found') {
            document.getElementById('invalidEmailEnter').style.display = 'block';
        }
        //Caso em que a senha é inválida
        else if (errorCode === 'auth/wrong-password') {
            document.getElementById('invalidPassEnter').style.display = 'block';
        }
        //Casos inesperados
        else{
            alert("Erro inesperado!");
        }
    })
})

//Formulário de cadastro
submitButton.addEventListener('click', function () {
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
            alert("Conta registrada com sucesso!");
            var user = firebase.auth().currentUser;
            user.updateProfile({
                displayName: nameInput.value
            });
            location.reload();
        }).catch(function () {
            alert("Erro! Este email já possui cadastro!");
            location.reload();
        })
    }
});