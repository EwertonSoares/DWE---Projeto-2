const inputEmail = document.getElementById("email");
const inputSenha = document.getElementById("senha");
const btnLogin = document.getElementById("btnLogin");
const btnCadastar = document.getElementById("crie-uma-conta");
const btnEsqueceuAsenha = document.getElementById("esqueceu-a-senha");

btnLogin.addEventListener("click", function () {
    var loader = document.getElementById("backgroud-loader");
    loader.style.display = "block";

    validaEmailESenha(inputEmail, inputSenha, loader);

    firebase.auth().signInWithEmailAndPassword(inputEmail.value, inputSenha.value)
        .then(function (result) {
            console.log("SEU UID: " + result.user.email)
            window.location.replace("pagina-inicial.html");
        })
        .catch(function (error) {
            loader.style.display = "none";

            tratarErro(error.message);

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