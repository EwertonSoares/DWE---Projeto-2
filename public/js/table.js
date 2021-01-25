var tabela = document.getElementById("tabela");
var inputLocal = document.getElementById("local");
var inputImg = document.getElementById("inputImage");
var inputTextArea = document.getElementById("textArea");
var h2Message = document.getElementById("h2Message");
var btnAnterior = document.getElementById("anterior");
var btnProximo = document.getElementById("proximo");

var n = [1, 2, 3, 4];

function preenchertabela(obj) {
    var tdLocal = document.createElement("td")
    tdLocal.innerHTML = obj.local;

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
    var imgRemover = document.createElement("img");
    imgRemover.src = './img/lixeira.png';
    imgRemover.id = "imgRemover"

    var btnRemover = document.createElement("button");
    btnRemover.appendChild(imgRemover);
    btnRemover.addEventListener("click", function () {
        var item = this.parentNode.parentNode.childNodes.item(4).textContent;
        deletarImagem(`${item}-image`);
        removerProblema(item);
        tabela.deleteRow(this.parentNode.parentNode.rowIndex);
    })

    var tdRemover = document.createElement("td");
    tdRemover.appendChild(btnRemover);
    tdRemover.classList.add("remover");

    //Criando botão para update de problema cadastrado
    var imgUpdate = document.createElement("img");
    imgUpdate.src = './img/pencil.png';
    imgUpdate.id = "imgUpdate"

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

    var tdUpdate = document.createElement("td");
    tdUpdate.appendChild(btnUpdate);
    tdUpdate.classList.add("update")

    var tdNomeImagem = document.createElement("td")
    tdNomeImagem.innerHTML = obj.nomeImagem;
    tdNomeImagem.classList.add("nome-imagem-class");

    var tr = document.createElement("tr");
    tr.appendChild(tdLocal);
    tr.appendChild(tdImg);
    tr.appendChild(tdDesc);
    tr.appendChild(tdStatus);
    tr.appendChild(tdNOCorrencia);
    tr.appendChild(tdNomeImagem);
    tr.appendChild(tdRemover);
    tr.appendChild(tdUpdate);


    tabela.appendChild(tr);
    desabilitarBotaoAnterior()
}


btnAnterior.addEventListener("click", function () {
    btnProximo.disabled = false;

    var trList = document.getElementById("tabela").parentElement.getElementsByTagName("tr");

    if (trList[n[0]] !== undefined) {
        trList[n[0]].style.display = "none";
    }
    if (trList[n[1]] !== undefined) {
        trList[n[1]].style.display = "none";
    }
    if (trList[n[2]] !== undefined) {
        trList[n[2]].style.display = "none";
    }
    if (trList[n[3]] !== undefined) {
        trList[n[3]].style.display = "none";
    }

    n[0] = n[0] - 4;
    n[1] = n[1] - 4;
    n[2] = n[2] - 4;
    n[3] = n[3] - 4;

    if (trList[n[0]] !== undefined) {
        trList[n[0]].style.display = "table-row";
    } else {
        btnAnterior.disabled = true;
    }

    if (trList[n[1]] !== undefined) {
        trList[n[1]].style.display = "table-row";

    }

    if (trList[n[2]] !== undefined) {
        trList[n[2]].style.display = "table-row";

    }

    if (trList[n[3]] !== undefined) {
        trList[n[3]].style.display = "table-row";

    }

    if (trList[1].style.display == "table-row") {
        btnAnterior.disabled = "true;";
    }

})

btnProximo.addEventListener("click", function () {
    btnAnterior.disabled = false;

    var trList = document.getElementById("tabela").parentElement.getElementsByTagName("tr");

    trList[n[0]].style.display = "none";
    trList[n[1]].style.display = "none";
    trList[n[2]].style.display = "none";
    trList[n[3]].style.display = "none";

    n[0] = n[0] + 4;
    n[1] = n[1] + 4;
    n[2] = n[2] + 4;
    n[3] = n[3] + 4;

    if (n[0] === (trList.length - 1) ||
        n[1] === (trList.length - 1) ||
        n[2] === (trList.length - 1) ||
        n[3] === (trList.length - 1)) {

        btnProximo.disabled = true;
    }


    if (trList[n[0]] !== undefined) {
        trList[n[0]].style.display = "table-row";
    } else {
        btnProximo.disabled = true;
    }

    if (trList[n[1]] !== undefined) {
        trList[n[1]].style.display = "table-row";
    }
    else {
        btnProximo.disabled = true;
    }

    if (trList[n[2]] !== undefined) {
        trList[n[2]].style.display = "table-row";
    } else {
        btnProximo.disabled = true;
    }

    if (trList[n[3]] !== undefined) {
        trList[n[3]].style.display = "table-row";
    } else {
        btnProximo.disabled = true;
    }
})

function desabilitarBotaoAnterior() {
    btnProximo.disabled = true;

    var trList = document.getElementById("tabela").parentElement.getElementsByTagName("tr");
    var btnAnterior = document.getElementById("anterior");

    if (trList[1] === undefined) {
        return;
    }

    if (trList[1].style.display !== "table-row") {
        btnAnterior.disabled = true;
    }

    if (trList.length > 4) {
        btnProximo.disabled = false;
        btnProximo.style.display = "block";
        btnAnterior.style.display = "block";
    } else {
        btnProximo.style.display = "none";
        btnAnterior.style.display = "none";
    }
}