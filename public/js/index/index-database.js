var btnEnviar = document.getElementById("enviarProblema");
var inputLocal = document.getElementById("local");
var inputImg = document.getElementById("inputImage");
var inputTextArea = document.getElementById("textArea");
var userUid = localStorage.getItem("userUid");
var userEmail = localStorage.getItem("userEmail");
var bgLoader = document.getElementById("backgroud-loader");
var h2Message = document.getElementById("h2Message");
var message = "Registre uma nova ocorrencia de um problema";

var checkSnap = true;
const db = firebase.database();

window.addEventListener("load", function () {
    buscarProblemasCadastrados();
    document.getElementById("interna").style.marginTop = "0";
    document.getElementById("next-previous").style.position = "fixed";
    document.getElementById("next-previous").style.top = "515px";
    h2Message.style.marginTop = "20px";
    h2Message.style.marginBottom = "20px";
})

btnEnviar.addEventListener("click", function () {
    bgLoader.style.display = "block";

    var check = verificaCampos();
    if (check) {
        bgLoader.style.display = "none";
        return;
    }

    if (h2Message.innerHTML === message) {
        let id = db.ref().child('problemas').push().key;

        let problema = {
            userUid: userUid,
            userEmail: userEmail,
            local: inputLocal.value,
            nomeImagem: "",
            imgUrl: "",
            descricao: inputTextArea.value,
            status: "Cadastrado"
        }

        salvarproblemas(id, problema);
    }

    else {
        atualizarProblema();
    }
});

//Buscar dados por id do usuario
function buscarProblemasCadastrados() {
    var objetos = [];
    bgLoader.style.display = "block";

    db.ref('problemas/').once('value', function (snapshot) {
        if (snapshot.val() === null) {

            snapshotNulo();

            return;
        }

        snapshot.forEach(function (elem) {

            if (snapshot.val()[elem.key].userUid === userUid) {

                let obj = {
                    local: snapshot.val()[elem.key].local,
                    imgUrl: snapshot.val()[elem.key].imgUrl,
                    nomeImagem: snapshot.val()[elem.key].nomeImagem,
                    descricao: snapshot.val()[elem.key].descricao,
                    status: snapshot.val()[elem.key].status,
                    userId: snapshot.val()[elem.key].userUid,
                    nOCorrencia: elem.key
                }

                objetos.push(obj);
            }

            document.getElementById("next-previous").style.display = "flex";
        });

        if (objetos.length === 0) {
            snapshotNulo();
        }

        objetos.reverse();
        objetos.forEach(function (item) {
            preenchertabela(item);
        });

        removeTdDaTabela();
        mostrarQuatroItemsDaTabela();
        bgLoader.style.display = "none";
    })
}

function removerProblema(id) {
    db.ref("problemas/" + id).remove();
}

//Update de um problema cadastrado
function atualizarProblema() {
    let idProblema = sessionStorage.getItem("idProblema");
    let nomeImg = sessionStorage.getItem("nomeImagem");

    let problema = {
        userUid: userUid,
        userEmail: userEmail,
        local: inputLocal.value,
        nomeImagem: nomeImg,
        imgUrl: inputImg.value,
        descricao: inputTextArea.value,
        status: "Cadastrado"
    }

    if (inputImg.type === "url") {
        db.ref("problemas/" + idProblema).update({
            userUid: problema.userUid,
            userEmail: problema.userEmail,
            local: problema.local,
            image: problema.nomeImagem,
            imgUrl: problema.imgUrl,
            descricao: problema.descricao,
            status: "Cadastrado"
        })

        limparSessilStorage();
        window.location.href = "https://registro-de-problemas-d501d.web.app/index.html";

    } else {
        atualizaProblema(idProblema, problema);
        limparSessilStorage();
    }
}

function snapshotNulo() {
    checkSnap = false;

    document.getElementById("tabela").style.display = "none";
    document.getElementById("next-previous").style.display = "none";
    document.getElementById("h2Message").innerHTML = "Não há problemas cadastrados por você!";
    bgLoader.style.display = "none";
}

function removeTdDaTabela() {
    var tdList = document.getElementById("tabela").parentElement.getElementsByTagName("td");
    var i;
    for (i = 0; i < tdList.length; i++) {
        if (tdList[i].className === "numOcorrencia") {
            tdList[i].style.display = "none";
        }
    }

    for (i = 0; i < tdList.length; i++) {
        if (tdList[i].className === "nome-imagem-class") {
            tdList[i].style.display = "none";
        }
    }
}

function mostrarQuatroItemsDaTabela() {
    var trList = document.getElementById("tabela").parentElement.getElementsByTagName("tr");

    var i;
    for (i = 0; i < trList.length; i++) {
        if (i > 4) {
            trList[i].style.display = "none";
        }
    }
};

function limparSessilStorage() {
    sessionStorage.removeItem("nomeImagem");
    sessionStorage.removeItem("urlImagem");
    sessionStorage.removeItem("idProblema");
}