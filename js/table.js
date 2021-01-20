var tabela = document.getElementById("tabela");

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
    imgRemove.id = "imgRemover"

    var botao = document.createElement("button");
    botao.appendChild(imgRemove);
    botao.addEventListener("click", function () {
        // var valorRemovido = this.parentNode.parentNode.childNodes.item(2).textContent;
        tabela.deleteRow(this.parentNode.parentNode.rowIndex);
    })

    var tdRemover = document.createElement("td");
    tdRemover.appendChild(botao);
    tdRemover.classList.add("remover")

    var tr = document.createElement("tr");
    tr.appendChild(tdLocal);
    tr.appendChild(tdImg);
    tr.appendChild(tdDesc);
    tr.appendChild(tdStatus);
    tr.appendChild(tdNOCorrencia);
    tr.appendChild(tdRemover);

    tabela.appendChild(tr);
}