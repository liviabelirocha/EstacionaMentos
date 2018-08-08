var logoutButton = document.getElementById("logout"); //variável para botão de logout
var testUser = true; //variável para evitar redirecionamento indesejado

//Pengando nome do usuário:
/*var id = firebase.auth().currentUser.uid;
firebase.database().ref('users/'+ id +'/username').once('value').then(function (snapshot) {
    var username = snapshot.val();
    document.getElementById('displayName').innerHTML = username;
});*/


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