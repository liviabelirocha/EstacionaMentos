var submitButton = document.getElementById('submitButton');

//Função para os botões 'entrar' e 'cadastrar' da área de login
function Revelar(div) {
    var display = document.getElementById(div).style.display;
    if(display == "none")
        document.getElementById(div).style.display = 'block';
    else
        document.getElementById(div).style.display = 'none';
}

// Ao clicar no botão
submitButton.addEventListener('click', function () {
    var nameInput = document.getElementById('nameInput');
    var emailInput = document.getElementById('emailInput');
    var passwordInput = document.getElementById('passwordInput');
    create(nameInput.value, emailInput.value, passwordInput.value);
});

// Função para criar um registro no Firebase
function create(name, email, senha) {
    var data = {
        Nome: name,
        Email: email,
        Senha: senha
    };

    return firebase.database().ref().child('Clientes').push(data);
}
