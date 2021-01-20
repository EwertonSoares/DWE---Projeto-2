var tabela = document.getElementById("tabela");

var inputLocal = document.getElementById("local");
var inputImg = document.getElementById("inputImage");
var inputTextArea = document.getElementById("textArea");
var h2Message = document.getElementById("h2Message");

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

    //Criando imagem e botão para remoçao de problema cadastrado
    var imgRemover = document.createElement("img");
    imgRemover.src = './img/lixeira.png';
    imgRemover.id = "imgRemover"

    var btnRemover = document.createElement("button");
    btnRemover.appendChild(imgRemover);
    btnRemover.addEventListener("click", function () {
        var item = this.parentNode.parentNode.childNodes.item(4).textContent;
        removerProblema(item);
        tabela.deleteRow(this.parentNode.parentNode.rowIndex);
    })

    var tdRemover = document.createElement("td");
    tdRemover.appendChild(btnRemover);
    tdRemover.classList.add("remover");

    
    //Criando imagem e botão para update de problema cadastrado
    var imgUpdate = document.createElement("img");
    imgUpdate.src = './img/pencil.png';
    imgUpdate.id = "imgUpdate"

    var btnUpdate = document.createElement("button");
    btnUpdate.appendChild(imgUpdate);
    btnUpdate.addEventListener("click", function () {
        
        var id = this.parentNode.parentNode.childNodes.item(4).textContent;
        sessionStorage.setItem("idProblema", id);

        var local = this.parentNode.parentNode.childNodes.item(0).textContent;
        var descricao = this.parentNode.parentNode.childNodes.item(2).textContent;

        inputLocal.value = local;
        inputTextArea.innerHTML = descricao;
        inputImg.style.display = "none";

        redirecionaCadastraOcorrencia();
        h2Message.innerHTML = "Edição de poblema cadastrado!";
    })

    var tdUpdate = document.createElement("td");
    tdUpdate.appendChild(btnUpdate);
    tdUpdate.classList.add("update")

    var tr = document.createElement("tr");
    tr.appendChild(tdLocal);
    tr.appendChild(tdImg);
    tr.appendChild(tdDesc);
    tr.appendChild(tdStatus);
    tr.appendChild(tdNOCorrencia);
    tr.appendChild(tdRemover);
    tr.appendChild(tdUpdate);
   

    tabela.appendChild(tr);
}

function removerItemstabela() {
    // tabela.remove(tr)
}