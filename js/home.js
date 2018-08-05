var logoutButton = document.getElementById('logoutButton'); //Variável do botão de logout

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

logoutButton.addEventListener('click', function () {
    firebase.auth().signOut().then(function () {
        location.href = "home.html";
    }).catch(function (error) {
        alert("Erro inesperado:" + error.code + ". Entre em contato.")
    });
})