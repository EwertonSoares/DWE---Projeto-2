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

//Para update
// window.addEventListener("load", function () {

//     db.ref('problemas/').once('value', function (snapshot) {
//         if(snapshot === null) {
//             console.log("Objeto nulo")
//         }
//         // console.log(snapshot.val()["-MRLPo97OvxOmXmmU2uP"])    
//         snapshot.forEach(function (elem) {
//             console.log();
//             console.log("Chave do elemento: " + elem.key);
//             console.log(snapshot.val()[elem.key])    
//         });
//     }).catch(function error() {

//     })
// })
