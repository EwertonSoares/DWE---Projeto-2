var verProdutosCadastrados = document.getElementById("ver-problemas-cadastrados");
var bgLoader = document.getElementById("backgroud-loader");

var checkSnap = true;
const db = firebase.database();

//Buscando todos dados no banco
verProdutosCadastrados.addEventListener("click", function () {
    // window.addEventListener("load", function () {
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
                    image: snapshot.val()[elem.key].image,
                    descricao: snapshot.val()[elem.key].descricao,
                    status: snapshot.val()[elem.key].status,
                    nOCorrencia: elem.key
                }

                preenchertabela(obj);
            });

            bgLoader.style.display = "none";
            esconderPaginaDeLogin();
        })
    // })
});