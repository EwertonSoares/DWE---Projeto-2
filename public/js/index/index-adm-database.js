var listaProblemas = document.getElementById("lista-problemas");
var userEmail = localStorage.getItem("userEmail");
var bgLoader = document.getElementById("backgroud-loader");
var btnAnterior = document.getElementById("anterior");

var database = firebase.database();
var checkSnap = true;

window.onscroll = function () { esconderRodape() };

function esconderRodape() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        document.getElementById("rodape").style.display = "none";
    } else {
        document.getElementById("rodape").style.display = "block";
    }
}

//Buscando todos dados no banco
window.addEventListener("load", function () {
    document.getElementById("next-previous").style.display = "flex";
    document.getElementById("next-previous").style.margin = "5px 0 0 780px";
    document.getElementById("messageH2").style.marginBottom = '20px';

    listarTodosProblemasCadastrados();
});

listaProblemas.addEventListener("click", function () {
    listarTodosProblemasCadastrados();
})

function listarTodosProblemasCadastrados() {
    bgLoader.style.display = "block";

    var objFinalizado = [];
    var objEmAndamento = [];
    var objCadastrado = [];

    database.ref('problemas/').once('value', function (snapshot) {
        if (snapshot.val() === null) {
            checkSnap = false;

            document.getElementById("tabela-adm").style.display = "none";
            document.getElementById("h2Message").innerHTML = "Não há problemas cadastrados!";
            bgLoader.style.display = "none";

            return;
        }

        snapshot.forEach(function (elem) {
            let obj = {
                userEmail: snapshot.val()[elem.key].userEmail,
                local: snapshot.val()[elem.key].local,
                imgUrl: snapshot.val()[elem.key].imgUrl,
                nomeImagem: snapshot.val()[elem.key].nomeImagem,
                descricao: snapshot.val()[elem.key].descricao,
                status: snapshot.val()[elem.key].status,
                userId: snapshot.val()[elem.key].userUid,
                nOCorrencia: elem.key
            }

            if (obj.status === "Cadastrado") {
                objCadastrado.push(obj);
            } else if (obj.status === "Em andamento") {
                objEmAndamento.push(obj);
            }
            else {
                objFinalizado.push(obj);
            }
        });

        ordenarTabela(objCadastrado, objEmAndamento, objFinalizado);

        removeTdDaTabela();
        bgLoader.style.display = "none";
        mostrarQuatroItemsDaTabela();
    })
}


//Update de um problema cadastrado
function atualizarProblema(problema) {

    database.ref("problemas/" + problema.idProblema).update({
        userUid: problema.userUid,
        userEmail: problema.userEmail,
        local: problema.local,
        image: problema.nomeImagem,
        imgUrl: problema.imgUrl,
        descricao: problema.descricao,
        status: problema.status,
        resposta: problema.resposta
    })

    alert("Status alterado!");
}

function ordenarTabela(objCadastrado, objEmAndamento, objFinalizado) {

    objCadastrado.forEach(function (item) {
        preenchertabelaAdm(item);
    })

    objEmAndamento.forEach(function (item) {
        preenchertabelaAdm(item);
    })

    objFinalizado.forEach(function (item) {
        preenchertabelaAdm(item);
    })

}

function mostrarQuatroItemsDaTabela() {
    var trList = document.getElementById("tabela-adm").parentElement.getElementsByTagName("tr");

    var i;
    for (i = 0; i < trList.length; i++) {
        if (i > 4) {
            trList[i].style.display = "none";
        }
    }
};

function removeTdDaTabela() {
    var tdList = document.getElementById("tabela-adm").parentElement.getElementsByTagName("td");
    var i;

    for (i = 0; i < tdList.length; i++) {
        if (tdList[i].className === "resposta") {
            tdList[i].style.display = "none";
        }
    }

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

    for (i = 0; i < tdList.length; i++) {
        if (tdList[i].className === "status-atual") {
            tdList[i].style.display = "none";
        }
    }
}

function snapshotNulo() {
    checkSnap = false;

    document.getElementById("tabela-adm").style.display = "none";
    document.getElementById("next-previous").style.display = "none";
    document.getElementById("h2Message").innerHTML = "Não há problemas cadastrados!";
    bgLoader.style.display = "none";
}
