var btnVolta = document.getElementById("voltar");
var bgLoader = document.getElementById("backgroud-loader");
var checkSnap = true;
var db = firebase.database();

//Buscando todos dados no banco
window.addEventListener("load", function() {
    // var objetos = [];
    bgLoader.style.display = "block";

    var objFinalizado = [];
    var objEmAndamento = [];
    var objCadastrado = [];

    db.ref('problemas/').once('value', function (snapshot) {
        if (snapshot.val() === null) {
            checkSnap = false;

            document.getElementById("tabela").style.display = "none";
            document.getElementById("titulo").innerHTML = "Não há problemas cadastrados por você!";
            bgLoader.style.display = "none";

            return;
        }

        snapshot.forEach(function (elem) {
            let obj = {
                local: snapshot.val()[elem.key].local,
                imgUrl: snapshot.val()[elem.key].imgUrl,
                nomeImagem: snapshot.val()[elem.key].nomeImagem,
                descricao: snapshot.val()[elem.key].descricao,
                status: snapshot.val()[elem.key].status,
                userId: snapshot.val()[elem.key].userUid,
                resposta: snapshot.val()[elem.key].resposta,
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
});


function ordenarTabela(objCadastrado, objEmAndamento, objFinalizado) {

    objEmAndamento.forEach(function (item) {
        preenchertabela(item);
    })

    objFinalizado.forEach(function (item) {
        preenchertabela(item);
    })

    objCadastrado.forEach(function (item) {
        preenchertabela(item);
    })
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

    for (i = 0; i < tdList.length; i++) {
        if (tdList[i].className === "resposta") {
            tdList[i].style.display = "none";
        }
    }

    for (i = 0; i < tdList.length; i++) {
        if (tdList[i].className === "remover") {
            tdList[i].style.display = "none";
        }
    }

    for (i = 0; i < tdList.length; i++) {
        if (tdList[i].className === "update") {
            tdList[i].style.display = "none";
        }
    }
}

btnVolta.addEventListener("click", function() {
   window.location.href = "/login.html";
})