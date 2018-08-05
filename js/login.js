var submitButton = document.getElementById('submitButton'); //Variável para botão de enviar cadastro
var sendButton = document.getElementById('sendButton'); // Variável para botão de enviar entrada
var passReset = document.getElementById('passReset'); // Variável para botão de recuperar senha
var Revelar; // Variável para função dos botões 'Entrar' e 'Cadastrar'
var database = firebase.database(); //Referência para banco de dados

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
        //Caso de login de add:
        var user = firebase.auth().currentUser; //Variável para inicializar user do firebase
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
})

//Recuperando senha pelo email
passReset.addEventListener('click', function () {
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
            function writeUserData(userId, name, email, passaword, imageUrl) {
                firebase.database().ref('users/'+ userId).set({
                    username: name,
                    email: email,
                    passaword: passaword,
                    profile_picture: imageUrl
                });
            }
            //Criando dado de usuário no banco
            var id = emailInput.value.replace(".", "'point'");
            writeUserData(id, nameInput.value, emailInput.value, passwordInput.value, "nulo");

            var user = firebase.auth().currentUser;
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
            })
        })/*.catch(function (error) {
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
        })*/
    }
});

