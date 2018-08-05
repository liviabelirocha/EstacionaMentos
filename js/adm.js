var user = firebase.auth().currentUser; //Variável para inicializar user do firebase
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
});