var btnEnviar = document.getElementById("enviarProblema");
var inputLocal = document.getElementById("local");
var inputImg = document.getElementById("inputImage");
var inputTextArea = document.getElementById("textArea");
var userUid = localStorage.getItem("userUid");
var userEmail = localStorage.getItem("userEmail");
var bgLoader = document.getElementById("backgroud-loader");

const db = firebase.database();

btnEnviar.addEventListener("click", function () {
    bgLoader.style.display = "block";
    let id = db.ref().child('problemas').push().key;

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

//Buscando dados no banco
window.addEventListener("load", function () {
    bgLoader.style.display = "block";

    db.ref('problemas/').once('value', function (snapshot) {
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
    })
})
