var btnVoltar = document.getElementById("voltar-reposta");
var btnEnviarResposta = document.getElementById("btn-enviar-resposta");
var btnCancelarResposta = document.getElementById("btn-cancelar-resposta");
var txtResposta = document.getElementById("texto-resposta");

var db = firebase.database();

window.addEventListener("load", function () {
    var email = localStorage.getItem("userEmail");

    txtResposta.value = sessionStorage.getItem("resposta");
    if (email !== "admin@admin.com") {
        btnEnviarResposta.style.display = "none";
        btnCancelarResposta.style.display = "none";
    }
    else {
        btnEnviarResposta.style.display = "inline";
        btnCancelarResposta.style.display = "inline";
    }
})

btnEnviarResposta.addEventListener("click", function () {
    var obj = JSON.parse(sessionStorage.getItem("problema"));

    var problema = {
        idProblema: obj.idProblema,
        userEmail: obj.userEmail,
        local: obj.local,
        image: obj.image,
        imgUrl: obj.imgUrl,
        descricao: obj.descricao,
        status: sessionStorage.getItem("status"),
        resposta: txtResposta.value
    }
    debugger

    enviaResposta(problema);
});

btnCancelarResposta.addEventListener("click", function () {
    window.location.href = "/administrador.html";
})

btnVoltar.addEventListener("click", function () {
    var email = localStorage.getItem("userEmail");

    if (email === "admin@admin.com") {
        window.location.href = "/administrador.html";
    }
    else {
        window.location.href = "/index.html";
    }
});

//Update de um problema cadastrado
function enviaResposta(problema) {

    db.ref("problemas/" + problema.idProblema).update({
        userUid: localStorage.getItem("userUid"),
        userEmail: problema.userEmail,
        local: problema.local,
        image: problema.image,
        imgUrl: problema.imgUrl,
        descricao: problema.descricao,
        status: problema.status,
        resposta: problema.resposta
    })

    debugger
    alert("Resposta enviada");
    txtResposta.value = "";
}