var inputLocal = document.getElementById("local");
var inputImg = document.getElementById("inputImage");
var inputTextArea = document.getElementById("textArea");

var spanErro = document.getElementById("erroCampos");
var h2Message = document.getElementById("h2Message");

var bgModal = document.getElementById("bg-modal");
var btnSim = document.getElementById("sim");
var btnNao = document.getElementById("nao");
var btnEnviar = document.getElementById("enviarProblema");

var cadastrarProblema = document.getElementById("cadastrar-problema");
var tabela = document.getElementById("tabela");
var formulario = document.getElementById("formulario");
var listarProblemas = document.getElementById("listar-problemas");
var alterarSenha = document.getElementById("altera-senha");
var esquecisenha = document.getElementById("esqueci-a-senha");

btnSim.addEventListener("click", function () {
    window.location.href = "index.html";
})

btnNao.addEventListener("click", function () {

})

inputLocal.addEventListener("change", function () {

    var result = checkSeCamposSaoIguais();
    if (result) {
        return;
    }

    if (inputLocal.value.length > 0) {

        inputLocal.style.borderColor = "black";

        return;
    }

    if (inputLocal.value.length > 0 && inputImg.value.length > 0 &&
        inputTextArea.value.length === 0) {

        inputLocal.style.borderColor = "black";
        inputImg.style.borderColor = "black";

        return;
    }

    if (inputLocal.value.length > 0 && inputTextArea.value.length > 0 &&
        inputImg.value.length === 0) {

        inputLocal.style.borderColor = "black";
        inputTextArea.style.borderColor = "black";

        return;
    }
})

inputImg.addEventListener("change", function () {

    var result = checkSeCamposSaoIguais();
    if (result) {
        return;
    }

    if (inputImg.value.length > 0) {

        inputImg.style.borderColor = "black";
        inputImg.style.border = "none";

        return;
    }

    if (inputImg.value.length > 0 && inputLocal.value.length > 0 &&
        inputTextArea.value.length === 0) {

        inputLocal.style.borderColor = "black";
        inputImg.style.borderColor = "black";

        return;
    }

    if (inputImg.value.length > 0 && inputTextArea.value.length > 0 &&
        inputLocal.value.length === 0) {

        inputImg.style.borderColor = "black";
        inputTextArea.style.borderColor = "black";

        return;
    }
})

inputTextArea.addEventListener("change", function () {

    var result = checkSeCamposSaoIguais();
    if (result) {
        return;
    }

    if (inputTextArea.value.length > 0) {

        inputTextArea.style.borderColor = "black";

        return;
    }

    if (inputTextArea.value.length > 0 && inputLocal.value.length > 0 &&
        inputImg.value.length === 0) {

        inputLocal.style.borderColor = "black";
        inputTextArea.style.borderColor = "black";

        return;
    }

    if (inputTextArea.value.length > 0 && inputImg.value.length > 0 &&
        inputLocal.value.length === 0) {

        inputImg.style.borderColor = "black";
        inputTextArea.style.borderColor = "black";

        return;
    }
})

cadastrarProblema.addEventListener("click", function () {
    h2Message.innerHTML = "Registre a ocorrencia de um problema";
    tabela.style.display = "none";
    formulario.style.display = "block";
    esquecisenha.style.display = "none";
    btnEnviar.style.display = "block";

});

listarProblemas.addEventListener("click", function () {
    h2Message.innerHTML = "Problemas cadastrados por você!";
    tabela.style.display = "block";
    formulario.style.display = "none";
    esquecisenha.style.display = "none";
    btnEnviar.style.display = "none";

})

alterarSenha.addEventListener("click", function() {
    h2Message.innerHTML = "";
    tabela.style.display = "none";
    formulario.style.display = "none";
    btnEnviar.style.display = "none";
    esquecisenha.style.display = "block";
})

function preenchertabela(obj) {
    var tdLocal = document.createElement("td")
    tdLocal.innerHTML = obj.local;

    var img = document.createElement("img");
    img.src = obj.image;

    var tdImg = document.createElement("td")
    tdImg.appendChild(img);

    var tdDesc = document.createElement("td")
    tdDesc.innerHTML = obj.descricao;

    var tdStatus = document.createElement("td")
    tdStatus.innerHTML = obj.status;

    var tdNOCorrencia = document.createElement("td")
    tdNOCorrencia.innerHTML = obj.nOCorrencia;

    var imgRemove = document.createElement("img");
    imgRemove.src = './img/lixeira.png';

    var botao = document.createElement("button");
    botao.appendChild(imgRemove);
    botao.addEventListener("click", function () {
        // var valorRemovido = this.parentNode.parentNode.childNodes.item(2).textContent;
        tabela.deleteRow(this.parentNode.parentNode.rowIndex);
    })

    var tdRemover = document.createElement("td");
    tdRemover.appendChild(botao);

    var tr = document.createElement("tr");
    tr.appendChild(tdLocal);
    tr.appendChild(tdImg);
    tr.appendChild(tdDesc);
    tr.appendChild(tdStatus);
    tr.appendChild(tdNOCorrencia);
    tr.appendChild(tdRemover);

    tabela.appendChild(tr);
}

function checkSeCamposSaoIguais() {
    if (inputLocal.value.length > 0 && inputImg.value.length > 0 &&
        inputTextArea.value.length > 0) {

        h2Message.style.display = "block";
        spanErro.style.display = "none";
        inputLocal.style.borderColor = "black";
        inputImg.style.border = "none";
        inputImg.style.borderColor = "black";
        inputTextArea.style.borderColor = "black";

        return true;
    }

    return false;
}

function verificaCampos() {
    if (inputLocal.value.length === 0 &&
        inputImg.value.length === 0 &&
        inputTextArea.value.length === 0) {

        esconderH2MostrarSpan();

        inputLocal.style.borderColor = "red";
    }

    if (inputLocal.value.length === 0) {
        esconderH2MostrarSpan();

        inputLocal.style.borderColor = "red";
        inputImg.style.border = "solid 1px";

        inputImg.style.borderColor = "red";
        inputTextArea.style.borderColor = "red";

        return true;
    }

    if (inputImg.value.length === 0) {
        esconderH2MostrarSpan();
        inputImg.style.border = "solid 1px";
        inputImg.style.borderColor = "red";

        return true;
    }

    if (inputTextArea.value.length === 0) {
        esconderH2MostrarSpan();
        inputTextArea.style.borderColor = "red";

        return true;
    }

    return false;
};

function esconderH2MostrarSpan() {
    h2Message.style.display = "none";
    spanErro.style.display = "block";
}
