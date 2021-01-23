var tabela = document.getElementById("tabela");
var inputLocal = document.getElementById("local");
var inputImg = document.getElementById("inputImage");
var inputTextArea = document.getElementById("textArea");
var h2Message = document.getElementById("h2Message");

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

function desabilitarBotaoAnterior() {

    var trList = document.getElementById("tabela").parentElement.getElementsByTagName("tr");
    var btnAnterior = document.getElementById("anterior");

    if (trList[1] === undefined) {
        return;
    }

    if (trList[1].style.display !== "table-row") {
        debugger
        btnAnterior.disabled = true;
    }
}