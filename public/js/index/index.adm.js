var bgModal = document.getElementById("bg-modal");
var h2Message = document.getElementById("h2Message");
var btnSim = document.getElementById("sim");
var btnNao = document.getElementById("nao");
var btnEnviar = document.getElementById("enviarProblema");

var tabela = document.getElementById("tabela-adm");
var formulario = document.getElementById("formulario");
var cadastrarProblema = document.getElementById("cadastrar-problema");
var listarProblemas = document.getElementById("lista-problemas");
var alterarSenha = document.getElementById("altera-senha");
var esquecisenha = document.getElementById("esqueci-a-senha");
var sair = document.getElementById("logout");
var loader = document.getElementById("backgroud-loader");

window.addEventListener("load", function () {
    var logado = false;

    if (localStorage.getItem("acesso") === "true") {
        logado = true;
    }

    if (logado === false) {
        window.location.href = "/login.html";
    }
});

sair.addEventListener("click", function logout() {
    loader.style.display = "block";

    firebase.auth().signOut()
        .then(function () {

            localStorage.setItem("acesso", false);
            localStorage.removeItem("userEmail");
            localStorage.removeItem("userUid");

            loader.style.display = "none";

            window.location.href = "/login.html";

        }).catch(function (error) {
            loader.style.display = "none";
            console.log(error.message);
        });
});

listarProblemas.addEventListener("click", function () {
    if (!checkSnap) {

        h2Message.innerHTML = "Não há problemas cadastrados!";
        tabela.style.display = "none";
        formulario.style.display = "none";
        esquecisenha.style.display = "none";
        btnEnviar.style.display = "none";
        bgLoader.style.display = "none";

        return;
    }

    window.location.href = "/administrador.html";

})

alterarSenha.addEventListener("click", function () {
    h2Message.innerHTML = "";
    tabela.style.display = "none";
    formulario.style.display = "none";
    btnEnviar.style.display = "none";
    esquecisenha.style.display = "block";
    document.getElementById("next-previous").style.display = "none";
});

btnSim.addEventListener("click", function () {
    var local = document.getElementById("local");
    var imagem = document.getElementById("inputImage");
    var txtArea = document.getElementById("textArea");

    bgModal.style.display = "none";
    bgLoader.style.display = "block";
    local.value = "";
    imagem.value = "";
    txtArea.value = "";

    setTimeout(function () {
        bgLoader.style.display = "none";

        redirecionaCadastraOcorrencia();
    }, 1000);
});


btnNao.addEventListener("click", function () {
    window.location.href = "/administrador.html";
});


function redirecionaCadastraOcorrencia() {
    h2Message.innerHTML = "Registre uma nova ocorrencia de um problema";
    tabela.style.display = "none";
    esquecisenha.style.display = "none";
    formulario.style.display = "block";
    btnEnviar.style.display = "block";
}