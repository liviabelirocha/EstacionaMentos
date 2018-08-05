firebase.auth().onAuthStateChanged(function (user) {
    if (user == null) {
        //Caso de acesso a página sem login
        alert("Acesso negado! Realize o login.")
        location.href = "login.html";
    }
});