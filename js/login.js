var submitButton = document.getElementById('submitButton');

//Função para os botões 'entrar' e 'cadastrar' da área de login
function Revelar(div) {
    var display = document.getElementById(div).style.display;
    if(display == "none")
        document.getElementById(div).style.display = 'block';
    else
        document.getElementById(div).style.display = 'none';
}

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
    else{
        firebase.auth().createUserWithEmailAndPassword(emailInput.value, passwordInput.value).then( function(){
            alert("Conta registrada com sucesso!");
            location.reload();
        }).catch(function() {
            alert("Erro! Este email já possui cadastro!");
            location.reload(); 
          });
    }
});