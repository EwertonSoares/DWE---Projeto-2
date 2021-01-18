var spanErroEmail = document.getElementById("erro-email");

email.addEventListener("change", function () {
    if (spanErroEmail.style.display === "block" || spanEmailVazio.style.display === "block") {
        h2.style.display = "block";
        spanEmailVazio.style.display = "none";
        spanErroEmail.style.display = "none";
        email.style.borderColor = "#000000";

        return;
    }

});

function tratarErroEsqueciASenha(menssagem) {

    switch (menssagem) {
        case 'The email address is badly formatted.':
            formatoMensagemErro();
            spanErroEmail.innerHTML = "Formato de email invalido. Formato esperado seunome@email.com";
            break;
        case 'There is no user record corresponding to this identifier. The user may have been deleted.':
            formatoMensagemErro();
            spanErroEmail.innerHTML = "Endereço de email não cadastrado. Digite um email valido";
            break;
        default:
            formatoMensagemErro();
            spanErroEmail.innerHTML = "Algo inesperado ocorreu. Tente novamente.";
    }
}

function formatoMensagemErro() {
    h2.style.display = "none";
    spanErroEmail.style.display = "block";
    email.style.borderColor = "#ff0000";
}