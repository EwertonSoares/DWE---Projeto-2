const inputEmail = document.getElementById("email");
const inputSenha = document.getElementById("senha");
const btnEnviar = document.getElementById("btnEnviar");
const btnCadastar = document.getElementById("crie-uma-conta");
const btnEsqueceuAsenha = document.getElementById("esqueceu-a-senha");
const loader = document.getElementById("backgroud-loader");

btnEnviar.addEventListener("click", function () {
    loader.style.display = "block";

    let resultado = validaEmailESenha(inputEmail, inputSenha, loader);

    if (!resultado) {
        return;
    }

    firebase.auth().signInWithEmailAndPassword(inputEmail.value, inputSenha.value)
        .then(function (result) {
            console.log("SEU UID: " + result.user.email)
            window.location.replace("pagina-inicial.html");
        })
        .catch(function (error) {
            tratarErro(error.message, loader);
        });
});

btnCadastar.addEventListener("click", function () {
    var auth = null;

    firebase.auth().createUserWithEmailAndPassword(inputEmail.value, inputSenha.value)
        .then(function (user) {
            alert("Cadastrado com sucesso!!!")
            auth = user;
        }).catch(function (error) {
            alert("Erro ao tentar cadastrar!!!")
        });
});

btnEsqueceuAsenha.addEventListener("click", function () {
    var email = document.getElementById("email");

    firebase.auth().sendPasswordResetEmail(email.value)
        .then(function () {
            alert("Enviamos um email para alteração de senha!!!");
        }).catch(function (error) {
            alert("Erro ao resetar a senha!!!")
        });;
});