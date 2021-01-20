var btnEnviar = document.getElementById("enviarProblema");
var inputLocal = document.getElementById("local");
var inputImg = document.getElementById("inputImage");
var inputTextArea = document.getElementById("textArea");
var userUid = localStorage.getItem("userUid");
var userEmail = localStorage.getItem("userEmail");
var bgLoader = document.getElementById("backgroud-loader");

var checkSnap = true;
const db = firebase.database();

btnEnviar.addEventListener("click", function () {
    bgLoader.style.display = "block";
    let id = db.ref().child('problemas').push().key;

    salvarImageNoStorage(id);

    let problema = {
        userUid: userUid,
        userEmail: userEmail,
        local: inputLocal.value,
        image: inputImg.value,
        descricao: inputTextArea.value,
        status: "Cadastrado"
    }

    var check = verificaCampos();
    if (check) {
        return;
    }

    setTimeout(function () {
        db.ref('problemas/' + id).set(problema);

        bgLoader.style.display = "none";
        bgModal.style.display = "block";
    }, 1000);

});

//Buscar dados por id do usuario
window.addEventListener("load", function () {
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
                    image: snapshot.val()[elem.key].image,
                    descricao: snapshot.val()[elem.key].descricao,
                    status: snapshot.val()[elem.key].status,
                    userId: snapshot.val()[elem.key].userUid,
                    nOCorrencia: elem.key
                }

                objetos.push(obj);
                preenchertabela(obj);
            }
        });

        if (objetos.length === 0) {
            snapshotNulo();
        }

        bgLoader.style.display = "none";
    })
})

function snapshotNulo() {
    checkSnap = false;

    document.getElementById("tabela").style.display = "none";
    document.getElementById("h2Message").innerHTML = "Não há problemas cadastrados por você!";
    bgLoader.style.display = "none";
}