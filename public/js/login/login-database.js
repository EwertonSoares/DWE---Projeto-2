var verProdutosCadastrados = document.getElementById("ver-problemas-cadastrados");
var bgLoader = document.getElementById("backgroud-loader");

var checkSnap = true;
const db = firebase.database();

//Buscando todos dados no banco
verProdutosCadastrados.addEventListener("click", function () {
    var objetos = [];
    bgLoader.style.display = "block";

    db.ref('problemas/').once('value', function (snapshot) {
        if (snapshot.val() === null) {
            checkSnap = false;

            document.getElementById("tabela").style.display = "none";
            document.getElementById("h2Message").innerHTML = "Não há problemas cadastrados por você!";
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
                nOCorrencia: elem.key
            }
            objetos.push(obj);
        });

        objetos.reverse();
        objetos.forEach(function(item) {
            preenchertabela(item);

        });

        removeTdDaTabela();

        bgLoader.style.display = "none";
        esconderPaginaDeLogin();
        mostrarQuatroItemsDaTabela();
    })
});

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
}