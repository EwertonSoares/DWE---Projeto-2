var btnVoltar = document.getElementById("voltar-reposta");
var btnEnviarResposta = document.getElementById("btn-enviar-resposta");
var btnCancelarResposta = document.getElementById("btn-cancelar-resposta");
var txtResposta = document.getElementById("texto-resposta");
var obj = JSON.parse(sessionStorage.getItem("problema"));

var db = firebase.database();

window.addEventListener("load", function () {
    var email = localStorage.getItem("userEmail");
    
    if (email !== "servidor@admin.com") {
        txtResposta.value = sessionStorage.getItem("resposta");
        btnEnviarResposta.style.display = "none";
        btnCancelarResposta.style.display = "none";
    }
    else {
        txtResposta.value = obj.resposta;
        sessionStorage.removeItem("resposta");
        btnEnviarResposta.style.display = "inline";
        btnCancelarResposta.style.display = "inline";
    }
})

btnEnviarResposta.addEventListener("click", function () {
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
    
    enviaResposta(problema);
});

btnCancelarResposta.addEventListener("click", function () {
    window.location.href = "/administrador.html";
})

btnVoltar.addEventListener("click", function () {
    var email = localStorage.getItem("userEmail");
    sessionStorage.removeItem("resposta");

    if (email === "servidor@admin.com") {
        window.location.href = "/administrador.html";
    }
    else if (email === null) {
        window.location.href = "/problemas-cadastrados.html";
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

    alert("Resposta enviada");        
    window.location.href = "/problemas-cadastrados.html";
}