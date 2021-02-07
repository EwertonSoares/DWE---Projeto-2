var inputLocal = document.getElementById("local");
var inputImg = document.getElementById("inputImage");
var inputTextArea = document.getElementById("textArea");
var h2Message = document.getElementById("h2Message");
var btnAnterior = document.getElementById("anterior");
var btnProximo = document.getElementById("proximo");
var userUid = localStorage.getItem("userUid");

var n = [1, 2];
var idTabela = "tabela";

function preenchertabelaAdm(obj) {
    var tabela = document.getElementById("tabela-adm");

    var tdUserEmail = criaHtml("td", obj.userEmail);

    var tdLocal = criaHtml("td", obj.local);

    var img = criaHtml("img", "");
    img.src = obj.imgUrl;
    img.classList.add("img-problema");

    var tdImg = criaHtml("td", "");
    tdImg.appendChild(img);

    var tdDesc = criaHtml("td", obj.descricao);
    tdDesc.classList.add("descricao-class");

    var selectStatus = criaSelectEOption();

    var option1 = criaHtml("option", obj.status);
    option1.id = "opt-cadastrado";

    var option2 = criaHtml("option", "Em andamento");
    option2.id = "opt-em-andamento";

    var option3 = criaHtml("option", "Finalizado");
    option3.id = "opt-finalizado";

    var option4 = criaHtml("option", "Cadastrado");
    option4.id = "opt-Cadastrado";

    selectStatus.appendChild(option1);
    selectStatus.appendChild(option2);
    selectStatus.appendChild(option3);
    selectStatus.appendChild(option4);

    checkStatus(obj, selectStatus, option2, option3, option4);

    var tdStatus = criaHtml("td", "")
    tdStatus.appendChild(selectStatus);

    var tdNOCorrencia = criaHtml("td", obj.nOCorrencia)
    tdNOCorrencia.classList.add("numOcorrencia");

    var imgResponder = criaHtml("img", "")
    imgResponder.src = "./img/responder.png";
    imgResponder.style.background = "aliceblue";
    imgResponder.style.width = "25px";

    var btnResponder = criaBotaoResponder();
    btnResponder.appendChild(imgResponder);

    var tdResponder = criaHtml("td", "")
    tdResponder.appendChild(btnResponder);
    tdResponder.classList.add("responder");

    var tdNomeImagem = criaHtml("td", obj.nomeImagem)
    tdNomeImagem.classList.add("nome-imagem-class");

    var tdStatusAtual = criaHtml("td", obj.status)
    tdStatusAtual.classList.add("status-atual");

    var tr = document.createElement("tr");
    tr.appendChild(tdUserEmail);
    tr.appendChild(tdLocal);
    tr.appendChild(tdImg);
    tr.appendChild(tdDesc);
    tr.appendChild(tdStatus);
    tr.appendChild(tdNOCorrencia);
    tr.appendChild(tdNomeImagem);
    tr.appendChild(tdResponder);
    tr.appendChild(tdStatusAtual);

    tabela.appendChild(tr);
    desabilitarBotaoAnterior(tabela)
}

function preenchertabela(obj) {
    var tabela = document.getElementById("tabela");

    var tdLocal = criaHtml("td", obj.local);

    var img = document.createElement("img");
    img.src = obj.imgUrl;
    img.classList.add("img-problema");
    var tdImg = document.createElement("td")
    tdImg.appendChild(img);

    var tdDesc = document.createElement("td")
    tdDesc.innerHTML = obj.descricao;
    tdDesc.classList.add("descricao-class");

    var tdStatus = document.createElement("td")
    tdStatus.innerHTML = obj.status;

    var tdNOCorrencia = document.createElement("td")
    tdNOCorrencia.innerHTML = obj.nOCorrencia;
    tdNOCorrencia.classList.add("numOcorrencia");

    //Criando botão para remoçao de problema cadastrado
    var imgRemover = criaHtml("img", "");
    imgRemover.src = './img/lixeira.png';
    imgRemover.id = "imgRemover"

    var btnRemover = criaBotaoRemover(imgRemover);

    var tdRemover = criaHtml("td", "");
    tdRemover.appendChild(btnRemover);
    tdRemover.classList.add("remover");

    //Criando botão para update de problema cadastrado
    var imgUpdate = criaHtml("img", "");
    imgUpdate.src = './img/pencil.png';
    imgUpdate.id = "imgUpdate"

    var btnUpdate = criaBotaoUpdate(imgUpdate);

    var tdUpdate = criaHtml("td", "")
    tdUpdate.appendChild(btnUpdate);
    tdUpdate.classList.add("update")

    var tdNomeImagem = criaHtml("td", obj.nomeImagem);
    tdNomeImagem.classList.add("nome-imagem-class");

    var linkVerResposta = criaLinkResposta();

    var tdResposta = criaHtml("td", "")
    tdResposta.appendChild(linkVerResposta);

    var tdtextoResposta = criaHtml("td", obj.resposta);
    tdtextoResposta.classList.add("resposta");
    tdtextoResposta.style.display = "none";

    var tr = document.createElement("tr");
    tr.appendChild(tdLocal);
    tr.appendChild(tdImg);
    tr.appendChild(tdDesc);
    tr.appendChild(tdStatus);
    tr.appendChild(tdNOCorrencia);
    tr.appendChild(tdNomeImagem);
    tr.appendChild(tdResposta);
    tr.appendChild(tdRemover);
    tr.appendChild(tdUpdate);
    tr.appendChild(tdtextoResposta);

    tabela.appendChild(tr);
    desabilitarBotaoAnterior(tabela);
}

