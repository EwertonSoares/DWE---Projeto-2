var spanEmail = document.getElementById("emailRequired");
var spanSenha = document.getElementById("senhaRequired");
var spanConfirmaSenha = document.getElementById("confirmaSenhaRequired");
var h2facaSeuCadastro = document.getElementById("faca-seu-cadastro");
var spanSenhas = document.getElementById("senhas");
var spanErroAoCadastrarUsuario = document.getElementById("erroAoCadastrarUsuario");

inputEmail.addEventListener("change", function () {

    retornaCssInicial();

});

inputSenha.addEventListener("change", function () {

    retornaCssInicial();

});

inputConfirmarSenha.addEventListener("change", function () {

    retornaCssInicial();
});

function verificaCampos(email, senha, confirmarSenha) {
    if (spanSenhas.style.display === "block" || spanErroAoCadastrarUsuario.style.display === "block") {
        spanSenhas.style.display === "none";
        spanErroAoCadastrarUsuario.style.display === "none";
    }
    let checkCampo = checkCampos(email, senha, confirmarSenha);

    return checkCampo;

}

function verificaSenhas(senha, confirmarSenha) {
    let h2Cadastrar = document.getElementById("faca-seu-cadastro");

    if (senha.value !== confirmarSenha.value) {
        loader.style.display = "none";
        h2Cadastrar.style.display = "none";
        spanSenhas.style.display = "block";

        return true;
    }

    return false;
}

function trataErroCadastraUsuario(menssagem) {
    loader.style.display = "none";
    h2facaSeuCadastro.style.display = "none";
    spanSenhas.style.display = "none";
    spanErroAoCadastrarUsuario.style.display = "block";

    switch (menssagem) {
        case 'The email address is already in use by another account.':
            spanErroAoCadastrarUsuario.innerHTML = "Esse endereço de email já esta sendo usado por outro usuario";
            break;

        case 'The email address is badly formatted.':
            spanErroAoCadastrarUsuario.innerHTML = "Formato de endereço de email invalido. Formato esperado seunome@email.com";
            break;

        default:
            spanErroAoCadastrarUsuario.innerHTML = "Algo inesperado ocorreu. Faça o cadastro novamente.";
    }

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
    }
}

function checkCampos(email, senha, confirmarSenha) {
    if (email.value.length === 0 &&
        senha.value.length === 0 &&
        confirmarSenha.value.length === 0) {

        loader.style.display = "none";
        btnCadastar.style.bottom = "100px";
        spanEmail.style.display = "flex";
        spanSenha.style.display = "flex";
        spanConfirmaSenha.style.display = "flex";
        h2facaSeuCadastro.style.marginTop = "40px";
        email.style.borderColor = "red";
        senha.style.borderColor = "red";
        confirmarSenha.style.borderColor = "red";

        return true;
    }

    if (email.value.length > 0 &&
        senha.value.length === 0 &&
        confirmarSenha.value.length === 0) {

        loader.style.display = "none";
        btnCadastar.style.bottom = "120px";
        spanSenha.style.display = "flex";
        spanConfirmaSenha.style.display = "flex";
        h2facaSeuCadastro.style.marginTop = "40px";
        senha.style.borderColor = "red";
        confirmarSenha.style.borderColor = "red";

        return true;
    }

    if (senha.value.length > 0 &&
        email.value.length === 0 &&
        confirmarSenha.value.length === 0) {

        loader.style.display = "none";
        btnCadastar.style.bottom = "120px";
        spanEmail.style.display = "flex";
        spanConfirmaSenha.style.display = "flex";
        h2facaSeuCadastro.style.marginTop = "40px";
        email.style.borderColor = "red";
        confirmarSenha.style.borderColor = "red";

        return true;
    }

    if (confirmarSenha.value.length > 0 &&
        email.value.length === 0 &&
        senha.value.length === 0) {

        loader.style.display = "none";
        btnCadastar.style.bottom = "120px";
        spanEmail.style.display = "flex";
        spanSenha.style.display = "flex";
        h2facaSeuCadastro.style.marginTop = "40px";
        email.style.borderColor = "red";
        senha.style.borderColor = "red";

        return true;
    }

    return false;
}