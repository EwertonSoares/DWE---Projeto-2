const spanEmail = document.getElementById("emailRequired");
const spanSenha = document.getElementById("senhaRequired");
const ckbMostrarSenha = document.getElementById("checkbox");
const lblMostrarSenha = document.getElementById("mostrar-senha");
const acrieUmaconta = document.getElementById("crie-uma-conta");
const spanErroLogin = document.getElementById("erro-ao-logar");
const h2BemVindo = document.getElementById("bem-vindo");

email.addEventListener("change", function () {
    email.style.borderColor = "#808080";
    spanEmail.style.display = "none";
    lblMostrarSenha.style.display = "block";
    ckbMostrarSenha.style.display = "block";
    acrieUmaconta.style.marginTop = "45px";
})

senha.addEventListener("change", function () {
    senha.style.borderColor = "#808080";
    spanSenha.style.display = "none";
    lblMostrarSenha.style.display = "block";
    ckbMostrarSenha.style.display = "block";
    acrieUmaconta.style.marginTop = "45px";
})

ckbMostrarSenha.addEventListener("change", function () {
    let tipo = inputSenha.type;

    if (tipo === "password") {
        inputSenha.type = "text";
    } else if (tipo === "text") {
        inputSenha.type = "password";
    }
})

function tratarErro(menssagem) {
    h2BemVindo.style.display = "none";
    spanErroLogin.style.display = "flex";

    switch (menssagem) {
        case 'There is no user record corresponding to this identifier. The user may have been deleted.':
            spanErroLogin.innerHTML = "Email ou senha invalido.";
            break;
        case 'The password is invalid or the user does not have a password.':
            spanErroLogin.innerHTML = "Senha invalida.";
            break;
        default:
            spanErroLogin.innerHTML = "Algo inesperado ocorreu. Faça login novamente.";
    }
}

function validaEmailESenha(email, senha, loader) {
    let linkcrieUmaconta = document.getElementById("crie-uma-conta");

    if (email.value === "" && senha.value === "") {
        loader.style.display = "none"

        inputEmail.style.borderColor = "red";
        inputSenha.style.borderColor = "red";
        spanEmail.style.display = "flex";
        spanSenha.style.display = "flex";
        lblMostrarSenha.style.display = "none";
        ckbMostrarSenha.style.display = "none";

        return;

    } else if (email.value === "") {
        loader.style.display = "none"

        inputEmail.style.borderColor = "red";
        spanEmail.style.display = "flex";
        lblMostrarSenha.style.display = "none";
        ckbMostrarSenha.style.display = "none";
        linkcrieUmaconta.style.marginTop = "65px";

        return;

    } else if (senha.value === "") {
        loader.style.display = "none"

        inputSenha.style.borderColor = "red";
        spanSenha.style.display = "flex";
        lblMostrarSenha.style.display = "none";
        ckbMostrarSenha.style.display = "none";
        linkcrieUmaconta.style.marginTop = "65px";

        return;
    }
}
