var spanEmail = document.getElementById("emailRequired");
var spanSenha = document.getElementById("senhaRequired");
var ckbMostrarSenha = document.getElementById("checkbox");
var lblMostrarSenha = document.getElementById("mostrar-senha");
var acrieUmaconta = document.getElementById("crie-uma-conta");
var spanErroLogin = document.getElementById("erro-ao-logar");
var h2BemVindo = document.getElementById("bem-vindo");
var btnVolta = document.getElementById("voltar");


email.addEventListener("change", function () {
    email.style.borderColor = "#808080";
    acrieUmaconta.style.marginTop = "45px";

    let check = checkEmailESenha();
    if (check) {
        senha.style.borderColor = "#808080";

        return;
    }

    if (email.value.length > 0) {
        spanEmail.style.display = "none";
    }

    if (email.value.length > 0 &&
        senha.value.length === 0 &&
        spanSenha.style.display === "flex") {

        acrieUmaconta.style.marginTop = "65px";
    }

})

senha.addEventListener("change", function () {
    senha.style.borderColor = "#808080";
    acrieUmaconta.style.marginTop = "45px";


    let check = checkEmailESenha();
    if (check) {
        email.style.borderColor = "#808080";

        return;
    }

    if (senha.value.length > 0) {
        spanSenha.style.display = "none";
    }

    if (senha.value.length > 0 &&
        email.value.length === 0 &&
        spanEmail.style.display === "flex") {

        acrieUmaconta.style.marginTop = "65px";
    }

})

ckbMostrarSenha.addEventListener("change", function () {
    let tipo = inputSenha.type;

    if (tipo === "password") {
        inputSenha.type = "text";
    } else if (tipo === "text") {
        inputSenha.type = "password";
    }
})

function tratarErroLogin(menssagem) {
    loader.style.display = "none";
    h2BemVindo.style.display = "none";
    spanErroLogin.style.display = "flex";

    switch (menssagem) {
        case 'The email address is badly formatted.':
            spanErroLogin.innerHTML = "Email invalido.";
            break;
        case 'The password is invalid or the user does not have a password.':
            spanErroLogin.innerHTML = "Senha invalida.";
            break;
        case 'There is no user record corresponding to this identifier. The user may have been deleted.':
            spanErroLogin.innerHTML = "Usuario não cadastrado, faça seu cadastro.";
            break;
        default:
            spanErroLogin.innerHTML = "Algo inesperado ocorreu. Faça login novamente.";
    }
}

function checkEmailESenha() {
    if (email.value.length === 0 && senha.value.length === 0 ||
        email.value.length > 0 && senha.value.length > 0) {

        lblMostrarSenha.style.display = "block";
        ckbMostrarSenha.style.display = "block";
        spanSenha.style.display = "none";
        spanEmail.style.display = "none";

        return true;
    }

    return false;
}

function validaEmailESenha(email, senha) {
    let linkcrieUmaconta = document.getElementById("crie-uma-conta");

    if (email.value === "" && senha.value === "") {
        loader.style.display = "none"

        inputEmail.style.borderColor = "red";
        inputSenha.style.borderColor = "red";
        spanEmail.style.display = "flex";
        spanSenha.style.display = "flex";
        lblMostrarSenha.style.display = "none";
        ckbMostrarSenha.style.display = "none";

        return false;

    } else if (email.value === "") {
        loader.style.display = "none"

        inputEmail.style.borderColor = "red";
        spanEmail.style.display = "flex";
        lblMostrarSenha.style.display = "none";
        ckbMostrarSenha.style.display = "none";
        linkcrieUmaconta.style.marginTop = "65px";

        return false;

    } else if (senha.value === "") {
        loader.style.display = "none"

        inputSenha.style.borderColor = "red";
        spanSenha.style.display = "flex";
        lblMostrarSenha.style.display = "none";
        ckbMostrarSenha.style.display = "none";
        linkcrieUmaconta.style.marginTop = "65px";

        return false;
    }

    return true;
}

btnVolta.addEventListener("click", function() {
    document.getElementById("titulo").value = "Registro de problemas na cidade de campinas";
    document.getElementById("titulo").style.marginBottom = "40px";
    document.getElementById("visualizar-problemas-cadastrados").style.display = "block";
    document.getElementById("esquerda").style.display = "block";
    document.getElementById("direta").style.display = "block";
    document.getElementById("interna").style.border = "flex";
    btnVolta.style.display = "none";
    
    document.getElementById("tabela").style.display = "none";
    document.getElementById("next-previous").style.display = "none";
    document.getElementById("next-previous").style.width = "900px";
    document.getElementById("next-previous").style.marginTop = "15px";
    document.getElementById("next-previous").style.marginLeft = "236px";
    document.getElementById("next-previous").style.textAlign = "center";
})

function esconderPaginaDeLogin() {
    document.getElementById("titulo").value = "Problemas registrados em campinas";
    document.getElementById("titulo").style.marginBottom = "0";
    document.getElementById("visualizar-problemas-cadastrados").style.display = "none";
    document.getElementById("esquerda").style.display = "none";
    document.getElementById("direta").style.display = "none";
    document.getElementById("interna").style.border = "none";
    
    btnVolta.style.display = "block";
    
    document.getElementById("tabela").style.display = "table";
    document.getElementById("next-previous").style.display = "flex";
    document.getElementById("next-previous").style.marginTop = "10px";
    document.getElementById("next-previous").style.justifyContent = "center";
}