function criaHtml(obj, valor) {
    let novoObj = document.createElement(obj);
    novoObj.innerHTML = valor;

    return novoObj;
}

function criaSelectEOption() {

    var selectStatus = document.createElement("select");
    selectStatus.id = "idStatus";
    selectStatus.addEventListener("change", function () {
        var email = this.parentNode.parentNode.childNodes.item(0).textContent;
        var local = this.parentNode.parentNode.childNodes.item(1).textContent;
        var url = this.parentNode.parentNode.childNodes.item(2).childNodes.item(0).currentSrc;
        var descricao = this.parentNode.parentNode.childNodes.item(3).textContent;
        var id = this.parentNode.parentNode.childNodes.item(5).textContent;
        sessionStorage.setItem("status", selectStatus.value);

        var problema = {
            userUid: userUid,
            userEmail: email,
            local: local,
            nomeImagem: `${id}image`,
            imgUrl: url,
            descricao: descricao,
            status: selectStatus.value,
            resposta: "",
            idProblema: id

        }

        atualizarProblema(problema);
    });

    return selectStatus;

}

function checkStatus(obj, selectStatus, option2, option3, option4) {

    if (obj.status === "Em andamento") {
        selectStatus.removeChild(option2)
    }

    if (obj.status === "Finalizado") {
        selectStatus.removeChild(option3)
    }

    if (obj.status === "Cadastrado") {
        selectStatus.removeChild(option4)
    }
}

function criaBotaoResponder() {
    var btnResponder = document.createElement("button");
    btnResponder.style.background = "aliceblue";

    btnResponder.addEventListener("click", function () {

        var problema = {
            idProblema: this.parentNode.parentNode.childNodes.item(5).textContent,
            userEmail: this.parentNode.parentNode.childNodes.item(0).textContent,
            local: this.parentNode.parentNode.childNodes.item(1).textContent,
            image: this.parentNode.parentNode.childNodes.item(6).textContent,
            imgUrl: this.parentNode.parentNode.childNodes.item(2).childNodes.item(0).currentSrc,
            descricao: this.parentNode.parentNode.childNodes.item(3).textContent,
            status: "",
            resposta: ""
        };

        sessionStorage.setItem("problema", JSON.stringify(problema))

        window.location.href = "resposta.html";
    })

    return btnResponder;
}

