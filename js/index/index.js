var bgModal = document.getElementById("bg-modal");
var h2Message = document.getElementById("h2Message");
var btnSim = document.getElementById("sim");
var btnNao = document.getElementById("nao");
var btnEnviar = document.getElementById("enviarProblema");

var tabela = document.getElementById("tabela");
var formulario = document.getElementById("formulario");
var cadastrarProblema = document.getElementById("cadastrar-problema");
var listarProblemas = document.getElementById("listar-problemas");
var alterarSenha = document.getElementById("altera-senha");
var esquecisenha = document.getElementById("esqueci-a-senha");

cadastrarProblema.addEventListener("click", function () {
    redirecionaCadastraOcorrencia();
});

listarProblemas.addEventListener("click", function () {
    if (!checkSnap) {

        h2Message.innerHTML = "Não há problemas cadastrados por você!";
        tabela.style.display = "none";
        formulario.style.display = "none";
        esquecisenha.style.display = "none";
        btnEnviar.style.display = "none";
        bgLoader.style.display = "none";

        return;
    }

    h2Message.innerHTML = "Problemas cadastrados por você!";
    tabela.style.display = "table";
    formulario.style.display = "none";
    esquecisenha.style.display = "none";
    btnEnviar.style.display = "none";

})

alterarSenha.addEventListener("click", function () {
    h2Message.innerHTML = "";
    tabela.style.display = "none";
    formulario.style.display = "none";
    btnEnviar.style.display = "none";
    esquecisenha.style.display = "block";
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
    window.location.href = "index.html";
});


function redirecionaCadastraOcorrencia() {
    h2Message.innerHTML = "Registre uma nova ocorrencia de um problema";
    tabela.style.display = "none";
    esquecisenha.style.display = "none";
    formulario.style.display = "block";
    btnEnviar.style.display = "block";
}