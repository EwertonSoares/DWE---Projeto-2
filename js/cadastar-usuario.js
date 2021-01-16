var spanEmail = document.getElementById("emailRequired");
var spanSenha = document.getElementById("senhaRequired");
var spanConfirmaSenha = document.getElementById("confirmaSenhaRequired");
var h2facaSeuCadastro = document.getElementById("faca-seu-cadastro");

inputEmail.addEventListener("change", function () {

    let result = retornaCssInicial();
    if (!result) {
        return;
    }

});

inputSenha.addEventListener("change", function () {

    let result = retornaCssInicial();
    if (!result) {
        return;
    }

});

inputConfirmarSenha.addEventListener("change", function () {

    let result = retornaCssInicial();
    if (!result) {
        return;
    }
});

function verificaCampos(email, senha, confirmarSenha) {

    let checkCampo = checkCampos(email, senha, confirmarSenha);

    return checkCampo;

}

function verificaSenhas(senha, confirmarSenha) {
    let h2Cadastrar = document.getElementById("faca-seu-cadastro");
    let spanSenhas = document.getElementById("senhas");

    if (senha.value !== confirmarSenha.value) {
        loader.style.display = "none";
        h2Cadastrar.style.display = "none";
        spanSenhas.style.display = "block";

        return false;
    }

    return true;
}

function retornaCssInicial() {

    if (inputEmail.value.length > 0 && inputSenha.value.length > 0 && inputConfirmarSenha.value.length > 0) {

        btnCadastar.style.bottom = "130px";
        spanEmail.style.display = "none";
        spanSenha.style.display = "none";
        spanConfirmaSenha.style.display = "none";
        h2facaSeuCadastro.style.marginTop = "60px";
        inputEmail.style.borderColor = "#808080";
        inputSenha.style.borderColor = "#808080";
        inputConfirmarSenha.style.borderColor = "#808080";

        return false;
    }

    return true;
}

function checkCampos(email, senha, confirmarSenha) {
    loader.style.display = "none";

    if (email.value.length === 0 &&
        senha.value.length === 0 &&
        confirmarSenha.value.length === 0) {

        btnCadastar.style.bottom = "100px";
        spanEmail.style.display = "flex";
        spanSenha.style.display = "flex";
        spanConfirmaSenha.style.display = "flex";
        h2facaSeuCadastro.style.marginTop = "40px";
        email.style.borderColor = "red";
        senha.style.borderColor = "red";
        confirmarSenha.style.borderColor = "red";

        return false;
    }

    if (email.value.length > 0 &&
        senha.value.length === 0 &&
        confirmarSenha.value.length === 0) {

        btnCadastar.style.bottom = "120px";
        spanSenha.style.display = "flex";
        spanConfirmaSenha.style.display = "flex";
        h2facaSeuCadastro.style.marginTop = "40px";
        senha.style.borderColor = "red";
        confirmarSenha.style.borderColor = "red";

        return false;
    }

    if (senha.value.length > 0 &&
        email.value.length === 0 &&
        confirmarSenha.value.length === 0) {

        btnCadastar.style.bottom = "120px";
        spanEmail.style.display = "flex";
        spanConfirmaSenha.style.display = "flex";
        h2facaSeuCadastro.style.marginTop = "40px";
        email.style.borderColor = "red";
        confirmarSenha.style.borderColor = "red";

        return false;
    }

    if (confirmarSenha.value.length > 0 &&
        email.value.length === 0 &&
        senha.value.length === 0) {

        btnCadastar.style.bottom = "120px";
        spanEmail.style.display = "flex";
        spanSenha.style.display = "flex";
        h2facaSeuCadastro.style.marginTop = "40px";
        email.style.borderColor = "red";
        senha.style.borderColor = "red";

        return false;
    }

    return true;
}