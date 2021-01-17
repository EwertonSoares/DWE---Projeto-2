var inputEmail = document.getElementById("email");
var inputSenha = document.getElementById("senha");
var inputConfirmarSenha = document.getElementById("confirmar-senha");
var btnCadastar = document.getElementById("btnEnviar");
var loader = document.getElementById("backgroud-loader");

btnCadastar.addEventListener("click", function () {
    loader.style.display = "block";

    var checkCampos = verificaCampos(inputEmail, inputSenha, inputConfirmarSenha);
    if (checkCampos) {
        return;
    }

    var checkSenhas = verificaSenhas(inputSenha, inputConfirmarSenha);
    if (checkSenhas) {
        return;
    }

    firebase.auth().createUserWithEmailAndPassword(inputEmail.value, inputSenha.value)
        .then(function () {
            loader.style.display = "none";

            alert("Usuario cadastrado com sucesso!");
            window.location.replace("index.html");

        }).catch(function (error) {
            trataErroCadastraUsuario(error.message);
        });
});