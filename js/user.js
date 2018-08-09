var logoutButton = document.getElementById("logout"); //variável para botão de logout
var testUser = true; //variável para evitar redirecionamento indesejado
var id;

//Formulário para login de entrada
function login () {
    //Variáveis:
    var emailInputE = document.getElementById('emailInputEnter');
    var passInputE = document.getElementById('passInputEnter');
    testUser = false

    //Fazendo login:
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(function () {

            firebase.auth().signInWithEmailAndPassword(emailInputE.value, passInputE.value).then(function () {
                //Caso de login de add:
                var user = firebase.auth().currentUser; //Variável para inicializar user do firebase
                id = user.uid
                if (user.email === "appestacionamentos@gmail.com") {
                    location.href = "adm.html";
                }
                //Login usuário:
                else {
                    location.href = "user.html";
                    console.log(id);
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
}

console.log(id);

//Pegando nome do usuário:
/*firebase.auth().then(function () {
    var uid = firebase.auth().currentUser.uid
    firebase.database().ref('users/' + uid + '/username').once('value').then(function (snapshot) {
        var username = snapshot.val();
        document.getElementById('displayName').innerHTML = username;
    });
})*/

logoutButton.addEventListener('click', function () {
        testUser = false //impedindo redirecionamento de bloqueio
        firebase.auth().signOut().then(function () {
            location.href = "home.html";
        }).catch(function (error) {
            alert("Erro inesperado:" + error.code + ". Entre em contato.")
        });
    });

firebase.auth().onAuthStateChanged(function (user) {
    if (user == null && testUser) {
        //Caso de acesso a página sem login
        alert("Acesso negado! Realize o login.")
        location.href = "login.html";
    }
});