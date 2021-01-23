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
var sair = document.getElementById("logout");
var loader = document.getElementById("backgroud-loader");
var btnAnterior = document.getElementById("anterior");

var ci = 0;
var cc = 0;

window.addEventListener("load", function () {
    var logado = false;

    if (localStorage.getItem("acesso") === "true") {
        logado = true;
    }

    if (logado === false) {
        window.location.href = "login.html";
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

            window.location.href = "login.html";

        }).catch(function (error) {
            loader.style.display = "none";
            console.log(error.message);
        });
});

cadastrarProblema.addEventListener("click", function () {
    document.getElementById("local").value = "";
    document.getElementById("inputImage").value = "";
    document.getElementById("textArea").innerHTML = "";
    document.getElementById("inputImage").style.display = "inlineblock";

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

    window.location.href = "index.html";
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

btnAnterior.addEventListener("click", function () {
    var trList = document.getElementById("tabela").parentElement.getElementsByTagName("tr");

    for (var i = 8; i >= 4; i--) {
        if(trList[i] === undefined) {
            continue;
        }

        trList[i].style.display = "none";
    }

    for (var i = 1; i <= 4; i++) {
        if(trList[i] === undefined) {
            continue;
        }
        
        trList[i].style.display = "table-row";
    }
})

document.getElementById("proximo").addEventListener("click", function () {
    btnAnterior.disabled = false;

    var trList = document.getElementById("tabela").parentElement.getElementsByTagName("tr");

    for (i = 1; i <= 4; i++) {
        if(trList[i] === undefined) {
            continue;
        }
        
        trList[i].style.display = "none";
    }

    for (i = 5; i > 1; i++) {
        if (i > 8) {
            return;
        }
        if(trList[i] === undefined) {
            continue;
        }
        
        trList[i].style.display = "table-row";
    }
})