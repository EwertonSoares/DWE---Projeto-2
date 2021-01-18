var btnEnviar = document.getElementById("enviarProblema");
var inputLocal = document.getElementById("local");
var inputImg = document.getElementById("inputImage");
var inputTextArea = document.getElementById("textArea");
var userUid = localStorage.getItem("userUid");
var userEmail = localStorage.getItem("userEmail");

const db = firebase.database();

btnEnviar.addEventListener("click", function () {
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

    db.ref('problemas/' + id).set(problema);
    problemaCadastrado();
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