function criaBotaoUpdate(imgUpdate) {
    var btnUpdate = document.createElement("button");
    btnUpdate.appendChild(imgUpdate);
    btnUpdate.addEventListener("click", function () {

        document.getElementById("next-previous").style.display = "none";
        var local = this.parentNode.parentNode.childNodes.item(0).textContent;
        var descricao = this.parentNode.parentNode.childNodes.item(2).textContent;
        var image = this.parentNode.parentNode.childNodes.item(1).childNodes.item(0).currentSrc;
        var id = this.parentNode.parentNode.childNodes.item(4).textContent;
        var imag = this.parentNode.parentNode.childNodes.item(5).textContent;

        sessionStorage.setItem("nomeImagem", imag);
        sessionStorage.setItem("urlImagem", image);
        sessionStorage.setItem("idProblema", id);

        inputLocal.value = local;
        inputTextArea.innerHTML = descricao;
        inputImg.type = "url";
        inputImg.value = image;

        var form = document.getElementById("formulario");
        var b = document.createElement("button");
        b.innerHTML = "Alterar imagem";
        b.id = "btn-altera-imagem";

        inputImg.style.marginTop = "15px";
        inputImg.style.marginRight = "100px";
        inputImg.style.height = "18px";
        inputImg.style.width = "400px";

        b.addEventListener("click", () => {
            inputImg.type = "file";
            b.style.display = "none"
            inputImg.style.height = "20px";
            inputImg.style.width = "500px";
            inputImg.style.marginRight = "2px";
        })

        inputImg.addEventListener("mouseout", () => {
            if (inputImg.value === "") {
                inputImg.type = "url";
                inputImg.value = image;
                inputImg.style.width = "400px";
                b.style.display = "inline-block";
                inputImg.style.marginRight = "100px";
            }

        })

        form.appendChild(b)

        redirecionaCadastraOcorrencia();
        h2Message.innerHTML = "Edição de poblema cadastrado!";
    })

    return btnUpdate;
}

function criaBotaoRemover(imgRemover) {
    
    var btnRemover = document.createElement("button");
    btnRemover.appendChild(imgRemover);
    
    btnRemover.addEventListener("click", function () {
        var item = this.parentNode.parentNode.childNodes.item(4).textContent;
        deletarImagem(`${item}-image`);
        removerProblema(item);
        tabela.deleteRow(this.parentNode.parentNode.rowIndex);

        window.location.reload();
    })

    return btnRemover;
}

function criaLinkResposta() {
    var linkVerResposta = document.createElement("a");
    linkVerResposta.innerHTML = "Ver resposta";
    linkVerResposta.id = "link-resposta";
    linkVerResposta.style.cursor = "pointer";
    linkVerResposta.style.color = "lightblue";

    linkVerResposta.addEventListener("click", function () {
        var resposta = this.parentNode.parentNode.childNodes.item(9).textContent;

        if (resposta === "" || resposta === "undefined") {
            alert("Esse problema ainda não foi respondido!");

            return;
        }

        sessionStorage.setItem("resposta", resposta);

        window.location.href = "resposta.html";
    });

    return linkVerResposta;
}

btnAnterior.addEventListener("click", function () {
    btnProximo.disabled = false;

    setaIdTabela();

    var trList = document.getElementById(idTabela).parentElement.getElementsByTagName("tr");
    var i;

    if (trList[3].style.display === "table-row") {
        btnAnterior.disabled = true;
    }

    for (i = 0; i < 2; i++) {
        if (trList[n[i]] !== undefined) {
            trList[n[i]].style.display = "none";
        }
    }

    for (i = 0; i < 2; i++) {
        n[i] = n[i] - 2;

    }

    for (i = 0; i < 2; i++) {
        if (trList[n[i]] !== undefined) {
            trList[n[i]].style.display = "table-row";
        } else {
            btnAnterior.disabled = true;
        }
    }
})

btnProximo.addEventListener("click", function () {
    btnAnterior.disabled = false;

    setaIdTabela();

    var trList = document.getElementById(idTabela).parentElement.getElementsByTagName("tr");
    var i;

    for (i = 0; i < 2; i++) {
        trList[n[i]].style.display = "none";
    }

    for (i = 0; i < 2; i++) {
        n[i] = n[i] + 2;

    }

    for (i = 0; i < 2; i++) {

        if (trList[n[i]] !== undefined) {
            trList[n[i]].style.display = "table-row";
        } else {
            btnProximo.disabled = true;
        }
    }

    for (i = 0; i < 2; i++) {
        if (n[i] === (trList.length - 1)) {

            btnProximo.disabled = true;
        }
    }
})

function desabilitarBotaoAnterior(tabela) {
    btnProximo.disabled = true;

    var trList = tabela.parentElement.getElementsByTagName("tr");
    var btnAnterior = document.getElementById("anterior");

    if (trList[1] === undefined) {
        return;
    }

    if (trList[1].style.display !== "table-row") {
        btnAnterior.disabled = true;
    }

    if (trList.length > 2) {
        btnProximo.disabled = false;
        btnProximo.style.display = "block";
        btnAnterior.style.display = "block";
    } else {
        btnProximo.style.display = "none";
        btnAnterior.style.display = "none";
    }
}

function setaIdTabela() {
    if (localStorage.getItem("userEmail") === "servidor@admin.com") {
        idTabela = "tabela-adm";
    }
}